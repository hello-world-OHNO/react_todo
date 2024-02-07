import './App.css';
import { useState } from 'react';

function App() {
  // 各項目の状態を保持
  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  // テキストボックスを追加する
  const addTextBox = (list, setList) => {
    // keyはlengthで作成、テキスト内容を引き継ぐためtextの初期値を空 ”” で定義
    const newItem = { id: list.length, text: "" };
    setList([...list, newItem]);
  };

  // 移動させたいアイテム、現在存在するリスト、リストを更新するための関数、移動先のリスト、移動先のリスト、テキストを更新するための関数を引数とする。
  const moveItem = (item, sourceList, setSourceList, targetList, setTargetList, text) => {
    // sourceList から移動されるアイテムを除外し、updatedSourceList を作成。filterを使用して、移動されるアイテム以外の要素を残す。
    const updatedSourceList = sourceList.filter((el) => el !== item);
    // 移動元のリストを更新
    setSourceList(updatedSourceList);
    // 移動先targetListに追加。移動後のテキスト内容を含むアイテムを作成。移動後リストには元のアイテムが保持され、かつテキスト内容が更新された状態で追加される。
    setTargetList([...targetList, { ...item, text }]);
  };

  return (
    <div className="App">
      <div className="items">
        <p>ToDo</p>
        {/* onClickでテキストボックスを作成 */}
        <button onClick={() => addTextBox(todoList, setTodoList)}>作成+</button>
        {todoList.map((item) => (
          <div key={item.id}>
            {/* id はtextbox-にそのアイテムの key 値を追加したもの。 defaultValue={item.text}で入力値を取得*/}
            <input
              className="textbox" type="text" placeholder="taskを入力" defaultValue={item.text}
              // onChangeを追加、テキスト取得。
              onChange={(event) => {
                const newText = event.target.value;
                // 更新関数を使って、同じidを持つ場合に...todoとnewTextを返す。
                setTodoList(todoList.map(todo => todo.id === item.id ? { ...todo, text: newText } : todo));
              }}
            />
            {/* onClickで "item"=選択したテキストボックス ”todoList, setTodoList,”=現在のリスト、更新関数　"inProgressList, setInProgressList"で移動先の情報を渡す */}
            <button onClick={() => moveItem(item, todoList, setTodoList, inProgressList, setInProgressList, item.text)}>→移動</button>
          </div>
        ))}
      </div>
      <div className="items">
        <p>In Progress</p>
        {inProgressList.map((item) => (
          <div key={item.id}>
            <input
              className="textbox" type="text" placeholder="taskを入力" defaultValue={item.text}
              onChange={(event) => {
                const newText = event.target.value;
                setInProgressList(inProgressList.map(inProgress => inProgress.id === item.id ? { ...inProgress, text: newText } : inProgress));
              }}
            />
            <button onClick={() => moveItem(item, inProgressList, setInProgressList, todoList, setTodoList, item.text)}>←移動</button>
            <button onClick={() => moveItem(item, inProgressList, setInProgressList, doneList, setDoneList, item.text)}>→移動</button>
          </div>
        ))}
      </div>
      <div className="items">
        <p>DoneList</p>
        {doneList.map((item) => (
          <div key={item.id}>
            <input
              className="textbox" type="text" placeholder="taskを入力" defaultValue={item.text}
              onChange={(event) => {
                const newText = event.target.value;
                setDoneList(doneList.map(done => done.id === item.id ? { ...done, text: newText } : done));
              }}
            />
            <button onClick={() => moveItem(item, doneList, setDoneList, inProgressList, setInProgressList, item.text)}>←移動</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;