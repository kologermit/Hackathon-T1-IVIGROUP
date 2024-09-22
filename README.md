# IV GROUP SDK - SDK для голосования за новые 

## Структура проекта
- Серверная часть
    - Разделение на сервисы
        - База данных (MySQL)
        - Авторизация (Goolang)
        - API (NodeJS)
        - Веб сервер (Nginx)
    - Запуск сервисов (Docker Compose)
- Клиентская часть
    - Сайт администрирования (React+JS)
    - Сайт пользователя (React+JS)
    - Документация к API (Swagger-UI)
- Размещение
    - Проект размещается на собственном арендованном сервере

## Используемые технологии:
- [GoLang](https://golang.org/)
- [MySQL](https://www.oracle.com/mysql/what-is-mysql/)
- [React](https://reactjs.org/)
- [Docker](https://www.docker.com/)
- [Docker-compose](https://docs.docker.com/compose/)
- [Nginx](https://nginx.org/)
- [NodeJS](https://nodejs.org/en/)

## Первый запуск сервера
### Необходимые программы
- [Docker Compose](https://docs.docker.com/compose/install/linux/)
- [NodeJS](https://nodejs.org/en/download/package-manager)

### Настройка окружения:
- Создайте файл .env в корне проекта
- Заполните его следующими переменными:
```env
# База данных
DB_USER=admin
DB_PASSWORD=qwerty
DB_NAME=sdk
DB_ROOT_PASSWORD=qwerty
EXTERNAL_PORT_DB=3306

# Веб сервер
EXTERNAL_PORT_BALANCED_API=82
EXTERNAL_PORT_ADMIN=81
EXTERNAL_PORT_CLIENT=80

# API
EXTERNAL_PORT_API=8000

# Документация
EXTERNAL_PORT_DOC=8001
HOST=localhost
```

### Сборка клиена админа
- В терминале перейдите в папку client/admin
```bash
cd client/admin
```
- Установите необходимые модули
```bash
npm install
```
- Собирите клиент
```bash
npm run build
```

### Сборка клиена пользователя
- В терминале перейдите в папку client/user
```bash
cd client/user
```
- Установите необходимые модули
```bash
npm install
```
- Собирите клиент
```bash
npm run build
```
### Запуск
В коневой папке проетк запустить
```bash
docker compose up -d
```
### Результат
- Приложение запускается около 30с
- http://localhost/  - клиент пользователя
- http://localhost:81/ - клиет админа
- http://localhost:82/ - API через nginx
- http://localhost:8000/ - API
- http://localhost:8001/ - документация
- БД
    - Хост: localhost
    - Порт: 3306
    - Пользователь: admin
    - Имя базы: sdk
    - Пароль: qwerty

## Авторы
- Павлов Никита
- Власов Фёдор
- Кологерманский Фёдор
- Лавринович Андрей