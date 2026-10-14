import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  Cormorant_Garamond,
  Noto_Sans_SC,
  Noto_Serif_SC,
} from "next/font/google";
import { cn } from "@/utils/utils";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/components/i18n/i18n-provider";

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-sans",
});
const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-noto-serif",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const SITE_TITLE = "Balcony Journal";
const SITE_DESCRIPTION = "A tactile family plant-care journal — frontend demo";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      suppressHydrationWarning
      className={cn("h-full antialiased", "font-sans", notoSans.variable, notoSerif.variable, cormorant.variable)}
    >
      <body className="paper-grain h-full flex flex-col">
        <I18nProvider initialLocale="en-US">
          {children}
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
