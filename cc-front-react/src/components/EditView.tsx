import Visualization from "./Visualization";
import {useEffect, useState, VFC} from "react";
import {Record} from "../types/Record";

// ----------------------------------------
// 編集画面のコンポーネントです。
// ----------------------------------------
const EditView: VFC<{
  record: Record,
  update: (record: Record) => void
}> = (props) => {


  // ステート一式

  const [state, setState] = useState<{
    color: string,
    seed: number,
    lines: number,
    segments: number,
  }>({
    color: "#FF0000",
    seed: 0,
    lines: 10,
    segments: 10,
  })


  // 外部から指定された値を内部のステートへ更新します
  const updateState = () => {
    if (props.record) {
      setState(props.record)
    }
  };

  // マウントされたとき
  useEffect(() => {
    updateState();
  }, []);

  // 外部から props を更新されたとき
  useEffect(() => {
    updateState();
  }, [props.record]);

  // 保存時のハンドラー
  const onSave = async () => {
    // ステートをもとに保存データを生成
    const record = {
      id: props.record.id,
      color: state.color,
      seed: Number(state.seed),
      segments: Number(state.segments),
      lines: Number(state.lines),
    };

    // イベントを発火
    props.update(record);
  };

  return <div>
    <h1>編集画面</h1>

    <div>
      <input type="color"
             value={state.color}
             onChange={(event) => {
               setState({...state, color: event.currentTarget.value})
             }}/>
      {state.color}
    </div>

    <div>
      <label>
        <input type="range" min="0" max="100" value={state.seed}
               onChange={(event) => {
                 setState({...state, seed: Number(event.currentTarget.value)})
               }} />
        seed
      </label>
      : {state.seed}
    </div>

    <div>
      <label>
        <input type="range" min="2" max="200" value={state.lines}
                 onChange={(event) => {
                 setState({...state, lines: Number(event.currentTarget.value)})
               }} />
        lines
      </label>
      : {state.lines}
    </div>

    <div>¬
      <label>
        <input type="range" min="2" max="400" value={state.segments}
                 onChange={(event) => {
                 setState({...state, segments: Number(event.currentTarget.value)})
               }} />
        segments
      </label>
      : {state.segments}
    </div>

    <Visualization
      record={{
        id: -1,
        color: state.color,
        seed: Number(state.seed),
        lines: Number(state.lines),
        segments: Number(state.segments)
      }}
    />

    <div>
      <button type="button" onClick={onSave}>保存</button>
    </div>
  </div>
}


export default EditView
