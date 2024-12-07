// Массив дней, который берется из HTML
const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Определяем объект для отправки данных
const daysData = {
    daysID: 1,
    teachersID: 123,
    days: daysArray
};

// Проверяем, существует ли запись для указанного daysID
fetch('api/DaysOfTheMonth/' + daysData.daysID)
    .then(response => {
        if (response.ok) {
            // Если запись существует, отправляем данные по методу PUT
            fetch('api/DaysOfTheMonth/' + daysData.daysID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(daysData)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Данные успешно обновлены');
                } else {
                    console.error('Ошибка обновления данных');
                }
            })
            .catch(error => console.error('Произошла ошибка:', error));
        } else {
            // Если запись не существует, отправляем данные по методу POST
            fetch('api/DaysOfTheMonth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(daysData)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Данные успешно созданы');
                } else {
                    console.error('Ошибка создания данных');
                }
            })
            .catch(error => console.error('Произошла ошибка:', error));
        }
    })
    .catch(error => console.error('Произошла ошибка:', error));