let str = "舍利子！色不異空不異即是受想行識亦復如是";
let pallete = ["#141b41","#306bac","#6f9ceb","#98b9f2"];
        
let font;
let graphics;
let textureGraphics;

function preload() {
  font = loadFont("NotoSansJP-Black.otf");
}

function setup() {
  createCanvas(800, 800);
	//跟Function draw裡面的background一樣都可以影響鏤空字的顏色,但不是指定的顏色,
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB,360,100,100,100);
  graphics.angleMode(DEGREES);

  textureGraphics = createGraphics(width, height);
	//同樣影響中間方塊可以顯露出來點的透明程度
  textureGraphics.colorMode(HSB,360, 100, 100,95);
  textureGraphics.angleMode(DEGREES);
	//中間方塊"點"的顏色(355,83,89,10)第四個數字越大點越清楚, 及strokeweight "點"的粗細
  textureGraphics.stroke(0,0,100,5);
  for (let i = 0; i < width * height * 10 / 100; i++) {
    textureGraphics.strokeWeight(random(2));
    textureGraphics.point(random(width), random(height));
  }

}

function draw() {
  //字鏤空以後的顏色 HSB,為指定色 background(0,0,100)為白色;
	background(0,0,100);
	//改變內部方框顏色HSB為指定色,但螢幕背景色也變但顏色不同
  graphics.background(0, 0, 20);

  let offset = width / 10;

  separateGrid(offset, offset, width - offset * 2);
  image(graphics, 0, 0);
  image(textureGraphics, 0, 0);
  frameRate(0.5);
}

function windowResized(){
  resizeCanvas(800, 800)
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 5 && d <= width) {
        separateGrid(i, j, w);
      } else {
        let c = random(pallete);
        let cx = i + w / 2;
        let cy = j + w / 2;
        let s = str.substr(int(random(str.length)), 1);
        let bound = font.textBounds(s, 0, 0, w);

        graphics.push();
        graphics.textSize(w);
        graphics.textFont(font);
        graphics.translate(cx, cy);
        graphics.translate(-bound.x - bound.w / 2, -bound.y - bound.h / 2);
        graphics.erase(255, 0);
        graphics.text(s, 0, 0);
        graphics.push();
        graphics.noErase();
        graphics.stroke(c);
        graphics.noFill();
				//字影子的寬度w/10 > w/30 
        graphics.drawingContext.shadowBlur = w / 50;
				//字影子的顏色
        graphics.drawingContext.shadowColor = color(60, 100, 100);
				//字的描邊, 改W/10(W/100), 可以改變字體描邊的粗細
        graphics.strokeWeight(w /40);
        graphics.text(s, 0, 0);
        graphics.pop();


        graphics.pop();
        // graphics.rect(i, j, w, w);
        draw10Print(i, j, w, w, c);
      }
    }
  }
}

function draw10Print(x, y, w, h, c) {
  push();
  translate(x, y);
  let sep = int(random(10, 20));
  let d = w / sep;
  stroke(c);
  strokeWeight(d / 5);
  strokeCap(PROJECT);
  for (let j = 0; j < sep; j++) {
    for (let i = 0; i < sep; i++) {
      let xx = d * i;
      let yy = d * j;
      if (random(100) > 50) {
        line(xx, yy, xx + d, yy + d);
      } else {
        line(xx + d, yy, xx, yy + d);
      }
    }
  }
  pop();
}