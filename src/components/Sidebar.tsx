import { Home, ImageIcon, FileText, Code, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Image Forge", href: "/image-forge", icon: ImageIcon },
  { name: "Text Crafter", href: "/text-crafter", icon: FileText },
  { name: "Code Smith", href: "/code-smith", icon: Code },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden glow"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <aside
        className={`
          fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border
          transition-all duration-300 z-40
          ${collapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
          ${collapsed ? "md:w-20" : "w-64"}
        `}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-8 mt-4">
            <h1 className={`font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all ${collapsed ? "md:text-center md:text-xl" : ""}`}>
              {collapsed ? "AG" : "Work Station"}
            </h1>
          </div>

          <nav className="flex-1 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all group
                  ${isActive
                    ? "bg-primary text-primary-foreground glow"
                    : "hover:bg-muted hover:glow"
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={`font-medium transition-opacity ${collapsed ? "md:hidden" : ""}`}>
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className={`pt-4 border-t border-sidebar-border ${collapsed ? "md:text-center" : ""}`}>
            <p className={`text-xs text-muted-foreground ${collapsed ? "md:hidden" : ""}`}>
              Your Friendly AI helper
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
