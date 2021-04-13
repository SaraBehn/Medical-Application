import React from 'react'
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native'
import ls from 'local-storage';
import { Title, RadioButton, Subheading, Searchbar, Divider, Surface} from 'react-native-paper';

export default class Home extends React.Component {
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
        }, bad_ids:ls.get('bad_ids') || {"fetchInProgress":false}})
        this.waitAndGo = this.waitAndGo.bind(this)
    }

    waitAndGo(){
        while(this.state.bad_ids["fetchInProgress"]) {
            this.forceUpdate()
        }
        this.props.navigation.push('List', {query: this.state.query, bad_ids: this.state.bad_ids})
    }

    render(){
        console.log(this.state.bad_ids["fetchInProgress"])
        return (
            <View style={styles.container}>
                <Title>Search for a medicine or active ingredient:</Title>
                <Searchbar
                    onChangeText = {query => this.setState({query: query})}
                    round
                    value = {this.state.query}
                />
                <Button
                    center
                    onPress={this.waitAndGo}
                    title="Search"
                />
                <Button
                    style={styles.button}
                    center
                    onPress={() => this.props.navigation.push('Sensitivities List', {sens:this.state.sens, ids:this.state.bad_ids})}
                    title="Update your sensitivities"
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 8,
        backgroundColor: '#F5FCFF'
    },

    inputBar: {
        backgroundColor: '#F5FCFF',
    },

    button: {
        alignSelf: "flex-end",
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
    },

    surface: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },

});