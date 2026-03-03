import { useState } from "react";
import { Server, servers, getLoadColor, getPingColor } from "./types";

interface ServersSectionProps {
  selectedServer: Server;
  onSelectServer: (server: Server) => void;
}

const regions = ["Все", "Европа", "Северная Америка", "Азия", "Океания", "Южная Америка"];

export default function ServersSection({ selectedServer, onSelectServer }: ServersSectionProps) {
  const [regionFilter, setRegionFilter] = useState("Все");

  const filteredServers = regionFilter === "Все" ? servers : servers.filter(s => s.region === regionFilter);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-0.5">Серверы</h2>
          <p className="text-sm text-muted-foreground">{servers.length} серверов в {regions.length - 1} регионах</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setRegionFilter(r)}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                regionFilter === r
                  ? "bg-primary border-primary text-white"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 px-4 py-2.5 border-b border-border text-xs text-muted-foreground font-medium">
          <div className="col-span-2">Сервер</div>
          <div>Задержка</div>
          <div>Нагрузка</div>
          <div>Протокол</div>
        </div>
        {filteredServers.map((server, i) => (
          <button
            key={i}
            onClick={() => onSelectServer(server)}
            className={`w-full grid grid-cols-5 px-4 py-3 border-b border-border/50 last:border-0 text-sm hover:bg-secondary/50 transition-colors text-left group ${
              selectedServer.city === server.city && selectedServer.country === server.country
                ? "bg-primary/6 border-l-2 border-l-primary"
                : ""
            }`}
          >
            <div className="col-span-2 flex items-center gap-2.5">
              <span className="text-base">{server.flag}</span>
              <div>
                <div className="font-medium text-xs">{server.country}</div>
                <div className="text-muted-foreground text-xs">{server.city}</div>
              </div>
            </div>
            <div className={`font-mono-vpn text-xs self-center ${getPingColor(server.ping)}`}>
              {server.ping} мс
            </div>
            <div className="self-center">
              <div className="flex items-center gap-1.5">
                <div className="w-12 h-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      server.load < 40 ? "bg-green-400" : server.load < 70 ? "bg-amber-400" : "bg-red-400"
                    }`}
                    style={{ width: `${server.load}%` }}
                  />
                </div>
                <span className={`text-xs font-mono-vpn ${getLoadColor(server.load)}`}>{server.load}%</span>
              </div>
            </div>
            <div className="self-center">
              <span className={`text-xs font-mono-vpn ${
                server.protocol === "WireGuard" ? "text-primary" : "text-muted-foreground"
              }`}>
                {server.protocol}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" /> Низкая нагрузка &lt;40%</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Средняя 40–70%</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" /> Высокая &gt;70%</div>
      </div>
    </div>
  );
}
