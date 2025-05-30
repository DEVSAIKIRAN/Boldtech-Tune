
import { Figtree } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "./(app-components)/Header";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/lib/getSongsByUserId";
import AppSidebar from "./(app-components)/AppSidebar";
import Player from "./(app-components)/Player";

const font = Figtree({subsets : ['latin']})

export const metadata: Metadata = {
  title: "Boldtech-Tune",
  description: "Enjoy listening music with boldtechtune , boldtech gives you every thing",
};
export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={font.className}
      >
        <ToastProvider/>
        <SupabaseProvider>

          <UserProvider>
           <ModalProvider />
        <SidebarProvider defaultOpen className="object-contain">
          <AppSidebar songs={userSongs}/>
          <main className="w-full h-full  bg-gradient-to-b from-sky-900">
          <Header>
            <SpeedInsights/>
        {children}
         </Header>
         <Player/>
        </main>
        </SidebarProvider>
        </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
