import { Outlet, useNavigate } from "react-router-dom";

function About() {

  const navigator = useNavigate();

  return(
    <>
      <button onClick={()=> {navigator('/about/intro')}}>회사소개</button>
      <button onClick={()=> {navigator('/about/history')}}>연혁</button>
      <button onClick={()=> {navigator('/about/location')}}>오시는길</button>

      {/* Route에서 설정한 화면들이 나오는 구역 */}
      <Outlet></Outlet>
      <br/>
      <p>공통부분</p>

    </>
  )
}

export default About;