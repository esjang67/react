import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAddCount, changeSubCount, delCart } from "../redux/store";
import { memo, useMemo, useState } from "react";

// Memoization
// function Test() {
const Test = memo(({num})=> {
  console.log('test컴포넌트');

  return (
    <div>{num} 메모이제이션 테스트중</div>
    )
})

// 재귀 함수
const fact = (n)=> {
  if(n<=1)
    return 1;
  
  return n * fact(n-1);
}

function Cart() {

  // [useSelector] redux 사용하기 매개변수 state는 store에서 저장한 내용들을 가져오기(모두가져옴)
  const cart = useSelector((state) => state.cart);

  // [useDispatch] : redux에서 만든 store에 선언한 함수를 가져올 수 있음
  const dispatch = useDispatch();

  const [num, setNum] = useState(0);
  const [n, setN] = useState(10);

  const result = useMemo( ()=> {
    return(fact(n))
  }, [n]) 

  return (
    <>
      <input type='number' value={n} onChange={(e)=> {
      setN(e.target.value)}}/>
      {result}
      <Test num={num}/>  
      <button onClick={()=> setNum(num + 1)}>버튼</button>

      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          { 
            cart.map((item, i) => {
              return(
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <button onClick={()=> {
                      dispatch(changeSubCount(item.id));
                    }}>-</button>&nbsp;&nbsp;
                    {item.count}&nbsp;&nbsp;
                    <button onClick={()=> {
                      dispatch(changeAddCount(item.id));
                    }}>+</button>
                  </td>
                  <td>
                    <button onClick={()=> {
                      dispatch(delCart(item.id));
                    }}>삭제</button>
                  </td>
                </tr>          
              )
            })          
          }
        </tbody>
      </Table>    
    </>
  );

}

export default Cart;