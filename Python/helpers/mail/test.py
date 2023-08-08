from src.services.mail.imap_reader import IMAPReader
from src.services.mail.mime_message import build_att_dict
from src.services.mail.smtp_sender import SMTPSender
from email.mime.base import MIMEBase


def test_ssl():
    host = "smtp.gmail.com"
    port = 587
    user = "my@domain.edu.co"
    password = "password"
    name_from = "PINNOS 2023"
    smtp = SMTPSender(host, port, user, password, name_from)
    recipients = ["vpedraza@unbosque.edu.co"]
    smtp.send_mail(recipients, "Test", "Hola hola, esto es un test")


def test_ssl_attachments():
    host = "smtp.gmail.com"
    port = 587
    user = "viti@gmail.com"
    password = "password"
    name_from = "RPA - M & G"
    smtp = SMTPSender(host, port, user, password, name_from)
    recipients = ["vpedraza@unbosque.edu.co"]
    cobol_csv_mime_base = MIMEBase("text", "plain")
    cobol_csv_path_file = "/usr/local/tomcat/data/data"
    cobol_csv_filename = "COBOL.csv"
    zip_pdf_mime_base = MIMEBase("application", "x-zip")
    zip_pdf_path_file = "/usr/local/tomcat/data/data/pdf"
    zip_pdf_filename = "facturas_2021-04-27_14-42-29.zip"
    attachment_list = [build_att_dict(cobol_csv_mime_base, cobol_csv_path_file, cobol_csv_filename),
                       build_att_dict(zip_pdf_mime_base, zip_pdf_path_file, zip_pdf_filename)]
    smtp.send_mail(recipients, "Test", "Hola hola, esto es un test",attachment_list=attachment_list)


def download_att():
    host = "smtp.gmail.com"
    port = 465
    user = "viti@gmail.com"
    password = "password"
    download_folder = "/usr/local/tomcat/data/data/comprimidos"
    imap = IMAPReader(host, port, user, password, download_folder)
    imap.verify_download_folder()
    print(imap.download_att())


if __name__ == "__main__":
    test_ssl()
    # download_att()
    # test_ssl_attachments()
