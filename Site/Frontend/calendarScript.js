const currentMonthElement = document.getElementById('currentMonth');
const calendarElement = document.getElementById('calendar');
const days = [];

const currentDate = new Date();
const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
currentMonthElement.textContent = currentMonth;

const nextMonthDate = new Date(currentDate);
nextMonthDate.setMonth(currentDate.getMonth() + 1);
nextMonthDate.setDate(0);
const daysInMonth = nextMonthDate.getDate();


let startDay = null;
let endDay = null;

for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;
    day.id = i;
    day.classList.add('day');
    days.push(day);
    calendarElement.appendChild(day);
}
let isMouseDown = false;

calendarElement.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startDay = e.target;
});

calendarElement.addEventListener('mouseover', (e) => {
    if (isMouseDown) {
        endDay = e.target;
        selectDaysInRange();
    }
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    startDay = null;
    endDay = null;
});

function selectDaysInRange() {
    if (startDay && endDay) {
        const startIndex = days.indexOf(startDay);
        const endIndex = days.indexOf(endDay);
        const minIndex = Math.min(startIndex, endIndex);
        const maxIndex = Math.max(startIndex, endIndex);

        days.forEach((day, index) => {
            if (index >= minIndex && index <= maxIndex) {               
                day.classList.add('selected');            
            }           
        });
    }
}

const statusModal = document.querySelector('.status-modal');
let selectedDay = null;
let selectedDayNumber = null;

days.forEach(day => {
    day.addEventListener('click', () => {
        selectedDay = day;
        selectedDayNumber = day.id;
        //day.classList.toggle('selected');
        if(!day.classList.contains('selected'))
        {
            day.classList.add('selected');
            //statusModal.style.display = 'block';  
        }else{
            day.classList.remove('selected');
            //statusModal.style.display = 'none';
        }
               
    });
});

function fillSelectedDays(){
    statusModal.style.display = 'block';     
}


function saveStatus() {

        

    const selectedStatus = document.getElementById('statusSelect').value;
    console.log(selectedStatus);

      
    days.forEach((day, index) => {
        if (day.classList.contains('selected')) {
            selectedDay = day;
            selectedDayNumber = day.id;
            console.log(selectedDay);
            console.log(selectedDayNumber);
            selectedDay.classList.remove('present', 'sick', 'absent', 'selected');
            selectedDay.classList.add(selectedStatus === 'присутствовал' ? 'present' : selectedStatus === 'больничный' ? 'sick' : 'absent');
            selectedDay.textContent = `${selectedDayNumber} - ${selectedStatus}`;
            statusModal.style.display = 'none';
            selectedDay = null;
      
        } 
    });  
}
function cleanChoice() {
    days.forEach((day, index) => {
        if (day.classList.contains('selected')) {
            selectedDay = day;
            selectedDayNumber = day.id;
            selectedDay.classList.remove('present', 'sick', 'absent', 'selected');
            selectedDay.textContent = `${selectedDayNumber}`;
            statusModal.style.display = 'none';
            selectedDay = null;
        } 
    });
} 

function clearSelectedDays() {
    days.forEach((day, index) => {
        if (day.classList.contains('selected')) {
            day.classList.remove('selected');
        } 
    });
}

// Определение функции для сохранения состояния календаря в LocalStorage
function saveCalendarState() {
    const selectedDays = days.filter(day => day.classList.contains('selected')).map(day => {day.id, day.textContent});
    localStorage.setItem('selectedDays', JSON.stringify(selectedDays));
}

// Определение функции для восстановления состояния календаря из LocalStorage
function restoreCalendarState() {
    const selectedDays = JSON.parse(localStorage.getItem('selectedDays')) || [];
    selectedDays.forEach(dayId => {
        const day = days.find(day => day.id === dayId);
        if (day) {
            day.classList.add('selected');
            
        }
    });
}

// Вызываем функцию для восстановления состояния календаря при загрузке страницы
restoreCalendarState();

// Добавляем обработчик событий для сохранения состояния календаря при изменениях
calendarElement.addEventListener('mouseup', () => {
    saveCalendarState();
});

let currentteacherId = null;

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
        currentteacherId = teacher.id;
        teachersSelect.appendChild(option);
    });
});


document.addEventListener('DOMContentLoaded', function() {
const pushButton = document.getElementById('pushDays');
pushButton.addEventListener('click', async function() {
    const daysData = {
        daysID: currentteacherId,
        teachersID: currentteacherId,
        days: days
    };

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
});
});
