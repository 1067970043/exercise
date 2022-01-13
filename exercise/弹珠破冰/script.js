const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

let score = 0;//得分
const brickRowCount = 9;//积木行数
const brickColumnCount = 5;//积木列数

//初始化球
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
    visible: true
};
//初始化底盘
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
    visible: true
};
//初始化积木
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}
//创建积木
const bricks = [];
for(let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++) {
        //创建每个积木的位置
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
    }
}
//在画布上画球
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
}
//在画布上画底盘
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
}
//得分
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`得分:${score}`, canvas.width - 100, 30);
}
//在画布上画积木群
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}
//添加键盘事件
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
function keyDown(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}
function keyUp(e) {
    if(
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
    )
    paddle.dx = 0;
}
//添加底盘移动
function movePaddle() {
    paddle.x += paddle.dx;
    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
    if(paddle.x < 0) {
        paddle.x = 0;
    }
}
//添加球体移动
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    //墙体碰撞
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *=-1
    }
    if (ball.y - ball.size < 0) {
        ball.dy *= -1;
    }
    //底座碰撞
    if(
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    )
    ball.dy = -ball.speed;
    //积木碰撞
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if(//球左边界大于积木左边界，球右边界小于积木右边界
                    ball.x - ball.size > brick.x && 
                    ball.x + ball.size < brick.x + brick.w && 
                    ball.y + ball.size > brick.y && 
                    ball.y - ball.size < brick.y + brick.h
                    ) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });
    if(ball.y + ball.size > canvas.height) {
        alert(`游戏结束，得分为${score}`);
        ball.x = canvas.width / 2,
        ball.y = canvas.height / 2,
        ball.dx = 4,
        ball.dy = -4,
        showAllBricks();
        score = 0;
    }
}
function increaseScore() {
    score++;
    if (score % (brickRowCount * brickColumnCount) === 0) {
        ball.visible = false;
        paddle.visible = false;
        setTimeout(function () {
            showAllBricks();
            score = 0;
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.visible = true;
            paddle.visible = true;
        },delay)
    }
}

function showAllBricks() {
    bricks.forEach(column => {
      column.forEach(brick => (brick.visible = true));
    });
}

//初始化画布
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function update() {
    movePaddle();
    moveBall();
    // Draw everything
    draw();
    requestAnimationFrame(update);
}

update()