import os
from imbox import Imbox
from src.services.mail.mail import Mail


class IMAPReader(Mail):

    def __init__(self, host, port, user, password, download_folder):
        super().__init__(host, port, user, password)
        self.download_folder = download_folder
        self.mail = None
        if self.port == 465:
            self.ssl = True
            self.tls = False
        elif self.port == 587:
            self.ssl = False
            self.tls = True
        elif self.port == 993:
            self.ssl = False
            self.tls = True
        elif self.port == 143:
            self.ssl = False
            self.tls = True
        else:
            raise Exception("Port " + str(self.port) + " unsupported")

    def verify_download_folder(self):
        if not os.path.isdir(self.download_folder):
            os.makedirs(self.download_folder, exist_ok=True)

    def connect(self):
        self.mail = Imbox(self.host, username=self.user, password=self.password, ssl=self.ssl, ssl_context=None,
                          starttls=self.tls)

    def download_att(self):
        success = True
        self.mail = Imbox(self.host, username=self.user, password=self.password, ssl=self.ssl, ssl_context=None,
                          starttls=self.tls)
        messages = self.mail.messages(unread=True)  # get unread messages
        print("Cantidad de mensajes: " + str(len(messages)))
        try:
            for (uid, message) in messages:
                try:
                    if len(message.attachments) != 0:
                        counter_attachment = 0
                        for idx, attachment in enumerate(message.attachments):
                            att_fn = IMAPReader.get_attachment_filename(attachment)
                            download_path = f"{self.download_folder}/{att_fn}"
                            # print(download_path)
                            if download_path.endswith(".zip"):
                                counter_attachment += 1
                                IMAPReader.write_attachment(download_path, attachment)
                            else:
                                print("Attachment is no ZIP file")
                        if counter_attachment > 0:
                            self.mail.mark_seen(uid)  # mark message as read
                    else:
                        print("Mail with out Attachments")
                except Exception as e:
                    print(str(e))
        except Exception as e:
            print(str(e))
            success = False
        self.disconnect()
        return success

    def disconnect(self):
        self.mail.logout()

    def read_emails(self):
        mail = Imbox(self.host, username=self.user, password=self.password, ssl=self.ssl,
                     ssl_context=None, starttls=self.tls)
        messages = mail.messages(unread=True)  # get unread messages
        print("Cantidad de mensajes: " + str(len(messages)))
        mail.logout()
        return len(messages)

    @staticmethod
    def write_attachment(download_path: str, attachment):
        try:
            with open(download_path, "wb") as fp:
                fp.write(attachment.get('content').read())
        except Exception as e:
            print('[[[[[ Error writing downloaded attachment')
            print('Attachment file name to write: ' + IMAPReader.get_attachment_filename(attachment))
            print(str(e))
            print(']]]]]')

    @staticmethod
    def get_attachment_filename(attachment) -> str:
        return attachment.get('filename')
