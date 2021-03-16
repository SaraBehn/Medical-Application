import React from 'react'
import { View, Text } from 'react-native'
import SensitivitiesList from "../components/SensitivitiesList";

const SensitivitiesScreen = ({navigation, route}) => {

    let updateSens = (sens) => {

    };
    return (
        <View>
            <SensitivitiesList sens={[]} callback={updateSens}/>
        </View>
    )
}

export default SensitivitiesScreen