import React from 'react'
import { View, Text } from 'react-native'
import SensitivitiesList from "../components/SensitivitiesList";

const SensitivitiesScreen = ({navigation, route}) => {

    let updateIndexes = (index) => {

    };
    return (
        <View>
            <SensitivitiesList indexes={[]} callback={updateIndexes}/>
        </View>
    )
}

export default SensitivitiesScreen