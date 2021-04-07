import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import AuthorSearch from "../src/components/AuthorSearch";

const AuthorSearchScreen = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <AuthorSearch navigation={navigation} med={route.params.med}/>
        </View>
    );
}

export default AuthorSearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },

    searchBarContainer: {
        flex: 20,
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputBar: {
        backgroundColor: '#F5FCFF',
    },

    contentContainer: {
        flex: 80,
        marginTop: '10%',
        marginBottom: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
    }
});