import { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import { CmsProvider, useCms } from "./context/CmsContext.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthModal from "./components/AuthModal.jsx";
import { Spinner } from "./components/ui.jsx";
import HomePage from "./pages/HomePage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CancelPage from "./pages/CancelPage.jsx";
import PwaInstallBanner from "./components/PwaInstallBanner.jsx";

const SITE_URL = "https://margarida-nails.pt";
const SHARE_IMAGE = `${SITE_URL}/pwa-512x512.png`;

const PAGE_PATHS = {
  home: "/",
  gallery: "/portfolio",
  about: "/sobre",
};

function Seo({ page, titleKey = "seo.titulo", descriptionKey = "seo.descricao", noindex = false }) {
  const { t } = useCms();
  const seoTitle = titleKey ? t(titleKey) : "";
  const seoDescription = descriptionKey ? t(descriptionKey) : "";
  const canonical = page ? `${SITE_URL}${PAGE_PATHS[page]}` : null;

  return (
    <Helmet>
      {seoTitle && <title>{seoTitle}</title>}
      {seoDescription && <meta name="description" content={seoDescription} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}
      {seoTitle && <meta property="og:title" content={seoTitle} />}
      {seoDescription && <meta property="og:description" content={seoDescription} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={SHARE_IMAGE} />
      <meta name="twitter:card" content="summary" />
      {seoTitle && <meta name="twitter:title" content={seoTitle} />}
      {seoDescription && <meta name="twitter:description" content={seoDescription} />}
      <meta name="twitter:image" content={SHARE_IMAGE} />
    </Helmet>
  );
}

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) return undefined;

    const scrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollTop();
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollTop);
    });

    return () => window.cancelAnimationFrame(firstFrame);
  }, [pathname, search]);

  return null;
}

function Layout() {
  const { user, logout } = useAuth();
  const { loading } = useCms();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [resetToken, setResetToken] = useState(() =>
    new URLSearchParams(window.location.search).get("token"),
  );
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (resetToken) {
      setShowAuth(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showAuth ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showAuth]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleLogin(u) {
    setShowAuth(false);
    showToast(`Bem-vinda, ${u.name.split(" ")[0]}!`);
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  if (loading) return <CmsLoading />;

  return (
    <>
      <ScrollToTop />
      <Navbar user={user} onLogin={() => setShowAuth(true)} onLogout={handleLogout} />

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
      >
        {toast && (
          <div className="bg-navy text-paper px-5 py-3 rounded-full text-sm font-medium shadow-soft whitespace-nowrap animate-fadeUp pointer-events-auto">
            {toast}
          </div>
        )}
      </div>

      <PwaInstallBanner />

      {showAuth && (
        <AuthModal
          onClose={() => { setShowAuth(false); setResetToken(null); }}
          onSuccess={handleLogin}
          resetToken={resetToken}
        />
      )}

      <div id="main-content" tabIndex={-1} className="outline-none">
        <Outlet context={{ onRequireLogin: () => setShowAuth(true) }} />
      </div>
    </>
  );
}

function CmsLoading() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 text-center animate-fadeIn"
      >
        <div className="flex items-center gap-3 text-sm font-semibold text-navy">
          <Spinner dark /> A carregar...
        </div>
      </div>
    </main>
  );
}

function ProtectedDashboard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <DashboardPage />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<><Seo page="home" /><HomePage /></>} />
        <Route path="/portfolio" element={<><Seo page="gallery" /><GalleryPage /></>} />
        <Route path="/sobre" element={<><Seo page="about" /><AboutPage /></>} />
        <Route
          path="/dashboard"
          element={
            <>
              <Seo titleKey="hero.titulo" descriptionKey="" noindex />
              <ProtectedDashboard />
            </>
          }
        />
        <Route path="/reset-password" element={<><Seo noindex /><HomePage /></>} />
      </Route>
      <Route
        path="/cancelar/:token"
        element={<><Seo noindex /><CancelPage /></>}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CmsProvider>
        <AppRoutes />
      </CmsProvider>
    </AuthProvider>
  );
}
