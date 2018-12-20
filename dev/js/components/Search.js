import React from 'react';

export default function Search(props) {
    return (
        <div className="search">
            <div className="search__content">
                <input className="search__input" type="text" placeholder="Search" name="search" onChange={props.changeHandler}/>
            </div>
        </div>
    )
}
