import React from 'react';
import {ActivityIndicator, View} from "react-native";
import {StyleSheet} from 'react-native';

export default function Loading () {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator
                size="large"
                color="#0000ff"
            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        loadingContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
);