import os
import json
import logging
import requests
from dotenv import load_dotenv
load_dotenv()

customer_id = os.getenv("VECTARA_CUSTOMER_ID")
v_api_key = os.getenv("VECTARA_API_KEY")
openai_api_key = os.getenv("OPENAI_API_KEY")
corpus_id = os.getenv('VECTARA_CORPUS_ID')
query_address = os.getenv('QUERY_ADDRESS')





def _get_query_json(customer_id: int, corpus_id: int, query_value: str):
    """Returns a query JSON."""
    query = {
        "query": [
            {
                "query": query_value,
                "num_results": 10,
                "corpus_key": [{"customer_id": customer_id, "corpus_id": corpus_id}],
            },
        ],
    }
    return json.dumps(query)


def query(customer_id: int, corpus_id: int, query_address: str, v_api_key: str, query: str):
    """Queries the data.

    Args:
        customer_id: Unique customer ID in vectara platform.
        corpus_id: ID of the corpus to which data needs to be indexed.
        query_address: Address of the querying server. e.g., api.vectara.io
        jwt_token: A valid Auth token. or v_api_key

    Returns:
        (response, True) in case of success and returns (error, False) in case of failure.

    """
    post_headers = {
        "customer-id": f"{customer_id}",
        # "Authorization": f"Bearer {jwt_token}"
        "x-api-key": v_api_key
    }

    response = requests.post(
        f"https://{query_address}/v1/query",
        data=_get_query_json(customer_id, corpus_id, query),
        verify=True,
        headers=post_headers)

    if response.status_code != 200:
        logging.error("Query failed with code %d, reason %s, text %s",
                       response.status_code,
                       response.reason,
                       response.text)
        return response, False

    message = response.json()
    if (message["status"] and
        any(status["code"] != "OK" for status in message["status"])):
        logging.error("Query failed with status: %s", message["status"])
        return message["status"], False

    for response_set in message["responseSet"]:
        for status in response_set["status"]:
            if status["code"] != "OK":
                return status, False

    return message, True