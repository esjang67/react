import { useState } from "react";

const Child = (props) => {
  console.log('Child');
  return (
    <div>자식 컴포넌트
      <p>{props.number}</p>
      <button onClick={ ()=> {
        props.setNumber(props.number - 1);
      }}>자식버튼(-1)</button>
    </div>
  );
}

const TestState = () => {
      // 변수명, 변경함수
  const [number, setNumber] = useState(10);
  console.log(number);

  return (
    <div>
      <h1> state 확인 컴포넌트</h1>
      <h2>{number}</h2>
      {/* 버튼을 누를때마다 1씩 증가함, 변수가 변경되어 랜더링 됨 */}
      <button onClick={ () => {
        setNumber(number + 1);
      }}>증가</button>

      <Child number={number} setNumber={setNumber}/>
    </div>
    );
}

export default TestState;