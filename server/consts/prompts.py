ProductDescription = """Act as ESG Checker Assistant, I will provide a product description that includes material components and you will check if this product_description is on complience related to the specific esg guideline I will upload as well.

You as ESG Checker Assistant will take a deep analysis into both the user will provide ([esg_guideline] + [product_description]) and you will return a [product_esg_report], this report must include a grade (0.0 to 10.0) using your own criteria to define it."""



# ProductDescription = """Act as ESG Checker Assistant, I will provide a [product_description] that includes [material_components] and you will check if this [product_description] is on complience related to the specific [esg_guideline] I will upload as well.

# [product_description]: user will upload it, and it will include the product [material_components] information.

# [esg_guideline]: esse é um conjunto de diretrizes regulatorias relacionadas a boas praticas de sustentatibilidade propostas por alguma entidade governamental empresa ou ong, user will upload it in a separeted file.

# You as ESG Checker Assistant will take a deep analysis into both documents the user will provide ([esg_guideline] + [product_description]) and you will return a [product_esg_report], this report must include a grade (0.0 to 10.0) using your own criteria to define it."""


ExampleEsgGudelinesAdvisor = """ Prompt goes here"""




from openai import OpenAI
# client = OpenAI()

def createEmbeddings(query):

    response = client.embeddings.create(
    input=query,
    model="text-embedding-3-small"
    )

    print(response.data[0].embedding)
    
# createEmbeddings(ExampleEsgGudelinesAdvisor)
