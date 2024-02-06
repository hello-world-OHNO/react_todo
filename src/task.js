import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button } from './components/Button.js';

function App() {
  const [inputValue, setInputValue] = useState("")
  // inputValue→元の値、更新された値が入る
  // setInputValue→更新するための関数
  // useState→("初期値")　関数名は変わらない

  // クリックon,off切り替え
  const [isClicked, setIsClicked] = useState(false)

  // 合計数カウント
  const [total, setTotal] = useState(0)
  const plusTotal = () => {
    setTotal(total + 1)
  }
  const minusTotal = () => {
    setTotal(total - 1)
  }


  return (
    <div className="App">
      <input type="text" onChange={(event) => {
        // onChangeした際に
        console.log(event.target.value)
        setInputValue(event.target.value)
        // event.target.value（入力値）をsetInputValueの関数を使ってinputValueに返す
      }} />
      <p>{inputValue}</p>
      {/* inputValue（更新された値）を表示させる　ducumentget~は使わない */}
      <button onClick={() => {
        setIsClicked(!isClicked);
        // setIsClicked(更新関数)でisClickedの反対を入れる
      }} />
      <p>{isClicked ? "ON" : "OFF"}</p>
      {/* 条件式 ? Trueの処理 : Falseの処理 */}

      {/* コンポーネントを使ってpropsを渡す */}
      {/* clickAction={() => alert("大野")} 関数で切り出す */}
      <Button text="大野" clickAction={() => alert("大野")} />
      <Button text="吉田" clickAction={() => alert("吉田")} />

      <p>合計: {total}</p>
      {/* +ボタン */}
      <Button text="+" clickAction={plusTotal} />
      {/* -ボタン */}
      <Button text="-" clickAction={minusTotal} />
    </div>
  );
}

export default App;

