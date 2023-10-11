import Header from "../component/Header";
import Button from "../component/Button";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
// import Editor from "../component/Editor";
import {getMonthRangeByDate, setPageTitle} from '../util/util'
import DiaryList from "../component/DiaryList";

function Home() {
  // App에서 만든 createContext를 가져올 수 있다.
  const data = useContext(DiaryStateContext);

  // 전체 다이어리 중에 현재 선택된 달의 데이터만 가져오기
  const [filterData, setFilterData] = useState([]);

  const [pivoDate, setPivoDate] = useState(new Date());
  const headerTitle = `${pivoDate.getFullYear()}년 ${pivoDate.getMonth()+1}월`
  function onIncreaseMonth() {
    setPivoDate(new Date(pivoDate.getFullYear(), pivoDate.getMonth() + 1))
  }
  function onDecreaseMonth() {
    setPivoDate(new Date(pivoDate.getFullYear(), pivoDate.getMonth() - 1))
  }
  
  // 페이지 접속시 title 변경  
  useEffect( ()=> {
    setPageTitle('Diary')
  }, [])

  useEffect( () => {
    if(data.length >= 1){
      const { startTimeStamp, endTimeStamp } = getMonthRangeByDate(pivoDate);

      setFilterData(
        data.filter( (d) => startTimeStamp <= d.date && d.date <= endTimeStamp )
      )
    } else {
      setFilterData([])
    }
  }, [data, pivoDate])

  return(
    <div>
      <Header title={headerTitle} 
              leftChild ={<Button text={'<'} clickHander={onDecreaseMonth}/>}
              rightChild={<Button text={'>'} clickHander={onIncreaseMonth}/>} />

      <DiaryList filterData={filterData}/>

    </div>

  )
}

export default Home;