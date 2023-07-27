import smtplib
import ssl
from src.services.mail.mail import Mail
from src.services.mail.html_message import build_html_message
from src.services.mail.mime_message import build_mime_multi_msg, add_many_attachments


class SMTPSender(Mail):

    def __init__(self, host, port, user, password, name_from):
        super().__init__(host, port, user, password)
        self.name_from = name_from
        if port != 465 and port != 587:
            raise Exception("Port " + str(self.port) + " unsupported")

    def send_ssl(self, recipients, subject, msg):
        context = ssl.create_default_context()
        message = build_mime_multi_msg(self.name_from, recipients, subject, build_html_message(msg))
        with smtplib.SMTP_SSL(self.host, self.port, context=context) as server:
            server.login(self.user, self.password)
            server.sendmail(self.user, recipients, message.as_string())

    def send_tls(self, recipients, subject, msg):
        context = ssl.create_default_context()
        message = build_mime_multi_msg(self.name_from, recipients, subject, build_html_message(msg))
        with smtplib.SMTP(self.host, self.port) as server:
            server.ehlo()  # Can be omitted
            server.starttls(context=context)
            server.ehlo()  # Can be omitted
            server.login(self.user, self.password)
            server.sendmail(self.user, recipients, message.as_string())

    def send_ssl_with_attachments(self, recipients, subject, msg, attach_conf_list):
        context = ssl.create_default_context()
        message = build_mime_multi_msg(self.name_from, recipients, subject, build_html_message(msg))
        message = add_many_attachments(message, attach_conf_list)
        with smtplib.SMTP_SSL(self.host, self.port, context=context) as server:
            server.login(self.user, self.password)
            server.sendmail(self.user, recipients, message.as_string())

    def send_tls_with_attachments(self, recipients, subject, msg, attach_conf_list):
        context = ssl.create_default_context()
        message = build_mime_multi_msg(self.name_from, recipients, subject, build_html_message(msg))
        message = add_many_attachments(message, attach_conf_list)
        with smtplib.SMTP(self.host, self.port) as server:
            server.ehlo()  # Can be omitted
            server.starttls(context=context)
            server.ehlo()  # Can be omitted
            server.login(self.user, self.password)
            server.sendmail(self.user, recipients, message.as_string())

    def send_mail(self, recipients, subject, msg, attachment_list=None):
        if self.port == 465:
            if attachment_list is not None:
                self.send_ssl_with_attachments(recipients, subject, msg, attachment_list)
            else:
                self.send_ssl(recipients, subject, msg)
        elif self.port == 587:
            if attachment_list is not None:
                self.send_tls_with_attachments(recipients, subject, msg, attachment_list)
            else:
                self.send_tls(recipients, subject, msg)
        else:
            raise Exception("Port " + str(self.port) + " unsupported")

    def test_ssl(self):
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(self.host, self.port, context=context) as server:
            server.login(self.user, self.password)

    def test_tls(self):
        context = ssl.create_default_context()
        with smtplib.SMTP(self.host, self.port) as server:
            server.ehlo()  # Can be omitted
            server.starttls(context=context)
            server.ehlo()  # Can be omitted
            server.login(self.user, self.password)

    def test_mail(self):
        if self.port == 465:
            self.test_ssl()
            return "Conectado correctamente con puerto para SSL."
        elif self.port == 587:
            self.test_tls()
            return "Conectado correctamente con puerto para TLS."
        else:
            raise Exception("Port " + str(self.port) + " unsupported")
