import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';


class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allBeers: null,
            filteredBeers: null
        }

        this.sortBeers = this.sortBeers.bind(this);
    }

    componentWillMount() {
        const urlBase = 'https://api.punkapi.com/v2/beers';
        fetch(urlBase)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allBeers: data,
                    filteredBeers: data,
                    urlBase
                });
            })
    };

    renderBeer(beer) {
        const { id, name, abv, image_url } = beer;

        return (
            <Link to={
                { pathname: `/beers/${id}`, state: { beerData: beer } }
            }
                className="single-beer"
                key={id}>
                <h2 className="single-beer-title">{name}</h2>
                <p className="single-beer-abv">ABV: {abv}</p>
                <img className="single-beer-image" src={image_url} alt="Loading" />
                <p className="single-beer-more-details">More Details</p>
            </Link>
        )
    }

    sortBeers(e) {
        let filteredBeers;
        const { value } = e.target;
        if (value === 'abv') {
            filteredBeers = this.state.allBeers.sort((a, b) => a.abv - b.abv);
        } else if (value === 'name') {
            filteredBeers = this.state.allBeers.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            filteredBeers = this.state.allBeers;
        }

        this.setState({
            filteredBeers: filteredBeers
        })
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="header-container">
                        <h1>PUNK BEERS</h1>
                        <div className="sort-container">
                            <label>Sort By:
                    <select value='' onChange={this.sortBeers}>
                                    <option>Sort</option>
                                    <option value="name">name</option>
                                    <option value="abv">abv</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="beers-multiple-container">
                    {this.state.allBeers ? this.state.filteredBeers.map(this.renderBeer) : <Loader />}
                </div>
            </div>
        )
    }
}


export default Homepage;