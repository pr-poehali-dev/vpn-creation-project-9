import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "connection" | "servers" | "support";

interface Server {
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
  speed: string;
  protocol: string;
  region: string;
}

const servers: Server[] = [
  { country: "Германия", city: "Франкфурт", flag: "🇩🇪", ping: 18, load: 34, speed: "10 Гбит/с", protocol: "WireGuard", region: "Европа" },
  { country: "Нидерланды", city: "Амстердам", flag: "🇳🇱", ping: 22, load: 51, speed: "10 Гбит/с", protocol: "WireGuard", region: "Европа" },
  { country: "Франция", city: "Париж", flag: "🇫🇷", ping: 26, load: 29, speed: "5 Гбит/с", protocol: "OpenVPN", region: "Европа" },
  { country: "США", city: "Нью-Йорк", flag: "🇺🇸", ping: 87, load: 62, speed: "10 Гбит/с", protocol: "WireGuard", region: "Северная Америка" },
  { country: "США", city: "Лос-Анджелес", flag: "🇺🇸", ping: 142, load: 41, speed: "10 Гбит/с", protocol: "WireGuard", region: "Северная Америка" },
  { country: "Канада", city: "Торонто", flag: "🇨🇦", ping: 95, load: 23, speed: "5 Гбит/с", protocol: "OpenVPN", region: "Северная Америка" },
  { country: "Япония", city: "Токио", flag: "🇯🇵", ping: 178, load: 37, speed: "10 Гбит/с", protocol: "WireGuard", region: "Азия" },
  { country: "Сингапур", city: "Сингапур", flag: "🇸🇬", ping: 156, load: 45, speed: "10 Гбит/с", protocol: "WireGuard", region: "Азия" },
  { country: "Великобритания", city: "Лондон", flag: "🇬🇧", ping: 31, load: 58, speed: "5 Гбит/с", protocol: "OpenVPN", region: "Европа" },
  { country: "Швейцария", city: "Цюрих", flag: "🇨🇭", ping: 24, load: 19, speed: "10 Гбит/с", protocol: "WireGuard", region: "Европа" },
  { country: "Австралия", city: "Сидней", flag: "🇦🇺", ping: 241, load: 31, speed: "5 Гбит/с", protocol: "OpenVPN", region: "Океания" },
  { country: "Бразилия", city: "Сан-Паулу", flag: "🇧🇷", ping: 198, load: 27, speed: "5 Гбит/с", protocol: "WireGuard", region: "Южная Америка" },
];

const faqs = [
  {
    q: "Как подключить VPN на корпоративном устройстве?",
    a: "Установите приложение SecureNet VPN, введите корпоративные учётные данные, выберите ближайший сервер и нажмите «Подключить». IT-администратор может настроить автоматическое подключение через MDM."
  },
  {
    q: "Что делать при падении скорости соединения?",
    a: "Переключитесь на сервер с меньшей нагрузкой (столбец «Загрузка»). Протокол WireGuard обеспечивает на 30–50% выше скорость, чем OpenVPN. Перезапустите приложение при нагрузке выше 80%."
  },
  {
    q: "Как добавить новых пользователей в корпоративную лицензию?",
    a: "В разделе «Управление» → «Пользователи» → «Добавить». Укажите корпоративный email — сотрудник получит приглашение с инструкцией по установке."
  },
  {
    q: "Какой протокол выбрать для видеоконференций?",
    a: "WireGuard — оптимален для видеозвонков и потокового видео. OpenVPN подходит для работы с документами и почтой. Выбор протокола доступен в настройках подключения."
  },
  {
    q: "Как настроить Split Tunneling?",
    a: "Настройки → Сеть → Split Tunneling. Добавьте приложения или IP-адреса, которые должны работать без VPN. Удобно для корпоративных принтеров и локальных сервисов."
  },
];

const getLoadColor = (load: number) => {
  if (load < 40) return "text-green-400";
  if (load < 70) return "text-amber-400";
  return "text-red-400";
};

const getPingColor = (ping: number) => {
  if (ping < 50) return "text-green-400";
  if (ping < 120) return "text-amber-400";
  return "text-red-400";
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [connected, setConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [connecting, setConnecting] = useState(false);
  const [regionFilter, setRegionFilter] = useState("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const regions = ["Все", "Европа", "Северная Америка", "Азия", "Океания", "Южная Америка"];
  const filteredServers = regionFilter === "Все" ? servers : servers.filter(s => s.region === regionFilter);

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

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "LayoutDashboard" },
    { id: "connection", label: "Подключение", icon: "Shield" },
    { id: "servers", label: "Серверы", icon: "Server" },
    { id: "support", label: "Справка", icon: "LifeBuoy" },
  ];

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

        {/* HOME */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            {/* Hero */}
            <div className="grid-bg rounded-xl border border-border p-8 md:p-12 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-xs font-mono-vpn text-primary border border-primary/30 bg-primary/8 px-3 py-1 rounded mb-5">
                  <Icon name="Zap" size={10} />
                  КОРПОРАТИВНЫЙ VPN — ENTERPRISE
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold mb-3 leading-tight">
                  Надёжная защита<br />
                  <span className="text-primary">корпоративных данных</span>
                </h1>
                <p className="text-muted-foreground max-w-xl mb-7 leading-relaxed">
                  MedoedVPN обеспечивает шифрование трафика, защиту от утечек и высокую скорость для удалённых команд. Оптимизировано для минимальной задержки и максимальной производительности.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveSection("connection")}
                    className="flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-primary/90 transition-colors"
                  >
                    <Icon name="Shield" size={14} />
                    Подключиться
                  </button>
                  <button
                    onClick={() => setActiveSection("servers")}
                    className="flex items-center gap-2 bg-secondary text-foreground text-sm font-medium px-5 py-2.5 rounded hover:bg-secondary/80 transition-colors border border-border"
                  >
                    <Icon name="Globe" size={14} />
                    Выбрать сервер
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Серверов", value: "48+", icon: "Server", sub: "в 24 странах" },
                { label: "Скорость", value: "10 Гбит/с", icon: "Zap", sub: "максимальный канал" },
                { label: "Задержка", value: "< 20 мс", icon: "Activity", sub: "ближайший узел" },
                { label: "Аптайм", value: "99.97%", icon: "ShieldCheck", sub: "SLA гарантия" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                    <Icon name={stat.icon} size={12} />
                    {stat.label}
                  </div>
                  <div className="text-xl font-semibold font-mono-vpn text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: "Lock",
                  title: "AES-256 шифрование",
                  desc: "Военный стандарт защиты трафика. Ключи обновляются каждые 60 секунд."
                },
                {
                  icon: "Zap",
                  title: "WireGuard протокол",
                  desc: "Новейший VPN-протокол. На 40% быстрее OpenVPN при той же надёжности."
                },
                {
                  icon: "Eye",
                  title: "Политика No-Log",
                  desc: "Мы не храним журналы активности. Аудит пройден независимым экспертом."
                },
                {
                  icon: "GitMerge",
                  title: "Split Tunneling",
                  desc: "Маршрутизация выбранного трафика через VPN. Локальные сервисы работают напрямую."
                },
                {
                  icon: "AlertTriangle",
                  title: "Kill Switch",
                  desc: "При обрыве VPN весь трафик немедленно блокируется. Данные не уйдут в открытую сеть."
                },
                {
                  icon: "Users",
                  title: "Мультиустройство",
                  desc: "До 10 одновременных подключений на одну лицензию. Поддержка MDM для IT-отделов."
                },
              ].map(f => (
                <div key={f.title} className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mb-3">
                    <Icon name={f.icon} size={15} className="text-primary" />
                  </div>
                  <div className="text-sm font-semibold mb-1.5">{f.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONNECTION */}
        {activeSection === "connection" && (
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
        )}

        {/* SERVERS */}
        {activeSection === "servers" && (
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
                  onClick={() => handleSelectServer(server)}
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
        )}

        {/* SUPPORT */}
        {activeSection === "support" && (
          <div className="animate-fade-in max-w-2xl">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-0.5">Справка и поддержка</h2>
              <p className="text-sm text-muted-foreground">Ответы на частые вопросы и контакты</p>
            </div>

            {/* Contacts */}
            <div className="grid md:grid-cols-3 gap-3 mb-7">
              {[
                { icon: "MessageSquare", title: "Чат поддержки", sub: "Ответ за 5 минут", cta: "Открыть чат" },
                { icon: "Mail", title: "Электронная почта", sub: "support@securenet.ru", cta: "Написать" },
                { icon: "Phone", title: "Телефон", sub: "+7 800 000-00-00", cta: "Бесплатно" },
              ].map(c => (
                <div key={c.title} className="bg-card border border-border rounded-lg p-4">
                  <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center mb-3">
                    <Icon name={c.icon} size={13} className="text-primary" />
                  </div>
                  <div className="text-sm font-medium mb-0.5">{c.title}</div>
                  <div className="text-xs text-muted-foreground mb-3">{c.sub}</div>
                  <button className="text-xs text-primary hover:underline">{c.cta} →</button>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Частые вопросы</h3>
              <div className="bg-card border border-border rounded-lg divide-y divide-border">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-secondary/30 transition-colors"
                    >
                      <span className="text-sm font-medium pr-4">{faq.q}</span>
                      <Icon
                        name="ChevronDown"
                        size={15}
                        className={`text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 animate-fade-in">
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SLA */}
            <div className="bg-primary/6 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
              <Icon name="ShieldCheck" size={16} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-medium mb-1">SLA 99.97% — Корпоративная гарантия</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Если аптайм упадёт ниже гарантированного уровня, мы компенсируем время простоя. Мониторинг в реальном времени на <span className="text-primary">status.medoedvpn.ru</span>
                </div>
              </div>
            </div>
          </div>
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