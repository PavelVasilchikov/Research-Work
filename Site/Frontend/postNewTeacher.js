const addTeacherButton = document.getElementById('addTeacherButton');
addTeacherButton.addEventListener('click', async function() {
    const teacherName = document.getElementById('teacherName').value;
    const registrationNumber = document.getElementById('registrationNumber').value;

    const postData = {
        initials: teacherName,
        registration_number: parseInt(registrationNumber),
    };

    const response = await fetch('http://localhost:442/api/InitialsTeachers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData) 
    });

    if (response.ok) {
        const addedTeacher = await response.json();
        console.log('Добавлен преподаватель:', addedTeacher);
        alert('Преподаватель успешно добавлен!');
        updateTeacherList();
    } else {
        const errorText = await response.text();
        console.error('Ошибка при добавлении преподавателя:', response.status, response.statusText, errorText);
        alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }
});

const updateTeacherList = async () => {
        const response = await fetch('http://localhost:442/api/InitialsTeachers', {
            method: 'GET',
        });

        // Проверка на успешный ответ
        if (!response.ok) {
            console.error('Ошибка сети:', response.statusText);
            return;
        }

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
}; // Закрывающая скобка для updateTeacherList

