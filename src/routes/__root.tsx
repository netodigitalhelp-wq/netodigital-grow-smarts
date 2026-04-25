import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollGlow } from "@/components/ScrollGlow";
import { CursorGlow } from "@/components/CursorGlow";
import { StarsParallax } from "@/components/StarsParallax";
import { ParallaxBlobs } from "@/components/ParallaxBlobs";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "YxS976ozqi0hObB1Tu5VmfSdnudaHTmh7kW9UrALeK0" },
      { title: "NetoDigital" },
      { name: "description", content: "NetoDigital — סוכנות AI & Automation לעסקים קטנים. עובדים דיגיטליים שמטפלים במכירות, שירות ותוכן 24/7." },
      { name: "author", content: "NetoDigital" },
      { name: "keywords", content: "AI אוטומציה, סוכן AI, וואטסאפ בוט, אוטומציה לעסקים, NetoDigital, נטודיגיטל, AI לעסק קטן" },
      { name: "geo.region", content: "IL" },
      { name: "geo.placename", content: "Israel" },
      { property: "og:title", content: "NetoDigital" },
      { property: "og:description", content: "סוכנות AI & Automation לעסקים קטנים. עובדים דיגיטליים שמטפלים במכירות, שירות ותוכן 24/7." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "he_IL" },
      { property: "og:site_name", content: "NetoDigital" },
      { property: "og:url", content: "https://www.netodigital.net" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NetoDigital" },
      { name: "twitter:description", content: "סוכנות AI & Automation לעסקים קטנים. עובדים דיגיטליים שמטפלים במכירות, שירות ותוכן 24/7." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/4JLyKCJp4XXIKb4B8rpJZROrBD83/social-images/social-1777046935868-לוגו_רשמי_של_נטודיגיטל.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/4JLyKCJp4XXIKb4B8rpJZROrBD83/social-images/social-1777046935868-לוגו_רשמי_של_נטודיגיטל.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      },
      {
        rel: "canonical",
        href: "https://www.netodigital.net",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "NetoDigital",
          "alternateName": "נטו דיגיטל",
          "description": "סוכנות שיווק דיגיטלי בוטיק לעסקים קטנים — קידום אורגני, פרסום ממומן, רשתות חברתיות ובניית אתרים.",
          "url": "https://www.netodigital.net",
          "telephone": "+972-52-598-1030",
          "email": "netodigital.help@gmail.com",
          "image": "https://storage.googleapis.com/gpt-engineer-file-uploads/4JLyKCJp4XXIKb4B8rpJZROrBD83/social-images/social-1777046935868-לוגו_רשמי_של_נטודיגיטל.webp",
          "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/4JLyKCJp4XXIKb4B8rpJZROrBD83/social-images/social-1777046935868-לוגו_רשמי_של_נטודיגיטל.webp",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IL"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Israel"
          },
          "priceRange": "₪₪",
          "sameAs": [],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+972-52-598-1030",
            "contactType": "customer service",
            "email": "netodigital.help@gmail.com",
            "availableLanguage": ["Hebrew", "English"]
          }
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <StarsParallax />
      <ParallaxBlobs />
      <ScrollGlow />
      <CursorGlow />
      <Outlet />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
