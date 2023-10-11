// import { useState } from "react";

function Child({person, setPerson}) {
// function Child({name, age, gender, setPerson}) {

  // const [cAge, setAge] = useState(person.age);

  let test = ((person.age % 2) === 0) ? '짝수':'홀수';

  const addAgeHandler = () => {
    console.log(person.age)
    setPerson({
      ...person,
      age : Number(person.age) + 1
    })
    // let copy = {...person};
    // copy.age = Number(copy.age) + 1;
    // setPerson(copy);
  }

  return (
    <div>
      <h2>Child 컴포넌트</h2>
      <h4>{person.age} : {test}</h4>
      <button onClick={addAgeHandler}>나이 + 1</button>   
    </div>
  )
}

export default Child;