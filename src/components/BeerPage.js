import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

class BeerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            beerData: null
        }
    }

    componentWillMount() {
        const { location, match } = this.props;
        let beerData = location.state ? location.state.beerData : '';
        const { id } = match.params;
        this.setState({
            beerId: id,
            beerData: beerData
        });
    }

    renderBeer(beerData) {
        const { name, tagline, description, image_url, abv } = beerData;

        return (
            <div className="single-beer-detail-container">
                <Link className="single-beer-return-homepage" to="/"> &#60; Back </Link>
                <h1 className="single-beer-detail-title">{name}</h1>
                <div className="single-beer-detail-contents">

                    <img className="single-beer-detail-image" src={image_url} alt="" />
                    <div className="single-beer-detail-text">
                        <h2>ABV: {abv}</h2>
                        <h3 className="single-beer-tagline">{tagline}</h3>
                        <p className="single-beer-description">{description}</p>
                    </div>
                </div>
            </div>
        )
    }

    fetchBeer(beerId) {
        const urlBase = 'https://api.punkapi.com/v2/beers';
        fetch(`${urlBase}/${beerId}`)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    beerData: data[0]
                });
                console.log(this.state);
            }
            )
    }

    render() {
        let beer;

        beer = this.state.beerData ? this.renderBeer(this.state.beerData) : this.fetchBeer(this.state.beerId);
        if (this.state.beerData === null) {
            return (
                <Loader />
            )
        } else {
            return (
                <div>
                    {beer}
                </div>
            )
        }
    }
}



export default BeerPage;