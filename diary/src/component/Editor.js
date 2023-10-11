import { useCallback, useEffect, useState } from 'react';
import './Editor.css';
import { emotionList, getFormettedDate } from '../util/util';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import EmotionItem from './EmotionItem';

// ## 랜더링 할때 함수들도 다시 만들어짐

// initData 기존내용받아오기
// onSubmit 완료버튼(수정/작성)
const Editor = ({ initData, onSubmit }) => {

  const navigate = useNavigate();

  const [state, setState] = useState({
    date: getFormettedDate(new Date()),
    emotionId: 3,
    content:''
  })

  // 수정시 initData를 받아올때 한번에 랜더링 시키도록 해야함
  useEffect( ()=> {
    // initData는 수정시에만 작성되어있음
    if(initData){ // 내용이 있으면 true
      setState({
        ...initData,    // 기존 state를 날리고 재설정함
        date : getFormettedDate(new Date(initData.date))  // 날짜 변경
      })
    }
  }, [initData])

  function changeHandler(e) {
    setState({
      ...state,
      date : e.target.value
    })
  }

  function changeContentHandler(e) {
    setState({
      ...state,
      content:e.target.value
    })
  }

  // 버튼 이벤트
  const submitHandler = ()=> {
    onSubmit(state);
  }
  const gobackHandler = ()=> {
    navigate(-1);
  }

  // useCallback 불필요한 랜더링막음
  // 기분 이벤트(함수자체를 넘김(매개변수포함된 모양으로))
  const changeEmotionHandler = useCallback((emotionId)=> {
    setState( state => ({
      ...state,
      emotionId
    }))
  }, [])

  return (
    <div className='Editor'>
      <div className='editor_section'>
        <h4>오늘의 날짜</h4>
        <div className='input_wrapper'>
          <input type='date' value={state.date} onChange={changeHandler} />
        </div>
      </div>
      <div className='editor_section'>
        <h4>오늘의 기분</h4>
        <div className='input_wrapper emotion_list_wrapper'>
          {
            emotionList.map( (data, i)=> {
              return (
                <EmotionItem key={data.id} 
                    {...data} onClick={changeEmotionHandler} 
                    isSelected={data.id === state.emotionId}/>  
              )
            })
          }
        </div>
      </div>
      <div className='editor_section'>
        <h4>오늘의 내용</h4>
        <textarea placeholder='기록하고 싶은 내용을 입력하세요.' 
                  value={state.content}
                  onChange={changeContentHandler}></textarea>
      </div>
      <div className='editor_section bottom_section'>
        <Button text='취소하기' type='negative' clickHander={gobackHandler}/>
        <Button text='작성완료' type='positive' clickHander={submitHandler}/>
      </div>
    </div>
  );
}

export default Editor;