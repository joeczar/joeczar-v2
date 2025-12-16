# joeczar-v2 Implementation Plan

This plan outlines atomic commits for building the foundation stack. Each commit should be small, focused, and result in a working (or at least buildable) state.

---

## Phase 1: Project Initialization ✅ COMPLETE

### Commit 1: Initialize Nuxt 3 project ✅
- `6478046` - chore: initialize Nuxt 3 project with content module
- Scaffolded with @nuxt/content, fonts, image, icons
- **Note:** pnpm 10 blocks native builds by default. Added `pnpm.onlyBuiltDependencies` to package.json

**Verification:** ✅ `pnpm dev` starts without errors

---

### Commit 2: Add TresJS and Three.js dependencies ✅
- `0f57e54` - feat: add TresJS and Three.js dependencies

**Verification:** ✅ `pnpm dev` starts, no module errors

---

### Commit 3: Add Tailwind CSS ✅
- `736b0ce` - feat: add Tailwind CSS with custom theme
- Custom palette: void, smoke, ash, silver, bone
- Accent colors: ember (music), signal (work), pulse (code)

**Verification:** ✅ Tailwind classes work in components

---

### Commit 4: Add VueUse core utilities ✅
- `3330585` - chore: add @vueuse/core utilities

**Verification:** ✅ Package installs without conflicts

---

### Commit 5: Configure base CSS and fonts ✅
- `3c69706` - feat: add base CSS and font configuration
- **Note:** Nuxt 4 with `compatibilityVersion: 4` uses `app/` as source root
- Assets must go in `app/assets/`, not root `assets/`

**Verification:** ✅ Page renders with dark background and correct fonts

---

## Phase 2: Shared Components & Utilities

### Commit 6: Add useMouse3D composable
Create `composables/useMouse3D.ts`:
- Track mouse position normalized to -1 to 1
- Smooth interpolation with requestAnimationFrame
- Cleanup on unmount

```bash
git add .
git commit -m "feat: add useMouse3D composable for 3D mouse tracking"
```

**Verification:** Can import and use in a test component

---

### Commit 7: Add SocialLinks component
Create `components/SocialLinks.vue`:
- GitHub, LinkedIn, CV links
- Size prop (sm/md)
- Hover effects

```bash
git add .
git commit -m "feat: add SocialLinks component"
```

**Verification:** Component renders with working links

---

### Commit 8: Add EntryPoints component
Create `components/EntryPoints.vue`:
- Music, Work, Code entry points
- Hover state with color changes (using inline styles for dynamic colors)
- Emits hover event

```bash
git add .
git commit -m "feat: add EntryPoints component with hover states"
```

**Verification:** Hover effects work, colors change correctly

---

## Phase 3: Index Page (Concept Selector)

### Commit 9: Create index page with concept navigation
Create `pages/index.vue`:
- Grid of concept cards
- Links to /concepts/canvas, /concepts/glitch, etc.
- Minimal styling

```bash
git add .
git commit -m "feat: add index page with concept navigation"
```

**Verification:** Index page loads, cards link to concept routes

---

## Phase 4: Canvas Concept

### Commit 10: Create canvas concept page shell
Create `pages/concepts/canvas.vue`:
- Full viewport layout
- TresCanvas with basic camera
- HTML overlay structure (name, subtitle, entry points, social)
- Parallax effect on name using useMouse3D

```bash
git add .
git commit -m "feat: add canvas concept page shell with parallax"
```

**Verification:** Page loads with text overlay and parallax effect

---

### Commit 11: Add CanvasParticles component
Create `components/canvas/CanvasParticles.vue`:
- 2000 particles with custom shader
- Mouse-reactive movement
- Color changes based on active entry point
- Uses useLoop().onBeforeRender() for animation

```bash
git add .
git commit -m "feat: add CanvasParticles component with shader animation"
```

**Verification:** Particles render and respond to mouse movement

---

## Phase 5: Glitch Concept

### Commit 12: Create glitch concept page
Create `pages/concepts/glitch.vue`:
- Brutalist typography layout
- Glitch animation CSS
- Scanlines overlay
- Entry points with glitch hover effect

```bash
git add .
git commit -m "feat: add glitch concept page with brutalist typography"
```

**Verification:** Page loads with glitch effects on hover

---

## Phase 6: Organism Concept

### Commit 13: Create organism concept page shell
Create `pages/concepts/organism.vue`:
- Full viewport layout
- TresCanvas
- HTML overlay with glowing node entry points

```bash
git add .
git commit -m "feat: add organism concept page shell"
```

**Verification:** Page loads with entry point nodes

---

### Commit 14: Add OrganismNetwork component
Create `components/organism/OrganismNetwork.vue`:
- 30 nodes in spherical distribution
- Line2 connections between nearby nodes
- Breathing animation
- Color changes based on active point

```bash
git add .
git commit -m "feat: add OrganismNetwork component with connected nodes"
```

**Verification:** Network renders with animated connections

---

## Phase 7: Portal Concept

### Commit 15: Create portal concept page shell
Create `pages/concepts/portal.vue`:
- Minimal layout
- Three portal windows for entry points

```bash
git add .
git commit -m "feat: add portal concept page shell"
```

**Verification:** Page loads with portal placeholders

---

### Commit 16: Add PortalWindow component
Create `components/portal/PortalWindow.vue`:
- Circular frame with glow effect
- Nested TresCanvas for mini 3D scenes
- Active/inactive states

```bash
git add .
git commit -m "feat: add PortalWindow component frame"
```

**Verification:** Portal frames render with hover effects

---

### Commit 17: Add portal scene components
Create:
- `components/portal/PortalMusicScene.vue` (torus knot wireframe)
- `components/portal/PortalWorkScene.vue` (icosahedron nodes)
- `components/portal/PortalCodeScene.vue` (wireframe cube)

Each uses useLoop().onBeforeRender() for rotation animation.

```bash
git add .
git commit -m "feat: add portal mini-scene components"
```

**Verification:** All three portals show animated 3D scenes on hover

---

## Phase 8: Final Polish

### Commit 18: Add CV PDF to public folder
Add `public/Joe_Czarnecki_Deutsch_2023.pdf`

```bash
git add .
git commit -m "chore: add CV PDF to public folder"
```

**Verification:** CV link downloads the PDF

---

### Commit 19: Clean up and verify all concepts
- Test all four concepts work
- Fix any TypeScript errors
- Ensure consistent styling

```bash
git add .
git commit -m "chore: clean up and verify all concepts"
```

**Verification:** All pages load without errors, all interactions work

---

## Summary

| Phase | Commits | Description |
|-------|---------|-------------|
| 1 | 1-5 | Project setup, dependencies, base config |
| 2 | 6-8 | Shared components and utilities |
| 3 | 9 | Index/navigation page |
| 4 | 10-11 | Canvas concept |
| 5 | 12 | Glitch concept |
| 6 | 13-14 | Organism concept |
| 7 | 15-17 | Portal concept |
| 8 | 18-19 | Final polish |

**Total: 19 atomic commits**

---

## Key Technical Notes

1. **TresJS v5 API**: Use `useLoop().onBeforeRender()` not `useRenderLoop().onLoop()`
2. **Lines**: Use `Line2` from `@tresjs/cientos`, not `TresLine`
3. **Dynamic colors**: Use inline styles, not Tailwind interpolated classes
4. **ClientOnly**: Wrap TresCanvas in `<ClientOnly>` for SSR compatibility
