// インストール済みのp5.jsをインポート
import p5 from 'p5';

// グローバル変数の設定
let waves = [];
let centerX, centerY;

// p5.jsスケッチ
const sketch = (p) => {
  p.setup = () => {
    const canvasContainer = document.getElementById('canvas-container');
    p.createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent(canvasContainer);
    centerX = p.width / 2;
    centerY = p.height / 2;
  };

  p.draw = () => {
    p.colorMode(p.HSB, 360, 100, 100, 255); // カラーモードをHSBに設定
    // p.background(210, 100, 40);
    // p.background(180, 70, 80);
    p.background(230, 60, 70);
    
    // 緩やかな振動を背景に追加

    for (let x = 0; x <= p.width; x += 16) { // 20pxごとに点を打つ
      for (let y = 0; y <= p.height; y += 16) { // 20pxごとに点を打つ
        let noiseVal = p.noise(x * 0.005, y * 0.005, p.frameCount * 0.010); // ノイズの値を取得 (0~1)
        
        // p.fill(210, 50, 80, noiseVal * 255); // 塗りつぶしの色を設定 (HSB, 透明度)
        // p.fill(160, 60, 90, noiseVal * 255); // 塗りつぶしの色を設定 (HSB, 透明度)
        p.fill(200, 60, 100, noiseVal * 255); // 塗りつぶしの色を設定 (HSB, 透明度)
        p.noStroke(); // 線を描かない
        p.ellipse(x, y, 8 + noiseVal * 12); // 点を描く (x, y, 直径)
      }
    }

    // マウスの位置を中心に求心点を設定
    centerX = p.mouseX;
    centerY = p.mouseY;

    // 波紋の描画
    for (let i = waves.length - 1; i >= 0; i--) {
      let wave = waves[i];
      wave.display();
      wave.update();

      // 波紋が消えたらリストから削除
      if (wave.isDone()) {
        waves.splice(i, 1);
      }
    }
  };

  // クリックした時に波紋を追加
  p.mousePressed = () => {
    waves.push(new Wave(p, centerX, centerY));
  };
};

// 波紋のクラス
class Wave {
  constructor(p, x, y) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 255;
  }

  update() {
    this.radius += 2; // 波の広がり速度
    // this.alpha -= 4;  // 波の消えていく速度
    this.alpha -= 1;  // 波の消えていく速度
  }

  display() {
    this.p.noFill();
    this.p.stroke(255, this.alpha);
    this.p.strokeWeight(2);
    this.p.ellipse(this.x, this.y, this.radius * 2);
  }

  isDone() {
    return this.alpha <= 0;
  }
}

// p5.jsインスタンスを作成
new p5(sketch);
