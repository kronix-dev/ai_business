import base64
import uuid
from django.core.files.base import ContentFile
import base64


def base642file(base64_data, filename="file_"):
    _format, imstr = base64_data.split(";base64,")
    ext = _format.split("/")[-1]
    data = ContentFile(
        base64.b64decode(imstr), name=filename + "_" + str(uuid.uuid4()) + "." + ext
    )
    return data


def file2base64(file_path, application="application"):

    try:
        with open(file_path, "rb") as file:
            binary_data = file.read()
            base64_encoded_data = base64.b64encode(binary_data)
            base64_string = base64_encoded_data.decode("ascii")
            return (
                application
                + "/"
                + file_path.split(".")[-1]
                + ";base64,"
                + base64_string
            )
    except FileNotFoundError:
        print(f"Error: File not found at path: {file_path}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
