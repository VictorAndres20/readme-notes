import { Injectable, OnModuleInit } from '@nestjs/common';
import { Employee } from '../employee/entity/employee.entity';
import nodemailer, { Transporter } from 'nodemailer';
import { Logger } from '@nestjs/common';

@Injectable()
export class MailerService implements OnModuleInit {
  private transporter: Transporter;
  private logger = new Logger(MailerService.name);

  constructor() {
    const mailConfig = {
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: process.env.MAILER_SECURE ? true : false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    };

    const mailDefaults = {
      from: `"No-reply" <${process.env.MAIL_FROM}>`,
    };

    this.transporter = nodemailer.createTransport(mailConfig, mailDefaults);
  }

  async onModuleInit() {
    try {
      await this.transporter.verify();
      this.logger.log('Mailer connection verified successfully.');
    } catch (error) {
      this.logger.error('Mailer connection verification failed:', error);
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    attachments: {
      filename: 'comprobante.pdf';
      content: string;
      encoding: 'base64';
    }[]
  ) {
    await this.transporter.sendMail({
      to,
      subject,
      html,
      attachments,
    });
  }

  buildContentTemplate(name: string) {
    return `
        <img width="200" height="100" src="https://koalasoft.com.co/images/logo-noa.png" alt="Logo noa Nomina">
        <br/>
        <h2>Hola ${name},</h2>
        <br/>
        <p style="font-size: 18px">Desde <a style="color: #f7ac43" href="https://nominanoa.com">anticipos NOA</a> te enviamos tu comprobante de anticipo.</p>
        <br/>
        <p style="font-size: 18px">Gracias.</p>
        <img width="300" height="100" src="https://koalasoft.com.co/images/footer-noa.png" alt="Logo noa Nomina">
    `;
  }

  buildActivationCodeTemplate(employee: Employee) {
    return `
        <html>
        <body>
        <img width="300" height="150" src="https://koalasoft.com.co/images/logo-noa.png" alt="Logo noa Nomina">
        <div style="width: 300px;">
        <p style="text-align: center; font-size: 20px; font-weight: bold">${employee.name}</p>
        </div>
        <div style="width: 300px;">
        <p style="text-align: center; font-size: 18px">Desde <a style="color: #f7ac43" href="https://nominanoa.com">anticipos NOA</a> te enviamos tu código de activación para que puedas activar tu usuario.</p>
        </div>
        <div style="margin: 20px 10px; padding: 10px 10px; background-color: #DDDDDD; font-size: 28px; width: 290px; text-align: center;">
        ${employee.activation_code}
        </div>
        <div style="width: 300px;">
        <p style="text-align: center; font-size: 18px;">Al momento de activar tu usuario registra una contraseña segura y empieza a realizar tus anticipos.</p>
        </div>
        <img width="300" height="100" src="https://koalasoft.com.co/images/footer-noa.png" alt="Logo noa Nomina">
        </body>
        </html>
    `;
  }
}
