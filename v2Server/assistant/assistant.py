from openai import OpenAI

class EcofactorAssistant:
    def __init__(self):
        self.client = OpenAI()
        self.assistant_id = None
        self.vector_store_id = None
        self.file_batch_id = None
        self.file_id = None
        self.thread_id = None
        self.run_id = None

    def create_assistant(self):
        self.assistant = self.client.beta.assistants.create(
            name="Ecofactor Optimizer",
            instructions="...",
            tools=[{"type": "file_search"}],
            model="gpt-3.5-turbo-0125",
        )
        self.assistant_id = self.assistant.id

    def create_vector_store(self, file_paths):
        self.vector_store = self.client.beta.vector_stores.create(name="Product Description")
        file_streams = [open(path, "rb") for path in file_paths]
        self.file_batch = self.client.beta.vector_stores.file_batches.upload_and_poll(
            vector_store_id=self.vector_store.id, files=file_streams
        )
        self.vector_store_id = self.vector_store.id

    def update_assistant_with_vector_store(self):
        self.assistant = self.client.beta.assistants.update(
            assistant_id=self.assistant_id,
            tool_resources={"file_search": {"vector_store_ids": [self.vector_store_id]}},
        )

    def upload_user_file(self, file_path):
        self.message_file = self.client.files.create(file=open(file_path, "rb"), purpose="assistants")

    def create_thread_with_file(self):
        self.thread = self.client.beta.threads.create(
            messages=[
                {
                    "role": "user",
                    "content": "how can i optimize product",
                    "attachments": [{"file_id": self.message_file.id, "tools": [{"type": "file_search"}]}],
                }
            ]
        )
        self.thread_id = self.thread.id

    def create_and_poll_run(self):
        self.run = self.client.beta.threads.runs.create_and_poll(thread_id=self.thread_id, assistant_id=self.assistant_id)
        self.run_id = self.run.id

    def get_run_messages(self):
        messages = list(self.client.beta.threads.messages.list(thread_id=self.thread_id, run_id=self.run_id))
        message_content = messages[0].content[0].text
        annotations = message_content.annotations
        citations = []
        for index, annotation in enumerate(annotations):
            message_content.value = message_content.value.replace(annotation.text, f"[{index}]")
            if file_citation := getattr(annotation, "file_citation", None):
                cited_file = self.client.files.retrieve(file_citation.file_id)
                citations.append(f"[{index}] {cited_file.filename}")
        return message_content.value, citations

# Example usage
assistant = EcofactorAssistant()
assistant.create_assistant()
assistant.create_vector_store(["helmet.txt"])
assistant.update_assistant_with_vector_store()
assistant.upload_user_file("helmet.txt")
assistant.create_thread_with_file()
assistant.create_and_poll_run()
messages, citations = assistant.get_run_messages()

print(messages)
print("\n".join(citations))
