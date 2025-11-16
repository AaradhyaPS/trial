const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

let lane=1;
let player={x:160,y:500,size:40,color:"yellow"};
let obstacles=[];
let speed=4;
let score=0;

function spawnObstacle(){
    const laneIndex=Math.floor(Math.random()*3);
    obstacles.push({ lane:laneIndex, y:-60, size:50, color:"red" });
}
setInterval(spawnObstacle,1200);

function update(){
    player.x = 60 + lane*120;

    for(let o of obstacles){ o.y+=speed; }
    obstacles = obstacles.filter(o=>o.y<700);

    for(let o of obstacles){
        if(o.lane===lane && Math.abs(o.y - player.y)<50){
            alert("Game Over! Score: "+score);
            document.location.reload();
        }
    }
    score++;
}

function draw(){
    ctx.clearRect(0,0,360,640);

    ctx.strokeStyle="#555";
    ctx.lineWidth=4;
    ctx.beginPath();
    ctx.moveTo(120,0); ctx.lineTo(120,640);
    ctx.moveTo(240,0); ctx.lineTo(240,640);
    ctx.stroke();

    ctx.fillStyle=player.color;
    ctx.fillRect(player.x-20,player.y-20,40,40);

    for(let o of obstacles){
        ctx.fillStyle=o.color;
        let ox = 60 + o.lane*120;
        ctx.fillRect(ox-25,o.y-25,50,50);
    }

    ctx.fillStyle="white";
    ctx.font="20px Arial";
    ctx.fillText("Score: "+score,10,30);
}

function loop(){ update(); draw(); requestAnimationFrame(loop); }
loop();

document.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft" && lane>0) lane--;
    if(e.key==="ArrowRight" && lane<2) lane++;
});

let startX=null;
document.addEventListener("touchstart",e=>{ startX=e.touches[0].clientX; });
document.addEventListener("touchend",e=>{
    let endX=e.changedTouches[0].clientX;
    if(startX-endX>50 && lane>0) lane--;
    else if(endX-startX>50 && lane<2) lane++;
});
