// default 일반 회색
// positive 긍정 초록
// negative 취소 빨강
import './Button.css';

const Button=({ text, type, clickHander })=>{

  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return(
    <button className={`Button Button_${btnType}`}  onClick={clickHander}>
      {text}
    </button>
  )
}

// 기본
Button.defaultProps = {
  type : 'default'
}

export default Button;