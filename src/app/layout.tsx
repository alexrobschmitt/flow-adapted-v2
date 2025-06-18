
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import { ThemeProvider } from "next-themes";

import { CognitiveThemeProvider } from "@/components/cognitive-theme-provider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { APP_CONFIG } from "@/config/app";

import "./globals.css";
import "@/styles/cognitive-profiles.css";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend"
});

export const metadata: Metadata = {
  title: APP_CONFIG.metadata.title,
  description: APP_CONFIG.metadata.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Carregar perfil cognitivo do localStorage
                  const savedProfile = localStorage.getItem('cognitive-profile');
                  const validProfiles = ['default', 'adhd', 'autism', 'dyslexia'];
                  const profile = savedProfile && validProfiles.includes(savedProfile) ? savedProfile : 'default';

                  // Aplicar classes imediatamente
                  const root = document.documentElement;
                  root.classList.remove('cognitive-adhd', 'cognitive-autism', 'cognitive-dyslexia', 'cognitive-default');
                  root.classList.add('cognitive-' + profile);

                  // Aplicar fonte Lexend sempre (padrão do sistema)
                  root.classList.add('dyslexia-font');
                } catch (e) {
                  // Fallback para perfil padrão com fonte Lexend
                  const root = document.documentElement;
                  root.classList.add('cognitive-default');
                  root.classList.add('dyslexia-font');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${lexend.className} min-h-screen antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
          <CognitiveThemeProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </CognitiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
