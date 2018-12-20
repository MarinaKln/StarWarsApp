import React, {Component} from 'react';

export default class CharacterItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props;

        return (
            <div className="character-item">
                <div className={`character-item__img character-item__img--${item.side}`}> </div>
                <div className="character-item__info-wrap">
                    <p className="character-item__name">{item.name}</p>
                    <p className="character-item__info-item">height: {item.height}</p>
                    <p className="character-item__info-item">mass: {item.mass}</p>
                    <p className="character-item__info-item">side: {item.side}</p>
                </div>
            </div>
        )
    }
}