<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData('blog-' + route.path, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value || post.value.draft) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: `${post.value.title} · Joe Czarnecki`,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
})

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
</script>

<template>
  <main class="min-h-screen bg-void text-bone font-sans">
    <article
      v-if="post"
      class="mx-auto max-w-2xl px-6 py-16"
    >
      <NuxtLink
        to="/blog"
        class="font-mono text-sm text-silver hover:text-signal"
      >
        ← blog
      </NuxtLink>

      <header class="mt-8">
        <time
          :datetime="post.date"
          class="font-mono text-xs text-silver"
        >
          {{ formatDate(post.date) }}
        </time>
        <h1 class="mt-2 text-4xl font-bold">{{ post.title }}</h1>
        <p
          v-if="post.description"
          class="mt-3 text-lg text-silver"
        >
          {{ post.description }}
        </p>
        <ul
          v-if="post.tags?.length"
          class="mt-3 flex flex-wrap gap-2"
        >
          <li
            v-for="tag in post.tags"
            :key="tag"
            class="font-mono text-xs text-pulse"
          >
            #{{ tag }}
          </li>
        </ul>
      </header>

      <div class="prose-post mt-12">
        <ContentRenderer :value="post" />
      </div>
    </article>
  </main>
</template>
