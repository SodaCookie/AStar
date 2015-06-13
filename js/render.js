function render_maze(maze, width, height){
    var canvas = $("<canvas width=450 height=450/>", {id:"maze"});
    var ctx = canvas.get(0).getContext('2d');
    canvas.appendTo("body");

    // Draw the box
    ctx.fillStyle = "#DCDCDC";
    ctx.strokeStyle = "#FFFFFF";
    ctx.rect(0, 0, 400, 400);
    ctx.shadowColor = '#999';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 15;
    ctx.shadowOffsetY = 15;
    ctx.fill();

    // Draw the lines vertical
    for (var i = 0; i < width+1; i++){
        ctx.beginPath();
        ctx.moveTo(i*400/width, 0);
        ctx.lineTo(i*400/width, 400);
        ctx.stroke();
    }
    for (var i=0; i < height+1; i++){
        ctx.beginPath();
        ctx.moveTo(0, i*400/height);
        ctx.lineTo(400, i*400/height);
        ctx.stroke();
    }

    var adjaceny;
    var DIRECTIONS = ["up", "down", "left", "right"];
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.stroke();
    for (var i=0; i < width*height; i++){
        adj = maze[i];
        adjaceny = [];
        for (var j=0; j < adj.length; j++){
            switch (adj[j]){
                case i+1: // Right
                    adjaceny.push("right");
                    break;
                case i-1: // Left
                    adjaceny.push("left");
                    break;
                case i+width: // Down
                    adjaceny.push("down");
                    break;
                case i-width: // Up
                    adjaceny.push("up");
                    break;
            }
        }

        adjaceny = DIRECTIONS.filter(function(x) {return adjaceny.indexOf(x) >= 0});

        var x, y;
        for (var j=0; j < adjaceny.length; j++){
            ctx.beginPath();
            x = i%width*40;
            y = Math.floor(i/height)*40;
            switch (adjaceny[j]){
                case "right":
                    ctx.moveTo(x+40, y);
                    ctx.lineTo(x+40, y+40);
                    break;
                case "left":
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y+40);
                    break;
                case "down":
                    ctx.moveTo(x, y+40);
                    ctx.lineTo(x+40, y+40);
                    break;
                case "up":
                    ctx.moveTo(x, y);
                    ctx.lineTo(x+40, y);
                    break;
            }
            ctx.stroke();
        }
    }
}

var WIDTH = 10;
var HEIGHT = 10;

var maze = createMaze(WIDTH, HEIGHT, DFSGeneration);
// console.log(maze);
render_maze(maze, WIDTH, HEIGHT);