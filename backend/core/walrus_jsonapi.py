
import os
import subprocess
import json
import tempfile
import base64

import requests

from pathlib import Path

from utils import num_to_blob_id, PATH_TO_WALRUS, PATH_TO_WALRUS_CONFIG, FULL_NODE_URL



# A function that converts string to bytes and a temporary file
def string_to_bytes(input_str, encoding='utf-8'):
    byte_file = input_str.encode(encoding)
    tmp = tempfile.NamedTemporaryFile(delete=False)
    tmp.write(byte_file)
    tmp.close()

    return tmp


# Upload the file to the Walrus service
def upload_to_Walrus(tmp):
    store_json_command = f"""{{ "config" : "{PATH_TO_WALRUS_CONFIG}",
        "command" : {{ "store" :
        {{ "file" : "{tmp.name}", "epochs" : 2  }}}}
    }}"""

    result = subprocess.run(
        [PATH_TO_WALRUS, "json"],
        text=True,
        capture_output=True,
        input=store_json_command,
    )

    assert result.returncode == 0

    # Display key information of the response
    json_result_dict = json.loads(result.stdout.strip())

    if "newlyCreated" in json_result_dict:
        blob_id = json_result_dict["newlyCreated"]["blobObject"]["blobId"]
        sui_object_id = json_result_dict["newlyCreated"]["blobObject"]["id"]
    elif "alreadyCertified" in json_result_dict:
        blob_id = json_result_dict["alreadyCertified"]["blobObject"]["blobId"]
        sui_object_id = json_result_dict["alreadyCertified"]["blobObject"]["id"]
    else:
        raise ValueError("Unexpected response from Walrus")
        
    return (blob_id, sui_object_id)

    # def output_info (json_result_dict):
    #     if "newlyCreated" in json_result_dict:
    #         blob_id = json_result_dict["newlyCreated"]["blobObject"]["blobId"]
    #         sui_object_id = json_result_dict["newlyCreated"]["blobObject"]["id"]
    #     elif "alreadyCertified" in json_result_dict:
    #         blob_id = json_result_dict["alreadyCertified"]["blobObject"]["blobId"]
    #         sui_object_id = json_result_dict["alreadyCertified"]["blobObject"]["id"]
    #     else:
    #         raise ValueError("Unexpected response from Walrus")
    #     return (blob_id, sui_object_id)
    # print(
    #     f"Upload Blob ID: {blob_id} Size {len(byte_file)} bytes")
    # print(f"Certificate in Object ID: {sui_object_id}")
    # finally:
    #     os.unlink(tmp.name)


if __name__ == "__main__":
    # Simple test 
    test_str = "HelloHelloWorldTestTest"
    test_byte = string_to_bytes(test_str)
    print(upload_to_Walrus(test_byte))


