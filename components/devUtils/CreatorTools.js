class CreatorTools {
  static saveMaze(walls) {
    var fileName = prompt("Enter maze name: ");
    if (fileName === null)
      return;
    var tmpMaze = new Maze(fileName, walls);
    /*json = {walls};
    saveJSON(json, fileName);*/
    var storedMazes = getItem('Mazes');
    if (storedMazes === null) {
      storedMazes = [];
    }
    storedMazes[storedMazes.length] = tmpMaze;
    storeItem('Mazes', storedMazes);
  }
  
  static loadMaze() {
    var fileName = prompt("Enter maze name: ");
    if (fileName == null)
      return null;
    var storedMazes = getItem('Mazes');
    if (storedMazes === null) {
      alert("Sorry, but you haven't saved any mazes yet.");
      return null;
    }
    var mazeToLoad = null;
    if (Array.isArray(storedMazes)) {
      for (var i = 0; i < storedMazes.length; storedMazes++) {
        if (storedMazes[i].getName() == fileName)
          mazeToLoad = storedMazes[i];
      }
      if (mazeToLoad == null) {
        alert("Could not find maze named '" + fileName + "'");
        return null;
      } else {
        return mazeToLoad.getWalls();
      }
    }
  }
}