import React from 'react'
import "react-input-range/lib/css/index.css"
import './index.sass'
import AddRss from '../AddRss'
import ListRss from '../ListRss'

export default function ({onAddRss, channels}) {

    return <section className="channels">
        <div className="channels__container">
            <AddRss onAddRss={onAddRss} />
            <ListRss channels={channels}/>
        </div>
    </section>
}