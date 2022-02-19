<script setup>
// このコードは、Vue 3 <script setup> のシングル・ファイル・コンポーネントを使用しています。
// https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup を参照ください。
import { onMounted, ref } from "vue";
import EditView from "./components/EditView.vue";
import Visualization from "./components/Visualization.vue";
import { apiAdd } from "./net/apiAdd";
import { apiRemove } from "./net/apiRemove";
import { apiUpdate } from "./net/apiUpdate";
import { apiRead } from "./net/apiRead";

const list = ref([]);　// 一覧表示
const selectedItem = ref(null); // 選択された項目

// マウントされたとき（起動したとき）
onMounted(async () => {
  // APIからデータを呼び出す
  await updateList();
});

// APIからデータを取得
const updateList = async () => {
  const json = await apiRead();
  list.value = json;
  selectedItem.value = null;
};

// 追加ボタン押下時の処理
const onAdd = async () => {
  const o = {
    id: Date.now(),
    color: "#FF0000",
    seed: 0,
    segments: 10,
    lines: 10,
  };
  await apiAdd(o); // 追加
  await updateList(); // 一覧を更新
};

// 保存時の処理
const onUpdate = async (o) => {
  await apiUpdate(o); // 保存
  await updateList(); // 一覧を更新
};

// 選択時（編集ボタン押下時）の処理
const onSelect = (record) => {
  selectedItem.value = record;
}
// 削除ボタン押下時の処理
const onDelete = async (o) => {
  await apiRemove(o); // 削除
  await updateList(); // 一覧を更新
  selectedItem.value = null;
};
</script>

<template>

  <h1>プログラミングアート投稿サービス</h1>

  <p>
    <button @click="onAdd">新しいアートを追加</button>
  </p>

  <!-- 一覧画面 -->
  <div class="container">
    <div v-for="record in list" class="thumb">
      <Visualization :record="record" />
      <div>
        <button @click="onSelect(record)">編集</button>
        <button @click="onDelete(record)">削除</button>
      </div>
    </div>
  </div>

  <!-- 編集画面 -->
  <EditView
    v-if="selectedItem != null"
    :record="selectedItem"
    @update="onUpdate"
  />
</template>

<style scoped>
.container {
  /* グリッドコンテナ */
  display: grid;
  /* 最小100px、最大1frの列を繰り返しつくる */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 10px;
  row-gap: 10px;
}

.thumb canvas {
  /* canvasタグのサイズを可変にする */
  width: 100%;
  height: auto;
}
</style>
