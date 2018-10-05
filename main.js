let canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d'),
    x = canvas.width / 2,
    y = canvas.height - 30,
    ballRadius = 10,
    paddleHeight = 10,
    paddleWidth = 75,
    paddleX = (canvas.width - paddleWidth) / 2,
    paddleY = canvas.height - paddleHeight,
    dx = 2,
    dy = - 2,
    rightPressed = false,
    leftPressed = false,
    bricksRowCount = 3,
    bricksColumnCount = 5,
    brickWidth = 84, brickHeight = 20, brickPadding = 10, i, j,
    bricksOffsetLeft = 10, bricksOffsetTop = 10, bricks = [], score = 0;

for(i = 0; i < bricksColumnCount; i += 1){
  bricks[i] = [];
  for(j = 0; j < bricksRowCount; j += 1){
    bricks[i][j] = {x: 0, y: 0, status: true};
  }
}

function draw() {
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();

    if(x + dx > canvas.width - ballRadius || x <= ballRadius) {
        dx = -dx;
    }

    if(y< ballRadius){
        dy = -dy;
    }
    else if(y + paddleHeight> canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy
        }
        else{
            alert('You are loser!');
            document.location.reload();
        }
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    }

    if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
}

setInterval(draw, 10);

function keyDownHandler(event) {
    if(event.keyCode === 39) {
        rightPressed = true;
    } else if(event.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.keyCode === 39) {
        rightPressed = false;
    } else if(event.keyCode === 37) {
        leftPressed = false;
    }
}
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
  for(i = 0; i < bricksColumnCount; i += 1) {
    for (j = 0; j < bricksRowCount; j += 1) {
        if(bricks[i][j].status){
            var brickX = i * (brickWidth + brickPadding) + bricksOffsetLeft;
            var brickY = j * (brickHeight + brickPadding) + bricksOffsetTop;
            bricks[i][j].x = brickX;
            bricks[i][j].y = brickY; 
            ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
        }
    }
  }
}

function collisionDetection(){
    for(i = 0; i < bricksColumnCount; i += 1){
        for(j = 0; j < bricksRowCount; j += 1){
            let b = bricks[i][j];
            if(b.status){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = false;
                    score+=1;
                    if(score === bricksColumnCount * bricksRowCount){
                        alert("You win!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Score:" + score, 8, 120);
}




