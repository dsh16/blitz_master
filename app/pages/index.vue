<script setup lang="ts">
useHead({ title: 'Blitz Master — Рабочий экран', htmlAttrs: { lang: 'ru' } })

const working = ref(true)
const active = ref(true)
const elapsed = ref(1107)
const workTime = ref(22835)
const breakTime = ref(2700)
const breakCount = ref(3)
const queueOpen = ref(false)
const menuOpen = ref(false)
const editing = ref(false)
const serviceName = ref('')
const serviceMinutes = ref(15)
const services = ref([
  { name: 'Консультация', minutes: 15 },
  { name: 'Подбор программы', minutes: 15 },
])
const recommended = computed(() => services.value.reduce((sum, service) => sum + service.minutes, 0))
const appointments = [
  { time: '11:00 – 11:30', minutes: 30, in: '2 ч 23 мин' },
  { time: '14:00 – 15:00', minutes: 60, in: '5 ч 23 мин' },
  { time: '17:30 – 18:00', minutes: 30, in: '8 ч 53 мин' },
]
let timer: ReturnType<typeof setInterval>
onMounted(() => {
  timer = setInterval(() => {
    if (working.value) {
      workTime.value++
      if (active.value) elapsed.value++
    } else {
      breakTime.value++
    }
  }, 1000)
})
onUnmounted(() => clearInterval(timer))

function time(seconds: number) {
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map(part => String(part).padStart(2, '0')).join(':')
}

function setWorking(value: boolean) {
  if (!value && working.value) breakCount.value++
  working.value = value
}

function addService() {
  const name = serviceName.value.trim()
  if (!name || !Number.isInteger(serviceMinutes.value) || serviceMinutes.value < 1) return
  services.value.push({ name, minutes: serviceMinutes.value })
  serviceName.value = ''
  serviceMinutes.value = 15
  editing.value = false
}
</script>

<template>
  <div class="dashboard">
    <main id="work">
      <header class="profile">
        <span class="avatar"><DashboardIcon name="user" /></span>
        <div><h1>Гейдаров Тимур</h1><p>Мастер</p></div>
        <span class="live"><span class="live-check"><DashboardIcon name="check" /></span> Live-режим <i /></span>
      </header>

      <div class="switch" aria-label="Режим работы">
        <button :aria-pressed="working" @click="setWorking(true)"><DashboardIcon name="play" /> Работаю</button>
        <button :aria-pressed="!working" @click="setWorking(false)"><DashboardIcon name="cup" /> Перерыв</button>
      </div>

      <div class="stats">
        <div class="stat"><span class="round"><DashboardIcon name="clock" /></span><div>Время работы сегодня<strong>{{ time(workTime) }}</strong></div></div>
        <div class="stat break"><span class="round"><DashboardIcon name="cup" /></span><div>Перерывы сегодня<strong>{{ time(breakTime) }}</strong></div><span class="count">{{ breakCount }} раза</span></div>
      </div>

      <section class="client" aria-labelledby="client-title">
        <div class="client-heading">
          <h2 id="client-title">{{ active ? 'Клиент в работе' : 'Услуга завершена' }}</h2>
          <span class="pill"><i /> {{ active ? (working ? 'Выполнение услуги' : 'На паузе') : 'Выполнено' }}</span>
        </div>
        <p class="client-name"><span class="avatar"><DashboardIcon name="user" /></span> Иляхин Сергей · Начало: Сегодня, 08:00</p>
        <div class="timer">{{ time(elapsed) }}</div>
        <div class="recommended"><DashboardIcon name="timer" /><span>Рекомендуемое время:</span><strong>{{ recommended }} мин</strong></div>

        <div class="services">
          <div class="services-heading">
            <span>Услуги ({{ services.length }})</span>
            <button v-if="active" class="pill" :aria-expanded="editing" @click="editing = !editing"><DashboardIcon name="plus" /> Добавить услугу</button>
          </div>
          <form v-if="editing && active" class="service-form" @submit.prevent="addService">
            <label>Название<input v-model="serviceName" required maxlength="80"></label>
            <label>Минуты<input v-model.number="serviceMinutes" type="number" required min="1" max="480"></label>
            <button class="pill" type="submit">Добавить</button>
          </form>
          <ul>
            <li v-for="(service, index) in services" :key="index"><strong>{{ service.name }}</strong><span>{{ service.minutes }} мин</span></li>
          </ul>
        </div>

        <button class="finish" :disabled="!active" @click="active = false; editing = false"><DashboardIcon name="check" /> {{ active ? 'Завершить выполнение' : 'Выполнение завершено' }}</button>
      </section>

      <section id="queue" class="queue">
        <button class="queue-button" :aria-expanded="queueOpen" @click="queueOpen = !queueOpen">
          <span class="queue-top"><span>Следующий в очереди</span><span><DashboardIcon name="people" /> Ожидают: 4</span></span>
          <span class="queue-person"><span class="avatar"><DashboardIcon name="user" /></span><span><strong>Григорьев Алексей</strong><small>Сегодня, 08:30</small></span><DashboardIcon class="queue-arrow" name="chevron" /></span>
        </button>
        <p v-if="queueOpen" class="queue-detail">Григорьев Алексей — первый в очереди. Всего ожидают 4 клиента.</p>
      </section>

      <section id="appointments" class="appointments" aria-labelledby="appointments-title">
        <header><span class="round"><DashboardIcon name="calendar" /></span><div><h2 id="appointments-title">Предстоящие онлайн-записи</h2><p>Будьте на рабочем месте в указанное время</p></div></header>
        <ul>
          <li v-for="appointment in appointments" :key="appointment.time">
            <span class="video"><DashboardIcon name="video" /></span>
            <div><strong>Сегодня, {{ appointment.time }}</strong><small>Онлайн-консультация ({{ appointment.minutes }} минут)</small></div>
            <span class="pill">Через {{ appointment.in }}</span>
          </li>
        </ul>
      </section>
    </main>

    <div class="navigation">
      <nav v-if="menuOpen" class="quick-menu" aria-label="Разделы">
        <a href="#work" @click="menuOpen = false">Рабочий экран</a>
        <a href="#queue" @click="menuOpen = false">Очередь</a>
        <a href="#appointments" @click="menuOpen = false">Онлайн-записи</a>
      </nav>
      <nav class="toolbar" aria-label="Основная навигация">
        <a href="#appointments" aria-label="Онлайн-записи"><DashboardIcon name="calendar" /></a>
        <a href="#work" class="selected" aria-label="Рабочий экран"><DashboardIcon name="grid" /></a>
        <a href="#queue" aria-label="Очередь"><DashboardIcon name="people" /></a>
        <button aria-label="Меню" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen"><DashboardIcon name="menu" /></button>
      </nav>
    </div>
  </div>
</template>

<style>
:root{font-family:Inter,system-ui,sans-serif;color:#101725;background:#e9ecf4;font-synthesis:none}
*{box-sizing:border-box}
body{margin:0}
h1,h2,p,ul{margin:0}
ul{padding:0;list-style:none}
button,input{font:inherit}
button{cursor:pointer}
button:disabled{cursor:default}
button:focus-visible,a:focus-visible,input:focus-visible{outline:3px solid #384dff;outline-offset:3px}
svg{width:1.25em;height:1.25em;flex:none}
.dashboard{--muted:#59647a;--teal:#007b80;--mint:#d9eeee;--orange:#ff582f;width:min(100% - 12px,760px);margin:6px auto;background:#f4f5fc;border-radius:24px;min-height:calc(100dvh - 12px);display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 2px 16px #2938570a}
.dashboard main{padding:22px clamp(12px,3.1vw,24px) 0}
.profile,.live,.switch button,.stat,.client-heading,.client-name,.recommended,.services-heading,.services li,.finish,.queue-top,.queue-top span,.queue-person,.appointments header,.appointments li,.toolbar{display:flex;align-items:center}
.profile{gap:clamp(9px,3vw,22px);margin:0 12px 26px}
.profile h1{font-size:clamp(16px,3.6vw,27px);line-height:1.1;letter-spacing:-.04em}
.profile p{color:var(--muted);margin-top:4px;font-size:clamp(14px,2.9vw,21px)}
.avatar,.round,.video,.live-check{display:grid;place-items:center;flex:none}
.avatar{width:clamp(38px,9vw,67px);aspect-ratio:1;border-radius:25%;background:#e7e9f1;color:#626b80;font-size:clamp(19px,4vw,34px)}
.live,.pill,.count{border-radius:100px;white-space:nowrap}
.live{margin-left:auto;background:#e0f0f0;gap:7px;padding:9px 12px;font-size:clamp(10px,2.4vw,18px);font-weight:700}
.live-check{color:white;background:var(--teal);border-radius:6px;padding:3px}
i{width:.65em;height:.65em;border-radius:50%;background:#00bd16;flex:none}
.switch{display:grid;grid-template-columns:1fr 1fr;background:#e7e9f1;border-radius:40px;padding:3px}
.switch button{border:0;border-radius:40px;justify-content:center;gap:.65em;min-height:clamp(42px,9.5vw,64px);background:transparent;font-weight:650;font-size:clamp(17px,3.3vw,24px);color:inherit}
.switch button[aria-pressed=true]{background:var(--teal);color:white}
.switch button[aria-pressed=false] svg{color:#626b80}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:clamp(6px,3vw,21px);margin:13px 0 16px}
.stat{background:#e8f3f5;border-radius:17px;padding:10px clamp(6px,2.2vw,17px);gap:clamp(6px,2vw,17px);color:var(--muted);font-size:clamp(10px,2.4vw,16px);font-weight:650;position:relative}
.stat.break{background:#f6f0e8}
.round{background:var(--mint);color:var(--teal);width:clamp(28px,7.5vw,58px);aspect-ratio:1;border-radius:50%;font-size:clamp(15px,3.9vw,29px)}
.break .round,.count{background:#f3e5d3;color:#754500}
.stat strong{display:block;font-size:clamp(16px,3.5vw,26px);font-variant-numeric:tabular-nums;color:#667187}
.count{margin:auto 0 0 auto;padding:4px 8px;font-size:clamp(9px,2vw,15px)}
.client,.queue,.appointments{border:1px solid #b9e4e3;border-radius:22px}
.client{background:#f5fafb;padding:clamp(9px,1.7vw,13px)}
.client-heading,.services-heading{justify-content:space-between;gap:6px}
.client-heading,.client-name{padding-inline:clamp(3px,2vw,16px)}
.client h2{font-size:clamp(17px,3.5vw,25px);letter-spacing:-.035em}
.pill{background:var(--mint);color:#006d71;display:inline-flex;align-items:center;gap:.5em;padding:.4em .75em;font-size:clamp(10px,2.2vw,16px);font-weight:700;border:0}
.client-name{gap:10px;color:var(--muted);font-size:clamp(11px,2.45vw,17px);font-weight:600;margin:5px 0 12px}
.client-name .avatar{width:clamp(26px,5vw,36px);border-radius:50%;font-size:clamp(12px,2.5vw,19px)}
.timer{width:min(80%,460px);margin:auto;text-align:center;background:#c5eaea;border-radius:100px;font-size:clamp(40px,10vw,75px);font-weight:800;letter-spacing:-.035em;font-variant-numeric:tabular-nums;line-height:1.35}
.recommended{justify-content:center;gap:clamp(5px,2vw,16px);margin:16px 0;color:var(--muted);font-size:clamp(11px,2.4vw,18px);font-weight:600}
.recommended svg,.recommended strong{font-size:1.35em}
.recommended strong{color:#101725}
.services{padding:7px 11px 9px;background:#eceff4;border-radius:17px}
.services-heading{padding:0 3px 6px;color:var(--muted);font-weight:650;font-size:clamp(12px,2.3vw,17px)}
.services ul,.appointments ul{background:#f8f9fe;border-radius:13px;padding:0 12px}
.services li{justify-content:space-between;gap:8px;padding:6px 0;font-size:clamp(12px,2.3vw,17px)}
.services li + li,.appointments li + li{border-top:1px solid #e2e6f2}
.services li span{white-space:nowrap;color:var(--muted);font-weight:650}
.service-form{display:flex;flex-wrap:wrap;align-items:end;gap:8px;margin-bottom:8px}
.service-form label{display:grid;gap:3px;font-size:13px}
.service-form input{max-width:100%;width:12em;border:1px solid #a4b2be;border-radius:6px;padding:4px}
.service-form input[type=number]{width:5em}
.finish{background:var(--orange);color:#161b27;border:0;border-radius:16px;width:100%;min-height:clamp(43px,8vw,57px);margin-top:14px;justify-content:center;gap:.7em;font-weight:750;font-size:clamp(16px,3.3vw,23px)}
.finish:disabled{background:#d9eeee;color:#006d71}
.queue,.appointments{margin-top:12px}
.queue{border-color:#e0e4ef}
.queue-button{border:0;background:none;color:inherit;width:100%;padding:10px clamp(10px,3vw,21px);text-align:left}
.queue-top{justify-content:space-between;gap:5px;color:var(--muted);font-size:clamp(10px,2.2vw,16px);font-weight:700}
.queue-top > span:first-child{text-transform:uppercase}
.queue-top span{gap:6px}
.queue-person{gap:12px;margin-top:4px}
.queue-person .avatar{width:clamp(32px,7vw,51px);border-radius:50%;font-size:clamp(17px,3.5vw,27px)}
.queue-person strong,.appointments h2{font-size:clamp(15px,2.8vw,20px)}
small,.appointments p,.queue-detail{display:block;color:var(--muted);font-size:clamp(10px,2.15vw,15px);font-weight:550}
.queue-arrow{margin-left:auto;color:var(--muted)}
.queue-button[aria-expanded=true] .queue-arrow{transform:rotate(90deg)}
.queue-detail{padding:0 16px 12px}
.appointments{background:#f0f2fd;border-color:#dce0fc;padding:7px}
.appointments header{gap:12px;padding:0 7px 6px}
.appointments header .round{background:#dee2ff;color:#2949f7;width:clamp(33px,7vw,50px)}
.appointments li{gap:clamp(5px,2vw,16px);padding:5px 0}
.appointments li strong{font-size:clamp(10px,2.25vw,16px);display:block}
.appointments li .pill{margin-left:auto;font-size:clamp(8px,1.9vw,14px)}
.video{background:var(--mint);color:var(--teal);width:clamp(25px,7.5vw,55px);height:clamp(24px,5vw,38px);border-radius:12px;font-size:clamp(13px,3vw,23px)}
.navigation{position:relative;margin-top:clamp(18px,5vw,42px)}
.toolbar{background:var(--teal);color:white;border-radius:24px;justify-content:space-around;padding:10px;min-height:clamp(62px,14vw,110px)}
.toolbar a,.toolbar button{display:grid;place-items:center;color:inherit;background:none;border:0;border-radius:50%;width:clamp(40px,11vw,80px);aspect-ratio:1;font-size:clamp(22px,5vw,40px)}
.toolbar .selected{background:var(--orange);color:#161b27}
.quick-menu{position:absolute;bottom:calc(100% + 6px);right:10px;display:grid;gap:8px;padding:12px;background:white;border-radius:12px;box-shadow:0 4px 20px #0002}
.quick-menu a{color:#006d71}
@media(max-width:530px){.count{position:absolute;right:5px;bottom:5px}.stat.break{padding-bottom:20px}.appointments ul{padding-inline:6px}.client-heading .pill{padding-inline:6px}}
</style>
