# MEM - Jabones Artesanales

Sitio web para marca de jabones artesanales MEM, construido con Next.js 16, TypeScript, Tailwind CSS v4 y multiidioma.

## Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Iconos:** Lucide React
- **Email:** Resend API
- **i18n:** next-intl
- **Deploy:** Vercel

## Estructura del Proyecto

```
mem-jabones/
├── app/
│   ├── [locale]/          # Rutas con soporte multiidioma
│   ├── api/contact/       # Endpoint para emails
│   └── globals.css        # Estilos globales
├── components/
│   ├── layout/            # Header, Footer, LanguageSwitcher
│   ├── sections/          # Secciones de página
│   ├── product/           # Componentes de producto
│   └── ui/                # Componentes reutilizables
├── lib/
│   └── i18n/              # Configuración i18n y mensajes
└── public/
    └── images/            # Imágenes estáticas
```

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Variables de Entorno

Crear archivo `.env.local`:

```
RESEND_API_KEY=tu_api_key
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```
