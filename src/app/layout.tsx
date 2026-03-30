import type { Metadata } from 'next';
import { SITE, SOCIAL } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    creator: '@aditya_sankhla_',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    jobTitle: 'CTO',
    worksFor: {
      '@type': 'Organization',
      name: 'WellM',
    },
    sameAs: [SOCIAL.github, SOCIAL.twitter, SOCIAL.linkedin, SOCIAL.medium],
    knowsAbout: [
      'Flutter',
      'Firebase',
      'React',
      'TypeScript',
      'Node.js',
      'AI-Assisted Development',
    ],
  };

  return (
    <html lang="en">
      <body className="scanlines">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
