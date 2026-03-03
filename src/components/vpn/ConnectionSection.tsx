import Icon from "@/components/ui/icon";
import { Server, Section, getLoadColor, getPingColor } from "./types";

interface ConnectionSectionProps {
  connected: boolean;
  connecting: boolean;
  selectedServer: Server;
  handleConnect: () => void;
  setActiveSection: (section: Section) => void;
}

export default function ConnectionSection({
  connected,
  connecting,
  selectedServer,
  handleConnect,
  setActiveSection,
}: ConnectionSectionProps) {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-0.5">Управление подключением</h2>
        <p className="text-sm text-muted-foreground">Статус соединения и активный сервер</p>
      </div>

      {/* Connection Card */}
      <div className={`rounded-xl border p-8 text-center mb-5 transition-all duration-500 ${
        connected
          ? "border-green-500/40 bg-green-500/5 vpn-glow-green"
          : "border-border bg-card"
      }`}>
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
            connected
              ? "border-green-400/60 bg-green-500/10"
              : connecting
                ? "border-primary/50 bg-primary/5 animate-pulse-slow"
                : "border-border bg-secondary"
          }`}>
            <Icon
              name={connected ? "ShieldCheck" : connecting ? "Loader" : "ShieldOff"}
              size={36}
              className={connected ? "text-green-400" : connecting ? "text-primary animate-spin" : "text-muted-foreground"}
            />
          </div>
        </div>

        <div className="mb-1">
          <span className={`text-2xl font-semibold font-mono-vpn ${
            connected ? "text-green-400" : connecting ? "text-primary" : "text-muted-foreground"
          }`}>
            {connected ? "ЗАЩИЩЕНО" : connecting ? "ПОДКЛЮЧЕНИЕ..." : "НЕ ПОДКЛЮЧЕНО"}
          </span>
        </div>

        {connected && (
          <div className="text-sm text-muted-foreground mb-4 font-mono-vpn">
            {selectedServer.flag} {selectedServer.country}, {selectedServer.city}
          </div>
        )}

        <button
          onClick={handleConnect}
          disabled={connecting}
          className={`mt-4 px-10 py-2.5 rounded font-medium text-sm transition-all duration-200 ${
            connected
              ? "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25"
              : connecting
                ? "bg-secondary text-muted-foreground border border-border cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {connected ? "Отключить" : connecting ? "Подключение..." : "Подключить"}
        </button>
      </div>

      {/* Server info */}
      <div className="bg-card border border-border rounded-lg divide-y divide-border mb-5">
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Сервер</span>
          <span className="text-sm font-medium font-mono-vpn">
            {selectedServer.flag} {selectedServer.city}, {selectedServer.country}
          </span>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Протокол</span>
          <span className="text-sm font-mono-vpn text-primary">{selectedServer.protocol}</span>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Задержка</span>
          <span className={`text-sm font-mono-vpn ${getPingColor(selectedServer.ping)}`}>{selectedServer.ping} мс</span>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Нагрузка</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  selectedServer.load < 40 ? "bg-green-400" : selectedServer.load < 70 ? "bg-amber-400" : "bg-red-400"
                }`}
                style={{ width: `${selectedServer.load}%` }}
              />
            </div>
            <span className={`text-sm font-mono-vpn ${getLoadColor(selectedServer.load)}`}>{selectedServer.load}%</span>
          </div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Скорость канала</span>
          <span className="text-sm font-mono-vpn text-foreground">{selectedServer.speed}</span>
        </div>
      </div>

      <button
        onClick={() => setActiveSection("servers")}
        className="w-full flex items-center justify-center gap-2 bg-secondary text-foreground text-sm py-2.5 rounded border border-border hover:bg-secondary/80 transition-colors"
      >
        <Icon name="RefreshCw" size={13} />
        Сменить сервер
      </button>
    </div>
  );
}
