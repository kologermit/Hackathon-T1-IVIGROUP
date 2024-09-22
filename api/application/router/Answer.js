class Answer {
    ERRORS = {
        400 : 'Bad Request',                     // Указаны не все параметры
        401 : 'Unauthorized',                    // Неавторизованный запрос(неверный токен)
        403 : 'Forbidden',                       // Неверный логин или пароль
        405 : 'Method Not Allowed',              // Метод не указан
        411 : 'Length Required',                 // Длина превышает лимит
        413 : 'Invalid login(nickname)',         // Неверный формат логина
        422 : 'Invalid parameter values',        // Невалидные значения параметров
        501 : 'Not Implemented',                 // Метод не реализован на сервере
        503 : 'DB Unavailable',                  // Не удалось подключиться к базе данных
    }

    good(data) {
        return {
            result: 'ok',
            data,
        }
    }

    bad(code) {
        code = code && this.ERRORS[code] ? code : 9000;
        return {
            result: 'error',
            error: {
                code,
                text: this.ERRORS[code]
            }
        }
    }
}

module.exports = Answer;