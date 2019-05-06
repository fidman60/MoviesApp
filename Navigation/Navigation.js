import React from 'react';
import {Image, StyleSheet} from "react-native";
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
    },
    FilmDetail: {
        screen: FilmDetail,
    }
});

const FavoritesStackNavigation = createStackNavigator({
    Favorites: {
        screen: Favorites,
    },
    FilmDetail: {
        screen: FilmDetail,
    }
});

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../Images/ic_search.png')}
                    style={styles.icon}
                />
            }
        },
    },
    Favorites: {
        screen: FavoritesStackNavigation,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../Images/ic_favorite.png')}
                    style={styles.icon}
                />
            }
        }
    }
},{
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF',
    },
});

export default createAppContainer(MoviesTabNavigator);

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
});