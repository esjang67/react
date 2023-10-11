import './DiaryItem.css'
import { getEmotionImgById } from "../util/util";
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

function DiaryItem({id, date, content, emotionId}) {
  
  const navigate = useNavigate();

  function goDiaryHandler() {
    navigate('/diary/' + id)
  }

  function goEditHandler() {
    navigate('/edit/' + id)
  }

  return (
    <div className="DiaryItem">
      <div className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImgById(emotionId)} alt={`emotion${emotionId}`} />
      </div>

      <div className='info_section' onClick={goDiaryHandler}>
        <div className='date_wrapper'>
          {new Date(date).toLocaleDateString()}
        </div>
        <div className='content_wrapper'>
          {content.slice(0,10)}
        </div>
      </div>

      <div className='button_section'>
        <Button text='수정하기' clickHander={goEditHandler} />
      </div>
      
    </div>
  )
}
export default memo(DiaryItem);