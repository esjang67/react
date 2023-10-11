import { useState } from 'react';
import bg from '../bg.jpg';  
import Card from '../component/Card';

function Main({fruit}) {

  const [viewCount, setViewCount] = useState(3);
  
  let viewFruit = fruit.slice(0, viewCount);
  
  return(
    <>
      <div className='main-bg' style={{backgroundImage:'url(' + bg + ')'}} />
            
      <div className="container mt-3">
        <div className="row">
          {
            viewFruit.map( (data, i) => {
              return (
                <Card data={data} key={i} />
              )
            })
          }
        </div>

        {
          (viewCount > fruit.length) ? 
            <div className='alert alert-danger'>더이상 상품이 없습니다.</div>
           : <button onClick={()=> {
              if(viewCount <= fruit.length){
                setViewCount(viewCount + 3);
              }
            }}>더보기</button>
        }

      </div>        
    </>    
  )
}

export default Main;