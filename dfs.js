function dfs(startX, startY, endX, endY, gridSize) {
    const visited = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false));
    const path = [];
    const visitedPath = [];
    if (dfsHelper(startX, startY, endX, endY, visited, path, visitedPath, gridSize)) {
        return [path, visitedPath];
    } else {
        return [];
    }
}

function dfsHelper(x, y, endX, endY, visited, path, visitedPath, gridSize) {
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize || visited[x][y] || document.getElementById(`block-${x}-${y}`).classList.contains('wall')) {
        return false;
    }

    visited[x][y] = true;
    visitedPath.push({ x, y });
    path.push({ x, y });

    if (x === endX && y === endY) {
        return true;
    }

    if (dfsHelper(x + 1, y, endX, endY, visited, path, visitedPath, gridSize) || dfsHelper(x - 1, y, endX, endY, visited, path, visitedPath, gridSize) || dfsHelper(x, y + 1, endX, endY, visited, path, visitedPath, gridSize) || dfsHelper(x, y - 1, endX, endY, visited, path, visitedPath, gridSize)) {
        return true;
    }

    path.pop();
    return false;
}
