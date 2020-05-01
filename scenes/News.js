import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Background from '../components/background'

const News = ({stories}) => {
    return (
        <Background>
            <ScrollView>
                    <View>
                        <Text>Player Of The Week</Text>
                        <Text>Eli Manning #10 QB NYG</Text>
                    </View>

                    <View>
                        <Text>MVP Race</Text>
                        <Text>Tom Brady leads the charge</Text>
                    </View>

                    <View>
                        <Text>Player Of The Week</Text>
                        <Text>Eli Manning #10 QB NYG</Text>
                    </View>

                    <View>
                        <Text>Player Of The Week</Text>
                        <Text>Eli Manning #10 QB NYG</Text>
                    </View>

            </ScrollView>
        </Background>
    )
}

export default News
