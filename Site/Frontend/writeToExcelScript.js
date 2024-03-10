document.getElementById('writeToExcelButton').addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:7249/api/Excel/writeToExcel', true);
    
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert( xhr.response);
        } else {
            alert('Ошибка при записи в Excel. Код ошибки: ' + xhr.status);
        }
    };
    


    xhr.onerror = function() {
        alert('Произошла ошибка при выполнении запроса.');
    };
    
    xhr.send();
});