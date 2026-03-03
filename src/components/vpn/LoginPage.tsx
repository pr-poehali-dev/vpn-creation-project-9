import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [step, setStep] = useState<"greeting" | "form">("greeting");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = () => {
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/4 via-transparent to-transparent" />

      <div className="relative w-full max-w-sm animate-fade-in">

        {/* Greeting step */}
        {step === "greeting" && (
          <div className="flex flex-col items-center text-center animate-slide-up">
            {/* Badger image */}
            <div className="relative mb-6">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-primary/30 vpn-glow">
                <img
                  src="https://cdn.poehali.dev/projects/0cef6e38-13a1-46bd-9e63-52bad13542ee/files/a2650531-0e97-4d10-99bd-538c7b56145a.jpg"
                  alt="Медоед"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Speech bubble */}
              <div className="absolute -top-3 -right-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Привет, медоед! 👋
              </div>
            </div>

            <h1 className="text-2xl font-semibold mb-2">
              Добро пожаловать<br />
              в <span className="text-primary">MedoedVPN</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Корпоративная защита данных.<br />Войди в свой аккаунт, чтобы начать.
            </p>

            <button
              onClick={handleContinue}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium text-sm py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Войти в аккаунт
              <Icon name="ArrowRight" size={15} />
            </button>

            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Lock" size={10} />
                AES-256
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Icon name="ShieldCheck" size={10} />
                No-Log политика
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Icon name="Zap" size={10} />
                WireGuard
              </div>
            </div>
          </div>
        )}

        {/* Login form step */}
        {step === "form" && (
          <div className="animate-slide-up">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2.5 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-white" />
              </div>
              <span className="font-semibold text-base tracking-wide">
                Medoed<span className="text-muted-foreground font-normal">VPN</span>
              </span>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-base font-semibold mb-1">Вход в систему</h2>
              <p className="text-xs text-muted-foreground mb-5">Введите корпоративные учётные данные</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Корпоративный email</label>
                  <div className="relative">
                    <Icon name="Mail" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={login}
                      onChange={e => setLogin(e.target.value)}
                      placeholder="user@company.ru"
                      className="w-full bg-background border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Пароль</label>
                  <div className="relative">
                    <Icon name="KeyRound" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-background border border-border rounded-lg pl-9 pr-10 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name={showPassword ? "EyeOff" : "Eye"} size={13} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !login || !password}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    loading || !login || !password
                      ? "bg-secondary text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {loading ? (
                    <>
                      <Icon name="Loader" size={14} className="animate-spin" />
                      Проверка...
                    </>
                  ) : (
                    <>
                      <Icon name="LogIn" size={14} />
                      Войти
                    </>
                  )}
                </button>
              </form>
            </div>

            <button
              onClick={() => setStep("greeting")}
              className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              <Icon name="ArrowLeft" size={12} />
              Назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
