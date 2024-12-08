

document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('https://localhost:7249/api/InitialsTeachers');
    const data = await response.json();

    const teachersSelect = document.getElementById('teachersSelect');
    teachersSelect.innerHTML = '';

    data.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.registration_number;
        option.text = teacher.initials + ' - ' + teacher.registration_number;
        option.id = teacher.id;
        teachersSelect.appendChild(option);
    });
});

document.getElementById('teachersSelect').addEventListener('change', function() {
    const selectedTeacherNumber = this.value;
    const selectedTeacherText = this.options[this.selectedIndex].text;
    const selectedTeacherId = this.options[this.selectedIndex].id;

    alert('Выбранный преподаватель: ' + selectedTeacherText + ' с номером ' + selectedTeacherNumber + ' и id ' + selectedTeacherId + ' массив - ');
});

