import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, Server, servers } from "@/components/vpn/types";
import HomeSection from "@/components/vpn/HomeSection";
import ConnectionSection from "@/components/vpn/ConnectionSection";
import ServersSection from "@/components/vpn/ServersSection";
import SupportSection from "@/components/vpn/SupportSection";

const navItems: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "LayoutDashboard" },
  { id: "connection", label: "Подключение", icon: "Shield" },
  { id: "servers", label: "Серверы", icon: "Server" },
  { id: "support", label: "Справка", icon: "LifeBuoy" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [connected, setConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    if (connected) {
      setConnected(false);
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2200);
  };

  const handleSelectServer = (server: Server) => {
    setSelectedServer(server);
    setActiveSection("connection");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <Icon name="Shield" size={14} className="text-white" />
            </div>
            <span className="font-semibold text-sm tracking-wide">Medoed<span className="text-muted-foreground font-normal">VPN</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs font-mono-vpn px-2.5 py-1 rounded border ${
              connected
                ? "border-green-500/30 bg-green-500/8 text-green-400"
                : "border-border text-muted-foreground"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-400 status-dot-active" : "bg-muted-foreground"}`} />
              {connected ? "ЗАЩИТА" : "ОТКЛ."}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="md:hidden flex border-b border-border overflow-x-auto">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-2 text-xs transition-colors min-w-0 ${
              activeSection === item.id ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
            }`}
          >
            <Icon name={item.icon} size={16} />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        {activeSection === "home" && (
          <HomeSection setActiveSection={setActiveSection} />
        )}
        {activeSection === "connection" && (
          <ConnectionSection
            connected={connected}
            connecting={connecting}
            selectedServer={selectedServer}
            handleConnect={handleConnect}
            setActiveSection={setActiveSection}
          />
        )}
        {activeSection === "servers" && (
          <ServersSection
            selectedServer={selectedServer}
            onSelectServer={handleSelectServer}
          />
        )}
        {activeSection === "support" && (
          <SupportSection />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={11} />
            <span>MedoedVPN © 2024 — Корпоративная лицензия</span>
          </div>
          <div className="text-xs text-muted-foreground font-mono-vpn">v4.2.1 • TLS 1.3 • AES-256-GCM</div>
        </div>
      </footer>
    </div>
  );
}
