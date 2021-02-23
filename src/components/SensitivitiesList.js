import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox} from 'react-native-elements'
import {ScrollView, Text, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import { connect } from 'react-redux';

let SENSITIVITIES = ["Lactose", "Corn starch", "PEG", "Povidone", "Carboxymethylcellulose", "Gelatin", "Brilliant blue dye",
    "Sunset Yellow FCF", "Allura red", "Propylene", "Indigo carmine", "Mannitol", "Sucrose", "Sodium benzoate", "Parabens",
    "Aspartame", "Erythrosine", "Tartrazine", "Saccharin", "Poloxamer", "Soybean oil", "Benzyl alcohol", "Vanilla",
    "Castor oil", "Cetyl alcohol", "Sulfite", "PEG castor oils", "Peanut oil", "Benzoic acid", "Corn syrup", "Sesame Oil",
    "Starch wheat", "Casein food", "Banana essence", "Milk", "Glucosamine", "New coccine", "Stearyl alcohol"]

class SensitivitiesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sens: new Array(SENSITIVITIES.length).fill(false)};
        for(let i = 0; i < props.indexes.length; i++){
            this.state.sens[props.indexes[i]] = true
        }
    }

    check = (index) => {
        let type = this.state.sens[index] ? 'REMOVE_SENS' : 'ADD_SENS'
        this.props.dispatch({state: this.state, type: type, index:index});

        let checkboxes = this.state.sens;
        checkboxes[index] = !this.state.sens[index];
        this.setState({sens: checkboxes});
    }

    render() {
        let content = []
        for (let index = 0; index < SENSITIVITIES.length; index++){
            content.push(<CheckBox
                title={SENSITIVITIES[index]}
                checked={this.state.sens[index]}
                key={index}
                onIconPress={() => this.check(index)}
            />)
        }
        return (
            <ScrollView>
                {content}
            </ScrollView>

        );
    }

}

function mapStateToProps(state) {
    return {
        indexes: state.indexes
    };
}

export default connect(mapStateToProps)(SensitivitiesList);