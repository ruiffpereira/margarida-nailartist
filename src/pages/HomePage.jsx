import { useOutletContext } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { useCms } from "../context/CmsContext.jsx";
import BookingWidget from "../components/BookingWidget.jsx";

/* ── Ícones inline ────────────────────────────────────────────── */
const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* Ramo botânico decorativo — inspirado nas folhas do logótipo */
const LeafDecoration = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 160 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 top-1/2 -translate-y-1/2 w-28 lg:w-38 opacity-[0.08] pointer-events-none select-none"
  >
    {/* Caule principal */}
    <path d="M80 390 C79 300, 81 170, 80 12" stroke="rgb(82,108,70)" strokeWidth="1.8" strokeLinecap="round"/>
    {/* Folhas direita */}
    <path d="M80 68 C110 46, 154 60, 146 90 C138 120, 90 106, 80 68Z" fill="rgb(82,108,70)"/>
    <path d="M80 148 C114 124, 156 140, 148 172 C140 204, 92 188, 80 148Z" fill="rgb(82,108,70)"/>
    <path d="M80 232 C116 208, 158 226, 150 260 C142 294, 94 276, 80 232Z" fill="rgb(82,108,70)"/>
    <path d="M80 315 C112 292, 152 308, 144 340 C136 372, 90 356, 80 315Z" fill="rgb(82,108,70)"/>
    {/* Folhas esquerda */}
    <path d="M80 106 C46 82, 4 98, 12 130 C20 162, 76 146, 80 106Z" fill="rgb(82,108,70)"/>
    <path d="M80 188 C42 164, 2 182, 10 216 C18 250, 76 232, 80 188Z" fill="rgb(82,108,70)"/>
    <path d="M80 272 C40 248, 0 268, 8 304 C16 340, 76 320, 80 272Z" fill="rgb(82,108,70)"/>
    {/* Nervuras direita */}
    <line x1="80" y1="68" x2="146" y2="90" stroke="rgb(82,108,70)" strokeWidth="0.7" opacity="0.35"/>
    <line x1="80" y1="148" x2="148" y2="172" stroke="rgb(82,108,70)" strokeWidth="0.7" opacity="0.35"/>
    <line x1="80" y1="232" x2="150" y2="260" stroke="rgb(82,108,70)" strokeWidth="0.7" opacity="0.35"/>
    <line x1="80" y1="315" x2="144" y2="340" stroke="rgb(82,108,70)" strokeWidth="0.7" opacity="0.35"/>
    {/* Nervuras esquerda */}
    <line x1="80" y1="106" x2="12" y2="130" stroke="rgb(82,108,70)" strokeWidth="0.7" opacity="0.35"/>
    <line x1="80" y1="188" x2="10" y2="216" stroke="rgb(82,108,70)" strokeWidth="0.7" opacity="0.35"/>
    <line x1="80" y1="272" x2="8" y2="304" stroke="rgb(82,108,70)" strokeWidth="0.7" opacity="0.35"/>
    {/* Flor de ouro no topo — como as flores brancas do logótipo */}
    <circle cx="80" cy="12" r="5" fill="rgb(196,156,68)" opacity="0.75"/>
    <circle cx="71" cy="18" r="3" fill="rgb(196,156,68)" opacity="0.45"/>
    <circle cx="89" cy="18" r="3" fill="rgb(196,156,68)" opacity="0.45"/>
    <circle cx="80" cy="24" r="2" fill="rgb(196,156,68)" opacity="0.25"/>
  </svg>
);

/* Ornamento de canto — aro dourado com folhas, eco do logótipo */
const CornerOrnament = () => (
  <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="absolute top-4 left-4 w-20 h-20 opacity-[0.09] pointer-events-none select-none">
    {/* Arcos dourados */}
    <path d="M8 8 Q56 8 56 56" stroke="rgb(196,156,68)" strokeWidth="1" fill="none"/>
    <path d="M8 8 Q8 56 56 56" stroke="rgb(196,156,68)" strokeWidth="1" fill="none"/>
    {/* Folhas na origem */}
    <path d="M8 8 C18 -3, 33 3, 28 16 C23 29, 5 20, 8 8Z" fill="rgb(82,108,70)"/>
    <path d="M8 8 C-3 18, 3 33, 16 28 C29 23, 20 5, 8 8Z" fill="rgb(82,108,70)"/>
    {/* Folhinhas ao longo do aro */}
    <path d="M34 10 C40 3, 52 7, 49 17 C46 27, 32 22, 34 10Z" fill="rgb(82,108,70)" opacity="0.55"/>
    <path d="M10 34 C3 40, 7 52, 17 49 C27 46, 22 32, 10 34Z" fill="rgb(82,108,70)" opacity="0.55"/>
    {/* Ponto dourado na origem e no fim */}
    <circle cx="8" cy="8" r="3" fill="rgb(196,156,68)" opacity="0.9"/>
    <circle cx="56" cy="56" r="4" fill="rgb(196,156,68)" opacity="0.55"/>
  </svg>
);

const SOCIAL_PATHS = {
  Instagram: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.25 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  Facebook:  "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z",
  WhatsApp:  "M17.47 14.38c-.25-.13-1.51-.74-1.74-.83-.23-.09-.4-.13-.57.13-.17.25-.66.83-.81 1-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.36-.78-1.86-.21-.49-.41-.42-.57-.43-.15-.01-.32-.01-.49-.01s-.45.06-.69.32c-.23.25-.9.88-.9 2.15s.92 2.49 1.05 2.66c.13.17 1.81 2.77 4.39 3.88.61.26 1.09.42 1.46.54.61.19 1.17.17 1.61.1.49-.07 1.51-.62 1.72-1.21.21-.59.21-1.1.15-1.21-.06-.11-.23-.17-.48-.3zM12 2a10 10 0 0 0-8.6 15.06L2 22l5.04-1.32A10 10 0 1 0 12 2z",
};

export default function HomePage() {
  const { user } = useAuth();
  const { onRequireLogin } = useOutletContext();
  const { t } = useCms();

  const stats = [
    [t("hero.stat1.valor"), t("hero.stat1.label")],
    [t("hero.stat2.valor"), t("hero.stat2.label")],
    [t("hero.stat3.valor"), t("hero.stat3.label")],
  ];

  const socials = {
    instagram: t("redes.instagram"),
    facebook:  t("redes.facebook"),
    whatsapp:  t("redes.whatsapp"),
  };

  return (
    <main>
      <section
        aria-label="Apresentação e marcação"
        className="grid lg:grid-cols-[1.1fr_1fr] min-h-[calc(100vh-64px)]"
      >
        {/* ── ESQUERDA — apresentação ───────────────────────── */}
        <div className="order-2 lg:order-1 relative flex flex-col justify-center
          px-6 sm:px-10 lg:px-16 py-10 lg:py-0 bg-cream overflow-hidden">

          {/* Padrão de fundo */}
          <div aria-hidden="true" className="absolute inset-0 leaf-grid pointer-events-none" />

          {/* Folha decorativa direita */}
          <LeafDecoration />

          {/* Ornamento de canto */}
          <CornerOrnament />

          <div className="relative max-w-[520px] self-center w-full">

            {/* Badge */}
            <p aria-label={t("hero.badge")} className="gold-badge animate-fadeUp">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-maroon inline-block" />
              {t("hero.badge")}
            </p>

            {/* Heading principal */}
            <div className="flex items-center gap-5 mt-7 mb-5 animate-fadeUp [animation-delay:.06s]">
              <img
                src={t("hero.logo")}
                alt={`${t("hero.titulo")} — logótipo`}
                width="88"
                height="88"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                className="h-[88px] w-[88px] object-contain shrink-0 drop-shadow-sm"
              />
              <div>
                <h1 className="font-display text-[clamp(40px,5.5vw,66px)] font-bold leading-[1] tracking-tight text-navy italic">
                  {t("hero.titulo").split(" ")[0]}
                </h1>
                <p className="text-[clamp(10px,1.1vw,12px)] font-bold tracking-[0.36em] uppercase text-maroon mt-2 not-italic">
                  {t("hero.subtitulo")}
                </p>
              </div>
            </div>

            {/* Linha decorativa + tagline */}
            <div className="flex items-center gap-3 mb-5 animate-fadeUp [animation-delay:.12s]">
              <span className="gold-rule" aria-hidden="true" />
              <p className="text-[clamp(14px,1.5vw,16px)] text-ink-soft leading-relaxed">
                {t("hero.tagline")}
              </p>
            </div>

            {/* Cartão contacto / horário */}
            <address className="not-italic bg-paper border border-line rounded-xl2 p-5 shadow-soft animate-fadeUp [animation-delay:.22s]">
              <div className="flex items-center gap-2.5 mb-4">
                <span aria-hidden="true" className="gold-rule" />
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-ink-faint">
                  Contacto &amp; Horário
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div aria-hidden="true" className="flex items-center gap-1.5 text-ink-faint text-[11px] font-semibold tracking-wider uppercase mb-1.5">
                    <PinIcon /> Morada
                  </div>
                  <p className="text-sm text-ink font-medium leading-snug">
                    {t("contacto.morada1")}<br />
                    {t("contacto.morada2")}
                  </p>
                </div>
                <div>
                  <div aria-hidden="true" className="flex items-center gap-1.5 text-ink-faint text-[11px] font-semibold tracking-wider uppercase mb-1.5">
                    <ClockIcon /> Horário
                  </div>
                  <p className="text-sm text-ink font-medium leading-snug">
                    <time>{t("contacto.horario.dias")}</time><br />
                    <time>{t("contacto.horario.manha")}</time> · <time>{t("contacto.horario.tarde")}</time>
                  </p>
                </div>
              </div>
              <div aria-hidden="true" className="h-px bg-line mb-4" />
              <div className="flex items-center justify-between flex-wrap gap-3">
                <a
                  href={`tel:${t("contacto.telefone.href")}`}
                  aria-label={`Ligar para ${t("contacto.telefone")}`}
                  className="flex items-center gap-1.5 text-navy font-semibold text-sm"
                >
                  <PhoneIcon /> {t("contacto.telefone")}
                </a>
                <div className="flex gap-1.5" role="list" aria-label="Redes sociais">
                  {Object.entries(SOCIAL_PATHS).map(([name, d]) => (
                    <a
                      key={name}
                      role="listitem"
                      href={socials[name.toLowerCase()]}
                      aria-label={`${name} da ${t("hero.titulo")}`}
                      className="w-8 h-8 rounded-lg bg-cream-dark text-ink-soft flex items-center justify-center transition-colors hover:bg-navy hover:text-paper"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d={d} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </address>

            {/* Stats */}
            <dl className="flex gap-8 mt-8 animate-fadeUp [animation-delay:.32s]">
              {stats.map(([n, l], i) => (
                <div key={i}>
                  <dt className="sr-only">{l}</dt>
                  <dd aria-label={`${n} ${l}`}>
                    <span className="font-display text-[28px] font-semibold text-navy tracking-tight gold-text">
                      {n}
                    </span>
                    <span aria-hidden="true" className="block text-[10px] text-ink-faint font-semibold tracking-[0.1em] uppercase mt-0.5">
                      {l.split(" ")[0]}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── DIREITA — widget de marcação ──────────────────── */}
        <div className="order-1 lg:order-2 relative flex flex-col justify-center
          bg-cream-dark px-5 sm:px-10 lg:px-12 py-7 lg:py-12 overflow-hidden">

          {/* Decoração subtil de fundo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 75% 15%, rgba(196,156,68,0.07) 0%, transparent 55%), radial-gradient(circle at 25% 85%, rgba(82,108,70,0.05) 0%, transparent 55%)',
            }}
          />

          <div className="relative w-full max-w-[480px] mx-auto bg-paper border border-line rounded-xl2 p-6 sm:p-7 shadow-lift animate-fadeUp [animation-delay:.1s]">
            {/* Linha dourada decorativa no topo do card */}
            <div aria-hidden="true" className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgb(197,153,58), transparent)' }} />

            <div className="mb-5">
              <div className="flex items-center gap-2.5 mb-2">
                <span aria-hidden="true" className="gold-rule" />
                <span aria-hidden="true" className="text-[10px] font-bold tracking-[0.14em] uppercase text-maroon">
                  Agendar visita
                </span>
              </div>
              <h2 className="font-display text-[clamp(20px,2.5vw,26px)] font-semibold text-navy tracking-wide leading-tight">
                Marca a tua visita
                <br />
                <span className="text-ink-soft font-sans font-normal text-[14px] tracking-normal">
                  em 3 passos simples
                </span>
              </h2>
            </div>

            <BookingWidget user={user} onRequireLogin={onRequireLogin} onBooked={() => {}} />
          </div>
        </div>
      </section>
    </main>
  );
}
