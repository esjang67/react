import './Modal.css';

function Modal(props) {

  return (
    <div className="Modal">   
      <h4>{props.title[props.titleIndex]}</h4>
      <p>{props.selDate}</p>
      <p>내용</p>

      {/* 변경버튼 누르면 제목변경 */}
      <button onClick={()=> {
        let copy = [...props.title]
        copy[0] = "JS"
        props.setTitle(copy);
      }}>변경</button>

    </div>
    
  );
}

export default Modal;