<script setup lang="ts">
interface Props {
  portalKey: string
  label: string
  color: string
  isActive: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="relative group cursor-pointer">
    <!-- The portal frame -->
    <div
      class="w-24 h-24 md:w-32 md:h-32 rounded-full border transition-all duration-500 overflow-hidden"
      :class="isActive ? 'border-transparent scale-110' : 'border-ash'"
      :style="{
        boxShadow: isActive ? `0 0 60px ${color}40, inset 0 0 30px ${color}20` : 'none'
      }"
    >
      <!-- The world inside -->
      <ClientOnly>
        <div class="w-full h-full" :class="isActive ? 'opacity-100' : 'opacity-0'" style="transition: opacity 0.5s">
          <TresCanvas :dpr="[1, 1.5]">
            <TresPerspectiveCamera :position="[0, 0, 3]" />

            <!-- Music world: abstract waves -->
            <PortalMusicScene v-if="portalKey === 'music'" :is-active="isActive" />

            <!-- Work world: connected nodes -->
            <PortalWorkScene v-if="portalKey === 'work'" :is-active="isActive" />

            <!-- Code world: matrix/grid -->
            <PortalCodeScene v-if="portalKey === 'code'" :is-active="isActive" />
          </TresCanvas>
        </div>
      </ClientOnly>

      <!-- Inactive state: just a dot -->
      <div
        class="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        :class="isActive ? 'opacity-0' : 'opacity-100'"
      >
        <div class="w-2 h-2 rounded-full bg-ash" />
      </div>
    </div>

    <!-- Label -->
    <span
      class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono transition-all duration-300 whitespace-nowrap"
      :class="isActive ? 'text-bone' : 'text-silver/40'"
    >
      {{ label }}
    </span>
  </div>
</template>
