from dotenv import load_dotenv
import os
load_dotenv()
assistant_api=os.getenv('ASSISTANT_API')
vector_api=os.getenv('VECTOR_ID')
def upload_file(filename,vector_id):

    from openai import OpenAI
    client = OpenAI()
    file_paths = [filename]
    file_streams = [open(path, "rb") for path in file_paths]
    file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
  vector_store_id=vector_id, files=file_streams
)
def create_thread_with_file(filename):
    from openai import OpenAI
    client = OpenAI()
    file = client.files.create(
    file=open(filename, "rb"),
    purpose='assistants')
    thread =client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": "how can i optimize product",
                "attachments": [{"file_id":file.id, "tools": [{"type": "file_search"}]}],
            }
        ]
    )
    return thread.id
    

def create_and_poll_run(thread_id,assistant_api):
    from openai import OpenAI
    client = OpenAI()
        
    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread_id, assistant_id=assistant_api
    )

    messages = list(client.beta.threads.messages.list(thread_id=thread_id, run_id=run.id))

    message_content = messages[0].content[0].text
    annotations = message_content.annotations
    citations = []
    for index, annotation in enumerate(annotations):
        message_content.value = message_content.value.replace(annotation.text, f"[{index}]")
        if file_citation := getattr(annotation, "file_citation", None):
            cited_file = client.files.retrieve(file_citation.file_id)
            citations.append(f"[{index}] {cited_file.filename}")

    print(message_content.value)
    print("\n".join(citations))

def delete_all_files(vector_api):
    from openai import OpenAI
    client = OpenAI()
    vector_store_files = client.beta.vector_stores.files.list(
    vector_store_id=vector_api
    )
    file_ids=[]
    for data in vector_store_files:
        file_ids.append(data.id)
        
    print(file_ids)
    for  file_id in file_ids:
        deleted_vector_store_file = client.beta.vector_stores.files.delete(
            vector_store_id=vector_api,
            file_id=file_id
        )
    print(deleted_vector_store_file)

if __name__ == "__main__":
    upload_file("helmet.txt",vector_api)
    thread_id=create_thread_with_file("helmet.txt")
    create_and_poll_run(thread_id,assistant_api)
    delete_all_files(vector_api)

