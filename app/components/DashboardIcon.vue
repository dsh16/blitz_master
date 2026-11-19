<script setup lang="ts">
defineProps<{ name: string }>()
const paths: Record<string, string> = {
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  check: 'm4 12 5 5L20 6',
  play: 'm8 4 13 8-13 8Z',
  cup: 'M3 8h15v7a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z M18 9h2a3 3 0 0 1 0 6h-2 M8 3v2m5-2v2',
  clock: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z M12 6v6l4 2',
  timer: 'M21 13a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z M12 9v4l3 2 M12 1v3',
  plus: 'M12 4v16 M4 12h16',
  people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z M22 21v-2a4 4 0 0 0-3-4 M17 3a4 4 0 0 1 0 8',
  chevron: 'm9 5 7 7-7 7',
  calendar: 'M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z M3 10h18 M7 3v4m10-4v4',
  video: 'M4 6h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z M17 10l5-3v10l-5-3',
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  menu: 'M3 5h18 M3 12h18 M3 19h18',
}
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[name]" :fill="name === 'play' ? 'currentColor' : 'none'" />
  </svg>
</template>
