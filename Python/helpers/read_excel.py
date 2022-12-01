"""

pip install pandas
pip install xlrd
pip install openpyxl

"""

from typing import List
import pandas as pd
import base64
import io


def read_excel_to_list_dict(path_file: str) -> List:
    list_dict = []

    if path_file.endswith('.xlsx'):
        xls = pd.ExcelFile(path_file, engine='openpyxl')
    else:
        xls = pd.ExcelFile(path_file)
    for sheet_name in xls.sheet_names:
        df = xls.parse(sheet_name)
        list_dict.append(df.to_dict('index'))

    return list_dict


def read_excel_from_bytes(bytes_64: str, extension: str) -> pd.DataFrame:
    decrypted = base64.b64decode(bytes_64)
    toread = io.BytesIO()
    toread.write(decrypted)  # pass your `decrypted` string as the argument here
    toread.seek(0)  # reset the pointer
    if extension == 'xlsx':
        df = pd.read_excel(toread, engine='openpyxl')
    else:
        df = pd.read_excel(toread)
    df = df.fillna('')
    return df
