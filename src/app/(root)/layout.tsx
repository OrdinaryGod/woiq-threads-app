import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import { Inter } from 'next/font/google'
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";
import { Suspense } from 'react';
import Loading from '@/components/shared/loading';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Threads - Tell your story',
  description: 'A free and open community App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <TopBar />

          <main className='flex'>

            <LeftSideBar />

            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </div>
            </section>

            <RightSideBar />

          </main>

          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  )
}
