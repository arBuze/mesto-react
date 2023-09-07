function Card(props) {
  
  function handleClick() {
    props.onCardClick(props.card);
  }

  return(
    <li className="photo-feed__item">
      <img className="photo-feed__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button className="photo-feed__del-btn" type="button"></button>
      <div className="photo-feed__data">
        <h2 className="photo-feed__heading">{props.card.name}</h2>
        <div className="photo-feed__likes">
          <button className="photo-feed__like-btn" type="button"></button>
          <span className="photo-feed__likes-num">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
