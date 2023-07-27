from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
from email import encoders
from email.mime.base import MIMEBase
import os


def build_mime_multi_msg(sender_email, recipients, subject, msg):
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = ", ".join(recipients)
    message.attach(MIMEText(msg, "html"))
    return message


def build_att_dict(mime_base: MIMEBase, path_file, filename):
    return {"path_file": path_file, "filename": filename, "mime_base": mime_base}


def add_attachment(message: MIMEMultipart, mime_base: MIMEBase, path_file, filename):
    with open(os.path.join(path_file, filename), "rb") as attachment:
        # part = MIMEBase("application", "octet-stream")
        part = mime_base
        part.set_payload(attachment.read())
    encoders.encode_base64(part)
    part.add_header(
        "Content-Disposition",
        f"attachment; filename= {filename}",
    )
    message.attach(part)
    return message


def add_many_attachments(message: MIMEMultipart, attach_conf_list: List[dict]):
    mime_message = message
    for att_conf in attach_conf_list:
        path_file = att_conf['path_file']
        filename = att_conf['filename']
        mime_base = att_conf['mime_base']
        mime_message = add_attachment(mime_message, mime_base, path_file, filename)
    return mime_message
