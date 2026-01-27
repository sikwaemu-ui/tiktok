/**
 * Test SMTP configuration
 * Run with: npx tsx scripts/test-smtp.ts
 * Or: ts-node scripts/test-smtp.ts
 */

import { createEmailTransporter, sendOTPEmail } from "../lib/email";

async function testSMTP() {
  console.log("Testing SMTP configuration...\n");

  // Check environment variables
  const requiredVars = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD"];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    missingVars.forEach((varName) => console.error(`   - ${varName}`));
    console.error("\nPlease create a .env file with these variables.");
    console.error("See .env.example for reference.");
    process.exit(1);
  }

  console.log("✓ All required environment variables are set");
  console.log(`  SMTP_HOST: ${process.env.SMTP_HOST}`);
  console.log(`  SMTP_PORT: ${process.env.SMTP_PORT || "587 (default)"}`);
  console.log(`  SMTP_USER: ${process.env.SMTP_USER}`);
  console.log(`  SMTP_FROM: ${process.env.SMTP_FROM || process.env.SMTP_USER}\n`);

  // Test connection
  try {
    console.log("Testing SMTP connection...");
    const transporter = createEmailTransporter();
    await transporter.verify();
    console.log("✓ SMTP connection successful!\n");

    // Test sending email (use a test email if provided, otherwise skip)
    const testEmail = process.env.TEST_EMAIL;
    if (testEmail) {
      console.log(`Sending test email to ${testEmail}...`);
      const testCode = "123456";
      await sendOTPEmail(testEmail, testCode);
      console.log("✓ Test email sent successfully!");
      console.log(`  Check ${testEmail} for the OTP code: ${testCode}`);
    } else {
      console.log("ℹ Set TEST_EMAIL environment variable to test sending emails");
      console.log("  Example: TEST_EMAIL=your-email@example.com");
    }
  } catch (error) {
    console.error("\n❌ SMTP test failed:");
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`   ${errorMessage}\n`);
    
    console.log("Common issues:");
    console.log("  1. Check your SMTP credentials are correct");
    console.log("  2. For Gmail, use an App Password (not your regular password)");
    console.log("  3. Ensure your firewall allows outbound connections on the SMTP port");
    console.log("  4. Verify SMTP_HOST and SMTP_PORT are correct for your provider");
    process.exit(1);
  }
}

testSMTP().catch(console.error);
