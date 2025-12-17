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

## Phase 2: Shared Components & Utilities ✅ COMPLETE

### Commit 6: Add useMouse3D composable ✅
- `fa11e07` - feat: add useMouse3D composable for 3D mouse tracking
- Track mouse position normalized to -1 to 1
- Smooth interpolation with requestAnimationFrame
- Cleanup on unmount

**Verification:** ✅ Can import and use in components

---

### Commit 7: Add SocialLinks component ✅
- `e998dce` - feat: add SocialLinks component
- GitHub, LinkedIn, CV links
- Size prop (sm/md)
- Hover effects

**Verification:** ✅ Component renders with working links

---

### Commit 8: Add EntryPoints component ✅
- `b47b05a` - feat: add EntryPoints component with hover states
- Music, Work, Code entry points
- Hover state with color changes (using inline styles for dynamic colors)
- Emits hover event

**Verification:** ✅ Hover effects work, colors change correctly

---

## Phase 3: Index Page (Concept Selector) ✅ COMPLETE

### Commit 9: Create index page with concept navigation ✅
- `b796571` - feat: add index page with concept navigation
- Grid of concept cards
- Links to /concepts/canvas, /concepts/glitch, etc.
- Minimal styling

**Verification:** ✅ Index page loads, cards link to concept routes

---

## Phase 4: Canvas Concept ✅ COMPLETE

### Commit 10: Create canvas concept page shell ✅
- `b857e43` - feat: add canvas concept page shell with parallax
- Full viewport layout
- TresCanvas with basic camera
- HTML overlay structure (name, subtitle, entry points, social)
- Parallax effect on name using useMouse3D

**Verification:** ✅ Page loads with text overlay and parallax effect

---

### Commit 11: Add CanvasParticles component ✅
- `6f42b55` - feat: add CanvasParticles component with shader animation
- 2000 particles with custom shader
- Mouse-reactive movement
- Color changes based on active entry point
- Uses useLoop().onBeforeRender() for animation

**Verification:** ✅ Particles render and respond to mouse movement

---

## Phase 5: Glitch Concept ✅ COMPLETE

### Commit 12: Create glitch concept page ✅
- `c126c13` - feat: add glitch concept page with brutalist typography
- Brutalist typography layout
- Glitch animation CSS
- Scanlines overlay
- Entry points with glitch hover effect

**Verification:** ✅ Page loads with glitch effects on hover

---

## Phase 6: Organism Concept ✅ COMPLETE

### Commit 13: Create organism concept page shell ✅
- `943c22a` - feat: add organism concept page shell
- Full viewport layout
- TresCanvas
- HTML overlay with glowing node entry points

**Verification:** ✅ Page loads with entry point nodes

---

### Commit 14: Add OrganismNetwork component ✅
- `bde1871` - feat: add OrganismNetwork component with connected nodes
- 30 nodes in spherical distribution
- Line2 connections between nearby nodes
- Breathing animation
- Color changes based on active point

**Verification:** ✅ Network renders with animated connections

---

## Phase 7: Portal Concept ✅ COMPLETE

### Commit 15: Create portal concept page shell ✅
- `bf541d4` - feat: add portal concept page shell
- Minimal layout
- Three portal windows for entry points

**Verification:** ✅ Page loads with portal placeholders

---

### Commit 16: Add PortalWindow component ✅
- `5b3dfc0` - feat: add PortalWindow component frame
- Circular frame with glow effect
- Nested TresCanvas for mini 3D scenes
- Active/inactive states

**Verification:** ✅ Portal frames render with hover effects

---

### Commit 17: Add portal scene components ✅
- `dd3a953` - feat: add portal mini-scene components
- `PortalMusicScene.vue` (torus knot wireframe)
- `PortalWorkScene.vue` (icosahedron nodes)
- `PortalCodeScene.vue` (wireframe cube)

Each uses useLoop().onBeforeRender() for rotation animation.

**Verification:** ✅ All three portals show animated 3D scenes on hover

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
