import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, TextInput, View} from 'react-native';
import FilmItem from './FilmItem';
import {getFilmsWithSearchedText} from '../API/TMDBApi';
import Loading from './Loading';

export default class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            films: [],
            loading: false
        };

        this.page = 0;
        this.totalPages = 0;
        this.searchedText = '';

        this._loadFilms = this._loadFilms.bind(this);
        this._searchFilms = this._searchFilms.bind(this);
        this._displayDetailForFilm = this._displayDetailForFilm.bind(this);
    }

    _loadFilms(){
        if (this.searchedText.length > 0){
            this.setState({
                loading: true,
            });
            getFilmsWithSearchedText(this.searchedText, this.page + 1)
                .then(data => {
                    this.page = data.page;
                    this.totalPages = data.total_pages;
                    this.setState({
                        films: [...this.state.films,...data.results],
                        loading: false
                    });
                });
        }
    }

    _searchFilms(){
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films: [],
        },() => {
            // this code will be executed after components have been rendered because state don't update directly
            console.log(`total films: ${this.state.films.length}`); // it will show 0
        });
        this._loadFilms();
    }

    _displayDetailForFilm(idFilm){
        this.props.navigation.navigate('FilmDetail',{idFilm: idFilm});
    }

    _showLoading(){
        if (this.state.loading) {
            return (
                <Loading/>
            );
        }
    }

    _searchTextInputChanged(text){
        this.searchedText = text;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Titre du film"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={this._searchFilms}
                />
                <Button title="Rechercher" onPress={this._searchFilms}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages)
                            this._loadFilms();
                    }}
                />
                {this._showLoading()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
});
