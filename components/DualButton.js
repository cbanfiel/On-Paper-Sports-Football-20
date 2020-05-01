import React from 'react'
import { View, Text } from 'react-native'

const DualButton = ({leftComponent, rightComponent}) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
        <TouchableOpacity style={{ width: '97%', flex: 1, marginRight: '1.25%' }} onPress={() => Actions.tradefinder({ popTo: Actions.currentScene, requirementsOff: false })}>
            <leftComponent></leftComponent>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '97%', flex: 1, marginLeft: '1.25%' }} onPress={() => Actions.teamlist({ home: 3, back: 'season', isForced: false })}>
            <rightComponent></rightComponent>
        </TouchableOpacity>
    </View>
    )
}

export default DualButton
