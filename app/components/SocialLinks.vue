<script setup lang="ts">
interface Props {
  class?: string
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const links = [
  { name: 'GitHub', url: 'https://github.com/joeczar', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/joe-czar/', icon: 'linkedin' },
  { name: 'CV', url: '/Joe_Czarnecki_Deutsch_2023.pdf', icon: 'file' }
]
</script>

<template>
  <nav :class="['flex items-center gap-6', props.class]">
    <a
      v-for="link in links"
      :key="link.name"
      :href="link.url"
      :target="link.url.startsWith('http') ? '_blank' : undefined"
      :rel="link.url.startsWith('http') ? 'noopener noreferrer' : undefined"
      class="text-silver hover:text-bone transition-colors duration-300"
      :class="size === 'sm' ? 'text-sm' : 'text-base'"
    >
      {{ link.name }}
    </a>
  </nav>
</template>
