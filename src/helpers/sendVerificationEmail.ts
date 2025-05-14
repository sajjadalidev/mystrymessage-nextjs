import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifiedCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email address",
      react: VerificationEmail({
        username,
        otp: verifiedCode,
      }),
    });
    return {
      success: false,
      message: "verification email sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
