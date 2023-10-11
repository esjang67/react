function Event({clickEvent}) {

  const clickHandler = () => {
    alert("hello");
  }

  // function gettarget(e) {
  //   alert(e.target.innerText);
  // }

  return (
    <div>
      {/* 직접지정방식 */}
      <button onClick={()=>{
        alert('hi');
      }}>버튼1</button>

      <button onClick={(e)=>{
        alert(e.target.innerText);
      }}>버튼1-1</button>

      {/* 자주사용하는 핸들러 방식(함수구현: clickHandler) */}
      <button onClick={clickHandler} >버튼2</button>
      
      <button onClick={clickEvent}>App에서 만든 함수실행</button>

    </div>
  );
}

// App에서 만든 함수실행 방법1
// function Event(props) {
//    return (
//     <div>
//        <button onClick={props.clickEvent}>App에서 만든 함수실행</button>
//     </div>
//   );
// }

// App에서 만든 함수실행 방법2
// function Event({clickEvent}) {
//    return (
//     <div>
//        <button onClick={clickEvent}>App에서 만든 함수실행</button>
//     </div>
//   );
// }


export default Event;