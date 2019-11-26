import React from 'react';
import { ScrollView } from 'react-native';
import { selectedTeam, franchise } from '../data/script';
import Background from '../components/background';
import ListItem from '../components/ListItem';

export default class CoachHistory extends React.Component {

    

    render() {
        return (
            <Background>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    {this.props.coach.history.map((history, i) => (
                        <ListItem 
                        title={'Year: ' + (i+1) + ' ' + history.name} 
                        key={i} 
                        leftAvatar={history.logoSrc }
                        subtitle={'Record: ' + history.wins + '-' + (history.losses)}
                        rightTitle={ history.champions ?  'CHAMPS' : null} ></ListItem>
                    ))}
                </ScrollView>
            </Background>

        )
    }
}