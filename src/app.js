import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { SearchForm } from './search-form'
import {
    Router,
    Route,
    hashHistory,
    Link,
    IndexRoute
} from 'react-router'

const MovieList = (props) => (
    <ul>
    {props.movies.map((movie, i) => {
        return (
            <li key={i}>{movie.Title}</li>
        )
    })}
    </ul>
)

const Home = () => (
    <section>
        <h1> This is my home. </h1>
    </section>
)

const Nav = () => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/detail">Detail</Link></li>
        </ul>
    </nav>
)

const Detail = props => (
    <section>
        <h3> detail... </h3>
    </section>
)

const App = props => (
    <section>
        <Nav />
        {props.children}
    </section>
)

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }
    onSearch(query) {
        axios.get(`http://www.omdbapi.com/?s=${query}&plot=short&r=json`)
            .then(response => {
                const movies = response.data.Search
                this.setState({
                    movies: movies
                })
            })
    }
    render() {
        return (
            <section>
                <h1>Movie Collection</h1>
                <SearchForm onSearchSubmit={this.onSearch.bind(this)} />
                <MovieList movies={this.state.movies} />
            </section>
        )
    }
    
}

class Main extends React.Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="search" component={Search} />
                    <Route path="detail" component={Detail} />
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))