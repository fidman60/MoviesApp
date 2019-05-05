import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Loading from "./Loading";
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi';
import moment from 'moment';
import numeral from 'numeral';
import {connect} from 'react-redux';
import {toggleFavoriteAction} from '../Actions/favoritesFilmActions';

class FilmDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            film: undefined,
            isLoading: true
        };
        this._handleToggleFavoritesFilm = this._handleToggleFavoritesFilm.bind(this);
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.getParam('idFilm'))
            .then((data) => {
                this.setState({
                    film: data,
                    isLoading: false
                });
            });
    }

    _handleToggleFavoritesFilm(){
        this.props.dispatch(toggleFavoriteAction(this.state.film));
    }

    _displayFavoriteImage(){
        const {favoritesFilm} = this.props;
        const {film} = this.state;
        const index = favoritesFilm.findIndex((item) => item.id === film.id);
        const srcImage = index > -1 ? require("../Images/ic_favorite.png") : require("../Images/ic_favorite_border.png");
        return (
            <Image
                style={styles.favoriteImage}
                source={srcImage}
            />
        );
    }

    _displayFilm() {
        const {film} = this.state;
        if (film !== undefined) {
            return (
                <ScrollView style={styles.scrollviewContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title}>{film.title}</Text>
                    <TouchableOpacity
                        onPress={this._handleToggleFavoritesFilm}
                        style={styles.favoriteContainer}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.overview}>{film.overview}</Text>
                    <View style={styles.details_film}>
                        <Text>Sorti le {moment(film.release_date).format('MM/DD/YYYY')}</Text>
                        <Text>Note: {film.vote_average} / 10</Text>
                        <Text>Nombre de votes: {film.vote_count}</Text>
                        <Text>Budget: {numeral(film.budget).format('0,0')}$</Text>
                        <Text>Genre(s): {film.genres.map((obj) => obj.name ).join(' / ')}</Text>
                        <Text>Companie(s): {film.production_companies.map((obj) => obj.name).join(' / ')}</Text>
                    </View>
                </ScrollView>
            );
        }
    }

    _showLoading(){
        if (this.state.isLoading) {
            return (
                <Loading/>
            );
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.mainContainer}>
                {this._showLoading()}
                {this._displayFilm()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    scrollviewContainer: {
        flex: 1
    },
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    details_film: {
        marginTop: 15
    },
    favoriteContainer: {
        alignItems: 'center'
    },
    favoriteImage: {
        width: 40,
        height: 40
    },
    overview: {
        marginTop: 10
    }
});

const mapStateToProps = state => ({favoritesFilm: state.favoritesFilm});

export default connect(mapStateToProps)(FilmDetail);