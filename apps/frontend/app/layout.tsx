import "./globals.css";

export const metadata = {
  title: "Pawxy Test Assignment",
  description: "Simple video search engine",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
