import base64
from random import seed
from random import random


class ByteReader:

    @staticmethod
    def build_image(bytes_64: str, extension: str) -> str:
        seed(1)
        decrypted = base64.b64decode(bytes_64)
        file_name = str(random()) + "." + extension
        with open(file_name, 'wb') as f:
            f.write(decrypted)
        return file_name
