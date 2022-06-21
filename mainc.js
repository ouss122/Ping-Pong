let play= document.querySelector('.player');
let opp=document.querySelector('.op');
let bball=document.querySelector('.ball');
let OpWin=document.querySelector('.opWin');
let PlWin=document.querySelector('.plWin');

const hitWallS= new Audio('assets/hitWall.ogg');
const hitBoxS= new Audio('assets/hitBox.ogg');
const score= new Audio('assets/score.ogg');
//hitWallS.play();
const mov=40;
const movop=10;
let movop1=2;
const array=[-1,1];
OpWin.textContent
console.log(play.offsetHeight);
function acWin(s,k){
   s.textContent=k;
}
function Box(){ //player and OP object
    this.offsetY=0;
    let win=0;
    this.wining= function (){
        win++;
        score.play();
    }
    this.moveDown= function (s,mov){
        let co=0;
        while (this.offsetY <= (window.innerHeight - play.offsetHeight) && co<=mov){
            co++;
            this.offsetY++;
        }
        s.style.top=this.offsetY +"px"; 
    }
    this.moveUp= function (s,mov){
        let co=1;
        while (this.offsetY >0 && co<=mov){
            co++;
            this.offsetY--;
        }
        s.style.top=this.offsetY+'px';
    }
    Object.defineProperty(this,'win',{
        get : () =>{
            return win;
        }
    })
}

let player=new Box(); //making the player
let op=new Box();

op.moveDown(opp,mov);
op.moveDown(opp,mov);
op.moveDown(opp,mov);
op.moveDown(opp,mov);
op.moveDown(opp,mov);
op.moveDown(opp,mov);
op.moveDown(opp,mov);
op.moveDown(opp,mov);


function moveOp(k){
    let u=(movop/2).toFixed(0);
    let i=1; 
    // 
   while (i<=u && !hitOp(ball.x,ball.y) && (ball.y<= op.offsetY -3  || ball.y > (op.offsetY+opp.offsetHeight +3))){
   if (k===1){
        
        op.moveDown(opp,movop1);

    }else {
        op.moveUp(opp,movop1);
    }

     i++;
   }
}
function Ball(){ //the ball object
    let y= play.offsetHeight/2 -bball.offsetHeight/2;
    let x= play.offsetWidth; 
    let x1=x;
    let y1=y;
    let speed=15;
    this.incSpeed= () => {
        if (speed <=30){
             speed++;
             
        }
        hitBoxS.play();
        }
    this.reSpeed = () => speed=15;
    this.dir= function (a,test,calc,k){
        if (!test(y,x)){
           let i=1;
           let j=y;
           while (i<=speed && !test(y,x) ){
             y=calc(a,x,x1,y1);
             x=k(x);
             i++;
           }
           j= ball.y-j;
           /*
           if (j>0){
               if (a>0){
               moveOp(-1); }
               else{
                moveOp(1);
               }
           }else{
               if (a<0){
                   moveOp(-1);
               }else{
                moveOp(1);
               }
           }*/
           if (j>0){
               if (op.offsetY> ball.y && ball.x > (window.innerWidth- 100)) {
                   console.log('hhey');
                   moveOp(-1);
                }else{
                    moveOp(1);   
             }
        }else{
                moveOp(-1);

        }
           if (test(y)){
               return true;
           }
           else return false;
        }else{
            return true;
        }
          
       } 
    
    this.incY= function (a){
    let co=1;
    while ((window.innerHeight -play.offsetHeight/2- bball.offsetHeight/2 )>y && co <= a){
        co++;
        y++;
        y1=y;
     }
}
    this.decY= function (b){
         let co=1;
         while (play.offsetHeight/2 - bball.offsetHeight/2  <y && co <= b){
             co++;
             y--;
             y1=y;
          }
    }
    Object.defineProperty(this,'x',{
        get: function (){
            return x
        },
        set: function(v){
           x=v;
           x1=v;
        }
    })
    Object.defineProperty(this,'y',{
        get: function (){
            return y
        },
        set: function(v){
           y=v;
           y1=v;
        }
    })

}
function acBall(){ //reload ball
    bball.style.top=ball.y+'px';
bball.style.left=ball.x+'px';
}

let falsee= () =>{
    return false;
}

let wallUp= y => y<=0;
let wallDown= y => y+bball.offsetHeight>=window.innerHeight;
let hitOp= (x,y) =>x>=(window.innerWidth - play.offsetWidth -bball.offsetWidth) && (y >=op.offsetY && y <=(op.offsetY + play.offsetHeight));
let plWin = x => (x>=window.innerWidth -bball.offsetWidth -1);
let hitPl=( x,y) => (y >= player.offsetY) && (y < player.offsetY + play.offsetHeight) && (x < play.offsetWidth);
let opWin= (x) => (x <=0);
let throwed=false;
let ball= new Ball();
let tang;
acBall();
function hitbox(k,k1,r){
    ball.x=ball.x;
    ball.y=ball.y;
      if (tang>0){
          if (ball.y >=r.offsetY && ball.y <=r.offsetY+ play.offsetHeight/2){
            tang=-tang;
         Throw(tang,k,k1,hitPl,opWin);      
          }else{
         Throw(tang,k,k1,hitPl,opWin);
          }
         }else{
         if (ball.y >=r.offsetY && ball.y <=r.offsetY+ play.offsetHeight/2){
            tang=tang;
         Throw(tang,k,k1,hitPl,opWin);
          }else{
            tang=-tang;
         Throw(tang,k,k1,hitPl,opWin);
          }
      }
      
}
function hitWall(a,b,c,d,e,f,k,calc){ 
    tang=-tang;
    ball.x=ball.x;
    ball.y=ball.y;
    hitWallS.play();
    let inter=window.setInterval(function (){
        let check=ball.dir(tang,(y,x) =>{
         return a(y)|| b(y) || c(x) || d(x,y) || e(x,y) || f(x);
        },calc,k);
        acBall();
        if (check){
            clearInterval(inter);
            if (a(ball.y)){
             //   hitWall(falsee,wallUp,plWin,hitOp,e,f,k,calc);
             hitWall(falsee,wallUp,plWin,hitOp,e,f,k,calc);

                
            }else if (b(ball.y)){
             //  hitWall(wallDown,falsee,plWin,hitOp,e,f,k,calc);
             hitWall(wallDown,falsee,plWin,hitOp,e,f,k,calc);

            }else if (c(ball.x)){
                player.wining();
                acWin(PlWin,player.win);
                ball.reSpeed();
                movop1=2;
                opStart();
                //   hitWall(a,b,falsee,d);
                
            }else if (d(ball.x,ball.y)){
                console.log('hitop');
                movop1++;
                ball.incSpeed();
               hitbox((a,x,x1,y1)=>{
                return  a*(x1-x)+y1;
            },i => i-1,op);
              //  hitWall(a,b,c,falsee);
            }
            else if (e(ball.x,ball.y)){
                console.log('hit pl');
                ball.incSpeed();
                movop1++;
                hitbox((a,x,x1,y1)=>{
                    return  a*(x-x1)+y1;
                },i => i+1,player);
             //  op.offsetY=ball.y+20;
              // op.moveUp(opp,0);
            }
            else if (f(ball.x)){
                console.log('op win');
                op.wining();
                acWin(OpWin,op.win);
                ball.reSpeed();
                movop1=2;
                setTimeout(() => {
                    ball.y=player.offsetY+(play.offsetHeight/2 - bball.offsetHeight/2);
                    ball.x=play.offsetWidth;
                    acBall();
                    throwed=false;
                }, 100);
            }
        }
    },50);
}
function Throw(tang,calc,k,e,f){
    let inter=window.setInterval(function (){
        let check=ball.dir(tang,(y) => {
            return (wallDown(y)) || (wallUp(y));
        },calc,k);
        acBall();

     //   console.log(op.offsetY)
        if (check){
            clearInterval(inter);
            if (wallDown(ball.y)){
                hitWall(falsee,wallUp,plWin,hitOp,e,f,k,calc);
            }
            else {
                hitWall(wallDown,falsee,plWin,hitOp,e,f,k,calc);
            }
        }
    },50);
}
window.addEventListener('keydown',function (event){
    if (event.key ==="ArrowUp"){
        player.moveUp(play,mov);
        if (!throwed){
           ball.decY(mov);
           acBall();
        }
    }else if (event.key==="ArrowDown"){
        player.moveDown(play,mov);
        if (!throwed){
            ball.incY(mov);
            acBall();
         }
    }else if (event.key ===" "){  
  if (!throwed){
      throwed=true; 
      tang=-1.5;
      Throw(tang,(a,x,x1,y1)=>{
          return  a*(x-x1)+y1;
      },i => i+1,falsee,falsee);
  
    }}
    ;})
    
    
    function opStart(){
    tang=(array[Math.floor(Math.random()*2)])*(Math.floor(Math.random()*10));
    op.offsetY=0;
   setTimeout(()=>{
        ball.x=window.innerWidth - play.offsetWidth - bball.offsetWidth;
        ball.y=op.offsetY+ (play.offsetHeight/2- bball.offsetHeight/2)
        acBall();
    },1000); 
  //  ball.x=window.innerWidth - play.offsetWidth - bball.offsetWidth;
   //     ball.y=op.offsetY+ (play.offsetHeight/2- bball.offsetHeight/2)
     //   acBall();
   setTimeout(()=>{
       
       let pos = Math.floor((window.innerHeight-play.offsetHeight)/mov)- Math.floor(op.offsetY/30)
       let u=Math.floor(Math.random()*pos) ;
       let i=1;
       const int=setInterval(()=>{
           op.moveDown(opp,mov);
               ball.incY(mov);
               acBall();
               console.log(i);
           if (i>=u){
               clearInterval(int);
                   tang=-1.5;
                   Throw(tang,(a,x,x1,y1)=>{
                    return  a*(x1-x)+y1;
                },i => i-1,hitPl,opWin);
           }else{
               i++;
               
           }

       },100)
       
    
       
   },1100) ;
}

