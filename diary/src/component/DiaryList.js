import './DiaryList.css';
import Button from "./Button";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';

// 콤보 옵션
const sortOptionList = [
  { value:'latest', name : '최신순' },
  { value:'oldest', name : '오래된순' }
]

const DiaryList = ({filterData})=> {

  const [sortType, setSortType] = useState('latest');
  function changeSortTypeHandler(e) {
    setSortType(e.target.value);
  }

  const navigate = useNavigate();
  function newPageHander() {
    navigate('/new')
  }

  // object array sort
  const [sortData, setSortData] = useState([])
  useEffect( ()=> {
    // 정렬기준: 날짜 a: 첫번째 배열(기준), b: 나머지의 배열들 계산값이 -면 앞으로 +면 뒤로 정렬시킴
    const compare = (a, b) => {
      if(sortType === 'latest') {
        return Number(b.date) - Number(a.date)  // 내림차순
      } else {
        return Number(a.date) - Number(b.date)
      }
    }

    const copyList = [...filterData]; // 원본은 보존하기
    copyList.sort(compare)
    setSortData(copyList)

  }, [filterData, sortType])

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select value={sortType} onChange={changeSortTypeHandler}>
            {
              sortOptionList.map( (data, i) => {
                return (
                  <option key={i} value={data.value}>{data.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="right_col">
          <Button text='새 다이어리 작성' type='positive' clickHander={newPageHander} />
        </div>
      </div>
      
      <div className='list_wrapper'>
        {
          sortData.map( (data) => {
            return (
              <DiaryItem key={data.id} {...data} />
            )
          })
        }
        
      </div>

    </div>
  )

}
// 정렬이 바뀐다고 list는 랜더링 될 필요없음
export default DiaryList;