import { Inter as FontSans } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { cn } from '@/lib/utils'
import Navbar from '@/components/nav/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { FullScreenProvider } from '@/lib/context/FullScreenContext'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'auto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <FullScreenProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="relative flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1 flex-grow">
                <div id="portal-root"></div>
                {children}
                <Toaster position="bottom-right" expand={true} />
              </div>
            </main>
          </ThemeProvider>
        </FullScreenProvider>
      </body>
    </html>
  )
}
