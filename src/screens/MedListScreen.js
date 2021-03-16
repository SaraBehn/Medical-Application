import React from 'react'
import {View, Text, ScrollView, Button} from 'react-native'
import MedList from "../components/MedList";
import {SearchBar} from "react-native-elements";

export default class MedListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({query:this.props.query})
    }

    render() {
        return (
            <View>

            </View>
        )
    }
}

//get SPLs for all inactive ingredients
