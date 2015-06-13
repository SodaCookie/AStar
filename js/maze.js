function getAdjacent(node, width, height){
    var neighbours = [node-1, node+width, node+1, node-width];
    return neighbours.filter(function (x) {return x >= 0 && x < width*height && (Math.floor(x/width) === Math.floor(node/width) || x === node+width || x === node-width)});
}

function randInt(min, max){
    return Math.floor(min+Math.random()*(max+1-min));
}

function randCenterSkew(min, max){
    return Math.round(min+Math.random()*(max-min));
}

function randChoice(array){
    var choice = randInt(0, array.length-1);
    return array[choice];
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function remove(list, obj){
    var index = list.indexOf(obj);
    if (index > -1){
        return list.splice(index, 1);
    }
    throw Error(obj + " not found in " + list);
}

function DFSGeneration(maze, width, height, start, end){
    var visited = [];
    var stack = [[start, undefined]];
    var packet;
    var curNode, prevNode;
    while (stack.length > 0){
        packet = stack.pop();
        curNode = packet[0];
        prevNode = packet[1];
        if (visited.indexOf(curNode) === -1){
            visited.push(curNode);
            if (prevNode != undefined){
                remove(maze[curNode], prevNode);
                remove(maze[prevNode], curNode);
            }
            toVisit = maze[curNode];
            shuffle(toVisit);
            for (var i=0; i < toVisit.length; i++){
                if (visited.indexOf(toVisit[i]) === -1){
                    stack.push([toVisit[i], curNode]);
                }
            }
            console.log(curNode, visited);
        }
    }

    return maze;
}

function createMaze(width, height, func){
    var maze = [];
    for (var i = 0; i < width*height; i++){
        maze.push(getAdjacent(i, width, height));
    }
    return func(maze, width, height, 0, width*height-1);
}