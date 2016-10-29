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

class MovieDetail extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            movie: {
                Title: 'Unknown'
            }
        }

        if(props.location.query.id){
            const id = props.location.query.id
            axios.get(`http://www.omdbapi.com/?i=${id}&plot=short&r=json`)
            .then(response => {
                //console.log('response ',response.data)
                this.setState({
                    movie: response.data
                })
            })

        }

    }

    render(){
        const movie = this.state.movie
        return(
            <section>
                <h1>{movie.Title}</h1>
                <small>{movie.Genre}</small>
                <div>
                    <img src={movie.Poster} />
                </div>
            </section>
        )
    }
}

const MovieList = (props) => (
    <ul>
    {props.movies.map((movie, i) => {
        const queryMovie = {
            pathname : '/detail',
            query : {
                id: movie.imdbID
            }
        }
        return (
            <li key={i}><Link to={queryMovie}>{movie.Title}</Link></li>
        )
    })}
    </ul>
)

const batmanQuery = {
    pathname: '/search',
    query: {
        s:"Batman",
        p:2
    }
}

const avangerQuery = {
    pathname: '/search',
    query: {
        s:"avenger",
        p:2
    }
}

const doctorStrangeQuery = {
    pathname: '/search',
    query: {
        s:"Doctor Strange",
        p:2
    }
}

const Home = () => (
    <section>
        <h1> This is my home. </h1>
        <ul>
            <li><Link to={batmanQuery}>Batman</Link></li>
            <li><Link to={avangerQuery}>Avenger</Link></li>
            <li><Link to={doctorStrangeQuery}>Doctor Strange</Link></li>
        </ul>
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
        //console.log('query',props.location.query)
        if(props.location.query.s){
            this.onSearch(props.location.query.s)
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
                    <Route path="detail" component={MovieDetail} />
                </Route>
            </Router>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'))