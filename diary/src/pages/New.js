import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util/util";

function New() {

  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  // 페이지 접속시 title 변경  
  useEffect( ()=> {
    setPageTitle('New Diary')
  }, [])

  const onSubmitHandler = (data) => {
    onCreate(data.date, data.emotionId, data.content)
    alert('저장하였습니다.')
    navigate('/')
  }

  return(
    <div>
      <Header title={'새 다이어리 작성'}
              leftChild={<Button text='뒤로' clickHander={()=> navigate(-1)} />} />

            {/* initData, onSubmit */}
      <Editor onSubmit={onSubmitHandler} /> 
    </div>

  )
}

export default New;