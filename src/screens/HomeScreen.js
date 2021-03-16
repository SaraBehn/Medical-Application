import React from 'react'
import {View, Text, ScrollView, Button, StyleSheet} from 'react-native'
import MedList from "../components/MedList";
import MedListScreen from "./MedListScreen";
import {SearchBar} from "react-native-elements";
import ls from 'local-storage';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({query:"", sens:ls.get('sens')|| {"Lactose":false,
            "Corn starch":false,
            "PEG":false,
            "Povidone":false,
            "Carboxymethylcellulose":false,
            "Gelatin":false,
            "Brilliant blue dye":false,
            "Sunset Yellow FCF":false,
            "Allura red":false,
            "Propylene":false,
            "Indigo carmine":false,
            "Mannitol":false,
            "Sucrose":false,
            "Sodium benzoate":false,
            "Parabens":false,
            "Aspartame":false,
            "Erythrosine":false,
            "Tartrazine":false,
            "Saccharin":false,
            "Poloxamer":false,
            "Soybean oil":false,
            "Benzyl alcohol":false,
            "Vanilla":false,
            "Castor oil":false,
            "Cetyl alcohol":false,
            "Sulfite":false,
            "PEG castor oils":false,
            "Peanut oil":false,
            "Benzoic acid":false,
            "Corn syrup":false,
            "Sesame Oil":false,
            "Starch wheat":false,
            "Casein food":false,
            "Banana essence":false,
            "Milk":false,
            "Glucosamine":false,
            "New coccine":false,
            "Stearyl alcohol":false,
        }, bad_ids:ls.get('bad_ids') || {}})
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Search for an active ingredient</Text>
                <SearchBar
                    placeholder="Search for an active ingredient"
                    lightTheme = {true}
                    inputContainerStyle = {styles.inputBar}
                    containerStyle = {styles.searchBarContainer}
                    onChangeText = {query => this.setState({query: query})}
                    round
                    value = {this.state.query}
                    autoFocus
                />
                <Button
                    center
                    onPress={() => this.props.navigation.push('MedList', {query:this.state.query, bad_ids:this.state.bad_ids})}
                    title="Search"
                    key="active"
                />
                <Button
                    center
                    onPress={() => this.props.navigation.push('SensitivitiesList', {sens:this.state.sens, ids:this.state.bad_ids})}
                    title="Update your sensitivities"
                    key="sens"
                />
                {/*<Button*/}
                {/*    center*/}
                {/*    onPress={() => navigation.navigate('MedsSearchScreen', {option:1})}*/}
                {/*    title="Search by medicine name"*/}
                {/*    key="name"*/}
                {/*/>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF'
    },

    inputBar: {
        backgroundColor: '#F5FCFF',
    },

    button: {
        flex: 20,
    },

    text: {
        flex:20
    },

    contentContainer: {
        flex: 20,
        marginTop: '10%',
        marginBottom: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
    }
});