import { useState } from "react";
import Icon from "@/components/ui/icon";
import { faqs } from "./types";

export default function SupportSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
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
  );
}
