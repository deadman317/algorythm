var dx = [0, 0, +1, -1];
var dy = [+1, -1, 0, 0];

export function Astar(Grid, startNode, endNode, N, M) {
  var grid = new Array(N);
  for (let i = 0; i < N; i++) {
    let arr = [];
    for (let j = 0; j < M; j++) {
      arr.push({ gScore: 1e9, x: -1, y: -1 });
    }
    grid[i] = arr;
  }
  let path = [],
    close_list = []; //here close_list means visited Node.
  var open_list = [];
  let h = Math.abs(startNode.x - endNode.x) + Math.abs(startNode.y - endNode.y);
  open_list.push({ f: h, x: startNode.x, y: startNode.y });
  grid[startNode.x][startNode.y].gScore = 0;

  while (open_list.length > 0) {
    var atLeastValueIdx = 0;
    for (let i = 0; i < open_list.length; i++) {
      if (open_list[atLeastValueIdx].f > open_list[i].f) {
        atLeastValueIdx = i;
      }
    }
    var curr_node = open_list[atLeastValueIdx];
    close_list.push(curr_node);
    // to remove
    var newOpen_list = [];
    for (var i = 0; i < open_list.length; i++)
      if (i !== atLeastValueIdx) newOpen_list.push(open_list[i]);
    open_list = newOpen_list;

    // // found the path
    if (curr_node.x === endNode.x && curr_node.y === endNode.y) {
      // grid[x][y].x = curr_node.x;
      // grid[x][y].y = curr_node.y;

      var tmp = { x: curr_node.x, y: curr_node.y };
      path.push({ x: tmp.x, y: tmp.y });

      while (grid[tmp.x][tmp.y].x !== -1 || grid[tmp.x][tmp.y].y !== -1) {
        let tmpX = grid[tmp.x][tmp.y].x;
        let tmpY = grid[tmp.x][tmp.y].y;
        tmp.x = tmpX;
        tmp.y = tmpY;
        path.push({ x: tmp.x, y: tmp.y });
      }
      return { path, close_list, error: "" };
    }

    for (let i = 0; i < 4; i++) {
      let x = dx[i] + curr_node.x;
      let y = dy[i] + curr_node.y;
      if (!(x >= 0 && x < N && y >= 0 && y < M) || Grid[x][y].isWall) continue;

      let newGScore = grid[curr_node.x][curr_node.y].gScore + Grid[x][y].weight;
      let HScore = Math.abs(x - endNode.x) + Math.abs(y - endNode.y);
      let newFScore = newGScore + HScore;

      if (grid[x][y].gScore > newGScore) {
        grid[x][y].gScore = newGScore;
        grid[x][y].x = curr_node.x;
        grid[x][y].y = curr_node.y;
        if (!open_list.includes({ f: newFScore, x, y }))
          open_list.push({ f: newFScore, x, y });
      }
    }
  }
  return { path, close_list, error: "path is not found" };
}
