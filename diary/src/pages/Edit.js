// import Editor from "../component/Editor";

import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import Editor from "../component/Editor";

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util/util";

function Edit() {

  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  
  const {id} = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();

  // 페이지 접속시 title 변경  
  useEffect( ()=> {
    setPageTitle('Edit Diary')
  }, [])

  const deleteHandler = () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(id);
      alert('삭제하였습니다.')
      navigate('/')
    }
  }

  const onSubmitHandler = (upData) => {
    //targetId, date, content, emotionId
    onUpdate(id, upData.date, upData.content, upData.emotionId)
    alert('저장하였습니다.')
    navigate('/')
  }

  if(!data) {
    return <div>로딩중..</div>
  } else {

    return(
      <div>
        <Header title='다이어리 수정'
                leftChild ={<Button text='뒤로' clickHander={()=> navigate(-1)}/>}
                rightChild={<Button text='삭제' type='negative' clickHander={deleteHandler}/>}
        />
        {/* initData : date, emotionId, content */}
        <Editor initData={data} onSubmit={onSubmitHandler}/> 
      </div>

    )
  }
}

export default Edit;