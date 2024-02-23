function bfs(startX, startY, endX, endY, gridSize) {
    const queue = [{ x: startX, y: startY }];
    const visited = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false));
    const cameFrom = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
    const visitedPath = [];
    visited[startX][startY] = true;
    visitedPath.push({ startX, startY });

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.x === endX && current.y === endY) {
            return [reconstructPath(cameFrom, { x: endX, y: endY }), visitedPath];
        }

        const neighbors = getNeighbors(current.x, current.y, gridSize);
        for (const neighbor of neighbors) {
            const { x, y } = neighbor;
            if (!visited[x][y] && !document.getElementById(`block-${x}-${y}`).classList.contains('wall')) {
                visited[x][y] = true;
                visitedPath.push({ x, y });
                cameFrom[x][y] = current;
                queue.push(neighbor);
            }
        }
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
    const path = [];
    while (cameFrom[current.x][current.y]) {
        path.push(current);
        current = cameFrom[current.x][current.y];
    }
    return path.reverse();
}
