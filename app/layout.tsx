import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

export const metadata: Metadata = {
  title: {
    default: "Tabela da Copa | Copa do Mundo FIFA 2026",
    template: "%s | Tabela da Copa",
  },
  description:
    "Tabela completa, jogos, resultados ao vivo, escalações e simulações da Copa do Mundo FIFA 2026. Design retrô, dados atualizados e navegação elegante.",
  keywords: ["Copa do Mundo 2026", "FIFA 2026", "tabela", "jogos", "resultados", "simulador", "futebol"],
  openGraph: {
    title: "Tabela da Copa | Copa do Mundo FIFA 2026",
    description: "Acompanhe a Copa 2026 com estilo retrô: tabelas, jogos, resultados ao vivo e simulações.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabela da Copa | Copa do Mundo FIFA 2026",
    description: "Acompanhe a Copa 2026 com estilo retrô: tabelas, jogos, resultados ao vivo e simulações.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${courier.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-mono">
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
