import React, {Component} from 'react';
import CharacterItem from "./CharacterItem";

export default class CharactersBox extends Component {

    constructor(props) {
        super(props);

        this.createCharactersList = this.createCharactersList.bind(this);
    }

    createCharactersList(item, index) {
        return (
            <CharacterItem
                key = {index}
                id = {index}
                name = {item.name}
                height = {item.height}
                mass = {item.mass}
                side = {item.side}
            />
        )
    }

    render() {
        const props = this.props;
        const items = props.characters;
        const results = <div className="character-items__wrap">{items.map(this.createCharactersList)}</div>;
        const noResults = <div className="character-items__no-result">Sorry, no results. Try another search</div>;

        let show = items.length == 0 ? noResults : results;

        return (
            <div className={`character-items loading ${props.loading ? 'is-load' : ''}`}>
                {show}
            </div>
        )
    }
}
