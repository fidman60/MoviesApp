import React, {Component} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {getFilmsWithSearchedText} from '../API/TMDBApi';
import Loading from './Loading';
import FilmList from './FilmList';

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
        });
        this._loadFilms();
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
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
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