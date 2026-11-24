<script setup lang="ts">
useHead({ title: 'Blitz Master — Открытие смены', htmlAttrs: { lang: 'ru' } })

const menuOpen = ref(false)
const shiftScreen = ref<HTMLElement | null>(null)
const desktopScale = ref(1)

function fitDesktop() {
  if (window.innerWidth < 900 || !shiftScreen.value) return

  const height = shiftScreen.value.offsetHeight
  if (height) desktopScale.value = Math.min(1, Math.max(1, window.innerHeight - 16) / height)
}

onMounted(() => {
  fitDesktop()
  window.addEventListener('resize', fitDesktop)
  void document.fonts.ready.then(fitDesktop)
})

onUnmounted(() => window.removeEventListener('resize', fitDesktop))
</script>

<template>
  <div ref="shiftScreen" class="shift-screen" :style="{ '--desktop-scale': desktopScale }">
    <main class="shift-content">
      <header class="shift-profile">
        <span class="shift-icon avatar"><DashboardIcon name="user" /></span>
        <div class="master">
          <strong>Гейдаров Тимур</strong>
          <p>Мастер</p>
        </div>
        <span class="live">
          <span class="live-check"><DashboardIcon name="check" /></span>
          Live-режим
          <span class="live-dot" aria-hidden="true" />
        </span>
      </header>

      <section class="intro" aria-labelledby="shift-title">
        <svg class="illustration" viewBox="8 7 428 318" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="shift-paper" x1="104" y1="80" x2="302" y2="262" gradientUnits="userSpaceOnUse">
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#e4f3f3" />
            </linearGradient>
            <linearGradient id="shift-teal">
              <stop stop-color="#00777d" />
              <stop offset=".52" stop-color="#13afb1" />
              <stop offset="1" stop-color="#00858c" />
            </linearGradient>
            <filter id="shift-shadow" x="-30%" y="-30%" width="165%" height="170%">
              <feDropShadow dx="-7" dy="10" stdDeviation="7" flood-color="#08767b" flood-opacity=".22" />
            </filter>
          </defs>
          <path fill="#dcedee" d="M14 183c0-57 51-104 119-105 20 0 39 1 57-8C211 25 250 4 293 10c56 7 102 61 104 114 1 20-4 35-7 48 28 13 44 34 44 60 0 36-29 65-72 65-46 0-63-25-111-28-39-2-81 10-126 7C62 272 14 235 14 183Z" />
          <g transform="translate(-49 -33) scale(1.24)">
            <g transform="rotate(-9 206 164)" filter="url(#shift-shadow)">
              <rect x="112" y="81" width="184" height="165" rx="24" fill="#91c9cb" />
              <rect x="118" y="78" width="184" height="164" rx="24" fill="url(#shift-paper)" />
              <path fill="url(#shift-teal)" d="M142 78h136a24 24 0 0 1 24 24v24H118v-24a24 24 0 0 1 24-24Z" />
              <rect x="154" y="55" width="19" height="53" rx="9.5" fill="#006168" />
              <rect x="157" y="54" width="17" height="52" rx="8.5" fill="url(#shift-teal)" />
              <rect x="247" y="55" width="19" height="53" rx="9.5" fill="#006168" />
              <rect x="250" y="54" width="17" height="52" rx="8.5" fill="url(#shift-teal)" />
              <g fill="#bfe0e1">
                <rect x="148" y="144" width="27" height="27" rx="5" />
                <rect x="194" y="144" width="27" height="27" rx="5" />
                <rect x="240" y="144" width="27" height="27" rx="5" />
                <rect x="148" y="188" width="27" height="27" rx="5" />
                <rect x="194" y="188" width="27" height="27" rx="5" />
              </g>
            </g>
            <g filter="url(#shift-shadow)">
              <circle cx="315" cy="221" r="55" fill="url(#shift-teal)" stroke="#00777d" stroke-width="2" />
              <circle cx="315" cy="221" r="42" fill="url(#shift-paper)" />
              <path d="m311 204 3 20 19-9" stroke="#00898e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </g>
        </svg>

        <h1 id="shift-title">Начните рабочую смену</h1>
        <p>Откройте смену, чтобы принимать клиентов из очереди и работать по расписанию</p>
      </section>

      <div class="day-card">
        <div class="day-item">
          <span class="shift-icon"><DashboardIcon name="calendar" /></span>
          <span>Сегодня, <time datetime="2026-11-27">27 ноября</time></span>
        </div>
        <NuxtLink class="day-item bookings" to="/#appointments">
          <span class="shift-icon"><DashboardIcon name="calendar" /></span>
          <span>Онлайн-записей: 3</span>
        </NuxtLink>
      </div>

      <section class="plan-card" aria-labelledby="plan-title">
        <h2 id="plan-title">План на сегодня</h2>
        <dl>
          <div class="plan-row">
            <dt><span class="shift-icon clock"><DashboardIcon name="clock" /></span>Рабочая смена</dt>
            <dd>08:00 – 18:00</dd>
          </div>
          <div class="plan-row">
            <dt><span class="shift-icon cup"><DashboardIcon name="cup" /></span>Плановые перерывы</dt>
            <dd>по необходимости</dd>
          </div>
        </dl>
      </section>

      <NuxtLink class="open-shift" to="/">
        <DashboardIcon name="play" />
        Открыть смену
      </NuxtLink>
    </main>

    <div class="shift-navigation">
      <nav v-if="menuOpen" class="shift-menu" aria-label="Разделы">
        <NuxtLink to="/">Рабочий экран</NuxtLink>
        <NuxtLink to="/#queue">Очередь</NuxtLink>
        <NuxtLink to="/#appointments">Онлайн-записи</NuxtLink>
      </nav>
      <nav class="shift-toolbar" aria-label="Основная навигация">
        <NuxtLink to="/#appointments" aria-label="Онлайн-записи"><DashboardIcon name="booking" /></NuxtLink>
        <NuxtLink to="/open-work" class="selected" aria-label="Открытие смены"><DashboardIcon name="grid" /></NuxtLink>
        <NuxtLink to="/#queue" aria-label="Очередь"><DashboardIcon name="network" /></NuxtLink>
        <button type="button" aria-label="Меню" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen"><DashboardIcon name="menu" /></button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.shift-screen {
  --ink: #101725;
  --muted: #59647a;
  --teal: #007b80;
  box-sizing: border-box;
  width: min(calc(100% - 12px), 760px);
  min-height: calc(100dvh - 12px);
  margin: 6px auto;
  background: #f4f5fc;
  color: var(--ink);
  border-radius: 24px;
  box-shadow: 0 2px 16px #29385712;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.shift-screen *, .shift-screen *::before, .shift-screen *::after { box-sizing: border-box }
.shift-screen :is(h1, h2, p, dl, dd) { margin: 0 }
.shift-screen :is(a, button):focus-visible { outline: 3px solid #384dff; outline-offset: 3px }
.shift-screen svg:not(.illustration) { width: 1.25em; height: 1.25em; flex: none }
.shift-content { padding: clamp(12px, 2.5vw, 20px) clamp(11px, 3vw, 24px) 0 }
.shift-profile, .live, .day-item, .plan-row, .plan-row dt, .open-shift { display: flex; align-items: center }
.shift-profile { gap: clamp(8px, 2.5vw, 19px); padding-inline: clamp(2px, 1.4vw, 10px) }
.shift-icon, .live-check { display: grid; flex: none; place-items: center }
.shift-icon {
  width: clamp(32px, 7.5vw, 60px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: #e9ebf3;
  color: #626b80;
  font-size: clamp(18px, 3.5vw, 31px);
}
.avatar { border-radius: 23%; width: clamp(34px, 8vw, 60px) }
.master strong { font-weight: 500; font-size: clamp(14px, 3.5vw, 25px); letter-spacing: -.035em }
.master p { color: var(--muted); font-size: clamp(12px, 2.8vw, 20px); margin-top: 3px }
.live {
  margin-left: auto;
  background: #e0f0f0;
  border-radius: 100px;
  padding: clamp(6px, 1.5vw, 12px);
  gap: clamp(4px, 1.3vw, 10px);
  white-space: nowrap;
  font-weight: 500;
  font-size: clamp(10px, 2.5vw, 18px);
}
.live-check { background: var(--teal); color: white; border-radius: 5px; padding: 3px }
.live-dot { width: .6em; aspect-ratio: 1; border-radius: 50%; background: #00bf17 }
.intro { text-align: center; margin: clamp(18px, 4vw, 34px) auto clamp(20px, 5vw, 44px) }
.illustration { display: block; width: min(94%, 520px); height: auto; margin: 0 auto clamp(8px, 1.6vw, 16px) }
.intro h1 { font-weight: 500; font-size: clamp(22px, 5.4vw, 39px); letter-spacing: -.045em; line-height: 1.12 }
.intro p {
  max-width: 35ch;
  margin: clamp(8px, 2vw, 17px) auto 0;
  color: var(--muted);
  font-size: clamp(13px, 3.2vw, 23px);
  font-weight: 400;
  line-height: 1.35;
}
.day-card, .plan-card { border: 1px solid #e0e4ef; border-radius: clamp(13px, 3vw, 22px) }
.day-card { display: grid; grid-template-columns: 1fr 1fr; padding: 7px 0 }
.day-item {
  min-width: 0;
  gap: clamp(5px, 1.7vw, 13px);
  padding: 0 clamp(5px, 2.2vw, 18px);
  color: inherit;
  font-size: clamp(11px, 2.65vw, 20px);
  font-weight: 450;
  text-decoration: none;
}
.bookings { border-inline-start: 1px solid #dce0eb; color: #343e55 }
.plan-card { padding: clamp(9px, 2.7vw, 22px); margin-top: clamp(9px, 2.5vw, 18px) }
.plan-card h2 { color: var(--muted); font-size: clamp(14px, 2.85vw, 22px); font-weight: 450 }
.plan-card dl { margin-top: clamp(7px, 2vw, 16px) }
.plan-row { gap: 7px; justify-content: space-between; padding: clamp(5px, 1.1vw, 9px) 0 }
.plan-row + .plan-row { border-top: 1px solid #e0e4ef }
.plan-row dt { gap: clamp(6px, 2.2vw, 18px); font-weight: 450 }
.plan-row :is(dt, dd) { font-size: clamp(11px, 2.65vw, 20px) }
.plan-row dd { color: var(--muted); text-align: right }
.clock { background: #d9eeee; color: var(--teal) }
.cup { background: #f4e8d9; color: #754500 }
.open-shift {
  min-height: clamp(48px, 11vw, 82px);
  justify-content: center;
  gap: .65em;
  margin: clamp(24px, 6vw, 54px) 4px 0;
  padding: 8px;
  border-radius: clamp(13px, 3vw, 22px);
  background: linear-gradient(115deg, #e84523, #da3918);
  color: #fff;
  font-size: clamp(17px, 3.65vw, 27px);
  font-weight: 500;
  text-decoration: none;
}
.shift-navigation { position: relative; margin-top: clamp(30px, 9vw, 100px) }
.shift-toolbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: clamp(60px, 14vw, 108px);
  padding: 6px 10px max(6px, env(safe-area-inset-bottom));
  background: linear-gradient(110deg, #00777f, #007479);
  color: white;
  border-radius: 24px;
}
.shift-toolbar :is(a, button) {
  width: clamp(44px, 11vw, 80px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  font-size: clamp(20px, 4.8vw, 38px);
  color: inherit;
  border: 0;
  border-radius: 50%;
  background: none;
  cursor: pointer;
}
.shift-toolbar .selected { background: #ff582f }
.shift-menu {
  position: absolute;
  right: 10px;
  bottom: calc(100% + 6px);
  display: grid;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 20px #0002;
}
.shift-menu a { color: #006d71 }

@media (min-width: 900px) {
  .shift-screen {
    min-height: 0;
    zoom: var(--desktop-scale, 1);
  }

  .intro { margin-block: clamp(14px, 2.5vh, 28px) }
  .illustration { width: min(91%, 540px) }
  .intro h1 { font-size: clamp(29px, 3vw, 38px) }
  .intro p { font-size: 18px }
  .shift-icon { width: 44px; font-size: 23px }
  .open-shift { margin-top: clamp(16px, 3vh, 34px); min-height: 60px; font-size: 23px }
  .shift-navigation { margin-top: clamp(14px, 2.5vh, 30px) }
  .shift-toolbar { min-height: 68px }
  .shift-toolbar :is(a, button) { width: 54px; font-size: 26px }
}
</style>
