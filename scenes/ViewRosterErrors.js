import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Background from '../components/background';
import { teams, checkRequirements } from '../data/script';

export default class RecentUpdates extends React.Component {

   
    checkForErrors = () => {
        let errors = [];

        for(let i=0; i<teams.length; i++){
            let str = checkRequirements(teams[i]);

            if(str == false){

            }else{
                errors.push(teams[i].name + " need \n" + str + "\n");
            }
        }

        return errors;
    }




    render() {
        return (

            <Background>

<View style={{padding: 30, borderBottomWidth: 0.5 }}>

    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'advent-pro', textAlign: 'center'}}>This screen is for debugging roster crashes... if there are any missing positonal requirements they will be displayed here</Text>
</View>


                <ScrollView style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
                    {this.checkForErrors().map((error, i) => (
                        <View style={{ borderBottomWidth: 0.5, padding: 10 }} key={i}>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'advent-pro' }} >{error}</Text>
                        </View>
                    ))
                    }


                </ScrollView>
            </Background>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
