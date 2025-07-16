let T = 0;
let tt = 0;
let a = 0;
let xx;
let yy;
let cs;   //CanvasSample
let cp;   //CanvasPen
let ci;   //CanvasInk
let brushColor;
let brushSize;
let clearButton;

let x = 0;
let y = 0;
let xS = 0;
let yS = 0;

let r0 = 30;
let r1 = 19;
let r2 = 15;
let m = 10;
let C = 0;
let SC = 0;
//Simi
let circles = [];
let song;
let isPlaying = false;

//kieru
let Acircles = [];
let lifetime = 6000;

//true
let Bcircles = [];

//Color
let ColorS;
let ColorG;

let windo;

//0123
let angle = 0; // 回転角度
let triggerDistance = 20; // マウスが影響を受ける距離
let timeInRange = 0; // 一定距離内にいる秒数
let lastTime = 0; // 前フレームのタイムスタンプ

//0124
let ballControl = 0;
let ballControl2 = 0;
let OC = 50;
let Ax = 0;
let Ay = 0;
let Bx = 0;
let By = 0;

function preload(){
  //bgImage = loadImage("background_2.jpg");
  song = loadSound("../BGM1.mp3");
}



function setup() {

  if(windowWidth > windowHeight){
    windo = windowHeight;
  }else{
    windo = windowWidth;
  }



  cs = createCanvas(windowWidth, windowHeight);
  cs = createGraphics(windowWidth, windowHeight);
  cs.position(0, 0);
  cs.style('z-index', '1');
  cs.noStroke();


  cp = createCanvas(windowWidth, windowHeight);
  cp = createGraphics(windowWidth, windowHeight);
  cp.position(0, 0);
  cp.style('z-index', '2');
  cp.noStroke();
  //cs.colorMode(HSB, 360, 100, 100, 100);
  brushColor = color('#3eb37004');
  brushSize = 10; // 初期の筆の太さ
  //angleMode(DEGREES);
  /*
  //clear
  clearButton = createButton('clear');
  clearButton.position(width - 100, 10);
  clearButton.mousePressed(clearCanvas); // キャンバスをクリア
  cp.background(0,0,0,0)
  */

  /*
  ci = createCanvas(windowWidth, windowHeight);
  ci = createGraphics(windowWidth, windowHeight);
  ci.position(0, 0);
  ci.style('z-index', '3');
  ci.noStroke();
  */
  
  //---------------------
  //r0 = random(28,30);
  //console.log(width);
  //ColorS = color('#228B2264');
  ColorS = color('#7fff0064');
  ColorG = color('#00000064');
  //ColorG = color('#228B2264');    //黒板色

  //----------------------

  //NOスワイプ
  document.addEventListener('touchmove', function(e) {
    e.preventDefault(); // デフォルト動作のキャンセル
  }, { passive: false }); // `passive: false` を設定して、preventDefault()を有効にする



  //Otehon
  for(SC=1; SC < 12000; SC+=0.5){
    //1203
    xS = m*((r0-r1)*cos(SC%36000/100) + r2*cos((r0-r1)/r1*SC%36000/100));
    yS = m*((r0-r1)*sin(SC%36000/100) - r2*sin((r0-r1)/r1*SC%36000/100));

    //Ax = m*((r0-r1)*cos(SC%36000/100) + r2*cos((r0-r1)/r1*SC%36000/100));
    //Ay = m*((r0-r1)*sin(SC%36000/100) - r2*sin((r0-r1)/r1*SC%36000/100));
  
    cs.fill(255,255,255,100);
    cs.circle(xS+width/2, yS+height/2,1);
    //cs.circle(Ax+width/2, Ay+height/2,1);

  }
  cs.fill(0,120);
  cs.rect(0,0,width,height);

  //song.setLoop(true);
  //song.play();
  //togglePlay();
  //cp.textAlign(CENTER, CENTER);
  //cp.textSize(24);
  //cp.text('Click anywhere to play music', width / 2, height / 2);

}

function draw(){


  image(cp,0,0);
  //cp.background(bgImage);

  //if(frameCount == 5){
    //togglePlay();
  //}

  cs.background(0,0,0,0);
  //image(ci,0,0);
  //ci.clear();
  //ci.background(0,0,0,10);
  //ci.fill(0,5);
  //ci.rect(0,0,mouseX+5,mouseY+5);

  //brushColor = color((frameCount%62),(frameCount%179),(frameCount%112),50)

  //supirographの数式
  //console.log(C);
  x = m*((r0-r1)*cos(C%36000/100) + r2*cos((r0-r1)/r1*C%36000/100));
  y = m*((r0-r1)*sin(C%36000/100) - r2*sin((r0-r1)/r1*C%36000/100));

  Ax = m*((r0-r1)*cos(OC%36000/100) + r2*cos((r0-r1)/r1*OC%36000/100));
  Ay = m*((r0-r1)*sin(OC%36000/100) - r2*sin((r0-r1)/r1*OC%36000/100));

  //image(ci,0,0);
  





  //Write Sample
  xx = near(mouseX, x+width/2);
  yy = near(mouseY, y+height/2);

  /*
  if(xx<230 && yy<230){
    cp.background(xx,xx/2,xx/3,20);
  }else{
    cp.background(0,191,255,20);
  }
  */
  cp.fill("#0D1B2A64");
  cp.rect(0, 0, width, height);

  //
  let maxdist = (dist(0,0,windo/2, windo/2))/2;
  cp.fill(0);
  //cp.ellipse(x+width/2,y+height/2,maxdist);

  //ポインタの位置によって、背景の色を変える
  if(xx<300 && yy<300){
    let currentColor = lerpColor(ColorG, ColorS,xx/maxdist);
    cp.background(currentColor);
    //cp.background(xx,xx/2,xx/3,20);
  }else{
    cp.background(ColorS);
  }
  //------------------------------------

ballControl++;

  if(xx < 20 && yy < 20 && mouseIsPressed){
    if(C < 12000){
      C += 0.8;
      OC = C+50;
      ballControl2++;
      stroke(250,0,0);
      //cp.strokeWeight(1);
      //cp.line(x+width/2,y+height/2,Ax+width/2,Ay+height/2);
      //cp.noFill();
      //cp.noStroke();
      stroke(255,50);
      beginShape(LINES);
      for (let theta = C; theta < OC; theta++) {
        Bx = m*((r0-r1)*cos(theta%36000/100) + r2*cos((r0-r1)/r1*theta%36000/100));
        By = m*((r0-r1)*sin(theta%36000/100) - r2*sin((r0-r1)/r1*theta%36000/100));
        vertex(Bx + width/2, By+height/2);
      }
      endShape(CLOSE);
      //cp.noStroke();


    }
    ballControl = 0;
    cp.fill(250,235,215,50);
    cp.circle(Ax+width/2, Ay+height/2,15);
    //cp.fill(250,235,215);
    //cp.circle(x+width/2, y+height/2,15);
  }else if(xx<20 && yy<20){
    //cp.fill(250,235,215);
    //cp.circle(x+width/2, y+height/2, 20-frameCount%90*0.2);
    image(cs,0,0);
  }else{
    //cp.fill(250,235,215);
    //cp.circle(x+width/2, y+height/2, 40-frameCount%120*0.2);
    if(ballControl2 >= 0){
      ballControl2 -= 10;
    }
  }

  if(ballControl>=160 && ballControl <= 239){
    cp.fill(250,235,215);
    cp.strokeWeight(1);
    cp.stroke(250,235,215,100);
    cp.noFill();
    cp.circle(x+width/2, y+height/2, 60-ballControl%80*0.6);
    cp.noStroke();
  }else if(ballControl >=240){
    //cp.fill(250,235,215);
    //cp.circle(x+width/2, y+height/2,15);
    ballControl = 0;
  }
  cp.fill(250,235,215);
  cp.circle(x+width/2, y+height/2,15);

  if(ballControl2 >= 100){
    //cp.fill(0,255,0,50);
    //cp.circle(x+width/2, y+height/2, 10*(ballControl2/100));
  }

  //0123--------------------------------------------------------
  angleMode(DEGREES);
  cp.fill(255,0,0,100);

  // マウスの位置に基づいて角度を計算
  let dx = Ax-x;
  let dy = Ay-y;
  //translate(x+width/2,y+height/2);
  //cp.ellipse(x+width/2, y+height/2,100);
  //cp.ellipse(Ax+width/2, Ay+height/2,100)
  angle = atan2(dy, dx); 
  console.log(angle);
  //cp.translate(0,0);

  // マウスと水滴中心の距離を計算
  let distance = dist(mouseX, mouseY, width / 2+x, height / 2+y);

  // 一定距離内にいる時間を計算
  let currentTime = millis() / 1000; // 秒単位
  if (distance <= triggerDistance) {
    timeInRange += currentTime - lastTime; // 距離内なら時間を増加
  } else {
    timeInRange = max(0, timeInRange - (currentTime - lastTime) * 0.7); // 距離外なら徐々にリセット
  }
  lastTime = currentTime;

  // 経過時間に基づいて丸みを調整
  let maxTime = 3; // 最大で3秒間の丸み変化
  let sharpness = map(constrain(timeInRange, 0, maxTime), 0, maxTime, 5, 5);

  // 水滴を描画
  //cp.strokeWeight(3);
  //cp.stroke(200, 0, 0);
  //cp.noFill();
  cp.noStroke();
  if(xx<=20 && yy <=20){
  //drawDrop(width/2+x,height/2+y, 20, sharpness, angle);
  }
  //cp.noStroke();
  angleMode(RADIANS);
  //--------------------------------------------------------

      // マウスが押されている場合、新しい円を生成
  if(xx<20 && yy<20){     //半径100以内なら書ける
    //if(frameCount%2==0){
      if (mouseIsPressed) {
        let newCircle = {
          xxx: x+width/2-((x+width/2-mouseX)/100*20),
          yyy: y+height/2-((y+height/2-mouseY)/100*20),
          size: random(1,3),        // 初期サイズ
          ssize: random(0.5, 2),
          ran: random(-5,5)     // 最大サイズ
        };
        circles.push(newCircle); // 新しい円を配列に追加

        //ci.fill(100,255,100,255-(frameCount%255));
        //ci.ellipse(x+width/2, y+height/2, random(5,20));      }

        //1216
        if(frameCount%2==0){
          Acircles.push({
            x: x+width/2,
            y: y+height/2,
            size: random(0.5,1.5),
            startTime: millis() // 円が描かれた時刻を記録
          });
        }

        //0114
        Bcircles.push({
          x: x+width/2+random(-5,5),
          y: y+height/2+random(-5,5),
          size: random(0.5, 2),
          startTime: millis()
        });
      }
    //}
  }

  //cp.fill(0,20);
  //cp.rect(0,0,width,height);
  
  //1216
  for(let i = Acircles.length - 1; i >=0; i--){
    let Acircle = Acircles[i];
    let elapsedTime = millis() - Acircle.startTime;
    let down = map(elapsedTime,0,lifetime,0,100);
    let Alife = map(elapsedTime, 0, lifetime-1000, 255, 0);

    if(elapsedTime <= lifetime){

      if(elapsedTime <= 4000){
      //cp.fill(173,216, 230, 100,map(elapsedTime, 0, lifetime, 255, 0));

      cp.fill(152,251,152,Alife);
      //cp.ellipse(Acircle.x, Acircle.y, Acircle.size*random(0.5,1.5));
      //for(a=0; a<2;a++){
        cp.ellipse(Acircle.x+random(-5,5), Acircle.y+random(-5,5)+down, Acircle.size);

      //}
      //cp.ellipse(Acircle.x, Acircle.y, Acircle.size);

      }else{
        cp.fill(120,180,255, Alife);
      //for(a=0; a<2;a++){
        cp.ellipse(Acircle.x+random(-5,5), Acircle.y+random(-5,5)+down, Acircle.size);
      //}
      }
      cp.fill(255,255,255,100);
      cp.ellipse(Acircle.x, Acircle.y, Acircle.size);

      /*cp.fill(255, 255, 200, map(elapsedTime, 0, lifetime, 255, 0));
      for(a=0; a<50;a++){
        cp.ellipse(Acircle.x+random(-7,7), Acircle.y+random(-7,7), Acircle.size*random(0.1,0,5));
      }*/


    }else{
      Acircles.splice(i,1);
    }
  }

    //0114
    for(let i = Bcircles.length - 1; i >=0; i--){
      let Bcircle = Bcircles[i];
      let finalTime = millis() - Bcircle.startTime;
      let down = map(finalTime,0,lifetime,0,100);
      let Blife = map(finalTime, 0, lifetime, 255, 0);
  
      if(finalTime <= lifetime){
  
        if(finalTime <= 4000){
        //cp.fill(173,216, 230, 100,map(elapsedTime, 0, lifetime, 255, 0));
  
        cp.fill(152,251,152,Blife);
        //cp.ellipse(Acircle.x, Acircle.y, Acircle.size*random(0.5,1.5));
        //for(a=0; a<2;a++){
          cp.ellipse(Bcircle.x, Bcircle.y+down, Bcircle.size);
  
        //}
        //cp.ellipse(Acircle.x, Acircle.y, Acircle.size);
  
        }else{
          cp.fill(120,180,255, Blife);
        //for(a=0; a<2;a++){
          cp.ellipse(Bcircle.x, Bcircle.y+down, Bcircle.size);
        //}
        }
        cp.fill(255,255,255,100);
        cp.ellipse(Bcircle.x, Bcircle.y, Bcircle.size);
  
        /*cp.fill(255, 255, 200, map(elapsedTime, 0, lifetime, 255, 0));
        for(a=0; a<50;a++){
          cp.ellipse(Acircle.x+random(-7,7), Acircle.y+random(-7,7), Acircle.size*random(0.1,0,5));
        }*/
  
  
      }else{
        Bcircles.splice(i,1);
      }
    }
  //------0114

  // 円の配列を更新・描画
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];

    // 真ん中の絵の描写
    if(xx<10 && yy<10 && (mouseIsPressed==false)){
      cp.fill(255,0,0,100);
      cp.fill(0,255,0,150);    //green

      cp.ellipse(circle.xxx, circle.yyy, circle.size, circle.size);

      //cp.fill(255);
      cp.ellipse(circle.xxx+circle.ran, circle.yyy+circle.ran, circle.ssize);

    }else{
      cp.fill(0,255,191,50); // 円の色
    }
    //cp.circle(x+width/2, y+height/2,circle.size,circle.size);

    //cp.ellipse(circle.xxx, circle.yyy, circle.size, circle.size);


    //花火みたいにできるやつ
    if(C>=11000){
    if(xx<10 && yy<10 && (!mouseIsPressed)){
      cp.fill(0,255,255,50);    //blue

      cp.ellipse(circle.xxx+200, circle.yyy-200, circle.size, circle.size);
      cp.fill(255,0,255,50);    //pink

      cp.ellipse(circle.xxx-200, circle.yyy-200, circle.size, circle.size);
      cp.fill(255,255,0,50);    //yellow

      cp.ellipse(circle.xxx+200, circle.yyy+200, circle.size, circle.size);
      cp.fill(255,0,0,50);    //green
      cp.ellipse(circle.xxx-200, circle.yyy+200, circle.size, circle.size);

    }
  }

      /*cp.fill(0,255,255,C/12000*20);    //aqua
      cp.ellipse(circle.xxx+300, circle.yyy, circle.size, circle.size);
      cp.fill(75,0,130,C/12000*20);    //indigo
      cp.ellipse(circle.xxx, circle.yyy-300, circle.size, circle.size);
      cp.fill(255,165,0,C/12000*20);    //orange
      cp.ellipse(circle.xxx-300, circle.yyy, circle.size, circle.size);
      cp.fill(255,215,0,C/12000*20);    //gold
      cp.ellipse(circle.xxx, circle.yyy+300, circle.size, circle.size);
      
    }
    */

    // 円のサイズを拡大（最大サイズに達するまで）
    //if (circle.size < circle.maxSize) {
    //circle.size += 0.4;
    //}
    tt++;

  }
/*
cp.stroke(255,0,0,100);
cp.strokeWeight(3);
cp.noFill();
cp.ellipse(x+width/2, y+height/2, 40);
cp.noStroke();
*/
}

  ///////////////////


function near(a, b){
  return abs(a - b);
}

function clearCanvas(){
  cp.clear();
}


// ウィンドウサイズが変更されたときに動画のサイズを調整
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // キャンバスサイズを変更
}


function togglePlay(){
  isPlayng = true;
  song.loop();
}

function mousePressed() {
  /*if (song.isPlaying() == false) {
    song.play(); // 再生していないなら再生
    song.loop();
  }*/
}


function drawDrop(x, y, r, A, rotationAngle) {
  fill(255,255,255,100);
  noStroke();
  push();
  translate(x, y);
  rotate(rotationAngle);

  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let offset = 0.001;
    let R = r / (A * sin(theta / 2) + 1 + offset);
    vertex(R * cos(theta), R * sin(theta));
  }
  endShape(CLOSE);

  pop();
}
