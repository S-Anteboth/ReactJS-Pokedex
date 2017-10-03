import React, {Component} from 'react';
import './App.css';
import './bootstrap.css';
import './bootstrap-theme.css';
import 'whatwg-fetch';
import PokemonIndexList from './components/PokemonIndexList';
import ball from './ball.svg';
import loading from './loading.svg';
import PokemonModal from './components/PokemonModal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pokemon: [],
            activePage: 1,
            limit: 50,
            offset: 0,
            totalPages: 0,
            count: 0,
            loaded: false,
            showModal: false,
            selectedPokemon: null,

        };

        this.loadPokemon = this.loadPokemon.bind(this);
        this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
        this.handleLimitChange = this.handleLimitChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    loadPokemon(url) {
        fetch(url)
            .then(response => {
                return response.json();
            }).then(json => {
            let pages = Math.round(json.count / this.state.limit);
            // console.log(json);
            this.setState({
                pokemon: json.results,
                totalPages: pages,
                count: json.count,
                loaded: true
            });
            // console.log(this.state)
        }).catch(err => {
            console.log(err)
        })
    }

    componentWillMount() {
        this.loadPokemon(`${this.props.baseUrl}pokemon?limit=${this.state.limit}&offset=${this.state.offset}`);
    }

    handlePaginationSelect(selectedPage) {
        // console.log(selectedPage);
        let offset = this.state.limit * selectedPage;
        this.setState({
            activePage: selectedPage,
            offset: this.state.limit * selectedPage
        });
        this.loadPokemon(`${this.props.baseUrl}pokemon?limit=${this.state.limit}&offset=${offset}`);
        console.log(this.state.offset);
    }

    handleLimitChange(event) {
        this.setState({
            limit: +event.target.innerHTML || this.state.count
        }, () => {
            this.loadPokemon(`${this.props.baseUrl}pokemon?limit=${this.state.limit}&offset=0`)
        })
    }

    openModal(pokemon) {
        if (pokemon.url !== undefined) {
            fetch(`${pokemon.url}`)
                .then(response => {
                    return response.json()
                }).then(json => {
                console.log(json);
                this.setState({
                    selectedPokemon: json,
                    showModal: true
                });
            }).catch(ex => {
                console.log("parsing failed", ex);
            })
        }
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">

                    <div className="app-header container-fluid">
                        <div className="title-wrapper">
                            <img src={ball} className="App-logo" alt="logo"/>
                            <div className="app-title"> PokéDex</div>
                        </div>
                    </div>

                    <div className='content'>

                        {this.state.loaded ? null : <img src={loading} className="loading center-block" alt="loading"/>}

                        <PokemonIndexList
                            display={this.state.loaded}
                            options={[10, 50, 100, 200]}
                            selectedValue={this.state.limit}
                            onOptionSelected={this.handleLimitChange}
                            allValue={this.state.count}
                            listOfPokemon={this.state.pokemon}
                            bsSize="small"
                            items={this.state.totalPages}
                            activePage={this.state.activePage}
                            onSelect={this.handlePaginationSelect}
                            totalPages={this.state.totalPages}
                            openModal={this.openModal}
                            offset={this.state.offset}
                        />


                    </div>

                    <PokemonModal closeModal={this.closeModal} showModal={this.state.showModal}
                                  pokemon={this.state.selectedPokemon}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
