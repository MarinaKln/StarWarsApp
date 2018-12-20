import React, {Component} from 'react';

function NavItem(props) {
    return <p className="sidebar__nav-item">Item {props.id + 1}</p>;

}

export default class Sidebar extends Component {

    constructor() {
        super();
    }

    render() {
        let items = [];

        for(let i = 0; i < 6; i++) {
            items.push(<NavItem key={i} id={i}/>)
        }

        return (
            <div className="sidebar">
                <p className="sidebar__title">Navigation</p>
                <div className="sidebar__nav">
                    {items}
                </div>
            </div>
        )
    }
}
