import FormData from "form-data";
import Mailgun from "mailgun.js";

type EmailOptions = {
  to: string;
  name: string;
  subject: string;
  text: string;
};

export async function sendEmail({ subject, text, to, name }: EmailOptions) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: (process.env.MAILGUN_API_KEY as string) || "",
  });
  try {
    const data = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `Mailgun Sandbox <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: [`${name} <${to}>`],
      subject,
      text,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}
