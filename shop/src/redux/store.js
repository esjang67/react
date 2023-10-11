import { configureStore, createSlice } from "@reduxjs/toolkit";
import watched from "./watchedSlice";

const cart = createSlice({
  name : 'cart',
  initialState : [
    {
      id : 0,
      title : 'apple',
      count : 2
    }, 
    {
      id : 4,
      title : 'peach',
      count : 1
    }
  ],
  reducers : {
    // 정렬이 변경되면 i로 받아온 index가 다를 수도 있으므로.
    changeAddCount(state, i) {
      let index = state.findIndex((data)=> data.id === Number(i.payload)); 
      state[index].count += 1
    },
    changeSubCount(state, i) {
      let index = state.findIndex((data)=> {
        return data.id === parseInt(i.payload); 
      })
      if(state[index].count>0)
      state[index].count--;
    },
    addCart(state, item) {
      // 등록정보가 있는지 확인
      let index = state.findIndex((data)=> {
        return data.id === parseInt(item.payload.id); 
      })
      // console.log(index)
      // 등록내용이 있으면 수량 추가
      if(index>=0){
       state[index].count += 1
      } else {
        // 등록내용이 없으면 배열 추가
        state.push(item.payload)
      }

    },
    delCart(state, i) {
      let index = state.findIndex((data)=> {
        return data.id === parseInt(i.payload); 
      })
      
      state.splice(index,1);

    }
  }
})

export const { changeAddCount, changeSubCount, addCart, delCart } = cart.actions;

export default configureStore({
  reducer : {
    cart : cart.reducer,
    watched : watched.reducer
  }
})







// import info from "./infoSlice";

// state 만들기
// const test = createSlice({
//   name : 'test',          // state 이름
//   initialState : 'hello'  // state 초기값
// })

// const item = createSlice({
//   name : 'item',
//   initialState : ['apple','peach']
// })

// //---------------------------------------------------
// const number = createSlice({
//   name : 'number',
//   initialState : 0,
//   //state 변경 함수(액션)들
//   reducers : {    // <-- actions 선언!
//     changeNumber(state, action){    // state : 기존 저장된 값 / action : payLoad로 값이 전달됨(기본1개이므로 (여러개면 배열, 객체))
//       return(state + action.payload)
//     }
//   }
// })

// 함수들 내보내기
// number.actions 에는 reducers에 선언된 액션들 모두 가져옴.
// {} 구조분해할당으로 changeNumber 만 가져옴
// export const { changeNumber } = number.actions;
//---------------------------------------------------

// export default configureStore({
//   reducer : {
//     cart : cart.reducer
//     // 사용할 수 있도록 함 
//     // 앞 test는 타 컴포넌트에서 사용할 이름, 뒤 test는 상단에 선언한 state변수
//     // test : test.reducer,   
//     // item : item.reducer,
//     // cart : cart.reducer,
//     // number : number.reducer,
//     // info : info.reducer     // infoSlice.js에서 작성됨
//   }
// })