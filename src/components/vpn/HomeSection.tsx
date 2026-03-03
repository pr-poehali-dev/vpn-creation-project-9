import Icon from "@/components/ui/icon";
import { Section } from "./types";

interface HomeSectionProps {
  setActiveSection: (section: Section) => void;
}

export default function HomeSection({ setActiveSection }: HomeSectionProps) {
  return (
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
  );
}
