<script setup>
// ----------------------------------------
// 編集画面のコンポーネントです。
// ----------------------------------------
import { onMounted, ref, watch } from "vue";
import Visualization from "./Visualization.vue";

// propsの定義
const props = defineProps({
  record: Object,
});

// ステート一式
const color = ref("#FF0000");
const seed = ref(0);
const lines = ref(10);
const segments = ref(10);

// 外部から指定された値を内部のステートへ更新します
const updateState = () => {
  if (props.record) {
    color.value = props.record.color;
    lines.value = props.record.lines;
    segments.value = props.record.segments;
    seed.value = props.record.seed;
  }
};

// マウントされたとき
onMounted(() => {
  updateState();
});

// 外部から props を更新されたとき
watch([props], () => {
  updateState();
});

// イベントを定義
const emit = defineEmits(["update"]);

// 保存時のハンドラー
const onSave = async () => {
  // ステートをもとに保存データを生成
  const record = {
    id: props.record.id,
    color: color.value,
    seed: Number(seed.value),
    segments: Number(segments.value),
    lines: Number(lines.value),
  };

  // イベントを発火
  emit("update", record);
};
</script>

<template>
  <h1>編集画面</h1>

  <div>
    <input type="color" v-model="color" />
    {{color}}
  </div>

  <div>
    <label>
      <input type="range" min="0" max="100" v-model="seed" />
      seed
    </label>
    : {{seed}}
  </div>

  <div>
    <label>
      <input type="range" min="2" max="200" v-model="lines" />
      lines
    </label>
    : {{lines}}
  </div>

  <div>
    <label>
      <input type="range" min="2" max="400" v-model="segments" />
      segments
    </label>
    : {{segments}}
  </div>

  <Visualization
    :record="{
      color: color,
      seed: Number(seed),
      lines: Number(lines),
      segments: Number(segments)
    }"
  />

  <div>
    <button type="button" @click="onSave">保存</button>
  </div>
</template>
