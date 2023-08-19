import { ClerkProvider } from "@clerk/nextjs"
import { dark } from '@clerk/themes'
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Threads - Tell your story',
  description: 'A free and open community App',
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }];
}

export default async function RootLayout({ children, params: { lang } }: {
  children: React.ReactNode,
  params: { lang: string | undefined }
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${lang}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang={lang}>
        <body>
          <NextIntlClientProvider locale={lang} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
