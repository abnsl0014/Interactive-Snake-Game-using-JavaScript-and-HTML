//Snakes Game

//Game Loop- Init, Draw, Update, 

function init(){
    
    canvas=document.getElementById('mycanvas');
    pen=canvas.getContext('2d');
    W =canvas.width;
    H =canvas.height;
    gameOver=false;
    
    food=getRandomFood();
    score=5;
    
    snake ={
       init_length:5,
        color:"yellow",
        cells:[],
        direction:"right",
        
        createSnake:function(){
            for(var i=this.init_length-1;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle =this.color;
                pen.strokeStyle="black";
                pen.lineWidth=5;
                pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
                pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
            }
        },
        updateSnake:function(){
            var headX =this.cells[0].x;
            var headY =this.cells[0].y;
            //var score=5;
            //assuming snake is moving right
            //insertion at head;
           // nextHeadX=headX+1;
           // this.cells.pop();
            //this.cells.unshift({x:nextHeadX,y:headY});
            
            //if food strikes with snake
            for(var i=1;i<snake.cells.length;i++){
                if(snake.cells[i].x==headX && snake.cells[i].y==headY){
                    alert("Game Over");
                    gameOver=true;
                }
            }
            
            if(headX==food.x && headY==food.y){
                score++;
                food=getRandomFood();
            }
            else{
                //if food not taken;
                this.cells.pop();
            }
            
            if(this.direction =="right"){
                nextX=headX+1;
                nextY =headY;
            //this.cells.pop();
            //this.cells.unshift({x:nextHeadX,y:headY});
            }
            else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
            else if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;
            }
            else if(this.direction=="up"){
                nextX=headX;
                nextY=headY-1;
            }
            //insertt the new cell at head
            this.cells.unshift({x:nextX,y:nextY});
            
            //last coordinates condition
            
            var last_x=Math.round(W/10);
            var last_y=Math.round(H/10);
            
            if(this.cells[0].y<0 || this.cells[0].x>last_x ||this.cells[0].x<0|| this.cells[0].y>last_y){
                alert("Game Over");
                gameOver=true;
            }
        }
    };
    //console.log("init");
    snake.createSnake();
    
    //add event listener to our game
    //listen for keyboard events
    function KeyPressed(e){
        console.log("you pressed a key");
        console.log(e);
        
        if(e.key=='ArrowRight'){
            snake.direction= "right";
        }
        else if(e.key=='ArrowLeft'){
            snake.direction ="left";
        }
        else if(e.key=='ArrowUp'){
            snake.direction ="up";
        }
        else if(e.key=='ArrowDown'){
            snake.direction ="down";
        }
    }
    document.addEventListener('keydown',KeyPressed);
}

function draw(){
    
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
   // var score=5;
    
    //fill colors in food
    
    pen.fillStyle=food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);
    
    pen.fillStyle="white";
    pen.font = "14px Roboto";
    pen.fillText("Score: "+score,10,10);
    
}

function update(){
 
    snake.updateSnake();
}

function gameloop(){ 
    //var score;
    draw();
    update();
    if(gameOver==true){
        clearInterval(z);
    }
}
function getRandomFood(){
    var foodX =Math.round(Math.random()*(W-10)/20);
    var foodY =Math.round(Math.random()*(H-10)/20);
    
    foodColors =["red","green","aqua","coral","orchid"];
    var i =Math.round(Math.random()*foodColors.length);
    
    var food ={
        x:foodX,
        y:foodY,
        color: foodColors[i],
    }
    return food;
}

init();
//call game loop after t time
var z=setInterval(gameloop,130);
//gameloop();