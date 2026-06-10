import { useState, useEffect } from "react";
import { usePwaInstall } from "../hooks/usePwaInstall.js";
import { useCms } from "../context/CmsContext.jsx";

const DISMISSED_KEY = "mgn_banner_dismissed_until";

export default function PwaInstallBanner() {
  const pwa = usePwaInstall();
  const { t } = useCms();
  const [visible, setVisible] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (!pwa.show) return;
    const until = localStorage.getItem(DISMISSED_KEY);
    if (until && Date.now() < Number(until)) return;
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [pwa.show]);

  const dismiss = () => {
    setVisible(false);
    setHint(false);
    localStorage.setItem(DISMISSED_KEY, Date.now() + 7 * 24 * 60 * 60 * 1000);
  };

  const handleInstall = async () => {
    if (pwa.isIos || !pwa.ready) { setHint((v) => !v); return; }
    await pwa.install();
    setVisible(false);
  };

  if (!visible || !pwa.show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[9998] flex justify-center pointer-events-none lg:bottom-4">
      <div className="bg-navy text-paper rounded-2xl shadow-soft px-5 py-4 w-full max-w-sm pointer-events-auto border border-navy/20">
        <div className="flex items-center gap-3">
          <img
            src={t("hero.logo")}
            alt="Margarida Nail Artist"
            width="40" height="40"
            loading="lazy" decoding="async"
            className="h-10 w-10 rounded-xl object-contain flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold leading-tight">Instalar a App</p>
            <p className="text-[11px] text-paper/70 mt-0.5 leading-tight">Acesso rápido, sem abrir o browser.</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleInstall}
              aria-expanded={pwa.isIos || !pwa.ready ? hint : undefined}
              className="bg-maroon text-paper text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              {pwa.isIos ? "Como?" : "Instalar"}
            </button>
            <button onClick={dismiss} aria-label="Fechar" className="text-paper/50 hover:text-paper text-lg leading-none px-1">
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>

        {hint && (
          <p className="text-[12px] text-paper/80 mt-3 leading-relaxed border-t border-paper/10 pt-3">
            {pwa.isIos ? (
              <>No Safari, toca em <strong className="text-paper">Partilhar</strong> ⎙ e depois em <strong className="text-paper">"Adicionar ao ecrã inicial"</strong>.</>
            ) : (
              <>Abre este site no <strong className="text-paper">Google Chrome</strong> e volta a tentar — o Chrome permite instalar a app directamente.</>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
