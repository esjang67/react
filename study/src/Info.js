import { useState } from "react";
import Child from "./Child";

const Info = () => {

  const [person, setPerson] = useState({
    name:'',
    age:'',
    gender:''
  });

  const changePersonHandler = (e)=> {
    setPerson({
      ...person,
      [e.target.name] : e.target.value
    })      
  }


  return (
    <div>
      <h1>Info 컴포넌트</h1>
      <form>
        이름 : <input name='name' type='text' onChange={changePersonHandler}></input><br/>
        나이 : <input name='age' type='number' onChange={changePersonHandler} value={person.age}></input><br/>
        성별 : 
        <select name='gender' onChange={changePersonHandler}>
          <option>남자</option>
          <option>여자</option>
        </select>
      </form>

      <h4>입력정보 : {person.name}, {person.age}, {person.gender}</h4>

      <Child person={person} setPerson={setPerson}/>
      {/* <Child {...person} setPerson={setPerson}/> */}

    </div>  
  );
}

export default Info;