import React,{Component} from 'react'
import {StyleSheet} from 'react-native'
import FilmItem from "./FilmItem"
import {FlatList} from "react-native"
import {connect} from 'react-redux'

class FilmList extends Component {

    constructor(props){
        super(props);
        this._displayDetailForFilm = this._displayDetailForFilm.bind(this);
    }

    _displayDetailForFilm(idFilm){
        this.props.navigation.navigate('FilmDetail',{idFilm: idFilm});
    }

    render() {
        const {films,favoritesFilm,page,loadFilms,isFavoriteListe} = this.props;
        return (
            <FlatList
                style={styles.list}
                data={films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                    return <FilmItem
                        film={item}
                        displayDetailForFilm={this._displayDetailForFilm}
                        isFavoriteFilm={~favoritesFilm.findIndex(film => item.id === film.id)}
                    />
                }}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!isFavoriteListe && page < this.props.totalPages)
                        loadFilms();
                }}
            />
        );
    }


}

const mapStateToProps = state => ({favoritesFilm: state.favoritesFilm});

export default connect(mapStateToProps)(FilmList);

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});