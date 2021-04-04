import React from 'react'
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native'
import MedList from "../components/MedList";
import MedListScreen from "./MedListScreen";
import ls from 'local-storage';
import { Title, RadioButton, Subheading, Searchbar, Divider, Surface} from 'react-native-paper';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({query:"", active:'', sens:ls.get('sens')|| {"Lactose":false,
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
        this.getList = this.getList.bind(this)
    }

    getActiveIngredients(name){
        fetch("https://api.fda.gov/drug/drugsfda.json?search=products.brand_name.exact:\"" + name.toUpperCase() + "\"")
            .then(response => response.json())
            .then(responseJSON => {
                let active_ing = responseJSON.results[0].openfda.substance_name[0]
                this.props.navigation.push('MedList', {query:active_ing, bad_ids:this.state.bad_ids})
            })
    }

    getList(){
        if(this.state.active==='active'){
            this.props.navigation.push('MedList', {query:this.state.query, bad_ids:this.state.bad_ids})
        } else if(this.state.active==="similar"){
            this.getActiveIngredients(this.state.query)
        } else{
        }
    }

    render(){
        return (
            <View style={styles.container}>
            {/*//     <Surface style={styles.surface}>*/}

                {/*<View style={styles.surface}>*/}
                <Title>Search by:</Title>
                <RadioButton.Group onValueChange={value => {this.setState({active:value})}} value={this.state.active}>
                    <RadioButton.Item label="Active ingredient" value={'active'} />
                    <RadioButton.Item label="Similar medicine (Input the name of a medicine, and we'll find others with the same active ingredient)" value={'similar'} />
                    <RadioButton.Item label="Medicine name" value={'name'} />

                </RadioButton.Group>
                    {/*</View>*/}
                {/*<Divider />*/}
                <Searchbar
                    onChangeText = {query => this.setState({query: query})}
                    round
                    value = {this.state.query}
                />
                <Button
                    center
                    onPress={this.getList}
                    title="Search"
                />
                {/*<Divider />*/}
                <Button
                    style={styles.button}
                    center
                    onPress={() => this.props.navigation.push('SensitivitiesList', {sens:this.state.sens, ids:this.state.bad_ids})}
                    title="Update your sensitivities"
                />
                {/*</Surface>*/}

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