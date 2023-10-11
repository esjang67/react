import emotion1 from '../img/emotion1.png'
import emotion2 from '../img/emotion2.png'
import emotion3 from '../img/emotion3.png'
import emotion4 from '../img/emotion4.png'
import emotion5 from '../img/emotion5.png'

export const getEmotionImgById = (emotionId) => {
  const targetEmotionId = String(emotionId);

  switch(targetEmotionId) {
    case '1':
      return emotion1;
    case '2':
      return emotion2;
    case '3':
      return emotion3;
    case '4':
      return emotion4;
    case '5':
      return emotion5;
    default:
      return null;
  }
}
// 타입스트립트 : 타입설정 라이브러리 가 있음!!!
// 날짜 포멧
export const getFormettedDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = String(month).padStart(2,0);
  day = String(day).padStart(2,0);

  return `${year}-${month}-${day}`;
}

// 오늘의 기분
export const emotionList = [
  {
    id : 1,
    name : '매우 좋음',
    img : getEmotionImgById(1)
  },
  {
    id : 2,
    name : '좋음',
    img : getEmotionImgById(2)
  },
  {
    id : 3,
    name : '보통',
    img : getEmotionImgById(3)
  },
  {
    id : 4,
    name : '나쁨',
    img : getEmotionImgById(4)
  },
  {
    id : 5,
    name : '매우 나쁨',
    img : getEmotionImgById(5)
  }
];

// home
export const getMonthRangeByDate = (date) => {
  const startTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const endTimeStamp = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime();
  return { startTimeStamp, endTimeStamp };
}

// 웹페이지마다 타이틀 변경
export const setPageTitle = (title) => {
  const TitleElement = document.getElementsByTagName('title')[0];
  TitleElement.innerText = title;
}