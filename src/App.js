import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  // 各項目の状態を保持
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  // テキストボックスを追加する
  const addTextBox = (list, setList) => {
    // keyはlengthで作成、テキスト内容を引き継ぐためtextの初期値を空 ”” で定義
    const newItem = { key: list.length, text: "" };
    setList([...list, newItem]);
  };

  // ここのロジックがわからずchatGPTに聞きました。
  // 移動させたいアイテム、現在存在するリスト、リストを更新するための関数、移動先のリスト、移動先のリストを更新するための関数を引数とする。
  const moveItem = (item, sourceList, setSourceList, targetList, setTargetList) => {
    // 移動されるアイテムにテキストボックスの内容を追加。.
    // ...item は、元のアイテムのすべてのプロパティを新しいオブジェクトにコピー、text プロパティを追加しています。document.getElementById(textbox-${item.key}).value は、移動されるアイテムのキーに対応するテキストボックスの内容を取得しています。
    const itemWithText = { ...item, text: document.getElementById(`textbox-${item.key}`).value };
    // setSourceList 関数を呼び出して、移動元のリストを更新。filter メソッドは、移動されるアイテム以外のすべてのアイテムをフィルタリング。つまり、移動されるアイテムを除いた新しいリストが作成。
    setSourceList(sourceList.filter((el) => el !== item));
    // 移動先のリストを更新。
    setTargetList([...targetList, itemWithText]);
  };

  return (
    <div className="App">
      <div className="items">
        <p>ToDo</p>
        {/* onClickでテキストボックスを作成 */}
        <button onClick={() => addTextBox(todos, setTodos)}>作成+</button>
        {todos.map((item) => (
          <div key={item.key}>
            {/* id はtextbox-にそのアイテムの key 値を追加したもの。 defaultValue={item.text}で入力値を取得*/}
            <input id={`textbox-${item.key}`} className="textbox" type="text" placeholder="taskを入力" defaultValue={item.text} />
            {/* onClickで "item"=選択したテキストボックス ”todos, setTodos,”=現在のリスト、更新関数　"inProgress, setInProgress"で移動先の情報を渡す */}
            <button onClick={() => moveItem(item, todos, setTodos, inProgress, setInProgress)}>→移動</button>
          </div>
        ))}
      </div>
      <div className="items">
        <p>In Progress</p>
        {inProgress.map((item) => (
          <div key={item.key}>
            <input id={`textbox-${item.key}`} className="textbox" type="text" placeholder="taskを入力" defaultValue={item.text} />
            <button onClick={() => moveItem(item, inProgress, setInProgress, todos, setTodos)}>←移動</button>
            <button onClick={() => moveItem(item, inProgress, setInProgress, done, setDone)}>→移動</button>
          </div>
        ))}
      </div>
      <div className="items">
        <p>Done</p>
        {done.map((item) => (
          <div key={item.key}>
            <input id={`textbox-${item.key}`} className="textbox" type="text" placeholder="taskを入力" defaultValue={item.text} />
            <button onClick={() => moveItem(item, done, setDone, inProgress, setInProgress)}>←移動</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;