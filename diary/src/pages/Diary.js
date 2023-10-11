import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import Viewer from "../component/Viewer";
import { getFormettedDate, setPageTitle } from "../util/util";
import { useEffect } from "react";

function Diary() {

  const {id} = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();

  // 페이지 접속시 title 변경  
  useEffect( ()=> {
    setPageTitle(`${id} Diary`);
  }, [id])

  if(!data){
    return <div>데이터를 읽어오는 중...</div>
  } else {

    const {date, content, emotionId} = data;
    const title = `${getFormettedDate(new Date(date))} 다이어리`

    function goBack() {
      navigate(-1)
    }

    function goEdit() {
      navigate('/edit/' + id)
    }

    return(
      <div>
        <Header title={title}
                leftChild= {<Button text='뒤로' clickHander={goBack} />}
                rightChild={<Button text='수정' clickHander={goEdit} />} />

        <Viewer content={content} emotionId={emotionId} />

      </div>
    )
  }
}

export default Diary;