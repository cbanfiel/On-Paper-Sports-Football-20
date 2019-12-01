import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Background from '../components/background';
import ListItem from '../components/ListItem';


const updateLog = [
    {
        date: '12/1/2019',
        updates: "-Added second chances in recruiting, you can use second chances to try and flip recruits that have committed to other schools\n-Schedule strength now plays a role in recruiting, stronger schedules attract better recruits"
    },
    {
        date: '11/27/2019',
        updates: "-Added Coaches, all teams now have coaches that can be hired/fired.\n-Custom Schedule Component, At the beginning of each season you can now edit your schedule.\n-New stat list display (larger then previous for easier viewing of statistics)\n-Various small updates and bug fixes."
    },
    {
        date: '11/12/2019',
        updates: "-Player age now displayed in roster lists\n-player expected salary now displayed in resigning menu\n-New recruiting difficulty slider "
    },
    {
        date: '11/9/2019',
        updates: "-Added generic player faces\n-Added generic team logos\n-You can now use the generic player portraits in the create a player menu\n-You can now use the generic team logos in the create a team menu"
    },
    {
        date: '10/24/2019',
        updates: "-Simplified offer contract menu\n-Added player signing difficulty slider"
    },
    {
        date: '10/23/2019',
        updates: "-Fixed progression/regression bug with some positions\n-Overhauled player interests in signing/resignining stage"
    },
    {
        date: '7/23/2019',
        updates: "-New offseason training screen \n-New slider presets (college, pro) \n-Community rosters can now be binded to a slider preset (college rosters automatically use college sliders) \n-New rebounding slider \n-Various bug fixes"
    },
    {
        date: '7/22/2019',
        updates: "-You can now save a franchise file at any point during the regular season \n-You can now turn off auto fill roster in the offseason \n-New splash screen"
    },
    {
        date: '7/16/2019',
        updates: "-You can now press and hold a player or team in list views to see a pop up of useful information, this will be useful when trying to quickly view data about a specific team or player\n- You can now adjust coaching sliders in game (these are not permanent changes and only affect the current game) this is useful for mid-game adjustments"
    },
    {
        date: '7/14/2019',
        updates: "-Over the air update notifications"
    },
    {
        date: '7/10/2019',
        updates: "-Can now import draft classes directly from franchise mode in the retirement stage \n-Added a reset sliders button in slider menu"
    },
    {
    date: '7/7/2019',
    updates: "-In college mode players can now graduate early \n-In college mode you can now export draft classes at the graduation stage in the offseason \n-Added a bit more randomness in the draft (busts, breakout players, etc)\n-Added player search menu"
},
{
    date: '7/4/2019',
    updates: "-Revamped save menu and save system \n-You can now name saves and delete them \n-Game autosaves a file called roster_autosave when editing roster files\n-Game autosaves the current franchises roster as franchise_autosave at beginning of each new season\n-You can now directly assign a created player to a team in the create a player menu"
},






]

export default class RecentUpdates extends React.Component {



    render() {
        return (

            <Background>
                <ScrollView style={{backgroundColor:'rgba(255,255,255,0)'}}>
                    {updateLog.map((update, i) => (
                       <View style={{borderBottomWidth:0.5, padding:10}} key={i}>
                           <Text style={{fontSize: 20, color: 'black', fontFamily: 'advent-pro'}} >{update.date}</Text>
                           <Text style={{fontSize: 17, color: 'black', fontFamily: 'advent-pro'}}>{update.updates}</Text>
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
