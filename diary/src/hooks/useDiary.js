// custom Hook(useXxxxx, 내장 훅을 이용해 작성)
// 잘못된 주소로 이동시 메시지 출력 후 홈으로 이동시켜주겠음

import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

function useDiary(id) {
  
  const data = useContext(DiaryStateContext);
  const navigate = useNavigate()

  const [diary, setDiary] = useState();

  useEffect( ()=> {
    const matchDiary = data.find((d)=> String(d.id)===String(id));

    if(matchDiary) {
      setDiary(matchDiary)
    } else {
      alert("해당 다이어리가 없습니다.")
      navigate('/')
    }
// eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [id, diary])

  return diary;
}
export default useDiary;