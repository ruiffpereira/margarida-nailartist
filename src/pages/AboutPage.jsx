import { useCms } from "../context/CmsContext.jsx";

export default function AboutPage() {
  const { t } = useCms();

  const especialidades = [
    t("sobre.especialidade.1", "Manicure"),
    t("sobre.especialidade.2", "Pedicure"),
    t("sobre.especialidade.3", "Gel & Shellac"),
    t("sobre.especialidade.4", "Nail Art"),
    t("sobre.especialidade.5", "Extensões"),
    t("sobre.especialidade.6", "Spa de Mãos"),
  ].filter(Boolean);

  return (
    <main
      aria-label="Sobre a Margarida Nail Artist"
      className="px-5 sm:px-10 lg:px-16 py-10 lg:py-16 min-h-[calc(100vh-64px)] bg-cream"
    >
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Foto */}
        <div className="relative">
          {/* Moldura decorativa deslocada */}
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 w-full h-full rounded-xl2 border-2 border-maroon/25 pointer-events-none"
          />
          <div
            className="aspect-[4/5] bg-paper rounded-xl2 border border-line relative overflow-hidden shadow-lift"
            style={{
              backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 16px, rgba(30,58,45,0.025) 16px, rgba(30,58,45,0.025) 32px)',
            }}
          >
            <img
              src={t("sobre.foto")}
              alt={t("hero.titulo", "Margarida")}
              width="800"
              height="1000"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <div style={{ display: "none" }} className="flex flex-col items-center justify-center gap-3 absolute inset-0">
              <img
                src={t("hero.logo", "/logo.png")}
                alt={t("hero.titulo", "Margarida")}
                width="128"
                height="128"
                loading="lazy"
                decoding="async"
                className="w-32 h-32 object-contain opacity-80"
              />
              <span aria-hidden="true" className="text-[11px] text-ink-faint tracking-[0.15em] uppercase">
                Foto da Margarida
              </span>
            </div>
          </div>
        </div>

        {/* Texto */}
        <article>
          <span aria-hidden="true" className="forest-badge mb-4 inline-flex">
            {t("sobre.label", "Nail Artist")}
          </span>

          <h1 className="font-display text-[clamp(26px,4vw,42px)] font-semibold text-navy tracking-wide mb-2 leading-tight">
            {t("sobre.titulo", "Olá, sou a Margarida")}
          </h1>

          <div className="flex items-center gap-3 mb-5">
            <span className="gold-rule" aria-hidden="true" />
          </div>

          <p className="text-ink-soft text-[15px] leading-relaxed mb-3.5">
            {t("sobre.corpo1", "Nail artist apaixonada pela arte e pelo cuidado das unhas. Cada detalhe conta — da escolha da cor ao acabamento final.")}
          </p>
          <p className="text-ink-soft text-[15px] leading-relaxed mb-7">
            {t("sobre.corpo2", "Com anos de experiência em manicure, pedicure, gel e nail art, o meu objectivo é que saias sempre com um sorriso e umas unhas perfeitas.")}
          </p>

          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">
            Especialidades
          </p>
          <ul aria-label="Especialidades" className="flex gap-2.5 flex-wrap list-none p-0 m-0">
            {especialidades.map((esp) => (
              <li key={esp}
                className="px-3.5 py-1.5 rounded-full bg-navy/[0.07] border border-navy/12 text-navy text-xs font-semibold">
                {esp}
              </li>
            ))}
          </ul>
        </article>

      </div>
    </main>
  );
}
