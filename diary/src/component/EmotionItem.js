import { memo } from 'react';
import './EmotionItem.css';

const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
  const onClickHandler = () => {
    onClick(id);
  };

  return (
    <div className={"EmotionItem " + (!isSelected ? "EmotionItem_off" : `EmotionItem_on_${id}`) } 
         onClick={onClickHandler}>
      <img src={img} alt={`emotion${id}`} />
      <span>{name}</span>
    </div>
  );
};

export default memo(EmotionItem);