
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import { getEmotionImgById } from './util/util';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';

// 내보내기
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 임시데이터
// const mockData = [
//   {
//     id : 'm1',
//     date : new Date().getTime(),
//     content : '임시데이터 1임시데이터 1임시데이터 1임시데이터 1임시데이터 1임시데이터 1',
//     emotionId : 1
//   },
//   {
//     id : 'm2',
//     date : new Date().getTime()+2,
//     content : '임시데이터 2',
//     emotionId : 2
//   },
//   {
//     id : 'm3',
//     date : new Date().getTime()+3,
//     content : '임시데이터 3',
//     emotionId : 4
//   }
// ]

// 자체 react redux의 함수들 설정
function reducer(state, action) {
  switch(action.type) {
    case 'CREATE':
      const newState = [action.data, ...state]  
      localStorage.setItem('diary', JSON.stringify(newState))
      return newState;

    case 'UPDATE':
      const upState = state.map( (data)=> 
        String(data.id) === String(action.data.id) ? {...action.data} : data
      )
      localStorage.setItem('diary', JSON.stringify(upState));
      return upState;

    case 'DELETE':  
      const dltState = state.filter((data)=> String(data.id) !== String(action.targetId))
      localStorage.setItem('diary', JSON.stringify(dltState))
      return dltState;

    case 'INIT':
      const initState = action.data;
      // localStorage.setItem('diary', JSON.stringify(initState))
      return initState;
      
    default:
      return state;
  }
}

function App() {
  // 각 기능들을 저장하는 state를 redux로 구현함
  const [state, dispatch] = useReducer(reducer, []); // useReducer(reducer : 사용할 함수, []: 초기값)

  // useRef : 다른 변수들은 기존 컴포넌트가 종료되면 값이 재설정되지만 
  // 요건 컴포넌트와 상관없이 변하지 않는 값을 저장함
  // 웹사이트 리프래쉬할때는 다시 초기값으로 들어감
  const idRef = useRef(0);

  const [isDataLoad, setIsDataLoad] = useState(false);

  useEffect( ()=> {
    const rowData = localStorage.getItem('diary')

    if(!rowData){
      setIsDataLoad(true)
      return;
    } 

    const localData = JSON.parse(rowData);
    if(localData.length === 0){ // [] 일수도있음
      setIsDataLoad(true)
      return;
    }

    // 로컬스토리지에 저장된 0번방에 id가 최신이므로 저장해줌
    idRef.current = localData[0].id + 1;

    dispatch({
      type:'INIT',
      data: localData
    })
    setIsDataLoad(true);

    // dispatch ({
    //   type: 'INIT',
    //   data: mockData
    // })
    // setIsDataLoad(true)
  }, [])

  const onCreate = (date, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
          id : idRef.current, 
          date : new Date(date).getTime(),
          emotionId,
          content
        }
    })
    idRef.current += 1;
  }

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: 'UPDATE',
      data: {
          id : targetId,
          date : new Date(date).getTime(),
          emotionId,
          content
        }
    })
  }

  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  // useEffect의 작업이 끝나지 않으면 로딩중 문구를 보여줌
  if(!isDataLoad) {
    return <div>로딩중....</div>
  } else {
    return (

      <DiaryStateContext.Provider value={state}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <div className="App">
            <Routes>
              <Route path='/'          element={<Home />} />
              <Route path='/new'       element={<New />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='/edit/:id'  element={<Edit />} />
            </Routes>
          </div>

        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
