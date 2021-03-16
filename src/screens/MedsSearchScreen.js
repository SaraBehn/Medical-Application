import React from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import MedSearch from "../components/MedSearch";

const MedSearchScreen = ({navigation, route}) => {
    console.log(route.params.query)
    return (
        <View style={styles.container}>
            <MedSearch navigation={navigation}/>
        </View>
    );
}

export default MedSearchScreen

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