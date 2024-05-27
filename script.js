// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle dark mode
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.container').classList.toggle('dark-mode');
        toggleDarkModeButton.classList.toggle('dark-mode');
    });

    // Function to apply profit/loss classes
    const profitCells = document.querySelectorAll('.data-table .profit, .data-table .loss');
    profitCells.forEach(cell => {
        const value = parseFloat(cell.innerText.replace(/[₹,]/g, ''));
        if (value < 0) {
            cell.classList.add('loss');
            cell.classList.remove('profit');
        } else {
            cell.classList.add('profit');
            cell.classList.remove('loss');
        }
    });

    // Sorting functionality
    document.querySelectorAll('.data-table th[data-sort]').forEach(header => {
        header.addEventListener('click', () => {
            const table = header.parentElement.parentElement.parentElement;
            const tbody = table.querySelector('tbody');
            const rowsArray = Array.from(tbody.querySelectorAll('tr'));
            const index = Array.from(header.parentElement.children).indexOf(header);
            const isAscending = header.classList.toggle('ascending');
            rowsArray.sort((rowA, rowB) => {
                const cellA = rowA.children[index].innerText.replace(/[₹,]/g, '');
                const cellB = rowB.children[index].innerText.replace(/[₹,]/g, '');
                const a = isNaN(cellA) ? cellA : parseFloat(cellA);
                const b = isNaN(cellB) ? cellB : parseFloat(cellB);
                return isAscending ? a > b ? 1 : -1 : a > b ? -1 : 1;
            });
            rowsArray.forEach(row => tbody.appendChild(row));
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.data-table tbody tr');
        rows.forEach(row => {
            const cells = Array.from(row.children);
            const matches = cells.some(cell => cell.innerText.toLowerCase().includes(filter));
            row.style.display = matches ? '' : 'none';
        });
    });

    // Download functionality
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.addEventListener('click', () => {
        const table = document.querySelector('.data-table');
        const rows = Array.from(table.querySelectorAll('tr'));
        const csvContent = rows.map(row => {
            const cells = Array.from(row.children);
            return cells.map(cell => cell.innerText.replace(/,/g, '')).join(',');
        }).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dashboard-data.csv';
        a.click();
        URL.revokeObjectURL(url);
    });
});
