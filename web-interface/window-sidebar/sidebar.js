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

/**
 * Adds a new message to the chat container with optional text or button cells.
 * @param {string} profileImg - URL for the profile icon
 * @param {Array<object>} cells - Array of cell objects: { type: 'text'|'button', content: '...', title?: '...', description?: '...', icon?: '...' }
 */









function addMessage(profileImg, cells) {
  const chatContainer = document.querySelector('.chat-container');
  if (!chatContainer) return;

  const messageEl = document.createElement('div');
  messageEl.classList.add('message');

  const iconEl = document.createElement('img');
  iconEl.src = profileImg;
  iconEl.classList.add('profile-icon');
  messageEl.appendChild(iconEl);

  const contentEl = document.createElement('div');
  contentEl.classList.add('message-content');
  messageEl.appendChild(contentEl);

  let currentCellIndex = 0;

  function typeNextCell() {
    if (currentCellIndex >= cells.length) return;

    const cell = cells[currentCellIndex];
    
    if (cell.type === 'text') {
      const textCell = document.createElement('div');
      textCell.classList.add('text-cell');
      contentEl.appendChild(textCell);

      let charIndex = 0;
      const text = cell.content;

      function typeChar() {
        if (charIndex < text.length) {
          textCell.textContent += text[charIndex];
          charIndex++;
          setTimeout(typeChar, 4);
        } else {
          currentCellIndex++;
          setTimeout(typeNextCell, 500);
        }
      }

      typeChar();
    } else if (cell.type === 'button') {
      const buttonCell = document.createElement('div');
      buttonCell.classList.add('button-cell');

      if (cell.icon) {
        const btnIcon = document.createElement('img');
        btnIcon.src = cell.icon;
        buttonCell.appendChild(btnIcon);
      }

      const cellContent = document.createElement('div');
      cellContent.classList.add('button-cell-content');

      if (cell.title) {
        const titleEl = document.createElement('div');
        titleEl.classList.add('button-cell-title');
        titleEl.textContent = cell.title;
        cellContent.appendChild(titleEl);
      }

      if (cell.description) {
        const descEl = document.createElement('div');
        descEl.classList.add('button-cell-description');
        descEl.textContent = cell.description;
        cellContent.appendChild(descEl);
      }

      buttonCell.appendChild(cellContent);
      contentEl.appendChild(buttonCell);
      
      currentCellIndex++;
      setTimeout(typeNextCell, 500);
    }
  }

  chatContainer.appendChild(messageEl);
  typeNextCell();
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Example usage:
function initializeChat() {
  addMessage('assets/icons/profile1.png', [
    {
      type: 'text',
      content: `
      Welcome to the Central Connecticut State University Robot Interface App for the Unitree GO2 EDU! ✨
    
    This software is designed to make controlling and programming the Unitree GO2 EDU robot accessible to everyone, regardless of experience.
    
    Since this is your first time using the robot, we'll guide you through our tutorial to get you started.
    
    If you have any further questions, contact @AISupportTeam on Teams.
    
    We hope you enjoy using the Unitree GO2 EDU Robot Interface Application. Happy coding!
    
    - AI Support Team
    `
    },
    {
      type: 'button',
      icon: 'assets/icons/u-turn-left.png',  // Check this path
      title: 'Perform Backflip',
      description: 'Make the robot do a backflip!'
    }
  ]);
}

document.addEventListener('DOMContentLoaded', initializeChat);