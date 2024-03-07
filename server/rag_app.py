import cohere
import os
from pinecone import Pinecone
from dotenv import load_dotenv
load_dotenv()

# from openai import OpenAI
# client = OpenAI()

# openai_api_key = os.getenv('OPENAI_API_KEY')
pinecone_api_key = os.getenv('PINECONE_API_KEY')
cohere_api_key = os.getenv('COHERE_API_KEY')


co = cohere.Client(cohere_api_key)
pc = Pinecone(pinecone_api_key)

index_name = 'eco-factor'
index = pc.Index(index_name)

limit = 3000

def retrieve(query):
    # create embedding
    vec = co.embed(
        texts=[query],
        model='multilingual-22-12',
        truncate='NONE'
    ).embeddings
    
    # search pinecone index for context
    query_res = index.query(vector=vec, top_k=3, include_metadata=True)

    # Extract relevant information from the matches
    des = [str(x['score']) for x in query_res['matches']]
    

    # Combine the information into formatted contexts
    contexts = [
        f"Product description score: {des}"
        for description in zip(des)
    ]

    # Building the prompt with the retrieved contexts 
    prompt_start = (
        f"Answer the Query based on the contexts, if it's not in the contexts say 'I don't know the answer'. \n\n"
        f"Context:\n"
    )
    prompt_end = (
        f"\n\nQuery: {query}\nAnswer in the language of Query, if Query is in English Answer in English."
    )

    # Append contexts until hitting the limit
    for i in range(1, len(contexts)):
        if len("".join(contexts[:i])) >= limit:
            prompt = (
                prompt_start +
                "".join(contexts[:i-1]) +
                prompt_end
            )
            break
        elif i == len(contexts)-1:
            prompt = (
                prompt_start +
                "".join(contexts) +
                prompt_end
            )
    return prompt



def complete(prompt):
  response = co.generate(
                          model='c4ai-aya',
                          prompt=prompt,
                          max_tokens=3000,
                          temperature=0.4,
                          k=0,
                          stop_sequences=['\n\n'],
                          return_likelihoods='NONE'
                        )
  return response.generations[0].text.strip()


# Open AI models

# def chat_complete(prompt):
#     response = client.chat.completions.create(
#         model="gpt-3.5-turbo",
#         response_format={ "type": "json_object" },
#         messages=[
#             {"role": "user", "content": prompt}]
#         )
#     print(response.choices[0].message.content)
#     return response.choices[0].message.content


# def createEmbeddings(query):

#     return client.embeddings.create(
#     input=query,
#     model="text-embedding-3-small"
#     )
prompt_llm = "your retrieved prompt here with context"

