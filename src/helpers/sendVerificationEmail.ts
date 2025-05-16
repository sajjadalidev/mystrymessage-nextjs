import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifiedCode: string
): Promise<ApiResponse> {
  try {
    // Need to check why i am getting email as a whole object with all values of user
    // for now I am using it as same as it is
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email.email,
      subject: "Verify your email address",
      react: VerificationEmail({
        username: email.username,
        otp: email.verifyCode,
      }),
    });
    if (error) {
      console.log("🚀 ~ error:", error);
      return Response.json({ error }, { status: 500 });
    }
    return Response.json({ data });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
