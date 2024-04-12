import "./globals.css"

import Provider from "./_trpc/Provider"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Next.js + TRPC",
  description: "A starter template for Next.js with TRPC",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        <Provider>
          {children}
          </Provider>
      </body>
    </html>
  )
}