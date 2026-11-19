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
  booking: 'M13 21H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v6 M3 9h17 M7 2v5m9-5v5 M7 12h1m3 0h1m-5 4h1m3 0h1 M22 17.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z m-6 0 1 1 2-2',
  network: 'M15 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z M11 15a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z M6 20a3 3 0 0 1 6 0 M7 10 5 6m8 6 5-6m-3 10 4-1m-4 4 4 2 M6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z M22 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z M23 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z M23 21a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  grid: 'M4 3h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z M17 3h2l3 3v2l-3 3h-2l-3-3V6Z M4 14h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z M16 14h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z',
  menu: 'M3 5h18 M3 12h18 M3 19h18',
}
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[name]" :fill="name === 'play' ? 'currentColor' : 'none'" />
  </svg>
</template>
