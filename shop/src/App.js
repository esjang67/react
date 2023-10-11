import './App.css';

// import data from './mockData.js';
import { Suspense, lazy, useEffect, useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Main from './component/Main';
// import Detail from './component/Detail';
// import About from './component/About';
import axios from 'axios';
// import Cart from './component/Cart';
import Watched from './component/Watched';

// 웹사이트 접속시 화면 로딩시 자주 안쓰는 화면 걸러로딩시키기
// 해당페이지 들어갈때 import함
const Detail = lazy(()=> import('./component/Detail'))
const About = lazy(()=> import('./component/About'))
const Cart = lazy(()=> import('./component/Cart'))

const url = 'https://raw.githubusercontent.com/Naessss/study/main/fruit.json'

function App() {
  
  // const [fruit, setFruit] = useState(data);
  const [fruit, setFruit] = useState([]); // 서버에서 받아올것임

  useEffect(()=>{
    
    axios.get(url)
      .then( (resp) => {
        
        setFruit(resp.data);    //
      })
      .catch( (err) => {
        console.log(err);
      })
    // return()=>{}
  }, [])

  // 최근 본 상품(로컬스토리지 이용)
  useEffect(()=> {
    //if(localStorage.getItem('watched')===null)
      localStorage.setItem("watched", JSON.stringify([]));  // 빈배열 저장
    // page를 나가면 삭제시킴 : session storage 사용
  }, [])  // []: mount시 1번만 실행되도록함

  return (
    <div className="App">
      <Header />

      <Watched fruit={fruit}/>

      {/* lazy import중 오래걸릴수 있으므로 기본페이지 작성 */}
      <Suspense fallback={<div>로딩중</div>}>
        {/* 주소페이지를 설정함 */}
        <Routes>
          <Route path='/' element={<Main fruit={fruit}/>} />

          {/* <Route path='/detail' element={<Detail fruit={fruit}/>} /> */}
          {/* detail페이지를 각각의 페이지로 만들고싶을때
          1. URL 파라미터 (/key로 입력됨) path='/detail/:id/:name' 등으로 추가할 수 있음  (Detail.js 참조)
        2. 쿼리스트링 (주소에?text=value..) */}
          <Route path='/detail/:id' element={<Detail fruit={fruit}/>} />

          <Route path='/about' element={<About />}>
          {/* about의 하위주소입력 */}
            <Route path='intro' element={<div>회사소개</div>} />
            <Route path='history' element={<div>연혁</div>} />
            <Route path='location' element={<div>오시는길</div>} />

          </Route>

          <Route path='/cart' element={<Cart />}></Route>

          {/* 없는페이지 출력(맨 마지막) */}
          <Route path='*' element={<div>존재하지 않는 페이지</div>} />
        </Routes>
      </Suspense>

    </div>
  );
}

export default App;
