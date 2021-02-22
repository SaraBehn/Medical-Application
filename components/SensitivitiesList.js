import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox} from 'react-native-elements'
import {ScrollView, Text, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";

let SENSITIVITIES = ["Lactose", "Corn starch", "PEG", "Povidone", "Carboxymethylcellulose", "Gelatin", "Brilliant blue dye",
    "Sunset Yellow FCF", "Allura red", "Propylene", "Indigo carmine", "Mannitol", "Sucrose", "Sodium benzoate", "Parabens",
    "Aspartame", "Erythrosine", "Tartrazine", "Saccharin", "Poloxamer", "Soybean oil", "Benzyl alcohol", "Vanilla",
    "Castor oil", "Cetyl alcohol", "Sulfite", "PEG castor oils", "Peanut oil", "Benzoic acid", "Corn syrup", "Sesame Oil",
    "Starch wheat", "Casein food", "Banana essence", "Milk", "Glucosamine", "New coccine", "Stearyl alcohol"]

export default class SensitivitiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sens: new Array(SENSITIVITIES.len).fill(false), callback:this.props.callback};
        this.state.sens[props.indexes] = true
    }

    check(i) {
        let checkboxes = this.state.sens;
        checkboxes[i] = !this.state.sens[i];
        this.setState({sens: checkboxes});
        this.state.callback(i)
    }

    render() {
        let content = []
        for (let i = 0; i < SENSITIVITIES.length; i++){
            content.push(<CheckBox
                title={SENSITIVITIES[i]}
                checked={this.state.sens[i]}
                key={i}
                onIconPress={() => this.check(i)}
            />)
        }
        return (
            <ScrollView>
                {content}
            </ScrollView>

        );
    }

    componentWillUnmount(){

    }

}