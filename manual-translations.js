document.addEventListener('DOMContentLoaded', (event) => {
    loadEntries();
});

function addEntry() {
    const findText = document.getElementById('findText').value.trim();
    const replaceText = document.getElementById('replaceText').value.trim();

    if (findText === '' || replaceText === '') {
        alert('Both fields are required!');
        return;
    }

    const table = document.getElementById('translationTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).textContent = findText;
    newRow.insertCell(1).textContent = replaceText;
    const removeCell = newRow.insertCell(2);
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => newRow.remove();
    removeCell.appendChild(removeButton);

    document.getElementById('findText').value = '';
    document.getElementById('replaceText').value = '';
}

function saveEntries() {
    const rows = document.getElementById('translationTable').getElementsByTagName('tbody')[0].rows;
    const entries = [];

    for (let i = 0; i < rows.length; i++) {
        const findText = rows[i].cells[0].textContent;
        const replaceText = rows[i].cells[1].textContent;
        entries.push({ find: findText, replace: replaceText });
    }

    localStorage.setItem('translationEntries', JSON.stringify(entries));
    alert('Entries saved!');
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('translationEntries')) || [];
    const table = document.getElementById('translationTable').getElementsByTagName('tbody')[0];

    entries.forEach(entry => {
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = entry.find;
        newRow.insertCell(1).textContent = entry.replace;
        const removeCell = newRow.insertCell(2);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => newRow.remove();
        removeCell.appendChild(removeButton);
    });
}
function goBack() {
    window.location.href = 'index.html';
}
