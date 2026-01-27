# SMTP Configuration Guide

If you're seeing the error "Failed to send email. Please check your SMTP configuration.", follow these steps:

## Quick Setup

1. **Create a `.env` file** in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Fill in your SMTP credentials** in the `.env` file

3. **Restart your development server** after changing `.env`:
   ```bash
   npm run dev
   ```

## Recommended: Mailtrap (for Development/Testing)

Mailtrap is perfect for testing - emails are captured and not actually sent.

1. Sign up at [https://mailtrap.io](https://mailtrap.io) (free tier available)
2. Go to **Email Testing > Inboxes > SMTP Settings**
3. Copy the credentials to your `.env`:
   ```
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your-mailtrap-username
   SMTP_PASSWORD=your-mailtrap-password
   SMTP_FROM=noreply@yourdomain.com
   ```

## Gmail Setup

1. Enable **2-Factor Authentication** on your Google account
2. Generate an **App Password**:
   - Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the 16-character password
3. Add to `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   SMTP_FROM=your-email@gmail.com
   ```

## Quick Test: Ethereal Email

For instant testing without signup:

1. Visit [https://ethereal.email/create](https://ethereal.email/create)
2. Copy the generated credentials to `.env`
3. Emails will appear in the Ethereal inbox (not your real email)

## Troubleshooting

### Error: "SMTP_HOST environment variable is not set"
- Make sure you have a `.env` file in the project root
- Check that all SMTP variables start with `SMTP_`
- Restart your dev server after creating/editing `.env`

### Error: "SMTP connection failed"
- Verify your SMTP_HOST and SMTP_PORT are correct
- Check if your firewall blocks outbound connections
- For Gmail, ensure you're using an App Password (not your regular password)
- Try using port 587 (TLS) or 465 (SSL)

### Error: "SMTP authentication failed"
- Double-check SMTP_USER and SMTP_PASSWORD
- For Gmail, make sure you generated an App Password
- Ensure there are no extra spaces in your `.env` file

### Still having issues?

1. Check the server console logs for detailed error messages
2. Verify your `.env` file is in the project root (same directory as `package.json`)
3. Make sure you restarted the dev server after creating/editing `.env`
4. Try using Mailtrap for testing - it's the most reliable option

## Required Environment Variables

```env
AUTH_SECRET=your-secret-key-here
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASSWORD=your-password
SMTP_FROM=your-email@example.com
```

Generate AUTH_SECRET:
```bash
# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Linux/Mac
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
