# Cloudflare Setup Guide

This guide will help you set up Cloudflare R2 storage and Email Routing for your Payload CMS integration.

## Cloudflare R2 Setup

1. **Create an R2 Bucket**
   - Log in to your Cloudflare dashboard
   - Navigate to R2 (Object Storage)
   - Click "Create bucket"
   - Name it `payload-media` (or your preferred name)
   - Choose a location closest to your users

2. **Create R2 API Token**
   - Go to R2 > Manage R2 API Tokens
   - Click "Create API token"
   - Give it a name (e.g., "Payload CMS Media")
   - Select "Object Read & Write" permissions
   - Copy the Access Key ID and Secret Access Key
   - Add these to your `.env.local` file:
     ```
     R2_ACCOUNT_ID=your_account_id
     R2_ACCESS_KEY_ID=your_access_key_id
     R2_SECRET_ACCESS_KEY=your_secret_access_key
     R2_BUCKET_NAME=payload-media
     ```

3. **Configure CORS (Optional)**
   - If you need to access files directly from the browser, configure CORS in your R2 bucket settings
   - Add your domain to allowed origins

## Cloudflare Email Routing Setup

Cloudflare Email Routing allows you to send emails through Cloudflare Workers. Here's how to set it up:

### Option 1: Using Cloudflare Workers Email API

1. **Enable Email Routing**
   - Go to Cloudflare Dashboard > Email > Email Routing
   - Add your domain if not already added
   - Verify your domain ownership

2. **Create Email Worker**
   - Go to Workers & Pages > Create Application
   - Create a new Worker
   - Use the following code template:

```javascript
export default {
  async email(message, env, ctx) {
    // Forward email to your desired recipient
    await message.forward("your-email@example.com");
  }
}
```

3. **Configure Email Route**
   - Go to Email Routing > Routing Rules
   - Create a new rule
   - Set up the catch-all or specific address
   - Point it to your Worker

4. **Get API Token**
   - Go to My Profile > API Tokens
   - Create a token with Email Routing permissions
   - Add to `.env.local`:
     ```
     CLOUDFLARE_EMAIL_API_TOKEN=your_token
     ```

### Option 2: Using Resend (Recommended for Simplicity)

Resend is already configured as the default email provider. It's easier to set up and works out of the box with 3,000 free emails per month.

To use Resend:
1. Sign up at https://resend.com
2. Get your API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_api_key
   DEFAULT_FROM_EMAIL=onboarding@resend.dev
   ```

## Toggle Between Email Providers

You can toggle between Resend and Cloudflare Email in the Payload CMS admin panel:

1. Go to `/admin`
2. Navigate to Settings (Global)
3. Toggle "Use Cloudflare Email" checkbox
4. If enabled, fill in Cloudflare Email configuration:
   - API Token
   - From Email Address
   - From Name
5. Save settings

## Cloudflare Pages Deployment

### Using Payload's 1-Click Deploy

Payload CMS has built-in Cloudflare Pages integration. To deploy:

1. **Prepare Your Project**
   - Ensure all environment variables are set in Cloudflare Pages dashboard
   - Make sure your `wrangler.toml` is configured

2. **Deploy via Cloudflare Dashboard**
   - Go to Cloudflare Dashboard > Pages
   - Click "Create a project"
   - Connect your Git repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `.next`
   - Add all environment variables from `.env.example`

3. **Using Cloudflare API Token**
   - Your API token is already configured: `UmAJ3JKk2IqT8kr0xcfUkUsMlClhgaXNxDtONXn5`
   - This can be used for automated deployments via CLI or CI/CD

### Manual Deployment with Wrangler

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy .next --project-name=landing-page-portfolio
```

## Environment Variables for Cloudflare Pages

Add these in Cloudflare Pages > Settings > Environment Variables:

- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_PAYLOAD_URL` (your Cloudflare Pages URL)
- `RESEND_API_KEY`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_MODE`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `CLOUDFLARE_API_TOKEN`

## Troubleshooting

### R2 Upload Issues
- Verify your R2 credentials are correct
- Check that the bucket name matches
- Ensure the bucket exists in your Cloudflare account

### Email Not Sending
- Check your email provider settings in Payload admin
- Verify API keys are correct
- Check Cloudflare Email Routing is properly configured (if using)
- For Resend, verify your domain is verified (if using custom domain)

### Deployment Issues
- Ensure all environment variables are set in Cloudflare Pages
- Check build logs for errors
- Verify Node.js version compatibility (Cloudflare Pages supports Node 18+)












