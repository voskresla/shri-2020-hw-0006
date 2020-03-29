// TODO: добавить везде обработку статусов ответа yandex-api и обработку ошибок
// в целом

// TODO: возможно добваить протенький стейт для настроек чтобы отовсюду до него
// можно было достучаться

// TODO: добавить проверку на репозиторий при запуске билда из очереди. Вдруг
// репы то и нет еще или клон упал в процессе.

const express = require("express");

const path = require("path");
const yndx_db_api = require("./api/yndx_ci");
const { settingsRoutes, buildsRoutes } = require("./routes");
const { differenceInMilliseconds } = require("date-fns");
const cors = require("cors");
const PORT = 3001;

const log = `Starting type checking and linting service...
Using 1 worker with 2048MB memory limit
Hash: d54ed20309f352b3bda76cbbb6d272ed6afde438bd7a265eb08db3624c32dfc883a8c379c67f4de6
Version: webpack 4.41.6
Child
    Hash: d54ed20309f352b3bda7
    Time: 40364ms
    Built at: 2020-02-23 16:04:54
                                     Asset      Size  Chunks             Chunk Names
                       0.bundle.static.css  1.31 MiB       0  [emitted]  vendors~main
                        0.bundle.static.js  10.3 MiB       0  [emitted]  vendors~main
                         bundle.static.css  48.6 KiB       1  [emitted]  main
                          bundle.static.js   613 KiB       1  [emitted]  main
             static/media/Cat.afa2191f.svg  9.83 KiB          [emitted]  
    static/media/illustration.a17c1b18.svg  14.8 KiB          [emitted]  
         static/media/picture.eef6f3b8.svg  16.2 KiB          [emitted]  
    Entrypoint main = 0.bundle.static.css 0.bundle.static.js bundle.static.css bundle.static.js
    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
    [./src/account/actions/index.ts] 2.46 KiB {1} [built]
    [./src/account/api/lib/models/index.ts] 2.17 KiB {1} [built]
    [./src/account/api/lib/models/mappers.ts] 21 KiB {1} [built]
    [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {1} [built]
    [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {1} [built]
    [./src/account/epics/index.ts] 328 bytes {1} [built]
    [./src/account/epics/pageData.ts] 834 bytes {1} [built]
    [./src/account/epics/personalPage.ts] 2.29 KiB {1} [built]
    [./src/account/epics/registrationForm.ts] 910 bytes {1} [built]
    [./src/account/index.tsx] 561 bytes {1} [built]
    [./src/account/reducers/githubRepos.ts] 837 bytes {1} [built]
    [./src/account/reducers/index.ts] 1.83 KiB {1} [built]
    [./src/account/reducers/serverError.ts] 526 bytes {1} [built]
    [./src/account/store.ts] 1.05 KiB {1} [built]
        + 1864 hidden modules
Child
    Hash: 6cbbb6d272ed6afde438
    Time: 32877ms
    Built at: 2020-02-23 16:04:47
        Asset      Size  Chunks             Chunk Names
    server.js  6.34 MiB    main  [emitted]  main
    Entrypoint main = server.js
    [./src/account/actions/index.ts] 2.46 KiB {main} [built]
    [./src/account/api/lib/models/index.ts] 2.17 KiB {main} [built]
    [./src/account/api/lib/models/mappers.ts] 21 KiB {main} [built]
    [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {main} [built]
    [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {main} [built]
    [./src/account/epics/index.ts] 328 bytes {main} [built]
    [./src/account/epics/pageData.ts] 834 bytes {main} [built]
    [./src/account/epics/personalPage.ts] 2.29 KiB {main} [built]
    [./src/account/epics/registrationForm.ts] 910 bytes {main} [built]
    [./src/account/mappers/index.ts] 2.18 KiB {main} [built]
    [./src/account/reducers/githubRepos.ts] 837 bytes {main} [built]
    [./src/account/reducers/index.ts] 1.83 KiB {main} [built]
    [./src/account/reducers/serverError.ts] 526 bytes {main} [built]
    [./src/account/server.tsx] 1.62 KiB {main} [built]
    [./src/account/store.ts] 1.05 KiB {main} [built]
        + 1484 hidden modules`;

const app = express();

app.use(cors());
app.set("json spaces", 1);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/settings", settingsRoutes);
app.use("/api/builds", buildsRoutes);

// NOTE: You define error-handling middleware last, after other app.use() and routes calls; for example:
// app.use(errorHandler);

// NOTE: а где появиться cancel build ?
// Пока что без настоящей очереди. Забирает последние 25 тупо каждый раз и берет
// первый Waiting оттуда. Отправляет его на build.

const queue = require("./util/queue");

// Пока проверяем только первые 100
// TODO: придумать как красиво решить вопрос бхода всего листа, вдруг где-то
// затисались Waitnig билды.
const tmpTimer = setInterval(() => {
  // console.log("Проверяем build/list");
  yndx_db_api.get("/build/list", { params: { limit: 100 } }).then(buildList => {
    const builds = buildList.data.data.filter(
      build => build.status === "Waiting"
    );
    // console.log(builds);
    builds.forEach(build => {
      const buildId = build.id;

      const dateTime = new Date();

      const jobFn = function() {
        let duration = undefined;
        let success = undefined;
        return yndx_db_api
          .post("/build/start", { buildId, dateTime })
          .then(async r => {
            await new Promise(r =>
              setTimeout(
                r,
                Math.floor(Math.random() * (500000 - 2000 + 1) + 2000)
              )
            );
            duration = differenceInMilliseconds(new Date(), dateTime);
            success = Boolean(Math.floor(Math.random() * Math.floor(2)));
            const buildLog = log;

            return yndx_db_api.post("/build/finish", {
              buildId,
              duration,
              success,
              buildLog
            });
          })
          .then(r => {
            return Promise.resolve({ name: buildId, duration, success });
          })
          .catch(err => {
            console.log(err);
          });
      };

      queue.add({
        name: buildId,
        fn: jobFn
      });
    });
  });
}, 10000);

app.listen(PORT, () => console.log("Server listening at port: ", PORT));
