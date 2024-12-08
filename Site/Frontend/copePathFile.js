function sendFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    fetch('https://localhost:7249/api/Excel/writeToExcel', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.text();
        }
        if(response.status == 400)
        {
            alert(response.status + "  " + response.text);
        }
        throw new Error('Что-то пошло не так');
    }).then(data => {
        alert(data);
    }).catch(error => {
        console.error(error);
    });
}