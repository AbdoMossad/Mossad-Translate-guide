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
function exportCSV() {
    const table = document.querySelector('#translationTable');
    const rows = Array.from(table.querySelectorAll('tr'));

    // Extract CSV rows
    const csvContent = '\ufeff' + rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'))
                            .map(cell => `"${cell.textContent.replace(/"/g, '""')}"`)
                            .join(',');
        return cells;
    }).join('\n');

    // Create a blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'translations.csv';
    link.click();
}

function importCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a CSV file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;

        // Handle UTF-8 encoding
        const decoder = new TextDecoder('utf-8');
        const decodedText = decoder.decode(new Uint8Array(text));

        const rows = decodedText.split('\n').map(row => row.split(','));

        // Parse CSV rows and add to the table
        const tableBody = document.querySelector('#translationTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows
        rows.forEach(row => {
            if (row.length >= 2) {
                const find = row[0].replace(/""/g, '"');
                const replace = row[1].replace(/""/g, '"');
                const rowElement = document.createElement('tr');
                rowElement.innerHTML = `<td>${find}</td><td>${replace}</td><td><button onclick="removeEntry(this)">Remove</button></td>`;
                tableBody.appendChild(rowElement);
            }
        });
        saveEntries(); // Save imported entries to local storage
    };
    reader.readAsArrayBuffer(file);
}

function saveEntries() {
    const entries = [];
    const rows = document.querySelectorAll('#translationTable tbody tr');
    rows.forEach(row => {
        const find = row.cells[0].textContent;
        const replace = row.cells[1].textContent;
        entries.push({ find, replace });
    });
    localStorage.setItem('translationEntries', JSON.stringify(entries));
}

