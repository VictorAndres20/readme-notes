import os


def delete_file(file_name: str):
    if os.path.exists(file_name):
        os.remove(file_name)
