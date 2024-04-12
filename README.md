This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Set up Azure
To add the functionality to upload documents to OneDrive, view them in SharePoint, and update their metadata using Next.js and Azure, you can follow these step-by-step instructions:
1. Create an Azure Resource Group:
    - Go to the Azure portal (portal.azure.com).
    - Click on "Resource groups" in the left sidebar.
    - Click on "Add" to create a new resource group.
    - Provide a name for the resource group and select the desired region.
    - Click on "Review + create" and then "Create" to create the resource group.
2. Create an Azure AD App Registration:
    - In the Azure portal, go to "Azure Entity ID".
    - Click on "App registrations" in the left sidebar.
    - Click on "New registration" to create a new app registration.
    - Provide a name for the app and select the supported account types.
    - Set the redirect URI to http://localhost:3000/api/auth/callback/azure (assuming you're running the app locally).
    - Click on "Register" to create the app registration.
3. Configure API Permissions:
    - In the app registration, go to "API permissions" in the left sidebar.
    - Click on "Add a permission" and select "Microsoft Graph".
    - Select "Delegated permissions" and add the following permissions:
    - Files.ReadWrite.All
    - Sites.ReadWrite.All
    - For best results add files to delegate and application permissions.
    - Click on "Grant admin consent" to grant the necessary permissions.
4. Obtain Azure AD App Credentials:
    - In the app registration, go to "Certificates & secrets" in the left sidebar.
    - Click on "New client secret" to create a new secret.
    - Provide a description and select the expiration period.
    - Click on "Add" to create the secret.
    - Copy the value of the generated secret as you'll need it later.
5. Update Next.js Environment Variables:
    - Create a .env.local file in the root of your Next.js project.
    - Add the following environment variables with the values obtained from the Azure AD app registration:
    - AZURE_CLIENT_ID=YOUR_CLIENT_ID
    - AZURE_CLIENT_SECRET=YOUR_CLIENT_SECRET
    - AZURE_TENANT_ID=YOUR_TENANT_ID
    - AZURE_REDIRECT_URI=http://localhost:3000/api/auth/callback/azure