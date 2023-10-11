import { useState } from "react";

const Prac = () => {

  // const [name, setName] = useState('');
  // const [gender, setGender] = useState('');
  // const [birth, setBirth] = useState('');
  // const [info, setInfo] = useState('');

  // const changeHandlerInfo = (e)=> {
  //   setInfo(e.target.value);
  // }
  // console.log(name, gender, birth, info);

  // 재랜더링은 주소값이 변경되어야 작업이됨!!!!!

  // 여러개의 state를 하나로 합쳐보기( 기존 작업추가 :input, select 등에 name 추가함)
  const [person, setPerson] = useState({
    name:'',
    genger:'',
    birth:'',
    info:''
  });

  // ## 참조변수(object, array)는 값이 바뀌어도 주소값이 변경되지 않으므로 재랜더링이 되지않음
  const changeHandler = (e)=> {
    // console.log(e.target.name, e.target.value);
   
    // ## 주소값을 변경해야하므로
    // let copy = {...person};   // ## person을 깨서 다시 object로 담아서 copy에 저장함(주소가 변경됨)
    // copy.name = '홍길동';
    // setPerson(copy);
    // //--------또는 -----------------
    // setPerson({...person});

    // 방법1
    let copy = {...person}; 
    copy[e.target.name] = e.target.value;
    setPerson(copy);

    //---------------------------------------------------
    // 방법2 (기준 + 변경)
    setPerson({
      ...person,
      [e.target.name] : e.target.value
    })
  }
  console.log(person);

  return (
    <div>
      <h1> 상태연습용 컴포넌트</h1>

      <input name='name' type='text' onChange={changeHandler}/><br/>
      
      <select name='gender' onChange={changeHandler}>
        <option>남자</option>
        <option>여자</option>
      </select><br/>
      
      {/* <input type='date' onChange={(e)=> setBirth(e.target.value) }/><br/> */}
      <input name='birth' type='date' onChange={changeHandler}/><br/>

      {/* <textarea onChange={changeHandlerInfo}> </textarea> */}
      <textarea name='info' onChange={changeHandler}> </textarea>

      {/* <h3>{name}, {gender}, {birth}, {info}</h3> */}

    </div>
    
    )
}

export default Prac;