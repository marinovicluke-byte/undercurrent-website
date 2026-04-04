// app/layout.js
import './globals.css'

export const metadata = {
  title: 'UnderCurrent',
  description: 'AI Automation for Small Business',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
