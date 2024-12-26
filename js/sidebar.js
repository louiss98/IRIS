document.addEventListener('DOMContentLoaded', () => {
    fetch('commands.json')
        .then(response => response.json())
        .then(commands => {
            const standardContent = document.getElementById('content-standard');
            
            // Clear existing content
            standardContent.innerHTML = '';
            
            // Create cells for each command
            commands.forEach(cmd => {
                const cell = document.createElement('div');
                cell.className = 'sidebar-cell';
                cell.innerHTML = `
                    <div class="cell-header">
                        <span class="cell-title">${cmd.name}</span>
                        <img src="${cmd['img-path'] || 'assets/icons/default-icon.png'}" alt="Icon" class="cell-icon">
                    </div>
                    <p class="cell-description">${cmd.description}</p>
                `;
                standardContent.appendChild(cell);
            });
        })
        .catch(error => console.error('Error loading commands:', error));
});