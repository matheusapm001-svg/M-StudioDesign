# Deploy na Vercel

Este projeto esta pronto para publicar na Vercel.

## Configuracao

- Build command: `node vercel-build.js`
- Output directory: `public`
- Site fonte: `davies-mainfiles/davies`

O build copia o site inteiro para `public`, incluindo `assets/`, imagens, videos, CSS, GSAP, ScrollTrigger, Swiper, Slick e o formulario Formspree.

## Passos

1. Suba esta pasta para um repositorio GitHub.
2. Na Vercel, clique em `Add New Project`.
3. Importe o repositorio.
4. Confirme:
   - Build Command: `node vercel-build.js`
   - Output Directory: `public`
5. Clique em `Deploy`.

O formulario ja esta configurado para:

`https://formspree.io/f/mykqveja`
