const addTeacherButton = document.getElementById('addTeacherButton');
addTeacherButton.addEventListener('click', async function() {
    const teacherName = document.getElementById('teacherName').value;
    const registrationNumber = document.getElementById('registrationNumber').value;

    const response = await fetch('https://localhost:7249/api/InitialsTeachers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ initials: teacherName, registration_number: registrationNumber }) // Передаем имя преподавателя в формате JSON
    });

    if (response.ok) {
        const addedTeacher = await response.json();
        console.log('Добавлен преподаватель:', addedTeacher);
        alert('Преподаватель успешно добавлен!');
    } else {
        console.error('Ошибка при добавлении преподавателя');
        alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }
});