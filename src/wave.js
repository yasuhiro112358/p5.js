// インストール済みのp5.jsをインポート
import p5 from 'p5'; // p5.jsをインポート
import { Pane } from 'tweakpane'; // Tweakpaneをインポート

// グローバル変数の設定
let waves = [];
let influencePoints = [];
let centerX, centerY;

// Tweakpaneのパラメータ
const params = {
  bgHue: 230,
  bgSaturation: 70,
  bgBrightness: 60,
  waveHue: 210,
  waveSaturation: 60,
  waveBrightness: 80,
};

// p5.jsスケッチ
const sketch = (p) => {
  p.setup = () => {
    const canvasContainer = document.getElementById('canvas-container');
    p.createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight).parent(canvasContainer);
    centerX = p.width / 2;
    centerY = p.height / 2;

    // Tweakpaneの設定
    const pane = new Pane({ // Tweakpaneのインスタンスを作成
      container: document.getElementById('tweakpane-container'), // Tweakpaneを表示する要素を指定
    });
    const bgFolder = pane.addFolder({ // フォルダを追加
      title: 'Background',
      expanded: true,
    });
    const waveFolder = pane.addFolder({ // フォルダを追加
      title: 'Wave',
      expanded: true,
    });
    
    bgFolder.addBinding(params, 'bgHue', { min: 0, max: 360 });
    bgFolder.addBinding(params, 'bgSaturation', { min: 0, max: 100 });
    bgFolder.addBinding(params, 'bgBrightness', { min: 0, max: 100 });
    waveFolder.addBinding(params, 'waveHue', { min: 0, max: 360 });
    waveFolder.addBinding(params, 'waveSaturation', { min: 0, max: 100 });
    waveFolder.addBinding(params, 'waveBrightness', { min: 0, max: 100 });
  };

  p.draw = () => {
    p.colorMode(p.HSB, 360, 100, 100, 255); // カラーモードをHSBに設定
    p.background(params.bgHue, params.bgSaturation, params.bgBrightness); // 背景色を設定

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
        p.fill(params.waveHue, params.waveSaturation, params.waveBrightness, noiseVal * 255); // ノイズ値に応じて透明度を変化
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
