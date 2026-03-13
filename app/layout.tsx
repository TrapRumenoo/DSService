import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DSService - Detailing & Pulizie',
  description: 'DSService: car detailing e pulizie professionali.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-[#050507] text-slate-50">{children}</body>
    </html>
  );
}
