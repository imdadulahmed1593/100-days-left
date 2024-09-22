// Days generation and achievements tracking
const startDate = new Date("2024-09-23");
const cardGrid = document.querySelector('.card-grid');

// Create 100 cards
for (let i = 100; i > 0; i--) {
    let date = new Date(startDate);
    date.setDate(date.getDate() + (100 - i));
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <h3>Day ${i}</h3>
                <p>${date.toDateString()}</p>
            </div>
            <div class="card-back">
                <input type="text" placeholder="Add achievement">
                <button onclick="addAchievement(this)">Add</button>
                <ul class="scrollable-list"></ul>
            </div>
        </div>
    `;
    
    // Event listener for card flip
    card.addEventListener('click', (event) => {
        // Prevent flip if the click is on the input field or button
        if (event.target.tagName.toLowerCase() === 'input' || event.target.tagName.toLowerCase() === 'button') {
            return;
        }
        card.classList.toggle('flip');
    });

    cardGrid.appendChild(card);
}

// Add achievement to the list
function addAchievement(button) {
    const input = button.previousElementSibling;
    const achievement = input.value;
    const list = button.nextElementSibling;

    if (achievement) {
        const listItem = document.createElement('li');
        listItem.textContent = achievement;
        list.appendChild(listItem);
        input.value = ''; // Clear input field

        // Save to local storage
        const cardIndex = Array.from(cardGrid.children).indexOf(button.closest('.card'));
        saveAchievements(cardIndex, achievement);
    }
}

// Save achievements in local storage
function saveAchievements(index, achievement) {
    const storedData = JSON.parse(localStorage.getItem('achievements')) || {};
    if (!storedData[index]) storedData[index] = [];
    storedData[index].push(achievement);
    localStorage.setItem('achievements', JSON.stringify(storedData));
}

// Load achievements when page loads
function loadAchievements() {
    const storedData = JSON.parse(localStorage.getItem('achievements')) || {};
    Object.keys(storedData).forEach(index => {
        const card = cardGrid.children[index];
        const list = card.querySelector('.scrollable-list');
        storedData[index].forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
    });
}
window.onload = loadAchievements;
