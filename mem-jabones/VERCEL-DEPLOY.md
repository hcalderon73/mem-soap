# MEM Jabones - Guía de Deploy en Vercel

## ⚠️ IMPORTANTE: Configuración del Root Directory

Tu proyecto está en la subcarpeta `mem-jabones/`. En Vercel debes configurar:

### Pasos:

1. **Importar repositorio** en [vercel.com](https://vercel.com)

2. **En la pantalla de configuración, busca:**
   - **Framework Preset**: Selecciona `Next.js`
   - **Root Directory**: Escribe exactamente: `mem-jabones`
   - **Build Command**: Déjalo en blanco (Next.js lo detecta automático)
   - **Output Directory**: Déjalo en blanco

3. **Marca la opción:**
   - ☑️ "Include source files outside of the Root Directory..."

4. **Variables de Entorno** (opcional):
   - `RESEND_API_KEY` = tu_api_key

5. **Click en "Deploy"**

## 📁 Estructura esperada por Vercel

```
repositorio/
├── mem-jabones/          ← Root Directory
│   ├── app/
│   ├── components/
│   ├── package.json      ← Next.js detectado aquí
│   ├── next.config.ts
│   └── ...
└── .gitignore
```

## 🚨 Errores comunes

### "No Next.js version detected"
→ Asegúrate de que **Root Directory** sea `mem-jabones`

### "Can't find package.json"
→ El Root Directory está mal configurado

### "Build failed"
→ Verifica que el Framework Preset sea `Next.js`

## ✅ Verificación

Si todo está correcto, Vercel mostrará:
- Framework: Next.js
- Build Command: `next build`
- Output Directory: `.next`

## 🆘 Si sigue sin funcionar

1. Ve a **Project Settings** → **General**
2. Cambia **Root Directory** a `mem-jabones`
3. Guarda y haz **Redeploy**
