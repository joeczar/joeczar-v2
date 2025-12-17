<script setup lang="ts">
interface Props {
  class?: string
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  size: 'md'
})

const { socialLinks } = useSiteLinks()
</script>

<template>
  <nav :class="['flex items-center gap-6', props.class]">
    <a
      v-for="link in socialLinks"
      :key="link.key"
      :href="link.href"
      :target="link.external ? '_blank' : undefined"
      :rel="link.external ? 'noopener noreferrer' : undefined"
      class="text-silver hover:text-bone transition-colors duration-300"
      :class="size === 'sm' ? 'text-sm' : 'text-base'"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
