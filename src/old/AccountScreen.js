import React from 'react'
import {View, Text, Button} from 'react-native'

const AccountScreen = ({navigation, route}) => {
    return (
        <View>
            <Button
                center
                onPress={() => navigation.navigate('MyMedsScreen')}
                title="My Meds"
                key="MyMeds"
            />
            <Button
                center
                onPress={() => navigation.navigate('SensitivitiesScreen')}
                title="Update  Sensitivities"
                key="Sensitivities"
            />
        </View>
    )
}

export default AccountScreen