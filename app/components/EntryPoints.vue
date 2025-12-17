<script setup lang="ts">
interface Props {
  interactive?: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  hover: [key: string | null]
}>()

const points = [
  { key: 'music', label: 'music', color: '#ef4136', colorClass: 'ember' },
  { key: 'work', label: 'work', color: '#50d2cb', colorClass: 'signal' },
  { key: 'code', label: 'code', color: '#7ec245', colorClass: 'pulse' }
]

const activePoint = ref<string | null>(null)

function handleHover(key: string | null) {
  activePoint.value = key
  emit('hover', key)
}
</script>

<template>
  <div class="flex items-center justify-center gap-12 md:gap-16">
    <div
      v-for="point in points"
      :key="point.key"
      class="flex flex-col items-center gap-3 cursor-pointer group"
      @mouseenter="handleHover(point.key)"
      @mouseleave="handleHover(null)"
    >
      <!-- The dot - using inline styles for dynamic colors (Tailwind JIT can't handle interpolated classes) -->
      <div
        class="w-3 h-3 rounded-full bg-silver/50 transition-all duration-500 group-hover:scale-150"
        :style="activePoint === point.key ? {
          backgroundColor: point.color,
          boxShadow: `0 10px 15px -3px ${point.color}80`
        } : {}"
      />
      <!-- The label -->
      <span
        class="text-sm font-mono text-silver/70 transition-colors duration-300"
        :style="activePoint === point.key ? { color: point.color } : {}"
      >
        {{ point.label }}
      </span>
    </div>
  </div>
</template>
