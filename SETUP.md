# Payload CMS Integration Setup

This project has been integrated with Payload CMS for managing contact forms, clients, orders, and lead forms.

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   - Copy `env.template` to `.env.local`
   - Fill in all required values (see below)

3. **Set Up Database**
   - Create a PostgreSQL database (recommended: use Neon for free tier)
   - Update `DATABASE_URI` in `.env.local`

4. **Initialize Payload CMS**
   - Run `npm run dev`
   - Visit `http://localhost:3000/admin`
   - Create your first admin user

5. **Configure Email**
   - Sign up for Resend at https://resend.com (free 3,000 emails/month)
   - Get your API key and add to `.env.local`
   - Or configure Cloudflare Email (see CLOUDFLARE_SETUP.md)

6. **Set Up PayPal**
   - Create a PayPal Developer account
   - Create an app to get Client ID and Secret
   - Add to `.env.local`

7. **Configure Cloudflare R2** (for file uploads)
   - See CLOUDFLARE_SETUP.md for detailed instructions

## Required Environment Variables

See `env.template` for all required variables. Key ones:

- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Random secret for Payload (generate with `openssl rand -base64 32`)
- `RESEND_API_KEY` - Resend email API key
- `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` - PayPal credentials
- `R2_*` - Cloudflare R2 credentials for file storage

## Features

### Admin Panel
- Access at `/admin`
- Manage contact form submissions
- Manage clients
- Manage orders
- Manage lead forms (quotes and purchases)
- Toggle between Resend and Cloudflare Email
- Configure email settings

### Forms
- **Purchase Now**: Single-page landing page for $199 (2-day turnaround)
- **Get A Quote**: Request quote for multi-page sites
- Both forms support file uploads (references/designs)

### Payment Processing
- PayPal Checkout integration
- Automatic order creation on payment
- Email confirmations

## API Routes

- `POST /api/contact` - Submit contact form
- `POST /api/lead-form` - Submit quote/purchase form
- `POST /api/upload` - Upload files
- `POST /api/paypal/create-order` - Create PayPal order
- `POST /api/paypal/capture-order` - Capture PayPal payment

## Collections

- **ContactFormSubmissions** - Contact form entries
- **Clients** - Client information
- **Orders** - Purchase and quote orders
- **LeadForms** - Quote and purchase form submissions
- **Settings** - Global settings (email configuration)
- **Media** - Uploaded files (stored in Cloudflare R2)

## Deployment

See CLOUDFLARE_SETUP.md for Cloudflare Pages deployment instructions.

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URI` is correct
- Ensure PostgreSQL is running
- Check firewall/network settings

### Email Not Sending
- Check email provider API keys
- Verify email settings in Payload admin panel
- Check email provider dashboard for errors

### File Upload Issues
- Verify R2 credentials
- Check R2 bucket exists
- Verify bucket permissions

### PayPal Issues
- Ensure PayPal credentials are correct
- Check PayPal mode (sandbox vs live)
- Verify return URLs are correct












