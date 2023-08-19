import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import '../../globals.css'
import { dark } from '@clerk/themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Welcome to Threads',
    description: 'A free and open community App',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // <ClerkProvider
        //     appearance={{ baseTheme: dark }}
        // >
        //     <html lang="en">
        //         <body className={`${inter.className} bg-dark-1 flex justify-center items-center min-h-screen`}>{children}</body>
        //     </html>
        // </ClerkProvider>
        <div className={`${inter.className} bg-dark-1 flex justify-center items-center min-h-screen`}>
            {children}
        </div>
    )
}


