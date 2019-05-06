import React,{Component} from 'react'
import FilmList from './FilmList'
import {connect} from 'react-redux'

class Favorites extends Component {

    render() {
        return (
            <FilmList
                films={this.props.favoritesFilm}
                navigation={this.props.navigation}
                isFavoriteListe={true}
            />
        );
    }

}

const mapStateToProps = state => ({favoritesFilm: state.favoritesFilm});

export default connect(mapStateToProps)(Favorites);