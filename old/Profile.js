import React from "react";
import {Button, View} from "react-native";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        // this.myMed = this.query.bind(this);
    }

    render() {
        return(
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
        }}>
        {/*    <Button*/}
        {/*    center*/}
        {/*    onPress={this.props.navigation.push('MyMeds')}*/}
        {/*    title="My Meds"*/}
        {/*    color="#841584"*/}
        {/*    key="MyMeds"*/}
        {/*/>*/}
            <Button
            center
            onPress={() => this.props.navigation.navigate('Sensitivities')}
            title="Update  Sensitivities"
            color="#841584"
            key="Sensitivities"
        />
            </View>
    )

    }
};