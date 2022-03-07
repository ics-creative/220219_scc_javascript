import { useEffect, useState, VFC } from "react";
import EditView from "./components/EditView";
import Visualization from "./components/Visualization";
import { apiAdd } from "./net/apiAdd";
import { apiRemove } from "./net/apiRemove";
import { apiUpdate } from "./net/apiUpdate";
import { apiRead } from "./net/apiRead";
import { Record } from "./types/Record";

const App: VFC = () => {
  const [list, setList] = useState<Record[]>([]); // 一覧表示
  const [selectedItem, setSelectedItem] = useState<Record | null>(null); // 選択された項目
  const [isLoading, setIsLoading] = useState(false);

  // マウントされたとき（起動したとき）
  useEffect(() => {
    // APIからデータを呼び出す
    updateList();
  }, []);

  // APIからデータを取得
  const updateList = async () => {
    setIsLoading(true);
    const result = await apiRead();
    if (result.ok) {
      setList(result.data);
    } else {
      alert(result.data.message);
    }
    setSelectedItem(null);
    setIsLoading(false);
  };

  // 追加ボタン押下時の処理
  const onAdd = async () => {
    setIsLoading(true);
    const o = {
      id: Date.now(),
      color: "#FF0000",
      seed: 0,
      segments: 10,
      lines: 10,
    };
    const result = await apiAdd(o); // 追加
    if (result.ok === false) {
      alert(result.data.message);
    }
    await updateList(); // 一覧を更新
    setIsLoading(false);
  };

  // 保存時の処理
  const onUpdate = async (o: Record) => {
    setIsLoading(true);
    const result = await apiUpdate(o); // 保存
    if (result.ok) {
      await updateList(); // 一覧を更新
    } else {
      alert(result.data.message);
    }

    setIsLoading(false);
  };

  // 選択時（編集ボタン押下時）の処理
  const onSelect = (record: Record) => {
    setSelectedItem(record);
  };
  // 削除ボタン押下時の処理
  const onDelete = async (o: Record) => {
    setIsLoading(true);
    const result = await apiRemove(o); // 削除
    if (result.ok === false) {
      alert(result.data.message);
    }
    await updateList(); // 一覧を更新
    setSelectedItem(null);
    setIsLoading(false);
  };

  return (
    <div>
      <h1>プログラミングアート投稿サービス</h1>

      <p>
        <button onClick={onAdd}>新しいアートを追加</button>
      </p>

      <div className="container">
        {list.map((record) => (
          <div className="thumb" key={record.id}>
            <Visualization record={record} />
            <div>
              <button
                onClick={() => {
                  onSelect(record);
                }}
              >
                編集
              </button>
              <button
                onClick={() => {
                  onDelete(record);
                }}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem != null && (
        <EditView record={selectedItem} update={onUpdate} />
      )}

      {isLoading && (
        <div className="loading">
          <div className="loading-center">
            <div className="loading-center-thumb"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
