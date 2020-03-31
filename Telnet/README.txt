/********************************************************************************************

/*********** TELNET send mail SMTP
https://arstechnica.com/civis/viewtopic.php?t=1256075

$ telnet <IP OT HOST SERVER> 25

[-] EHLO example.com

[-] MAIL FROM: <vpedraza@domainserver.com.co>

[-] RCPT TO: <desarrollo@example.com.co>

[-] DATA

[-] To: Desarrollo <desarrollo@example.com.co>
	From: Name From <vpedraza@domainserver.com.co>
	Subject: Subject

	Hola, 
	
	Este es el contenido
	
	Saludos.

	.
	
[-] QUIT

/*********** TELNET list, read and delete email
https://mediatemple.net/community/products/dv/204404584/sending-or-viewing-emails-using-telnet#1

$ telnet <IP OT HOST SERVER> 110

[-] USER username@domainserver.com.co

[-] PASS password

[-] LIST

[-] RETR 2 // Read email number 2 of the list

[-] DELE 2 // Delete email number 2 of the list

[-] QUIT

/********************************************************************************************