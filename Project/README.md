# pomodoro_box

Трекер задач с таймером по методу "Pomodoro"

## Установка и запуск проекта

1. Для запуска данного проекта вам понадобится Node.js и npm.
2. Склонируйте данный репозиторий к себе на диск. Затем выполните
   `npm install` для установки.

## Команды запуска проекта

* `npm run dev` - Сборка и запуск проекта в режиме разработки.
  Запускает локальный сервер на `localhost:3000`.
* `npm run build` - Сборка проекта в режиме production.

## Команды тестирования проекта

* `npm run lint` - Проверка проекта в ESLint.
* `npm run lint:fix` - Исправление ошибок проекта в ESLint.

## Другие команды проекта

* npm run eject - Удаление create-react-app из проекта.

## Примечания

* Верстка сайта выполнена для ширины от 992 пикселя.
* Для удобства тестирования время шага таймера установлено на 10
  миллисекунд вместо секунды, время работы и перерыва установлены на 2
  минуты и время большого перерыва установлено на 5 минут. Эти значения
  можно изменить в файле `src/globalVariables.ts`.
* Проект создан при помощи create-react-app.