import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox, SearchBar} from 'react-native-elements'
import {ScrollView, Text, View} from "react-native";
import MedList from "../components/MedList";
import {useFocusEffect} from "@react-navigation/native";


export default class Sensitivities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sens:this.props.sens}
    }

    check(ing) {
        let checkboxes = this.state.sens;
        checkboxes[ing] = !this.state.sens[ing];
        this.setState({sens: checkboxes});
    }

    render() {
        let content = []
        for (let ing in this.state.sens){
            content.push(<CheckBox
                title={ing}
                checked={this.state.sens[ing]}
                key={ing}
                onIconPress={() => this.check(ing)}
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