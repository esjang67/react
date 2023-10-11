import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Watched({fruit}) {
  // 최근 본 상품 redux state 등록됨
  const watched = useSelector((state)=> state.watched);

  const navigate = useNavigate();

  return (
    <div className="recent-container">
      <div className="cards">
        <p>최근 본 상품</p>

        {watched.map((item) => (
          <div className="card" onClick={()=> {navigate('/detail/' + item)}} style={{cursor:'pointer'}} key={item}>
            <img src={`https://raw.githubusercontent.com/Naessss/study/main/${fruit[item].title}.jpg`} alt={fruit[item].title} />
            <p>{fruit[item].title}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Watched;