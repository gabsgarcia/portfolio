# Lab de movimento: como cada efeito funciona

Página: `/lab` (PT) e `/en/lab` (EN). Código em `components/lab/`. Textos em `lib/lab.ts`.

Tudo aqui usa bibliotecas gratuitas: GSAP (100% grátis, inclusive os plugins), Three.js e React Three Fiber.

## 01 · Torra (rolagem com parallax) — `CafeScroll.tsx`

1. **Pin + scrub.** `ScrollTrigger` com `pin: true` prende a seção. `scrub: 0.6` faz a rolagem
   controlar a timeline (o 0.6 dá um pequeno atraso, que deixa o movimento com "peso").
   `end: "+=260%"` quer dizer que a cena dura 2,6 telas de rolagem.
2. **Uma timeline só.** Tudo começa no tempo 0 e dura 3 "unidades". Os textos entram em 0.2, 1.1 e 2.0.
   Pensar em unidades (e não em pixels) deixa fácil mudar a duração da cena depois.
3. **Parallax por profundidade.** Cada grão tem `depth` (0 = longe, 1 = perto). A mesma variável define
   tamanho, desfoque e quanto ele anda. É isso que dá a sensação de 3D sem 3D.
4. **Animar variáveis CSS.** O GSAP anima `--torra-bg` e `--torra-ink`. Passar por caramelo no meio evita
   um cinza sem graça entre o creme e o café.
5. **Só `transform` e `opacity` nos elementos que se movem.** Não mexem no layout, então rodam lisos no celular.
6. **Movimento reduzido.** `gsap.matchMedia()` só cria a animação com `prefers-reduced-motion: no-preference`.
   Sem isso, o CSS mostra a composição final parada. A classe `is-animated` só existe no modo animado.
7. **`useGSAP`** (de `@gsap/react`) limpa tudo sozinho quando o componente sai da tela, sem vazar ScrollTriggers.

Versão barata para cliente pequeno: tire o `pin` e deixe só os grãos se movendo com `scrub`.

## 02 · Gema 3D — `GemStage.tsx` + `GemScene.tsx`

1. **Geometria no código.** `LatheGeometry(PROFILE, 8)` gira um perfil 2D em 8 lados, como um torno.
   O perfil vai da ponta de baixo até a mesa de cima. Mude os pontos para outra lapidação.
2. **Facetas.** `flatShading` deixa cada face com uma cor só, como pedra lapidada.
3. **Reflexo sem arquivo.** `RoomEnvironment` + `PMREMGenerator` criam um "estúdio de fotos" dentro do navegador.
   É ele que faz o brilho branco nas facetas. Não baixa nenhum `.hdr`.
4. **Damping.** `lerp(atual, alvo, 1 - exp(-delta * 4))` move uma fração do caminho a cada quadro.
   Fica suave em qualquer taxa de quadros (60 Hz ou 120 Hz).
5. **Performance.**
   - `next/dynamic` com `ssr: false` + `IntersectionObserver` com `rootMargin: 400px`: o Three.js só baixa perto da seção.
   - `frameloop="never"` quando a seção sai da tela: a GPU descansa.
   - `dpr={[1, 1.75]}`: não renderiza em 3x em celulares com tela muito densa.
6. **Movimento reduzido.** `frameloop="demand"` desenha um quadro só e a gema fica parada.
7. **Sem WebGL.** Aparece uma gema em CSS (`clip-path` + `conic-gradient`).
8. **Toque.** `touch-action: pan-y` no canvas deixa o dedo rolar a página normalmente.

Para um produto real: modele no Blender (grátis), exporte `.glb`, comprima com `gltf-transform`
e carregue com `useGLTF` do `@react-three/drei` no lugar do `<mesh>`.

## Checklist antes de entregar um hero assim

- [ ] Testado em celular de verdade (Android médio, não só iPhone novo).
- [ ] Com "reduzir movimento" ligado, tudo continua legível.
- [ ] O texto principal existe no HTML (Google e leitor de tela leem sem JS).
- [ ] Lighthouse no celular: o JS pesado não está no primeiro carregamento.
- [ ] O cliente sabe que é mais caro de manter e por quê.
