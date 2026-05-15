<p align="center">
  <img src="./public/logo1.png" alt="MF Logo" width="80" />
</p>

<h1 align="center">Mohamed Fayed — Developer Portfolio</h1>

<p align="center">
  <strong>A premium, dark-themed portfolio built with React 19, GSAP, and the GitHub GraphQL API.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-7B61FF?style=flat-square" />
</p>

---

## ✨ Overview

A modern, single-page portfolio application designed to showcase my frontend projects, technical skills, professional certifications, and live GitHub activity — all in one place. Built from scratch using **React 19** with the **React Compiler**, styled entirely with **CSS Modules** and a custom **Void + Neon** design system, and animated with **GSAP**.

### Who is this for?

- **Recruiters & Hiring Managers** — Quickly evaluate my skills, projects, and certifications.
- **Developers & Collaborators** — See my tech stack, GitHub activity, and pinned repositories.
- **Clients** — Review past work and reach out directly via the contact form.

---

## 📸 Pages

| Page | Description |
|:-----|:------------|
| **Home** | Hero section with orbital animation, profile image, CTA buttons, and scroll-to-transition effect |
| **About** | Two-column layout with profile image, stats, education, daily tools, and bio |
| **Skills** | Filterable skill grid with tab navigation and infinite marquee strip |
| **Projects** | Responsive card grid with live demo & GitHub links for each project |
| **Experience** | Vertical timeline with education and certification milestones |
| **GitHub** | Real-time stats dashboard powered by the GitHub GraphQL API — contribution heatmap, pinned repos, and profile metrics |
| **Certifications** | Card grid showcasing NTI Web Design and MEAN Stack courses |
| **Contact** | Functional contact form integrated with EmailJS for instant messaging |

---

## 🛠️ Tech Stack

### Core

| Technology | Purpose |
|:-----------|:--------|
| [React 19](https://react.dev) | UI library with the React Compiler for optimized renders |
| [Vite 8](https://vite.dev) | Lightning-fast build tool with HMR |
| [React Router 7](https://reactrouter.com) | Client-side routing with lazy-loaded pages |

### Styling & Animation

| Technology | Purpose |
|:-----------|:--------|
| CSS Modules | Scoped, component-level styling with zero class conflicts |
| Custom Design System | 200+ CSS variables (colors, spacing, typography, motion, glows) |
| [GSAP 3.15](https://gsap.com) | Page entry animations, stagger effects, orbital motion |

### Data & Integration

| Technology | Purpose |
|:-----------|:--------|
| [GitHub GraphQL API](https://docs.github.com/en/graphql) | Real-time profile stats, contribution heatmap, pinned repos |
| [Axios](https://axios-http.com) | HTTP client for API requests |
| [EmailJS](https://www.emailjs.com) | Client-side email delivery for the contact form |

### Forms & UI

| Technology | Purpose |
|:-----------|:--------|
| [React Hook Form](https://react-hook-form.com) | Performant form state management and validation |
| [React Icons](https://react-icons.github.io/react-icons) | Feather, Simple Icons, and Font Awesome icon sets |
| [React Toastify](https://fkhadra.github.io/react-toastify) | Toast notifications for user feedback |

---

## 🎨 Design System

The portfolio uses a custom **"Void + Neon"** design system with two themes:

- **Dark Mode** (default) — Deep void backgrounds (`#06060e`) with neon violet (`#7b61ff`) and acid cyan (`#00e5c0`) accents
- **Light Mode** — Clean lavender backgrounds (`#f0eeff`) with adjusted contrast

### Key Design Tokens

```
Fonts:      Space Grotesk (display) · Inter (body) · JetBrains Mono (code)
Primary:    #7b61ff (Neon Violet)
Success:    #00e5c0 (Acid Cyan)
Danger:     #ff5e5b (Hot Coral)
Gold:       #e7c365 (Neon Gold)
```

---

## 📁 Project Structure

```
src/
├── App.jsx                    # Root component (theme, online/offline, welcome screen)
├── main.jsx                   # Entry point with providers
├── index.css                  # Global design system (200+ CSS variables)
│
├── components/
│   ├── ui/
│   │   ├── button/            # MainButton — reusable button/link component
│   │   ├── input/             # MainInput — form input with validation
│   │   └── loading-Spinner/   # Animated loading spinner
│   ├── nav-Bar/               # Responsive navigation bar
│   └── footer/                # Footer component
│
├── context/
│   ├── themeProvider.jsx      # Dark/light theme context
│   └── gitHubProvider.jsx     # GitHub data context (fetches on mount)
│
├── hooks/
│   ├── themeHook.jsx          # useTheme() hook
│   └── gitHubDataHook.jsx     # useGitHubData() hook
│
├── layout/
│   └── pagesContainer.jsx     # Layout wrapper (NavBar + Footer)
│
├── pages/
│   ├── portfolio-pages/
│   │   ├── home/              # Hero landing page
│   │   ├── about/             # About me page
│   │   ├── skills/            # Technical skills grid
│   │   ├── projects/          # Project showcase
│   │   ├── experience/        # Timeline (education + certifications)
│   │   ├── gitHub/            # Live GitHub stats dashboard
│   │   ├── certifications/    # Course certifications
│   │   └── contact/           # Contact form (EmailJS)
│   ├── welcome-page/          # Animated welcome/splash screen
│   ├── loading-page/          # Suspense fallback
│   ├── error-page/            # Error boundary page
│   └── offline-page/          # Network offline page
│
├── router/
│   └── mainRouter.jsx         # React Router config with lazy loading
│
└── services/
    └── getGitHubData.js       # GitHub GraphQL query + data transformation
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Fayed12/new-portfolio.git
cd new-portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory (see `example.env`):

```env
# GitHub Personal Access Token (with read:user scope)
VITE_GITHUB_TOKEN=your_github_token

# EmailJS credentials (for the contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> **How to get a GitHub token:** Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens) and generate a classic token with the `read:user` and `read:org` scopes.

### Development

```bash
npm run dev
```

The app will start at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

This project is optimized for static hosting. Deploy the `dist/` folder to any of:

- **Vercel** — Zero-config deployment with automatic previews
- **Netlify** — Drag-and-drop or Git-based deployment
- **GitHub Pages** — Free hosting for public repos

> **Important:** Set the environment variables in your hosting provider's dashboard.

---

## 🔑 Key Features

### Performance
- **Lazy Loading** — All pages are code-split with `React.lazy()` and `Suspense`
- **React Compiler** — Automatic memoization for optimal re-renders
- **Optimized Images** — Lazy-loaded with `loading="lazy"` attribute

### UX & Animation
- **GSAP Animations** — Staggered entrance effects, orbital motion, scroll transitions
- **Theme Switching** — Dark/Light mode toggle persisted via `sessionStorage`
- **Welcome Screen** — Animated splash screen shown once per session
- **Offline Detection** — Graceful offline fallback page with real-time network status

### SEO
- **Meta Tags** — Open Graph, Twitter Cards, and structured meta descriptions
- **Semantic HTML** — Proper heading hierarchy and ARIA labels
- **Responsive Design** — Mobile-first approach, tested down to 320px

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Engineered for the Void</strong> ⚡ Built by <a href="https://github.com/Fayed12">Mohamed Fayed</a>
</p>
