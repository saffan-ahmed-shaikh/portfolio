import "../styles/style.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Safwan Ahmed | Portfolio",
  description: "Portfolio of Safwan Ahmed - Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <Sidebar />
          <div className="main-content">
            {children}
            <Navbar />
          </div>
        </main>
      </body>
    </html>
  );
}
