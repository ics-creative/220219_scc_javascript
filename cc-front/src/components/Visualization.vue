<script setup>
// ----------------------------------------
// プログラミングアートのビジュアライズコンポーネントです。
// {id: number, color:string, seed: number, lines:number, segments: number} の
// データを受け取ったら波打つ表現を canvas タグに描画します。
//
// 波打つグラフィックは以下の記事を参照ください。
// https://ics.media/entry/18812/
// ----------------------------------------
import { Random } from "../math/Random";
import { makeNoise2D } from "fast-simplex-noise";
import { onMounted, ref, watch } from "vue";

// propsの定義
const props = defineProps({
  // 型は {id: number, color:string, seed: number, lines:number, segments: number} です
  record: Object,
});

// キャンバスの定義
const refCanvas = ref();

// マウントされたとき
onMounted(() => {
  if (props.record) { draw(); }　// 描画
});

// 外部から props を更新されたとき
watch([props], () => {
  if (props.record) { draw(); }　// 描画
});

// キャンバスのサイズ定義
const stageW = 640; // 幅
const stageH = 480; // 高さ

const draw = () => {
  const canvas = refCanvas.value;

  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  // 連続したノイズを生成する関数を用意
  const random = new Random(); // 再現可能な乱数
  const noise2d = makeNoise2D(() => random.next()); // ノイズ

  // 必要な数値を取得
  const { color, seed, lines, segments } = props.record;


  // ----------------------------------------------
  // 波打つ表現の描画処理は以下の記事の方法を利用
  // https://ics.media/entry/18812/
  // ----------------------------------------------

  // 画面をリセット
  context.globalAlpha = 1;
  context.clearRect(0, 0, stageW, stageH);
  context.fillStyle = "#000000";
  context.fillRect(0, 0, stageW, stageH);

  context.lineWidth = 1;

  const amplitude = stageH / 2; // 振幅（縦幅)の大きさ

  [...Array(lines).keys()].forEach((j) => {
    const coefficient = 50 + j;

    context.beginPath();
    context.strokeStyle = color;
    context.globalAlpha = j / lines;

    [...Array(segments).keys()].forEach((i) => {
      const x = (i / (segments - 1)) * stageW;
      const px = i / coefficient;
      const py = j / 50 + seed;
      const y = amplitude * noise2d(px, py) + stageH / 2;

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.stroke();
  });

};
</script>

<template>
  <canvas ref="refCanvas" :width="stageW" :height="stageH" />
</template>
