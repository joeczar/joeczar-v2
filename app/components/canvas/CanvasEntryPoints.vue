<script setup lang="ts">
const emit = defineEmits<{
  hover: [key: string | null]
}>()

const { activeNavLinks } = useSiteLinks()

const activePoint = ref<string | null>(null)

function handleHover(key: string | null) {
  activePoint.value = key
  emit('hover', key)
}
</script>

<template>
  <div class="flex items-center justify-center gap-16 md:gap-20">
    <NuxtLink
      v-for="link in activeNavLinks"
      :key="link.key"
      :to="link.href"
      class="flex flex-col items-center gap-4 cursor-pointer group"
      @mouseenter="handleHover(link.key)"
      @mouseleave="handleHover(null)"
    >
      <!-- Mini 3D scene -->
      <div
        class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden transition-all duration-500"
        :class="activePoint === link.key ? 'scale-125' : ''"
        :style="{
          boxShadow: activePoint === link.key ? `0 0 40px ${link.color}60` : 'none'
        }"
      >
        <ClientOnly>
          <TresCanvas :dpr="[1, 1.5]" :style="{ background: 'transparent' }">
            <TresPerspectiveCamera :position="[0, 0, 3]" />

            <!-- Music: Torus Knot -->
            <CanvasEntryMesh
              v-if="link.key === 'music'"
              type="torus"
              :color="link.color"
              :is-active="activePoint === link.key"
            />

            <!-- Work: Icosahedron -->
            <CanvasEntryMesh
              v-if="link.key === 'work'"
              type="icosa"
              :color="link.color"
              :is-active="activePoint === link.key"
            />

            <!-- Code: Cube -->
            <CanvasEntryMesh
              v-if="link.key === 'code'"
              type="cube"
              :color="link.color"
              :is-active="activePoint === link.key"
            />
          </TresCanvas>
        </ClientOnly>
      </div>

      <!-- Label -->
      <span
        class="text-sm font-mono transition-colors duration-300"
        :style="{ color: activePoint === link.key ? link.color : '#a0a0a3' }"
      >
        {{ link.label }}
      </span>
    </NuxtLink>
  </div>
</template>
