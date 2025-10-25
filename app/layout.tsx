import './globals.css';
import type { Metadata } from 'next';
import { Inter, Orbitron, Space_Grotesk } from 'next/font/google';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'TACTICAL VOID',
  description: 'Intelligence Terminal Foundation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${orbitron.variable} ${spaceGrotesk.variable} h-full overflow-hidden`}>
        <ErrorBoundary>
          <div className="h-full w-full">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
