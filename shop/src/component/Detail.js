import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TabContent from "./TabContent";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/store";
import { setWatched } from "../redux/watchedSlice";

function Detail({fruit}) {

  const [show, setShow] = useState(true);
  const [tabNumber, setTabNumber] = useState(0);

  const dispatch = useDispatch();

  // App.js의 <Route path='/detail/:id' id를 빼오기
  // const a = useParams(); //주소(.../detail/1)의 입력된 값을 객체형으로 가져옴{id:1}
  // ==> a의 id를 가져오려면 a.id를 해야하므로 아래(구조분해할당)을 함!
  const {id} = useParams(); // 문자형으로 가져옴

  //path='/detail/:id/:name' 이라면 const {id, name} = useParams();

  // 없는 id입력했을때 걸러주기(id는 배열번호가 아니라 mockData.js에 정의된 id임)
  let result = fruit.find((data)=> String(data.id) === id); 
  //.find : 배열순서대로 반복하면서 id를 비교함, (타입비교꼭할것!), 만족하는 데이터이면 그 값을 넣어줌

  // mount + update 일때 작동됨
  useEffect(()=> {
    // setTimeout은 mount할때만 하도록해야함
    // alert div를 5초뒤에 없앰
    let timer = setTimeout(()=> {
      setShow(false);
      // clearTimeout();
      // console.log('useEffect')
    } , 3000)
    // setTimeout + clearTimeout / setInteval + clearInterval
    // [clean up function] : 기존작업 중지 코드들이 들어감
    return () => {
      clearTimeout(timer);  // 기존타이머 사라짐
    }
  }, [])  // [] : 이므로 마운트 됐을때만

  useEffect(()=> {
    // 기존 값 가져오기와서 첫번째로 id넣어주기
    let items = JSON.parse(localStorage.getItem('watched'));

    // if(items.length === 3 && !items.includes(id))
    //   items.pop();
    
    items.unshift(id);
    // 중복상품빼기 set 이용(뒤에 값이 지워짐)
    items = new Set(items)
    items = Array.from(items);    // set -> array 로 변환
    // 3개만 저장할것
    items.splice(3,1);    // 마지막 배열 지우기 items.pop();

    localStorage.setItem('watched', JSON.stringify(items));
    
    dispatch(setWatched(items));  // watched state 저장

  }, [])

  // 값이 없으면 false가 되므로 if로 비교함
  if(!result){
    return(
      <div>없는 상품</div>
    );
  }

  return(
    <div className="container mt-3">
      { 
        show && 
          <div className="alert alert-danger">
            반짝 할인 상품
          </div>
      }
      <div className="row">
        <div className="col-md-6">
          {/* <img src={process.env.PUBLIC_URL + '/img/' + fruit[id].title + '.jpg'} width="100%" alt="no img" /> */}
          <img src={`https://raw.githubusercontent.com/Naessss/study/main/${fruit[id].title}.jpg`} width="100%" alt="no img" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{fruit[id].title}</h4>
          <p>{fruit[id].content}</p>
          <p>{fruit[id].price}</p>
          <button className="btn btn-danger" onClick={()=> {
            // dispatch(addCart(fruit[id]))
            //받을값만 보내주자
            dispatch(addCart( { id : fruit[id].id, title : fruit[id].title, count : 1 } ));
            window.alert("장바구니 추가!!")
          }}>주문하기</button> 
        </div>
      </div>

      {/* tab menu : router 사용하면 더 좋음 */}
      <Nav className="mt-4" justify variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=> {
          setTabNumber(0);
          }}>상세정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=> {
          setTabNumber(1);
          }}>리뷰</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=> {
          setTabNumber(2);
          }}>반품,교환정보</Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tabNumber={tabNumber} />

    </div>
  );
}

export default Detail;