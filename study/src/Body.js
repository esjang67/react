import './Body.css';    //

const Body = () => {
  // html에서 변수값을 사용하고 싶을때 표현식{}을 입력함
  const number = 1;
  const str1 = 'hello';
  const str2 = 'react';

  const str3 = true;
  const str4 = false;
  // Boolean의 값은 화면에 표시하지 않음(출력하고싶으면 형변환)

  // 출력안되는것 object array는 정확한 값이나 키값을 입력해야 출력됨
  const obj = {
    name:'고길동',
    age:20
  };

  // obj age가 20살이상이면 성인표시
  // 표현식에는 if, for 등을 쓸수없다 삼항연산자는 가능!
  // 화면에 표시하지 않을때 null

  // if (obj.age >= 20) {
  //   // 여기서 리턴문을 쓸수있음
  //   return (
  //     <div> 성인</div>
  //   );
  // } else {
    // return <div> 청소년</div>;
  // }

  return (
    <>
      {/* <div style={{ fontSize : '20px', backgroundColor: 'skyblue' }}> */}
      <div className='body'>
        <h1>body 영역</h1>

        <h2>{number}</h2> 
        <h2>{number +  10}</h2> 
      </div>

      <div>
        <h2>{str1 + str2}</h2>
        <h2>{String(str3 || str4)}</h2>
        <h2>{obj.name}</h2>

        <h2>
          {
            (obj.age >= 20) ? '성인' : null
          }
        </h2>

        <h2>
          {  obj.age >= 20 && '성인' }
        </h2>
      </div>
    </>
    );
}

export default Body;