import type { Metadata } from "next";
// import { SessionProvider } from "next-auth/react"
import { Geist, Geist_Mono, Poppins } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { Slide, ToastContainer } from 'react-toastify';


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
  display: "swap",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "YourShop",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
        {/* <SessionProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}  // or "system"
        >
          {children}
        </ThemeProvider>
        {/* </SessionProvider> */}

      </body>
    </html>
  );
}