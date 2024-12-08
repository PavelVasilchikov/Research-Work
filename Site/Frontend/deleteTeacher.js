
document.addEventListener('DOMContentLoaded', async function() {

    const response = await fetch('http://localhost:442/api/InitialsTeachers');
    const data = await response.json();
    console.log('Данные из API:', data);


    const teachersSelect = document.getElementById('deleteTeachers');
    teachersSelect.innerHTML = '';

    data.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.registration_number;
        option.text = teacher.initials + ' - ' + teacher.registration_number;
        option.id = teacher.id;
        teachersSelect.appendChild(option);
    });
});

document.getElementById('deleteTeachers').addEventListener('change', function() {
     const selectedTeacherId = this.options[this.selectedIndex].id;
     console.log(selectedTeacherId);

     document.getElementById('deleteTeacherButton').addEventListener('click', async function() {
    alert('click');
    await fetch(`http://localhost:442/api/InitialsTeachers/${selectedTeacherId}`, {
        method: 'DELETE'
        
    });

    updateTeacherList();
});
});

async function updateTeacherList() {
    const response = await fetch('http://localhost:442/api/InitialsTeachers');
    const data = await response.json();

    const teachersSelect = document.getElementById('deleteTeachers');
    teachersSelect.innerHTML = '';

    data.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.registration_number;
        option.text = teacher.initials + ' - ' + teacher.registration_number;
        option.id = teacher.id;
        teachersSelect.appendChild(option);
    });
}