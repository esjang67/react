//import logo from './logo.svg';
import './App.css';
import Body from './Body';
import Event from './Event';
import Footer from './Footer.js'; // .js 생략가능
import Info from './Info';
import Prac from './Prac';
import TestState from './TestState';

// function Header(props){
//   console.log(props);
//   console.log(props.name);
//   return (
//     //작업할 html
//     <header>
//       <h1>Header 영역</h1>
//       <h4>{props.name + props.age}</h4>
//       <h4>{props.person.name}</h4>
//     </header>
//     );
// }

function Header({person, name, number}){
  console.log('person', person);
  console.log('name', name);
  console.log('number', number);

  // 선언된 변수명과 같아야 값을 가져올 수 있음
  const {pname, page} = person;
  console.log('person-name', pname);
  console.log('person-age', page);

  return (
    //작업할 html
    <header>
      <h1>Header 영역</h1>
      <h4>{name}</h4>
      <h4>{person.name}</h4>
    </header>
    );
}

// 기본값 설정
Header.defaultProps = {
  number : 100
};

function App() {
  const name = '홍길동';
  const age = 10;
  // name을 Header에 값을 전달해서 출력하고싶을때 props를 쓴다.
  const person = {
    pname:'박길동',
    page:15
  };
  const number = 10;

  const clickEvent = () => {
    alert('app함수');
  }

  return (
    <div className="App">
      <Info />

      <Prac />

      <TestState />

      <Event clickEvent={clickEvent}/>
      
      {/* <Header></Header> */}
      {/* <Header /> */}
      <Header name = {name} age = {age} person = {person} />
      <h1>App hello</h1>

      <Body />
      <Footer />
    </div>
  );
}

export default App;
