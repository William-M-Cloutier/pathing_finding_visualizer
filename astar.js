function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function aStar(startX, startY, endX, endY, gridSize) {
    const openSet = [];
    const closedSet = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false));
    const cameFrom = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
    const gScore = new Array(gridSize).fill(Infinity).map(() => new Array(gridSize).fill(Infinity));
    const fScore = new Array(gridSize).fill(Infinity).map(() => new Array(gridSize).fill(Infinity));
    const visitedPath = [];

    openSet.push({ x: startX, y: startY });
    visitedPath.push({ startX, startY });
    gScore[startX][startY] = 0;
    fScore[startX][startY] = manhattanDistance(startX, startY, endX, endY);

    while (openSet.length > 0) {
        let current = openSet[0];
        let currentIndex = 0;

        openSet.forEach((node, index) => {
            if (fScore[node.x][node.y] < fScore[current.x][current.y]) {
                current = node;
                currentIndex = index;
            }
        });

        if (current.x === endX && current.y === endY) {
            return [reconstructPath(cameFrom, current), visitedPath];
        }

        openSet.splice(currentIndex, 1);
        closedSet[current.x][current.y] = true;

        const neighbors = getNeighbors(current.x, current.y, gridSize);
        neighbors.forEach(neighbor => {
            if (closedSet[neighbor.x][neighbor.y] || document.getElementById(`block-${neighbor.x}-${neighbor.y}`).classList.contains('wall')) {
                return;
            }

            const tentativeGScore = gScore[current.x][current.y] + 1;

            if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                openSet.push(neighbor);
                visitedPath.push(neighbor);
            } else if (tentativeGScore >= gScore[neighbor.x][neighbor.y]) {
                return;
            }

            cameFrom[neighbor.x][neighbor.y] = current;
            gScore[neighbor.x][neighbor.y] = tentativeGScore;
            fScore[neighbor.x][neighbor.y] = gScore[neighbor.x][neighbor.y] + manhattanDistance(neighbor.x, neighbor.y, endX, endY);
        });
    }

    return [];
}

function getNeighbors(x, y, gridSize) {
    const neighbors = [];
    if (x > 0) neighbors.push({ x: x - 1, y });
    if (x < gridSize - 1) neighbors.push({ x: x + 1, y });
    if (y > 0) neighbors.push({ x, y: y - 1 });
    if (y < gridSize - 1) neighbors.push({ x, y: y + 1 });
    return neighbors;
}

function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom[current.x][current.y]) {
        current = cameFrom[current.x][current.y];
        path.push(current);
    }
    return path.reverse();
}
