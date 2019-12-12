import React, { useState }  from 'react'
import "react-input-range/lib/css/index.css"
import './index.sass'

export default function ({ onAddRss }) {
    const [url, setUrl] = useState('')

    return <>
        <h2 className="channels__title">RSS Channels</h2>
        <form className="channels__form" onSubmit={event => {
            event.preventDefault()
            try{
                onAddRss(url)
            }catch(err){

            }
        }}>
            <input type="text" className="channels__form-input" name="url" placeholder="RSS url" value={url} onChange={event => setUrl(event.target.value)} />
            <input className="channels__form-submit-button" type="submit" value="Add channel" />
        </form>
    </>
}