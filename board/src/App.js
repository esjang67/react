import { useState } from 'react';
import './App.css';
import Modal from './component/Modal';

// const title = '게시판';

function App() {

  let [title, setTitle] = useState(['Java', 'HTML']);

  const [like, setLike] = useState([0, 0]);
  // 동적할당테스트 title 갯수로 like 배열 만들기
  let arr=[];
  title.map(()=>{
    arr.push(0);
  })
  // 배열채우기 fill(배열.fill(value, startIndex, endIndex)) 사용
  let arr2 = new Array(title.length).fill(0);
  // let [like, setLike] = useState(arr2);
  
  // 모달화면이 보였다 안보였다하기
  const [modal, setModal] = useState(false);

  // 선택한 게시물 index 저장
  let [titleIndex, setTitleIndex] = useState('');
  
  // 새로운 게시판 추가(첫번째로 추가함)
  const [newTitle, setNewTitle] = useState('');

  // 게시판(TITLE은 기존꺼두고. 날짜만 작업함)
  const [board, setBoard] = useState([
    {
      title:'Java',
      date:'2023-08-01'
    },
    {
      title:'HTML',
      date:'2023-07-22'
    }
  ]);

  const [selDate, setSelDate] = useState('');

  return (
    <div className="App">

      <div className='black-nav'>
        <h3>게시판</h3>
      </div>

      {/* 반복문을 이용해서 태그추가
      반복문을 이용해 만든 태그에는 key가 필요함 */}
      {
        board.map( (data, i) => {
          return (
            <div className='list' onClick={()=> {
              // setModal(!modal);
              setTitleIndex(i);
              setSelDate(board[i].date);
            }} key={i}>
              <h4>
                {data.title}

                <button onClick={(e)=> {
                  e.stopPropagation();
                  let _like = [...like];
                  _like[i]++;
                  setLike(_like);
                }}>좋아요</button> {like[i]}
                </h4>
              <p>{data.date}</p>

              {/* 삭제 */}
              <button onClick={(e)=>{
                e.stopPropagation();

                let _board = [...board];
                _board.splice(i,1);
                setBoard(_board);

                let _like = [...like]
                _like.splice(i,1);
                setLike(_like);

              }}>삭제</button>

              {/* 수정버튼 클릭 -> 모달창에서 입력 -> 변경됨 */}
              <button onClick={(e)=> {
                e.stopPropagation();
                
                let modifyTitle = prompt('수정할 게시판 이름 :');
                
                // ## 내용이 없으면 false로 인식되므로
                // if(modifyTitle){
                if(modifyTitle !== null && modifyTitle !== ''){
                  let _board = [...board];
                  _board[i].title = modifyTitle;
                  setBoard(_board);
                }
              }}>수정</button>

            </div>            
            );
        })
        
        // title.map((data, i)=>{

        //   return (
        //     <div className='list' onClick={()=> {
        //       setModal(!modal);
        //       setTitleIndex(i);
        //       setSelDate(board[i].date);
        //     }} key={i}>
        //       <h4>
        //         {data}
        //         <button onClick={(e)=> {
        //           //setLike(like + 1)
        //           e.stopPropagation();
        //           let _like = [...like];
        //           _like[i]++;
        //           setLike(_like);
        //         }}>좋아요</button> {like[i]}
        //         </h4>
        //       <p>{board[i].date}</p>

        //       <button onClick={(e)=>{
        //         e.stopPropagation();

        //         let copy = [...title];
        //         copy.splice(i,1);
        //         setTitle(copy);

        //         let _like = [...like]
        //         _like.splice(i,1);
        //         setLike(_like);

        //       }}>삭제</button>

        //       {/* 수정버튼 클릭 -> 모달창에서 입력 -> 변경됨 */}
        //       <button onClick={(e)=> {
        //         e.stopPropagation();
                
        //         let modifyTitle = prompt('수정할 게시판 이름 :');
                
        //         // ## 내용이 없으면 false로 인식되므로
        //         // if(modifyTitle){
        //         if(modifyTitle !== null && modifyTitle !== ''){
        //           let copy = [...title];
        //           copy[i]=modifyTitle;
        //           setTitle(copy);
        //         }
                
        //       }}>수정</button>

        //     </div>
        //   );
        // })
      }

      {/* 게시판 추가 */}
      <input className='newTitle' value={newTitle} onChange={(e)=> {
        setNewTitle(e.target.value);
      }} type='text'/>

      <button onClick={()=> {
        //등록내용없으면 등록불가
        if(newTitle===null){
          alert('입력내용없음');
        } else {
          

          let today = new Date();
          let date = `${today.getFullYear()}-
                      ${String(today.getMonth()+1).padStart(2,0)}-
                      ${String(today.getDate()).padStart(2,0)}`;

          let _board = [...board];
          _board.unshift({ title:newTitle, date:date });  // 첫번째로 추가 unshift !!!!
          setBoard(_board);

          // let copy = [newTitle, ...title]; 
          // setTitle(copy);
          setLike([0, ...like]);
          // //입력창초기화
          // setNewTitle('');  //null은 안됨
          // // document.querySelector('.App .newTitle').value='';
        }

      }}>등록</button>
      
      <Modal title={title} setTitle={setTitle} titleIndex={titleIndex} selDate={selDate}/>
      {/* {modal ? <Modal title={title} setTitle={setTitle} titleIndex={titleIndex} selDate={selDate} /> : <></>} */}
      
    </div>
  );
}

export default App;
