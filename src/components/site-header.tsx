import Link from "next/link";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/#localizacao", label: "Localização" },
  { href: "/os", label: "Portal O.S." },
];

export function SiteHeader({ active }: { active?: "home" | "os" }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B0D13]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
            <i className="fa-solid fa-microchip text-xl text-white"></i>
          </div>
          <span className="font-black text-2xl tracking-tighter text-white">
            SAD <span className="text-cyan-400">TEC</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          {NAV.map((item) => {
            const isActive =
              (active === "home" && item.href === "/") ||
              (active === "os" && item.href === "/os");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-cyan-400"
                    : "hover:text-cyan-400 transition-colors"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
