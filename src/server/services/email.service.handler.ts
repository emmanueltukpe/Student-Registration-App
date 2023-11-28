import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import env from "../../common/config/env";

export interface EmailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: env.email_service,
            auth: {
                user: env.email,
                pass: env.email_app_password
            }
        });
    }

    async sendEmail(options: EmailOptions, otp: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: options.from,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: this.mailGeneratorForOtp(otp)
            });
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }

    private mailGeneratorForOtp(otp: string) {
        const MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Gongoklin Senior Secondary School",
                link: "https://mailgen.js/"
            }
        });

        const response = {
            body: {
                name: "One Time Password",
                intro: "Kindly use this otp",
                table: {
                    data: [
                        {
                            otp: otp
                        }
                    ]
                }
            }
        };

        const mail = MailGenerator.generate(response);
        return mail;
    }
}

export default EmailService;
