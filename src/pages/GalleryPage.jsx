import { useCms } from '../context/CmsContext.jsx'

const NAIL_PLACEHOLDERS = ['💅', '✨', '💎', '🌸', '🌿', '🎀', '💜', '🌷', '⭐', '🌺']

export default function GalleryPage() {
  const { t } = useCms()

  const photos = Array.from({ length: 9 }, (_, i) => t(`galeria.foto.${i + 1}`, ''))

  return (
    <main aria-label="Portfólio de trabalhos" className="px-5 sm:px-10 lg:px-16 py-10 lg:py-16 min-h-[calc(100vh-64px)] bg-cream">
      <div className="max-w-5xl mx-auto">

        <span aria-hidden="true" className="gold-badge mb-4 inline-flex">
          {t('galeria.label', 'Portfólio')}
        </span>

        <h1 className="font-display text-[clamp(30px,4.5vw,52px)] font-semibold text-navy tracking-wide mb-3 leading-tight">
          {t('galeria.titulo', 'Os meus trabalhos')}
        </h1>

        <div className="flex items-center gap-3 mb-9">
          <span className="gold-rule" aria-hidden="true" />
          <p className="text-ink-soft text-base max-w-lg leading-relaxed">
            {t('galeria.descricao', 'Alguns dos trabalhos mais recentes — nail art, gel, extensões e muito mais. As fotografias reais serão adicionadas em breve.')}
          </p>
        </div>

        <ul
          aria-label="Fotografias de trabalhos"
          className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5 list-none p-0 m-0"
        >
          {photos.map((src, i) => (
            <li
              key={i}
              className="aspect-[1/1.2] bg-paper rounded-xl2 border border-line overflow-hidden relative group shadow-soft hover:shadow-lift transition-shadow"
            >
              {src ? (
                <img
                  src={src}
                  alt={`Trabalho ${i + 1}`}
                  width="1000"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-2 text-ink-faint"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 14px, rgba(30,58,45,0.025) 14px, rgba(30,58,45,0.025) 28px)',
                  }}
                  aria-label={`Fotografia ${i + 1} — em breve`}
                >
                  <span aria-hidden="true" className="text-3xl opacity-50">{NAIL_PLACEHOLDERS[i % NAIL_PLACEHOLDERS.length]}</span>
                  <span aria-hidden="true" className="text-[10px] font-semibold tracking-[0.12em] uppercase opacity-40">Em breve</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
