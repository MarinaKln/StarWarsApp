import React, {Component} from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
import Filter from "./Filter";
import Search from "./Search";
import CharactersBox from "./CharactersBox";

const config = {
    defaultSide: 'all'
};

export default class Main extends Component {

    constructor() {
        super();

        this.state = {
            initialData: [],
            characters: [],
            currentSide: config.defaultSide,
            searchQuery: '',
            isLoading: false
        };

        this.clickSideHandler = this.clickSideHandler.bind(this);
        this.filterCharacters = this.filterCharacters.bind(this);
        this.handlerSearch = this.handlerSearch.bind(this);
        this.debounce = this.debounce.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        fetch('https://cors-anywhere.herokuapp.com/https://fierce-gorge-95655.herokuapp.com/api/heroes', {
            method: "POST"
        })
            .then(response => response.json())
            .then(data => this.setState({
                characters: data,
                initialData: data,
                isLoading: false
            }));
    }

    clickSideHandler (e, value) {
        this.setState({
            currentSide: value
        }, this.filterCharacters)

    }

    filterCharacters() {
        const state = this.state;
        const initialData = state.initialData;
        const searchQuery = state.searchQuery;

        let characters = searchQuery.length ? initialData.filter(item => (item.name).toLowerCase().indexOf(searchQuery) !== -1) : initialData;

        if(this.state.currentSide == config.defaultSide) {
            this.setState({
                characters: characters
            });

            return false;
        }

        let sort = characters.filter(item => item.side == state.currentSide);

        this.setState({
            characters: sort
        })
    }

    debounce (f, ms) {
        let timer = null;

        return function (...args) {
            const onComplete = () => {
                f.apply(this, args);
                timer = null;
            };

            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(onComplete, ms);
        };
    }

    handlerSearch(e) {
        e.persist();

        const state = this.state;

        let handler = this.debounce(() => {
            let characters = state.currentSide != config.defaultSide ? state.initialData.filter(item => item.side == state.currentSide) : state.initialData;
            let searchQuery = (e.target.value).toLowerCase();

            let sort = characters.filter((item) => {
                let searchValue = (item.name).toLowerCase();

                return searchValue.indexOf(searchQuery) !== -1;
            });

            this.setState({
                characters: sort,
                searchQuery: searchQuery
            })
        }, 1500);

        handler();
    }

    render() {
        let state = this.state;

        return (
            <div className="main">
                <Sidebar />
                <Header />
                <div className="main__content">
                    <Search
                        changeHandler = {this.handlerSearch}
                    />
                    <Filter
                        currentSide = {state.currentSide}
                        clickSideHandler = {this.clickSideHandler}
                    />
                    <CharactersBox
                        characters = {state.characters}
                        loading = {state.isLoading}
                    />
                </div>
            </div>
        )
    }
}