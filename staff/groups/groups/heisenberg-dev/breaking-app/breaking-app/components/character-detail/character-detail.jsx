function character_detail({ item: { id, name, birthday, occupation, img, status, nickname, appearence, portrayed, isFav }, onBack, onFav }) {
   return <section className="character-detail">
      <article class="character-detail__bloc">
         
         <h3 class="character-detail__title">{name}</h3>
         <h4 class="character-detail__nickname">{nickname}</h4>
         <img class="character-detail__image" src={img} alt="character detail image" />
         <h4 class="character-detail__birthday-title">Birthday:</h4>
         <span class="character-detail__birthday-text">{birthday}</span>
         <h4 class="character-detail__status-title">Status:</h4>
         <span class="character-detail__status-text">{status}</span>
         <h4 class="character-detail__ocupation-title">Ocupation:</h4>
         <ul class="character-detail__ocupation-list">
           { occupation.forEach(element => {
               <li class="character-detail__occupation-item">{element}</li>
            })}
         </ul>
         <h4 class="character-detail__description-title">Description:</h4>
         <p class="character-detail__description-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Optio
             blanditiis natus illo enim deserunt cupiditate et odio est porro eaque, impedit accusamus
                    saepe eum a adipisci facilis harum totam velit!</p>
         <h4 class="character-detail__portayed-title">Portayed by:</h4>
         <span class="character-detail__portrayed-text">{portrayed}</span>
      </article>
      <span className="detail__fav" onClick={event => {
         event.preventDefault()
         event.stopPropagation()

         onFav(id)
      }}>{isFav ? '🧡' : '💔'}</span>
      <a className="detail__back" href="" onClick={event => {
         event.preventDefault()

         onBack()
      }}>Go back</a>
   </section>
}