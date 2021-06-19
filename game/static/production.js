var Engine = Matter.Engine, // エンジンの作成、操作に関するメソッド
    Render = Matter.Render, 
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite;

var width = window.innerWidth -30;
var height = window.innerHeight -150;

Body.collisionFilter = {
  group: 1,
}

// window.onload = function() {
// 描画域を作成
var engine = Engine.create();
engine.world.gravity.y = 0;

  // レンダリング設定
var render = Render.create({
  element: document.getElementById('canvas'),
  engine: engine,
  options: {
    width: width,
    height: height,
    // showIds: true, // Id表示
  }
});

  // ゲーム開始前の初期設定
  // 壁
var wallBottom = Bodies.rectangle(0, height, width*2, 10, { isStatic: true });
var wallLeft = Bodies.rectangle(0, 0, 10, height*2, { isStatic: true });
var wallRight = Bodies.rectangle(width, 0, 10, height*2, { isStatic: true });
var wallTop = Bodies.rectangle(0, 0, width*2, 10, { isStatic: true });

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            visible: true,
        }
    });

Composite.add(engine.world, mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;

Composite.add(
  engine.world,
  [wallTop, wallRight, wallLeft, wallBottom, mouseConstraint]
);


var foods = [];
var takenokos = [];


Render.run(render);
var runner = Runner.create();
// ゲームスタート
function gameStart() {
  // エンジン起動
  Runner.run(runner, engine);

  foods = []
  increaseFoods();
  var gameStatus = document.getElementById('game-status');
  gameStatus.innerText = 'Start!';
  
  // reset score
  scoreDisplay = document.getElementById('score');
  resetScore();

  // remove start button
  var startButton = document.getElementById('start-game')
  startButton.remove()

  setTimeout(gameSet, 15000);
}


function gameSet() {
  var gameStatus = document.getElementById('game-status');
  gameStatus.innerText = 'Game Set!';
  var eatButton = document.getElementById('eat-more')
  eatButton.remove()
  Runner.stop(render);
  Runner.stop(runner);
}


function increaseFoods() {
  for (let i=0; i <=20; i++){
    var takenoko = Bodies.circle(
      Math.floor(Math.random()*width), 
      Math.floor(Math.random()*height), 
      40,
      {
        isStatic: false,
        density: 1.5,
        friction: 0,
        restitution: 1,
      }
    );
    var kinoko = Bodies.rectangle(
      Math.floor(Math.random()*width), 
      Math.floor(Math.random()*height), 
      40,
      40,
      {
        isStatic: false,
        density: 3.0, // 質量
        friction: 0, // 摩擦
        restitution: 1.0, // 跳ね返り
      }
    );
    foods.push(takenoko)
    foods.push(kinoko)
    takenokos.push(takenoko.id)
    Composite.add(
      engine.world, 
      [takenoko, kinoko]
    );
  }
}

Events.on(mouseConstraint, 'mousedown', function(event) {
  var objectId = mouseConstraint.body
  console.log(objectId)
  if (objectId) {
    objectId = objectId.id
    console.log(objectId)
  }

  if (foods.length && objectId >=6) {
    scoreDisplay = document.getElementById('score');
    if (takenokos.indexOf(objectId) != -1) {
      increaseScore(1);
    } else {
      decreaseScore(1);
    }

    Composite.remove(
      engine.world,
      foods[objectId-6]
    );
    foods.filter(id=>id>objectId-6)
  }
});

function resetScore() {
  score = 0;
  scoreDisplay.innerText = score;
}

function increaseScore(points) {
  score += points;
  scoreDisplay.innerText = score;
}

function decreaseScore(points) {
  score -= points;
  scoreDisplay.innerText = score;
}