import cohere
import os
from pinecone import Pinecone

pinecone_api_key = os.getenv('PINECONE_API_KEY')
cohere_api_key = os.getenv('COHERE_API_KEY')


co = cohere.Client(cohere_api_key)
pc = Pinecone(pinecone_api_key)

index_name = 'ecofactor'
index = pc.Index(index_name)

limit = 3000

def retrieve(query):
    # create embedding
    xq = co.embed(
        texts=[query],
        model='multilingual-22-12',
        truncate='NONE'
    ).embeddings
    # search pinecone index for context passage with the answer
    xc = index.query(vector=xq, top_k=3, include_metadata=True)

    # Extract relevant information from the matches
    des = [str(x['metadata']['Products description']) for x in xc['matches']]
    

    # Combine the information into formatted contexts
    contexts = [
        f"Product description: {des}"
        for description in zip(des)
    ]

    # Build the prompt with the retrieved contexts included
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



prompt_llm = "your retrieved prompt here with context"

