// import logo from './logo.svg';
import { useDeferredValue, useState, useTransition } from 'react';
import './App.css';

let a = Array(10000).fill(0);

function App() {

  const [data, setData] = useState('');

  // useTransition : 작동시작이 너무 길때
  // isPending : startTransition이 작동중이면 true로 상태를 알 수 있음
  const [isPending, startTransition] = useTransition();

  const deferState = useDeferredValue(data);

  return (
    <div className="App">

      <input onChange={(e)=> {
        // startTransition(()=> {  // 처리를 미룸으로 입력속도가 빨라지도록 함
          setData(e.target.value)
        // })
      }} />
      {
        // isPending ? '로딩중' :
        a.map(() => {
          return(
            // <div>{data}</div>  
            <div>{deferState}</div>  
          )
        })
      }
    </div>
  );
}

export default App;
