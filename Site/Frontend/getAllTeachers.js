let data = []; // Используйте let, чтобы иметь возможность переназначать

document.getElementById('getRequestButton').addEventListener('click', async function() {
    const response = await fetch('http://localhost:442/api/InitialsTeachers', {
        method: 'GET',
        
    });

    

    data = await response.json(); // Получаем и парсим данные
    console.log(data); 

    const teachersList = document.getElementById('teachersList');
    teachersList.innerHTML = '';

    const teachersListFiltered = document.getElementById('teachersListFiltered');
    teachersListFiltered.innerHTML = '';

    // Создаем элементы списка для отображения всех учителей
    data.forEach(teacher => {
        const listItem = document.createElement('li');
        listItem.textContent = teacher.initials + ' ' + teacher.registration_number;
        teachersList.appendChild(listItem);
    });

    // Функция для фильтрации
    function filterTeachers(filterValue) {
        const filteredData = data.filter(teacher => 
            String(teacher.registration_number).toLowerCase().includes(filterValue.toLowerCase())
        );
        
        // Очищаем список фильтров и добавляем новые элементы
        teachersListFiltered.innerHTML = '';
        filteredData.forEach(teacher => {
            const listItem = document.createElement('li');
            listItem.textContent = teacher.initials + ' ' + teacher.registration_number;
            teachersListFiltered.appendChild(listItem);
        });
    }

    // Добавляем кнопку фильтрации
    const filterButton = document.createElement('button');
    filterButton.textContent = 'Поиск';
    filterButton.onclick = () => {
        const filterValue = prompt("Введите номер регистрации для фильтрации:");
        if (filterValue !== null && !isNaN(filterValue)) {
            filterTeachers(filterValue);
        }
    };

    // Кнопка фильтрации по убыванию
    const filterButtonToLower = document.createElement('button');
    filterButtonToLower.textContent = 'Фильтр по убыванию номеров';
    filterButtonToLower.onclick = () => {
        const sortedData = [...data].sort((a, b) => parseInt(b.registration_number) - parseInt(a.registration_number));
        refreshFilteredList(sortedData);
    };

    // Кнопка фильтрации по возрастанию
    const filterButtonToUpper = document.createElement('button');
    filterButtonToUpper.textContent = 'Фильтр по возрастанию номеров';
    filterButtonToUpper.onclick = () => {
        const sortedData = [...data].sort((a, b) => parseInt(a.registration_number) - parseInt(b.registration_number));
        refreshFilteredList(sortedData);
    };

    // Добавляем кнопки в список
    teachersList.appendChild(filterButton);
    teachersList.appendChild(filterButtonToLower);
    teachersList.appendChild(filterButtonToUpper);
});

// Функция для обновления списка фильтрации
function refreshFilteredList(teachers) {
    const teachersListFiltered = document.getElementById('teachersListFiltered');
    teachersListFiltered.innerHTML = '';
    teachers.forEach(teacher => {
        const listItem = document.createElement('li');
        listItem.textContent = teacher.initials + ' ' + teacher.registration_number;
        teachersListFiltered.appendChild(listItem);
    });
}
