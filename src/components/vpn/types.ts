export type Section = "home" | "connection" | "servers" | "support";

export interface Server {
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
  speed: string;
  protocol: string;
  region: string;
}

export const servers: Server[] = [
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

export const faqs = [
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

export const getLoadColor = (load: number) => {
  if (load < 40) return "text-green-400";
  if (load < 70) return "text-amber-400";
  return "text-red-400";
};

export const getPingColor = (ping: number) => {
  if (ping < 50) return "text-green-400";
  if (ping < 120) return "text-amber-400";
  return "text-red-400";
};
