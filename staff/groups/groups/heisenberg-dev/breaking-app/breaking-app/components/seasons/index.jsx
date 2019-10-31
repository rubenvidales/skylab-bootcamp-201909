function Seasons({ seasons, goToSeason, onBackHome }) {
    return <section className="seasons">
        <h2 className="seasons__title">Seasons</h2>
        <ul className="seasons__list">
            {seasons.map(season => <Season key={season} season={season} goToSeason={goToSeason} />)}
        </ul>
        <button className="register__goback" onClick={event => { // cambiar class
            event.preventDefault()
            onBackHome()
        }}>Go back to Home</button>
    </section>
}

function Season({ season: { season_number, air_date, imageUrl, overview }, goToSeason }) {
    return <li className="seasons__list-item">
        <article className="season" onClick={event => {
            event.preventDefault()
            goToSeason(season_number.toString())
        }}>
            <h3 className="season__title">Season {season_number}</h3>
            <p className="season__description">{air_date}</p>
            <p className="season__description">{overview}</p>
            <img className="season__image" src={imageUrl}
                alt="season image" />
        </article>
    </li>
}

// function Seasons({ goToSeason, onBackHome }) {
//     return <section className="seasons">
//         <h2 className="seasons__title">Seasons</h2>
//         <ul className="seasons__list">
//             <li className="seasons__list-item">
//                 <article className="season" onClick={event => {
//                     event.preventDefault()
//                     goToSeason('1')
//                 }}>
//                     <h3 className="season__title">Season 1</h3>
//                     <img className="season__image" src="http://via.placeholder.com/300?text=season-image"
//                         alt="season image" />
//                     <p className="season__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio</p>
//                 </article>
//             </li>
//             <li className="seasons__list-item">
//                 <article className="season" onClick={event => {
//                     event.preventDefault()
//                     goToSeason('2')
//                 }}>
//                     <h3 className="season__title">Season 2</h3>
//                     <img className="season__image" src="http://via.placeholder.com/300?text=season-image"
//                         alt="season image" />
//                     <p className="season__description">                            blanditiis natus illo enim deserunt cupiditate et odio est porro eaque, impedit accusamus</p>
//                 </article>
//             </li>
//             <li className="seasons__list-item">
//                 <article className="season" onClick={event => {
//                     event.preventDefault()
//                     goToSeason('3')
//                 }}>
//                     <h3 className="season__title">Season 3</h3>
//                     <img className="season__image" src="http://via.placeholder.com/300?text=season-image"
//                         alt="season image" />
//                     <p className="season__description">                            saepe eum a adipisci facilis harum totam velit!</p>
//                 </article>
//             </li>
//             <li className="seasons__list-item">
//                 <article className="season" onClick={event => {
//                     event.preventDefault()
//                     goToSeason('4')
//                 }}>
//                     <h3 className="season__title">Season 4</h3>
//                     <img className="season__image" src="http://via.placeholder.com/300?text=season-image"
//                         alt="season image" />
//                     <p className="season__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
//                             blanditiis natus illo enim deserunt cupiditate et odio est porro eaque, impedit accusamus
//                             saepe eum a adipisci facilis harum totam velit!</p>
//                 </article>
//             </li>
//             <li className="seasons__list-item">
//                 <article className="season" onClick={event => {
//                     event.preventDefault()
//                     goToSeason('5')
//                 }}>
//                     <h3 className="season__title">Season 5</h3>
//                     <img className="season__image" src="http://via.placeholder.com/300?text=season-image"
//                         alt="season image" />
//                     <p className="season__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
//                             blanditiis natus illo enim deserunt cupiditate et odio est porro eaque, impedit accusamus
//                             saepe eum a adipisci facilis harum totam velit!</p>
//                 </article>
//             </li>
//         </ul>
//         <button className="register__goback" onClick={event => { // cambiar class
//             event.preventDefault()
//             onBackHome()
//         }}>Go back to Search</button>
//     </section>
// }