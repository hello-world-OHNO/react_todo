// propsを渡す
// １ テキストがpropsで変わるようにする
// ２ onClickの動作を変えるようにする
export const Button = ({ text, clickAction }) => {
  // ロジック↓↓↓↓↓↓↓↓↓↓

  // HTML部分↓↓↓↓↓↓↓↓↓↓
  return (
    <button onClick={clickAction}>{text}</button>
  )
}
