<script setup lang="ts">
interface Props {
  user?: string
  host?: string
}

const props = withDefaults(defineProps<Props>(), {
  user: 'joe',
  host: 'void'
})

const { activeNavLinks } = useSiteLinks()
</script>

<template>
  <div class="terminal-window">
    <div class="p-3 font-mono text-xs space-y-0.5">
      <!-- User prompt -->
      <div class="text-silver/40 text-[10px] mb-2">
        <span class="text-pulse/50">{{ user }}</span><span class="text-silver/30">@</span><span class="text-signal/50">{{ host }}</span><span class="text-silver/30">:~$</span>
      </div>

      <!-- Navigation links -->
      <a
        v-for="link in activeNavLinks"
        :key="link.key"
        :href="link.href"
        class="block text-silver/50 hover:text-bone transition-colors duration-200 group"
      >
        <span class="text-silver/30 group-hover:text-silver/50">cd</span>
        <span :class="link.tailwindColor" class="opacity-70 group-hover:opacity-100 ml-1">./{{ link.key }}</span>
      </a>

      <!-- Blinking cursor line -->
      <div class="text-silver/40 flex items-center mt-2">
        <span class="text-pulse/50">{{ user }}</span><span class="text-silver/30">@</span><span class="text-signal/50">{{ host }}</span><span class="text-silver/30">:~$</span>
        <span class="terminal-cursor ml-1">▌</span>
      </div>
    </div>

    <!-- Social links -->
    <div class="px-3 pb-3 pt-1 border-t border-white/5">
      <SocialLinks size="sm" class="font-mono text-silver/30 hover:text-silver/60" />
    </div>
  </div>
</template>

<style scoped>
.terminal-window {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  min-width: 180px;
}

.terminal-cursor {
  animation: cursor-blink 1s steps(1) infinite;
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
