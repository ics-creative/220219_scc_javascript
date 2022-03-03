import {useEffect, useState, VFC} from "react";
import EditView from "./components/EditView";
import Visualization from "./components/Visualization";
import {apiAdd} from "./net/apiAdd";
import {apiRemove} from "./net/apiRemove";
import {apiUpdate} from "./net/apiUpdate";
import {apiRead} from "./net/apiRead";
import {Record} from "./types/Record"

const App: VFC = () => {
  const [list, setList] = useState<Record[]>([]);　// 一覧表示
  const [selectedItem, setSelectedItem] = useState<Record | null>(null); // 選択された項目

  // マウントされたとき（起動したとき）
  useEffect(() => {
    // APIからデータを呼び出す
    updateList();
  }, [])


  // APIからデータを取得
  const updateList = async () => {
    const json = await apiRead();
    setList(json)
    setSelectedItem(null)
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
  const onUpdate = async (o: Record) => {
    await apiUpdate(o); // 保存
    await updateList(); // 一覧を更新
  };

  // 選択時（編集ボタン押下時）の処理
  const onSelect = (record: Record) => {
    setSelectedItem(record)
  }
  // 削除ボタン押下時の処理
  const onDelete = async (o: Record) => {
    await apiRemove(o); // 削除
    await updateList(); // 一覧を更新
    setSelectedItem(null)
  };

  return <div>

    <h1>プログラミングアート投稿サービス</h1>

    <p>
      <button onClick={onAdd}>新しいアートを追加</button>
    </p>


    <div className="container">
      {
        list.map(record => <div className="thumb">
            <Visualization record={record}/>
            <div>
              <button onClick={() => {
                onSelect(record)
              }}>編集
              </button>
              <button onClick={() => {
                onDelete(record)
              }}>削除
              </button>
            </div>
          </div>
        )
      }

    </div>

    {
      selectedItem != null && <EditView
        record={selectedItem}
        update={onUpdate}
      />
    }
  </div>
}

export default App;
