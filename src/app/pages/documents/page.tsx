"use client"

import DocumentList from "@/app/_components/document-list/document-list"
import Header from "@/app/_components/header/header"
import { Configuration, PublicClientApplication } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"

const msalConfig: Configuration = {
  auth: {
    clientId: String(process.env.AZURE_CLIENT_ID),
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
  },
}


const msalInstance = new PublicClientApplication(msalConfig)

export default function Documents() {
  
    return (
      <>
          <MsalProvider instance={msalInstance}>
            <DocumentList />
          </MsalProvider>
      </>
    )
}


// import { SessionProvider } from "next-auth/react"
// import "./globals.css"

// import Provider from "./_trpc/Provider"
// import { Metadata } from "next"


// const msalConfig: Configuration = {
//   auth: {
//     clientId: String(process.env.AZURE_CLIENT_ID),
//     authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
//   },
// }

// const msalInstance = new PublicClientApplication(msalConfig)

// export const metadata: Metadata = {
//   title: "Next.js + TRPC",
//   description: "A starter template for Next.js with TRPC",
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>

//         <Provider>
//           <MsalProvider instance={msalInstance}>{children}</MsalProvider>
//           </Provider>
//         </SessionProvider> 
//       </body>
//     </html>
//   )
// }