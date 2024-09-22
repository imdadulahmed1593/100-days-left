// Goals tracking for 2024
const goalList = document.getElementById('goalList');

// Add a new goal
function addGoal() {
    const goalInput = document.getElementById('goalInput');
    const goal = goalInput.value;

    if (goal) {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(goal));
        goalList.appendChild(listItem);
        goalInput.value = '';

        // Save to local storage
        saveGoals(goal);
    }
}

// Save goals to local storage
function saveGoals(goal) {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));
}

// Load goals from local storage
function loadGoals() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.forEach(goal => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(goal));
        goalList.appendChild(listItem);
    });
}

window.onload = loadGoals;
