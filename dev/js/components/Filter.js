import React, {Component} from 'react';

let sides = [
    {
        name: 'all'
    }, {
        name: 'dark'
    }, {
        name: 'light'
    }
];

class SidesList extends Component {
    constructor() {
        super();
    }

    render() {
        const props = this.props;
        const active = (props.currentSide == props.name) ? 'active' : '';

        return (
            <label className={`filter__list-item ${active}`}>
                <input type="radio" defaultChecked={props.currentSide == props.name} name="sides-item" className="filter__list-input" onClick={(e) => props.clickHandler(e, props.name)} />
                <span className="checkbox"> </span>
                <span className="filter__list-text">{props.name}</span>
            </label>
        )
    }
}

export default class Sidebar extends Component {

    constructor() {
        super();

        this.createSidesList = this.createSidesList.bind(this);
    }

    createSidesList(item, index) {
        return (
            <SidesList
                key = {index}
                name = {item.name}
                value = {item.value}
                clickHandler = {this.props.clickSideHandler}
                currentSide = {this.props.currentSide}
            />
        )
    }

    render() {
        return (
            <div className="filter">
                <p className="filter__title"> </p>
                <div className="filter__list">
                    {sides.map(this.createSidesList)}
                </div>
            </div>
        )
    }
}
