# [IT-чемпионат нефтяной отрасли](https://it-oilchamp.ru/)
Репозиторий посвящен первому ИТ-чемпионату нефтяной отрасли.  
В отборочном этапе приняли участие 38 команд, 10 состязались в 48-ми часовом хакатоне  и 9 защищали свое решение в финале.  
 
[Результаты финала](https://it-oilchamp.ru/tpost/xatudkm391-rezultati-finala)  
1. место команда NESTRO TECH (Зарубежнефть) 32,2 балла 
1. **место команда Прометей (Газпром нефть - ЦР) 31,83 балла**
1. место команда Drill IT (Газпром) 28,27 баллов 

# Система: "Огонь"
Демо стенд решения доступен по [ссылке](https://it-championship-oil-industry-public.vercel.app/)
## Команда "Прометей" (ООО "Газпром-нефть ЦР")
![Команда "Прометей"](./docs/team.jpg)  
Благодарим экспертов за ценные комментарии на ХАКАТОНЕ, представляем вам Прототип системы обеспечения непрерывности Центра управления строительством скважин.

## Содержание
- [Видеопрезентация](#1)  
- [Цель прототипа](#2)  
- [Реализация](#3)  
- [Поддержка](#4)  
- [Целевое видение системы](#5)  
- [Руководство по эксплуатации](#6)  
- [Запуск проекта](#7)  
- [Разворачивание проекта в Yandex Cloud - Object Store](#8)

<a name="1"></a>
## Видеопрезентация
https://youtu.be/DArgKqUDBbM
[![Watch the video](https://img.youtube.com/vi/DArgKqUDBbM/maxresdefault.jpg)](https://youtu.be/DArgKqUDBbM)

<a name="2"></a>
## Цель прототипа
Цель прототипа предоставить интерфейс для работы с математической моделью, попробовать оценить различные конфигурации ИТ-ресурсов и оценить различные сценарии отказов.

<a name="3"></a>
## Реализация
Веб-приложение, в которое заложены алгоритмы оценки ущерба и анализа различных сценариев без сохранения в базу данных. Пользователь может сохранять свои данные в файл, затем возвращаться к веб-приложению и продолжать работать с ранее сохраненными конфигурациями и сценариями, а также делиться ими с другими пользователями. В решении использована сторонняя библиотека go.js для визуализации диаграммы дерева отказов и React.js - JavaScript-библиотека для создания пользовательских интерфейсов.

<a name="4"></a>
## Поддержка
Достаточно, чтобы функционировал веб-сервер с фронт-энд частью. Сложное конфигурирование фронт-энд части не требуется. На этапе MVP можно получать пользу от продукта без дополнительной регистрации и специального обучения пользователей. Интерфейс интуитивный.

<a name="5"></a>
## Целевое видение системы
![Целевое видение системы](./docs/architecture.jpg)
Cистема клиент-серверного исполнения, многопользовательская, идентификация и авторизация пользователей через AD, распределение нагрузки при расчете, централизованное хранение данных. Stateless компоненты упакованы в контейнеры на корпоративной платформе контейнеризации. Statefull компонент - база данных - на корпоративной платформе виртуализации с организованной системой резервного копирования.

В целевом виде развертывание системы будет производиться автоматически на основе созданных сценариев DSO. Аналогичным образом будет производиться установка обновлений. В ходе сборки приложения подразумевается выполнение сценариев автоматического тестирования.

Целевое содержание функций системы:
![Целевое содержание функций системы](./docs/functional-model.png)

<a name="6"></a>
## Руководство по эксплуатации
1. Добавьте  элементы дерева отказов в одноименном разделе.
2. Перейдите в раздел "Варианты дерева отказов". Введите с клавиатуры название новой конфигурации и нажмите "+" - добавится пустое дерево отказов, в которое вы можете добавить элементы и установить между ними связи. Вы можете перетаскивать элементы на поле диаграммы. Также вы можете приближать или отдалять области дерева для более удобной работы. Для этого можно зажать клавишу Ctrl и прокручивать колесо мыши вперед/назад.
3. Перейдите в раздел "Сценарии отказов" и для новой конфигурации добавьте сценарий, также вы можете задать имя сценария.
4. По умолчанию сценарий заполняется для оценки слабых мест конфигурации и максимальных простоев. Вы можете активировать Сценарий частичного отказа (кнопка) и затем вручную задать отказавший узел путем ввода тестового RTO. Далее сможете по дереву отказов оценить влияние этого узла на бизнес. Как и при работе с деревом, у вас есть возможность приближать или отдалять области дерева для более удобной работы.

<a name="7"></a>
## Запуск проекта в Linux или Windows
- Убедитесь, что установлены следующие компоненты:
    ```
    nodejs@14
    yarn@1.22
    ``` 
- Выполните следующие команды:
    - Перейдите в папку front-end части проекта:  
    `$ cd front`
    -  Установите зависимости:  
    `$ yarn`
    - Запустите сервер:  
    `$ yarn start`
    
После запуска сервера откроется браузер по адресу:  
[http://localhost:3000](http://localhost:3000)

<a name="8"></a>
## Разворачивание проекта в Yandex Cloud - Object Store
- Создайте в консоли управления `Yandex Cloud` сервисный аккаунт и укажите роль `storage.editor` 
- Создайте в консоли управления `Yandex Cloud` в разделе `Object Store` новый `бакет`
- Включите режим `Веб-сайт` в настройках `бакета` 
- Создайте три секрета в настройках репозитория на `GitHub` 
  - `ACCESS_KEY_ID` - идентификатор ключа сервисного аккаунта
  - `SECRET_ACCESS_KEY` - секретный ключ сервисного аккаунта
  - `BUCKET` - название `бакета`
- Отправьте изменения в ветку `main`

Ход сборки приложения можно увидеть в репозитории на вкладке `Actions`.
После сборки приложение будет доступно по адресу указанному в настройках `Веб-сайта` `бакета`.  
Изменить поведение сборки можно в файле `.github/workflows/yandex-bucket.yml`
