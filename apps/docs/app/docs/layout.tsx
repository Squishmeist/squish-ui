import { MobileNav } from "@/ui/organisms/mobile-nav";
import { Sidebar } from "@/ui/organisms/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <MobileNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
