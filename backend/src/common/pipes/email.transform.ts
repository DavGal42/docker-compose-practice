import validator from 'validator';
import { PipeTransform } from '@nestjs/common';

const MAIL_RU = 'mail.ru';
const GMAIL_COM = 'gmail.com';

export class EmailTransform implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _sanitizeEmail(email: string): string {
    if (email.endsWith(MAIL_RU)) {
      email = email.replace(MAIL_RU, GMAIL_COM);

      const sanitizedEmail = validator.normalizeEmail(email, {
        gmail_remove_dots: false,
      });

      return sanitizedEmail
        ? sanitizedEmail.replace(GMAIL_COM, MAIL_RU)
        : email;
    }

    const sanitizedEmail = validator.normalizeEmail(email, {
      gmail_remove_dots: false,
    });
    return sanitizedEmail ? sanitizedEmail : email;
  }

  transform(value: string): string {
    return this._sanitizeEmail(value)?.toLowerCase();
  }
}
