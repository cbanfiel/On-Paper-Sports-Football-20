import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { franchise, selectedTeam } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';

export default class BowlGames extends React.Component {
    // back(){
    //     franchise.advance = true;
    //     franchise.stage = 'retirements';
    //     franchise.simStage();
    //     Actions.refresh();
    //     Actions.seasonmenu();
    // }

    state = {
        matchups: this.userFirstOrder(),
        completed: false
    }

    checkCompletion() {
        for (let i = 0; i < this.state.matchups.length; i++) {
            let matchup = this.state.matchups[i];
            if (matchup.game <= 1) {
                return;
            }
        }
        this.setState({ completed: true });
    }

    simGames() {
        for (let i = 0; i < this.state.matchups.length; i++) {
            let matchup = this.state.matchups[i];
            if (matchup.game <= 1) {
                matchup.simGame();
            }
        }
        this.updateState();
    }

    updateState = () => {
        this.checkCompletion();
        this.setState({ matchups: this.userFirstOrder() })
    }

    advanceToRetirements() {
        this.props.teamListStage('retirements');
        franchise.advance = true;
        franchise.stage = 'retirements';
        franchise.simStage();
        Actions.replace('retirementstage', { teamListStage: this.props.teamListStage });
    }

    userFirstOrder() {
        let matchups = franchise.bowlGames;
        let match = null;
        for (let i = 0; i < matchups.length; i++) {
            if (matchups[i].team1 === selectedTeam || matchups[i].team2 === selectedTeam) {
                match = matchups[i];
                break;
            }
        }

        if (match == null) {
            return matchups;
        } else {
            let newOrder = matchups;
            newOrder.splice(newOrder.indexOf(match), 1);
            newOrder.unshift(match);
            return newOrder;
        }
    }

    render() {



        return (

            <Background>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

                    {
                        !this.state.completed ? (
                            <View>

                                <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.simGames(), this.updateState() }}>

                                    <Card
                                        containerStyle={{
                                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                            borderColor: 'black',
                                            alignSelf: 'center'
                                        }}
                                    >
                                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Sim Bowls</Text>
                                    </Card>
                                </TouchableOpacity>
                            </View>


                        ) :
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.replace('playoffmenu', { teamListStage: this.props.teamListStage }) }}>

                                <Card
                                    containerStyle={{
                                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                        borderColor: 'black',
                                        alignSelf: 'center'
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Advance To Playoffs</Text>
                                </Card>
                            </TouchableOpacity>
                    }

                    {this.state.matchups.map((matchup, key) => (
                        <TouchableOpacity style={{ width: '100%' }} key={key} onPress={() => { matchup.winner == null ? Actions.ingame({ game: matchup.manualGame(), playoffs: true, series: matchup, franchise: franchise, updateState: this.updateState, allowAdjustments: true, bowlGame:true }) : null }}>

                            <Card
                                containerStyle={{
                                    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                    borderColor: 'black',
                                    alignSelf: 'center'
                                }}

                            >
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? 'Game : ' + (matchup.game - 1) : null}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'black', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? matchup.results[matchup.game - 2].team1Score : null}</Text>
                                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginRight:5 }}>{matchup.team1.seed <= 25 ? `#${matchup.team1.seed}` : '  '}</Text>
                                    <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={matchup.team1.logoSrc} />

                                    <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={matchup.team2.logoSrc} />

                                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginLeft:5 }}>{matchup.team2.seed <= 25 ? `#${matchup.team2.seed}` : '  '}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center', fontSize: 35, color: 'black', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? matchup.results[matchup.game - 2].team2Score : null}</Text>
                                </View>

                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{matchup.game > 1 ? matchup.team1Wins > matchup.team2Wins ? matchup.team1.name + ' Lead ' + matchup.team1Wins + '-' + matchup.team2Wins : matchup.team2Wins > matchup.team1Wins ? matchup.team2.name + ' Lead ' + matchup.team2Wins + '-' + matchup.team1Wins : 'Series Tied ' + matchup.team2Wins + '-' + matchup.team1Wins : null}</Text>
                            </Card>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </Background>


        )





    }
}