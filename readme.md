# Среда обучения старшеклассников Python🐍

## 1. О проекте
Проект разработан в целях создания веб-сайта в качестве среды обучения старших школьников программированию, которая позволяет автоматизировать проверку домашнего задания и самостоятельных работ по программированию на языке Python. Данная система должна экономить время учителей на проверку заданий, а также обеспечить самостоятельное выполнение заданий учащимися.

Проектом предусматривается 2 типа ролей на сайте:
* Учитель - Создание задач, Просмотр результатов, Создание вариантов для групп учащихся, Создание индивидуальных вариантов.

* Ученик - Решение задач, просмотр своих результатов.

### Ограничения и особенности
* Сайт не предназначен для использования на планшетах и мобильных устройствах.
* Работает на Mac и Windows
* Учителей регистрирует администратор
* Ученики привязаны к конкретному учителю

### Структура проекта
Настоящий репозиторий отвечает за frontend проекта.

Основная информация хранится в каталоге src.

## 2. Разработка
В этом проекте используются [node](https://nodejs.org/en) and [npm](https://www.npmjs.com/). Проверьте их наличие, если они не установлены у вас на локальном компьютере.

Установить сборщик Gulp на компьютере:

`$ npm install --global gulp-cli`

Установить плагины и создать папку node_modules локально в проекте:

`$ npm install`

### Особенности сборки
создать папку build
запустить галп: `$ gulp`

### Code style
1. Название директорий snake_case
2. Классы в pug и html, scss и css по методологии БЭМ
3. Константы camelCase
4. Функции camelCase
5. Переменные в javaScript camelCase
6. Переменные в scss, css kebab-case

## 3. Стек технологий
* [Gulp](https://gulpjs.com/)
* [SCSS](https://sass-lang.com/)
* CSS
* [PUG](https://pugjs.org/api/getting-started.html)
* HTML 5
* [JavaScript](https://learn.javascript.ru/)
* [Node.js](https://nodejs.org/en)
* [Prettier](https://prettier.io/)

## 4. Архитектура
Неприменимо.

## 5. Документация API
API нет.

## 6. Интеграции
Интеграций нет

## 7. База знаний
Можно прочитать дополнительные сведения:
* [Документ о концепции и границах](https://docs.google.com/document/d/19q9WAfxAyUAuRWV0lXXiAKiL2v5nuM8Fw7O-zZdBO4Y/edit?usp=sharing)
* [Основные требования](https://docs.google.com/document/d/1N0tXM5XRDls5zBzBOWQmXOCn9p0UCIhVfGegWIOXhlE/edit?usp=sharing)

## 8. Тестовые логины и пароли
для входа в ЛК ученика:
      login: "child@lad24.ru",
      password: "#01Study7",
для входа в ЛК учителя:
      login: "teacher@lad24.ru",
      password: "#01Study0"
