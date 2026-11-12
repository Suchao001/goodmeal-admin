import { Geist, Geist_Mono, Prompt } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

// Thai-capable UI font (Geist has no Thai glyphs)
const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GoodMeal Admin",
  description: "ระบบจัดการ GoodMeal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${prompt.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}