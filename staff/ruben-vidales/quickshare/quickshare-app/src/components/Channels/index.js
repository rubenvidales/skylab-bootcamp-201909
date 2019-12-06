import React from 'react'
import "react-input-range/lib/css/index.css"
import './index.sass'
import AddRss from '../AddRss'
import ListRss from '../ListRss'

export default function ({channels}) {

    return <section className="channels">
        <div className="channels__container">
            <AddRss />
            <ListRss channels={channels}/>
        </div>
    </section>
}