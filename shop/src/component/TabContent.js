import { useEffect, useState } from "react";

const TabContent = ({tabNumber})=> {

  const [fade, setFade] = useState(null);
  
  //tabnumber 가 바뀔때바다 fade를 걸어줘야하므로
  useEffect(()=> {

    let timer = setTimeout(() => {
      setFade('end');
    }, 10);

    return ()=> {
      clearTimeout(timer);
      setFade(null)
    }
  }, [tabNumber])
  // 동일 state를 반영할때는 마지막 작업만 작동되므로 타이머를 줘서 작업하지만
  // useEffect에는 state변경을 쓰지 않는게 좋음

  return (
    // App.css start, end
    <div className={"start " + fade}>
      {[<div onClick={()=> {}}>상세정보</div>, <div>리뷰</div>, <div>상품교환정보</div>][tabNumber]}
    </div>
  )

}

export default TabContent;