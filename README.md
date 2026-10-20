# SchoolGrowth landing page

Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript. One page, built from Mohit Goyal's design plan, re-themed to the navy / teal / sky blue / beige / white palette.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
```

Node 20.9 or newer. Deploy by importing the repo into Vercel; no settings needed beyond the environment variables below.

## What to replace before launch

Everything editable by a non-developer is in **`src/lib/site.ts`**: brand name, URL, address, email, WhatsApp number, announcement strip, ERP login link, principals' quotes, the three numbers, FAQ. Values in `[square brackets]` are placeholders and show as such on the page until you fill them.

| What | Where |
| --- | --- |
| Final brand name | `site.name` in `src/lib/site.ts` |
| 3 real numbers (shown only when not `null`; the first also feeds "Trusted by …" in the hero) | `site.stats` |
| Principal quotes (first one is shown large, extras as cards) | `site.testimonials` |
| Announcement strip above the menu (or `null` to remove) | `site.announcement` |
| Login link in the menu (hidden while empty) | `site.loginUrl` |
| FAQ, including the pricing and data-safety answers | `site.faqs` |
| ERP module list (menu, modules grid, footer) | `src/lib/modules.ts`, keep it to what the product really does |
| ERP screenshots (2560px, WebP < 200 KB) | `src/components/devices/ErpScreens.tsx`, one `<img>` per screen (instructions at the top of the file) |
| Teacher training photo | `TrainingTile` in `src/components/sections/Problems.tsx` |
| Before/after website pair (with the school's permission) | `src/components/sections/BeforeAfter.tsx` |
| Privacy policy wording | `src/app/privacy/page.tsx` (have it reviewed for the DPDP Act) |

The ERP screens, app screens and the three sample school brands are coded stand-ins so the page looks finished today. Check that every feature the copy promises (fee reminders, online payment, substitutions) matches the real ERP.

## Demo form

`src/app/api/demo/route.ts` validates the request, drops bots (honeypot field), and delivers each lead by:

- **Email** through [Resend](https://resend.com): set `RESEND_API_KEY`, `LEADS_EMAIL_FROM`, `LEADS_EMAIL_TO`.
- **WhatsApp** through the Meta WhatsApp Cloud API: set `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_NOTIFY_TO`, and an approved `WHATSAPP_TEMPLATE` (body with 3 variables: name, school, phone). Without a template, Meta only delivers to a number that messaged you in the last 24 hours.

Copy `.env.example` to `.env.local`. In development the form works with nothing configured (leads are printed to the terminal). In production it returns an error if no channel is configured, so leads are never silently lost.

## How the page is built

```
src/
  app/            layout (fonts, metadata), page, globals.css (design tokens), api/demo, privacy
  lib/site.ts     all editable content and contact details
  hooks/          useSceneProgress (scroll scrubbing), useInView, useMediaQuery
  components/
    devices/      Laptop (CSS 3D), ErpScreens, Phone + app screens
    story/        Stage (desktop pinned scroll story), StoryFlow (mobile and reduced-motion version)
    sections/     Nav (announcement + Modules mega menu), TrustBar, Problems, Modules (role tabs + module grid),
                  GetSeen, BeforeAfter, WhyUs, HowItWorks, Proof, Faq, FinalCta, DemoForm, Footer, FloatingWhatsApp
    ui/           Marker (the highlighter stroke), Reveal, AnchorLink, FitScale, Icons, Logo
```

**The opening story.** On desktop, the hero, the laptop opening, the ERP callouts and the phones are one continuous scroll scene (`Stage.tsx`, about four screens of scroll). Every moment is a line in its `useSceneProgress` callback, so timing is easy to tune: each value is a window of scroll progress from 0 to 1. Phones, tablets, visitors with "reduce motion" switched on, and anyone without JavaScript get `StoryFlow.tsx` instead: the same content as normal sections, with the laptop opening as it scrolls into view. The switch is pure CSS (`.story-pinned` / `.story-flow` in `globals.css`), so there is no flash on load.

**The laptop** is a real 3D object built from CSS planes, with live HTML on its screen. It costs no download, stays sharp at any zoom, and runs smoothly on mid-range Android phones. The design plan suggested React Three Fiber with a GLB model; that remains a drop-in swap inside `Laptop.tsx` once a model and real screenshots exist, but it is not needed to get this look.

**No animation libraries.** Scroll scenes use a small hook (`useSceneProgress`) that eases toward the scroll position each frame and writes styles directly, which gives the scrubbed feel of GSAP ScrollTrigger while keeping native scrolling. Reveals and the highlighter strokes use IntersectionObserver plus CSS transitions. The only runtime dependencies are Next.js and React.

## Design rules (from the plan)

- One idea per screen; headlines of 8 words or fewer; no paragraphs.
- Navy is the only button colour. Sky blue is the highlighter. Signal blue (`accent`) is for dots, glows and small highlights only; use `accent-ink` for small text so it passes contrast.
- Module icons use the six soft tones in `src/lib/modules.ts`, nowhere else.
- The highlighter stroke (`<Marker>`) is used on exactly three headlines: Grow (hero), solve, first.
- "Book a demo" is the only call-to-action label.
- Fonts: Bricolage Grotesque (display) and Figtree (body), served from your own domain by `next/font`. To use Cabinet Grotesk and Satoshi from the plan instead, add their files under `src/fonts/` and switch `layout.tsx` to `next/font/local` with the same CSS variable names.
