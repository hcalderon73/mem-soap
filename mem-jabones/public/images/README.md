# 📁 Estructura de Imágenes

Coloca tus imágenes en esta carpeta siguiendo esta estructura:

```
public/
└── images/
    ├── products/          # Imágenes de productos
    │   ├── lavanda.jpg
    │   ├── miel.jpg
    │   ├── aloe-vera.jpg
    │   ├── rosas.jpg
    │   ├── carbon.jpg
    │   └── avena.jpg
    │
    ├── hero/              # Imágenes de la página principal
    │   └── hero-bg.jpg
    │
    ├── about/             # Imágenes de la página "Nosotros"
    │   └── team.jpg
    │
    └── logo.png           # Logo de MEM
```

## 🖼️ Formatos Recomendados

- **Productos**: JPG o WebP (mejor compresión)
- **Tamaño sugerido**: 800x800px para productos
- **Tamaño hero**: 1920x1080px
- **Optimización**: Usa [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/)

## 📝 Cómo Usar en el Código

### En componentes React:
```tsx
<img src="/images/products/lavanda.jpg" alt="Jabón de Lavanda" />
```

### Con Next.js Image (si desactivas static export):
```tsx
import Image from 'next/image';

<Image 
  src="/images/products/lavanda.jpg" 
  alt="Jabón de Lavanda"
  width={400}
  height={400}
/>
```

## 🚀 Después de agregar imágenes

1. Copia tus imágenes a la carpeta correspondiente
2. Rebuild el proyecto: `npm run build`
3. Las imágenes se copiarán automáticamente a `dist/`

## 📋 Lista de Verificación

- [ ] 6 imágenes de productos (lavanda, miel, aloe-vera, rosas, carbon, avena)
- [ ] 1 imagen hero para la página principal (opcional)
- [ ] 1-2 imágenes para página "Nosotros" (opcional)
- [ ] Logo de MEM (opcional)

Las imágenes deben tener **nombres descriptivos y sin espacios**.
