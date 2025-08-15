import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import ActiveStatus from './components/ActiveStatus';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Voice Messenger',
  description: 'Voice Messenger',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
