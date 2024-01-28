import { ReactNode } from 'react'

import '~/styles/app.css'
import Image from 'next/image'
import Header from '~/components/ui/Header'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'WKU Filmatrix',
  description:
    'WKU Filmatrix is a database for storing information pertinent to the WKU Film and Journalism department such as location data and their corresponding contracts, vendor data, student and cast, data and much more.'
}

type RootProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
      </head>
      <body className="app-body">
        <Toaster 
          toastOptions={
            {className: "app-toaster"}
          }
        />   
        <Header />
        <main className="app-content">
          {children}
        </main>
        <footer className="app-footer">

        </footer>  
      </body>
    </html>
  )
}
