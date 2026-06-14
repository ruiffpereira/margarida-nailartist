import { createContext, useContext } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import { useGetContent } from '../servers/booking/hooks/useGetContent.ts'
import { useLanguage } from './LanguageContext.jsx'

const CmsContext = createContext({ t: () => '', loading: true })

export function CmsProvider({ children }) {
  const { currentLang } = useLanguage()

  const { data: cms, isLoading } = useGetContent(
    { locale: currentLang },
    {
      query: {
        refetchInterval: 60_000,
        staleTime: 55_000,
        // Mantém o conteúdo da língua anterior visível enquanto a nova carrega,
        // evitando o flash do ecrã de loading e o remount ao mudar de língua.
        placeholderData: keepPreviousData,
      },
    },
  )

  function t(key) {
    return cms?.[key] ?? ''
  }

  // `isLoading` só é true no primeiro carregamento (sem dados em cache).
  // Em trocas de língua, `cms` mantém os dados anteriores, por isso não bloqueia.
  return (
    <CmsContext.Provider value={{ t, cms: cms ?? {}, loading: isLoading || !cms }}>
      {children}
    </CmsContext.Provider>
  )
}

export function useCms() {
  return useContext(CmsContext)
}
