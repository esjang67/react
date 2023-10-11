import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// import { Link, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header () {

  const navigate = useNavigate();

  // const 결과저장변수 = useQuery(['쿼리명'], ()=> {
  //  return 서버요청코드
  // })

  //  useState를 써도됨
  const userInfoQuery = useQuery(['userInfo'], ()=> {
    return (
      axios.get('https://raw.githubusercontent.com/Naessss/study/main/userinfo.json')
      .then((resp) => resp.data)
      .catch((err) => console.log(err))
      // , {
      //   staleTime : 5000      // 리패치 간격 조정 가능, 또는 Infinity
      // }
    )
  })

  return (
    
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Shop</Navbar.Brand>
        <Nav className="me-auto">

          {/* <Nav.Link href="#home">Home</Nav.Link> */}

          <Nav.Link onClick={()=> { navigate('/') }}>Home</Nav.Link>
          <Nav.Link onClick={()=> { navigate('/detail') }}>Detail</Nav.Link>
          <Nav.Link onClick={()=> { navigate('/about') }}>About</Nav.Link>
          <Nav.Link onClick={()=> { navigate('/cart') }}>Cart</Nav.Link>

          {/* <Nav.Link onClick={()=> { navigate(-1) }}>이전페이지</Nav.Link> */}

          {/* 클릭으로만 됨 */}
          {/* <Link to={'/'}>메인페이지</Link>
          <Link to={'/detail'}>상세페이지</Link> */}

        </Nav>
        <Nav style={{color:'white'}}>
          {userInfoQuery.isLoading && '로딩중'}
          {userInfoQuery.isError && '오류'}
          {userInfoQuery.data && userInfoQuery.data[0].name}
        </Nav>
      </Container>
    </Navbar>        
  
  );
}

export default Header;