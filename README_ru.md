# 💫 Stella

Многофункциональный бот написанный для https://discord.gg/starrysky

Этот README также доступен в: [RU](README_ru.md) | [EN](README.md)

## Запуск бота

Для установки бота необходимо склонировать репозиторий, скопировать содержимое `.env.example` в `.env`, заполнить все недостающие настройки и использовать следующие команды:

```
# npm
npm install

# yarn
yarn install
```

Запуск производится командами:

```
# npm
npm run start

# yarn
yarn start
```

## Кастомные сообщения

На данный момент свои сообщения необходимо вставлять напрямую в БД.
В качестве шаблона можно использовать `src/schemas/Message.ts`

Генератор сообщений находится в разработке [на этом репозитории](https://github.com/nikkoxd/stella-embed-builder).

## Собственный перевод

Для добавления новых переводов, необходимо перейти в `/locales`,
создать папку с кодом языка
и создать в ней JSON-файл `translation.json`, после чего
предзагрузить свой перевод в `/src/index.ts`:

```ts
...
i18next.use(I18NexFsBackend).init<FsBackendOptions>(
  {
    lng: process.env.LANGUAGE,
    fallbackLng: "en",
    preload: ["en", "ru"], // add the language code here
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },
  },
  (err, t) => {
    if (err) return client.logger.error(err);
    client.logger.info("i18next is ready...");
  },
);
...
```

## Лицензия

Этот проект распространяется под лицензией [GNU General Public License v3.0][license]

[license]: https://github.com/nikkoxd/stella/blob/main/LICENSE
