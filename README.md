# Blitz Master

Стартовый проект на Nuxt 4. Требуется Node.js 24.15 или новее из ветки 24.

```bash
npm ci
npm run dev
```

Сервер разработки по умолчанию доступен на порту 3000.

```bash
npm run build
npm run preview
```

## GitHub Pages

В репозитории выберите **Settings → Pages → Build and deployment → GitHub Actions**. Workflow разворачивает статическую сборку из ветки `main`. Его также можно запустить вручную во вкладке **Actions**.

Для локальной проверки сборки под путём проекта:

```bash
NUXT_APP_BASE_URL=/blitz_master/ npx nuxt generate
```
