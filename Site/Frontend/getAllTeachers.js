document.getElementById('getRequestButton').addEventListener('click', async function() {
    const response = await fetch('https://localhost:7249/api/InitialsTeachers');
    const data = await response.json();

    const teachersList = document.getElementById('teachersList');
    teachersList.innerHTML = '';

    data.forEach(teacher => {
        const listItem = document.createElement('li');
        //listItem.textContent = JSON.stringify(teacher);
        listItem.textContent = teacher.initials + teacher.registration_number;
        // listItem.textContent = teacher.registration_number;
        teachersList.appendChild(listItem);
    });
});
