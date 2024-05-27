import { Resend } from "resend";
import ResetPassword from "../../../emails/ResetPassword";

const resend = new Resend("re_WvT4THCL_8cvgxufe2vWwYo8XavcBQvsS");

export async function POST(request: Request) {
  try {
    const { receiver, resetCode, firstname } = await request.json();

    const data = await resend.emails.send({
      from: "Moduloop <no-reply@moduloop-impact.fr>",
      to: receiver,
      subject: "Réinitialisation de votre mot de passe Moduloop-Impact",
      react: ResetPassword({
        date: new Date().toLocaleDateString(),
        code: resetCode,
        firstName: firstname,
      }),
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
