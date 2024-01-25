const container = document.querySelector('.container');
const resetButton = document.getElementById('reset-button');
const gridSizeInput = document.getElementById('grid-size-input');
const toggleModeButton = document.getElementById('toggle-mode-button');
let currentColor = ''; // To store the current background color
let interactions = 0;
let randomColorMode = true;

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(color, percentage) {
    const r = Math.floor(parseInt(color.slice(4, color.indexOf(','))) * (1 - percentage / 100));
    const g = Math.floor(parseInt(color.slice(color.indexOf(',') + 2, color.lastIndexOf(','))) * (1 - percentage / 100));
    const b = Math.floor(parseInt(color.slice(color.lastIndexOf(',') + 2, color.indexOf(')'))) * (1 - percentage / 100));
    return `rgb(${r}, ${g}, ${b})`;
}

function updateSquare(square) {
    if (randomColorMode) {
        const color = getRandomColor();
        square.style.backgroundColor = color;
        currentColor = darkenColor(color, 10 * interactions);
    } else {
        // Set a single color (e.g., lightblue) in this mode
        square.style.backgroundColor = 'lightblue';
    }

    if (interactions < 10) {
        interactions++;
    }
}

function createGrid(numSquares) {
    // Clear the existing grid
    container.innerHTML = '';
    interactions = 0; // Reset interactions

    // Calculate the square size based on the container width
    const squareSize = 480 / numSquares;

    // Create a new grid
    for (let i = 0; i < numSquares; i++) {
        for (let j = 0; j < numSquares; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.width = squareSize + 'px';
            square.style.height = squareSize + 'px';
            container.appendChild(square);

            // Mouse enter event listener for the squares
            square.addEventListener('mouseenter', () => {
                updateSquare(square);
            });
        }
    }
}

// Toggle between random and single color modes
toggleModeButton.addEventListener('click', () => {
    randomColorMode = !randomColorMode;
    createGrid(16);
});

// Initial grid creation
createGrid(16);

resetButton.addEventListener('click', () => {
    const newSize = parseInt(gridSizeInput.value);
    
    if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert('Please enter a valid number between 1 and 100.');
    }
});
