const maze = document.getElementById('maze');
const gridSize = 10;
let start = { x: -1, y: -1 };
let end = { x: -1, y: -1 };
let selectingStart = false;
let selectingEnd = false;

// Create the maze grid
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const block = document.createElement('div');
        block.className = 'block';
        block.id = `block-${i}-${j}`;
        block.addEventListener('click', () => {
            if (selectingStart) {
                selectingStart = false;
                setStart(i, j, start.x, start.y);
            } else if (selectingEnd) {
                selectingEnd = false;
                setEnd(i, j, end.x, end.y);
            } else {
                toggleBlock(i, j);
            }
        });
        maze.appendChild(block);
    }
}

// Function to toggle between wall and empty block
function toggleBlock(x, y) {
    const block = document.getElementById(`block-${x}-${y}`);
    if (block.classList.contains('start') || block.classList.contains('end')) return;

    block.classList.toggle('wall');
}

// Function to set a block to the start state
function setStart(newX, newY, oldX, oldY) {
    start = { x: newX, y: newY };
    try {
        document.getElementById(`block-${oldX}-${oldY}`).classList.remove('start');
    } catch (e) {
        //Can just ignore if error
    }
    document.getElementById(`block-${newX}-${newY}`).classList.add('start');
}

// Function to set a block to the end state
function setEnd(newX, newY, oldX, oldY) {
    end = { x: newX, y: newY };
    try {
        document.getElementById(`block-${oldX}-${oldY}`).classList.remove('end');
    } catch (e) {
        //Can just ignore if error
    }
    document.getElementById(`block-${newX}-${newY}`).classList.add('end');
  
}

// Function which tells code we are selecting start block
function selectStartPosition() {
    selectingStart = true;
    selectingEnd = false
}

// Function which tells code we are selecting end block
function selectEndPosition() {
    selectingEnd = true;
    selectingStart = false
}

// Function that resets all blocks to empty
function clearMaze() {
    document.querySelectorAll('.block').forEach(block => {
        block.classList.remove('visited', 'path', 'wall', 'start', 'end', 'start_final', 'end_final');
    });
    setStart(-1, -1, start.x, start.y);
    setEnd(-1, -1, end.x, end.y);
}

function clearPath() {
    document.querySelectorAll('.block').forEach(block => {
        block.classList.remove('visited','path');
    });
}

function startBFS() {
    clearPath();
    const path = bfs(start.x, start.y, end.x, end.y, gridSize);
    visualizeVisited(path[1]);
    setTimeout(() => {visualizePath(path[0])}, path[1].length * 100);
}

function startDFS() {
    clearPath();
    const path = dfs(start.x, start.y, end.x, end.y, gridSize);
    visualizeVisited(path[1]);
    setTimeout(() => {visualizePath(path[0])}, path[1].length * 100);
    
    
}

function startAStar() {
    clearPath();
    const path = aStar(start.x, start.y, end.x, end.y, gridSize);
    visualizeVisited(path[1]);
    setTimeout(() => {visualizePath(path[0])}, path[1].length * 100);
}


function visualizePath(path) {
    path.forEach(({ x, y }, index) => {
        setTimeout(() => {
            const block = document.getElementById(`block-${x}-${y}`);
            if (!block.classList.contains('start') && !block.classList.contains('end')) {
                if(block.classList.contains('visited')) {
                    block.classList.remove('visited');
                }
                block.classList.add('path');
            }
            else if (block.classList.contains('start')) {
                block.classList.add('start_final');
            }
            else if (block.classList.contains('end')) {
                block.classList.add('end_final');
            }

        }, index * 100);
    });
    
}

function visualizeVisited(visited) {
    visited.forEach(({ x, y }, index) => {
        setTimeout(() => {
            const block = document.getElementById(`block-${x}-${y}`);
            if (!block.classList.contains('start') && !block.classList.contains('end')) {
                block.classList.add('visited');
            }

        }, index * 100);
    });
}

