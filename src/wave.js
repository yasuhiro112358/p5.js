// インストール済みのp5.jsをインポート
import p5 from 'p5';

// グローバル変数の設定
let waves = [];
let influencePoints = [];
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
    p.background(230, 70, 60);

    // 緩やかな振動を背景に追加
    for (let x = 0; x <= p.width; x += 16) {
      for (let y = 0; y <= p.height; y += 16) {
        // let noiseVal = p.noise(x * 0.005, y * 0.005, p.frameCount * 0.01); // 基本のノイズ値
        let noiseVal = p.noise(x * 0.010, y * 0.010, p.frameCount * 0.01); // 基本のノイズ値

        // すべての影響ポイントの効果を適用
        influencePoints.forEach(point => {
          let distance = p.dist(x, y, point.x, point.y);
          if (distance < point.radius) {
            noiseVal += point.strength * Math.exp(-distance / 50); // 距離に応じてノイズ値を変化
            if (noiseVal > 1.0) {
              noiseVal = 1.0; // ノイズ値が1.0を超えないようにする
            }
          }
        });

        // p.fill(200, 60, 100, noiseVal * 255); // ノイズ値に応じて透明度を変化
        p.fill(210, 60, 80, noiseVal * 255); // ノイズ値に応じて透明度を変化
        p.noStroke();
        p.ellipse(x, y, 8 + noiseVal * 8);
      }
    }

    // 影響ポイントの伝搬処理
    for (let i = influencePoints.length - 1; i >= 0; i--) {
      influencePoints[i].update();
      if (influencePoints[i].isDone()) {
        influencePoints.splice(i, 1); // 影響ポイントが消えたら削除
      }
    }
  };

  // クリックした時に影響ポイントを追加
  p.mousePressed = () => {
    influencePoints.push(new InfluencePoint(p, p.mouseX, p.mouseY));
  };
};

// 影響ポイントのクラス
class InfluencePoint {
  constructor(p, x, y) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.radius = 0; // 初期の影響範囲
    // this.strength = 0.5; // ノイズに与える影響の強さ
    this.strength = 0.3; // ノイズに与える影響の強さ
    // this.lifespan = 200; // 存在時間
    this.lifespan = 300; // 存在時間
  }

  update() {
    // this.radius += 4; // 影響範囲を徐々に拡大
    this.radius += 3; // 影響範囲を徐々に拡大
    // this.radius += 2; // 影響範囲を徐々に拡大
    this.lifespan -= 1; // 影響ポイントの寿命を減らす
  }

  isDone() {
    return this.lifespan <= 0; // 寿命が尽きたら削除
  }
}

// p5.jsインスタンスを作成
new p5(sketch);
