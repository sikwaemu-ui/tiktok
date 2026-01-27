import nodemailer from "nodemailer";

/**
 * Validate SMTP configuration
 */
function validateSMTPConfig(): { valid: boolean; error?: string } {
  if (!process.env.SMTP_HOST) {
    return { valid: false, error: "SMTP_HOST environment variable is not set" };
  }
  if (!process.env.SMTP_USER) {
    return { valid: false, error: "SMTP_USER environment variable is not set" };
  }
  if (!process.env.SMTP_PASSWORD) {
    return { valid: false, error: "SMTP_PASSWORD environment variable is not set" };
  }
  return { valid: true };
}

/**
 * Create SMTP transporter for sending emails
 */
export function createEmailTransporter() {
  const configCheck = validateSMTPConfig();
  if (!configCheck.valid) {
    throw new Error(configCheck.error);
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const isSecure = port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Add timeout and connection options
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
    // For development/testing with services like Mailtrap
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });
}

/**
 * Send OTP email
 */
export async function sendOTPEmail(email: string, code: string): Promise<void> {
  // Validate configuration first
  const configCheck = validateSMTPConfig();
  if (!configCheck.valid) {
    throw new Error(configCheck.error);
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) {
    throw new Error("SMTP_FROM or SMTP_USER must be set");
  }

  const transporter = createEmailTransporter();

  // Verify connection before sending
  try {
    await transporter.verify();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      `SMTP connection failed: ${errorMessage}. Please check your SMTP credentials and network connection.`
    );
  }

  // Send email
  try {
    await transporter.sendMail({
      from,
      to: email,
      subject: `Your TikTok login code: ${code}`,
      text: `Your login code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #161823; margin-bottom: 20px;">Your TikTok login code</h2>
          <p style="font-size: 32px; font-weight: bold; color: #161823; letter-spacing: 8px; margin: 30px 0; text-align: center;">
            ${code}
          </p>
          <p style="color: #666; font-size: 14px; margin: 10px 0;">This code will expire in 10 minutes.</p>
          <p style="color: #666; font-size: 14px; margin: 10px 0;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    // Provide more specific error messages
    if (errorMessage.includes("Invalid login")) {
      throw new Error("SMTP authentication failed. Please check your SMTP_USER and SMTP_PASSWORD.");
    }
    if (errorMessage.includes("ECONNREFUSED") || errorMessage.includes("ETIMEDOUT")) {
      throw new Error(`Cannot connect to SMTP server at ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}. Please check your SMTP_HOST and SMTP_PORT.`);
    }
    throw new Error(`Failed to send email: ${errorMessage}`);
  }
}
