def build_html_message(message):
    return """\
    <html>
      <body>
        <p><strong>Estimados, </strong><br>
           """ + message + """<br>
        </p>
        <p>Saludos.</p>
      </body>
    </html>
    """