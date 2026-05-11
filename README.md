# 🌐 Next template — Nicola Valentini

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/Written%20in-TypeScript-3178C6?logo=typescript)
![Eslint](https://img.shields.io/badge/Checked%20with-ESLint-4b32c2?logo=eslint)
![Prettier](https://img.shields.io/badge/Formatted%20by-Prettier-f8bc45?logo=prettier)
![Husky](https://img.shields.io/badge/Integrated%20with-Husky-brown?logo=husky)

---

A lightweight starter template for **Next.js 16** projects with **TypeScript**, featuring a pre-configured setup for **ESLint**, **Prettier**, **Husky** and **i18n**.

🧾 **Repository**: [https://github.com/NicolaValentini/next-template](https://github.com/NicolaValentini/next-template)

---

## 📄 Licenza

Distributed under the MIT License.
© 2026 — Nicola Valentini

---

## ⚙️ Stack Tecnologico

- [Next.js 16](https://nextjs.org/) — framework React full-stack
- [TypeScript](https://www.typescriptlang.org/) — type safe
- [Eslint](https://www.eslint.org/) — code checker
- [Prettier](https://www.prettier.io/) — code formatter
- [Husky](https://typicode.github.io/husky/) — pre-commit hooks
- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) — automatic generation of `robots.txt` and `sitemap.xml`

---

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` before starting:

```bash
cp .env.example .env.local
```

Then fill in the required values. Never commit `.env.local`.

---

## 🚀 Getting Started

Welcome to this Next.js project!  
To ensure a clean and updated environment before starting development, follow the steps below.

Before proceeding, it's important to remove any leftover dependencies, outdated builds, or corrupted installations.  
Run the following commands in the project root:

```bash
# Remove node_modules folder
rm -rf node_modules

# Remove lock files (depending on the package manager)
rm -f package-lock.json yarn.lock

# Remove the build directory (if present)
rm -rf .next
```

Once the project is cleaned up, reinstall all dependencies using the updated versions.
Depending on your package manager:

```bash
npm install
# or
yarn install
```

After installing the dependencies, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Structure

```
├── app/                    # Next.js app router
│   └── [locale]/           # Locale-based routing
├── components/             # React components
│   ├── feedback/           # Feedback components (errors, empty states)
│   ├── layout/             # Layout components (header, footer)
│   ├── providers/          # Context providers
│   ├── sections/           # Page sections
│   └── ui/                 # Base UI components
├── context/                # React context definitions
│   └── i18n/               # i18n context
├── lib/                    # Core utilities and configuration
│   └── i18n/               # i18n config, types, dictionaries
└── public/                 # Static assets
```

---

## 🗂️ Path Aliases

| Alias          | Points to             | Use for                    |
| -------------- | --------------------- | -------------------------- |
| `@/*`          | `app/*`               | App router files           |
| `@/lib`        | `lib/index.ts`        | Shared utilities and types |
| `@/context`    | `context/index.ts`    | React contexts             |
| `@/components` | `components/index.ts` | React components           |

---

## 🌍 Adding a New Language

Add the locale to `lib/i18n/config.ts`:

```ts
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'it', 'fr'], // 👈 add here
} as const;
```

Create the dictionary in `lib/i18n/dictionaries/fr.ts`:

```ts
export const fr = {
  locale: 'FR',
};
```

Export it from `lib/i18n/dictionaries/index.ts`:

```ts
export * from './fr';
```

---

## Scripts

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| dev                | Run development server               |
| build              | Build for production                 |
| start              | Run locally production build         |
| lint               | Run linter with eslint               |
| lint:staged        | Run linter with eslint pre-commit    |
| format             | Format code with prettier            |
| format:staged      | Format code with prettier pre-commit |
| check-types        | Run typescript compiler              |
| check-types:staged | Run typescript compiler pre-commit   |
| prepare            | Initialize git hooks                 |
| postbuild          | Generate sitemap and robots only CI  |
