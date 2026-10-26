<script setup lang="ts">
useSeoMeta({
  title: 'Blog · Joe Czarnecki',
  description: 'Notes on music, making and code.',
})

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'date', 'tags')
    .all(),
)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
</script>

<template>
  <main class="min-h-screen bg-void text-bone font-sans">
    <div class="mx-auto max-w-2xl px-6 py-16">
      <NuxtLink
        to="/"
        class="font-mono text-sm text-silver hover:text-signal"
      >
        ← home
      </NuxtLink>

      <h1 class="mt-8 text-4xl font-bold">Blog</h1>

      <p
        v-if="!posts?.length"
        class="mt-8 text-silver"
      >
        Nothing here yet.
      </p>

      <ul
        v-else
        class="mt-12 space-y-10"
      >
        <li
          v-for="post in posts"
          :key="post.path"
        >
          <NuxtLink
            :to="post.path"
            class="group block"
          >
            <time
              :datetime="post.date"
              class="font-mono text-xs text-silver"
            >
              {{ formatDate(post.date) }}
            </time>
            <h2 class="mt-1 text-xl font-semibold group-hover:text-signal">
              {{ post.title }}
            </h2>
            <p
              v-if="post.description"
              class="mt-1 text-silver"
            >
              {{ post.description }}
            </p>
            <ul
              v-if="post.tags?.length"
              class="mt-2 flex flex-wrap gap-2"
            >
              <li
                v-for="tag in post.tags"
                :key="tag"
                class="font-mono text-xs text-pulse"
              >
                #{{ tag }}
              </li>
            </ul>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>
