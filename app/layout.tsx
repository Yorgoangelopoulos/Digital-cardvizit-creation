import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yorgo Angelopoulos | Exchange Global",
  description: "Yorgo Angelopoulos - Exchange Global dijital kartviziti",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0e84ff" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Yorgo Angelopoulos | Exchange Global" />
        <meta property="og:description" content="Yorgo Angelopoulos - Exchange Global dijital kartviziti" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yorgoangelopoulos.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yorgo Angelopoulos | Exchange Global" />
        <meta name="twitter:description" content="Yorgo Angelopoulos - Exchange Global dijital kartviziti" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
