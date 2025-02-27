import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { DM_Sans } from 'next/font/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from 'next/font/local'


const dmSans = DM_Sans ({
  subsets: ['latin'],
  display: 'swap',
  variable:'--font-dm-sans',
})

const myFont = localFont({
  src: './loos light.otf',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-slate-100">
        <Header />
        
        <main>{children}</main>
        <Footer />
        
        </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
