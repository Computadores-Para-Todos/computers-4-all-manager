import nodemailer from 'nodemailer';
import htmlToText from 'html-to-text';

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

/**
 * Envia um email por SMTP
 *
 * @param {string} to Email de destino
 * @param {string} subject Email de destino
 * @param {string} content Conteudo do email em html
 *
 * @returns {void}
 */
export function sendEmail(to, subject, content) {
  const emailOptions = {
    from: '"Computadores para Todos" <naoresponda@computadoresparatodos.com.br>',
    to,
    subject,
    html: content,
    text: htmlToText.fromString(content)
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error('sendMail:', error.message);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
