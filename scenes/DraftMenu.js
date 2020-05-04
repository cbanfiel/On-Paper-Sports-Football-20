import React from 'react';
import { TouchableOpacity, Text, ScrollView, View, TouchableHighlightBase } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import { teams, draftClass, selectedTeam, franchise, setInDraft } from '../data/script';
import Background from '../components/background';
import Picache from 'picache';
import CachedImage from '../components/CachedImage';


const simSpeed = 10;

export default class DraftMenu extends React.Component {



    static onEnter() {
        setInDraft();
    }

    displayRound = () => {
        let round = Math.floor((this.state.pick)/teams.length);
        let pick = Math.floor((this.state.pick) - (round* teams.length));
        return `Round: ${round+1} Pick: ${pick+1}`
    }

    componentWillUnmount = () => {
        this.killInterval();
    }

    killInterval = () => {
        if(this.state.interval){
            clearInterval(this.state.interval);
            this.setState({interval: null})
        }
    }

    simulate = (toEnd = false) => {
        if(this.state.interval){
            let interval = this.state.interval;
            clearInterval(interval);
            this.setState({interval: null})
            return;
        }
        let interval = setInterval(
            function () {
                if((!toEnd && this.state.onTheClock == selectedTeam) || this.state.advance){
                    clearInterval(interval);
                    this.setState({interval: null})
                    return;
                }

                franchise.currentDraft.simPick();
                this.update();
            }.bind(this), simSpeed);
          this.setState({ interval });
    }

    state = {
        onTheClock: !franchise.completed ? franchise.currentDraft.draftOrder[franchise.currentDraft.pick].currentTeam : franchise.currentDraft.draftOrder[franchise.currentDraft.pick - 1].currentTeam,
        draftClass: draftClass,
        drafted: franchise.currentDraft.drafted,
        advance: franchise.currentDraft.completed,
        pick: franchise.currentDraft.pick,
        round: franchise.currentDraft.round,
        interval: null
    }


    update = () => {
        try {
            this.setState({
                onTheClock: franchise.currentDraft.draftOrder[franchise.currentDraft.pick].currentTeam,
                draftClass: draftClass,
                drafted: franchise.currentDraft.drafted,
                advance: franchise.currentDraft.completed,
                pick: franchise.currentDraft.pick,
                round: franchise.currentDraft.round
            })
        } catch (err) {
            this.setState({
                draftClass: draftClass,
                drafted: franchise.currentDraft.drafted,
                advance: true,
                pick: franchise.currentDraft.pick,
                round: franchise.currentDraft.round
            })
        }
    }

    render() {
        return (
            <Background>

                <View style={{padding: 5}}>
                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.displayRound()}</Text>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    {
                        this.state.advance === false ? (




                            <TouchableOpacity style={{ width: '100%' }} onPress={() => {if(this.state.interval){return;} Actions.rosterlist({ selectedTeam: draftClass, view: 'draft', selectable: true, franchise: franchise, update: this.update }) }}>
                                <Card
                                    containerStyle={{
                                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                        borderColor: 'black',
                                        alignSelf: 'center'
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.onTheClock.logoSrc }} />
                                    </View>
                                    <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'On The Clock: ' + this.state.onTheClock.name}</Text>
                                </Card>
                            </TouchableOpacity>



                        ) : null
                    }


                    {
                        this.state.pick > 0 || this.state.round > 0 ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { if(this.state.interval){return;} Actions.rosterlist({ selectedTeam: franchise.currentDraft.drafted, view: 'draft' }) }}>
                                <Card
                                    containerStyle={{
                                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                        borderColor: 'black',
                                        alignSelf: 'center'
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].teamLogoSrc }} />
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: this.state.drafted.roster[0].faceSrc }} />
                                    </View>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.drafted.roster[0].positionString + ' ' + this.state.drafted.roster[0].name + ' OVR:' + this.state.drafted.roster[0].rating}</Text>
                                    <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>

                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Draft Board'}</Text>
                                </Card>
                            </TouchableOpacity>
                        ) : null
                    }


                    {
                        this.state.advance === true ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => {if(this.state.interval){return;} franchise.stage = 'resigning', franchise.simStage(), this.props.teamListStage(franchise.stage), Actions.replace('resigningstage', { teamListStage: this.props.teamListStage }) }}>

                                <Card
                                    containerStyle={{
                                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                        borderColor: 'black',
                                        alignSelf: 'center'
                                    }}
                                >

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                                    </View>
                                    <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Advance To Free Agency'}</Text>
                                </Card>
                            </TouchableOpacity>




                        ) :



                            <View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '95%', alignSelf: 'center' }}>

                                    <TouchableOpacity style={{ width: '97%', flex: 1, marginRight: '1.25%' }} onPress={() => {if(this.state.interval){return;} Actions.tradefinder({ popTo: Actions.currentScene, requirementsOff: true, updateScene: this.update })}}>
                                        <Card
                                            containerStyle={{
                                                width: '100%', backgroundColor: 'rgba(255,255,255,0)', alignSelf: 'center', borderColor: 'rgba(0,0,0,0.9)'
                                            }}
                                        >

                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
                                            </View>
                                            <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Trade Finder'}</Text>
                                        </Card>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: '97%', flex: 1, marginLeft: '1.25%' }} onPress={() =>{if(this.state.interval){return;} Actions.teamlist({ home: 3, back: 'season', isForced: false, updateScene: this.update, requirementsOff: true })}}>
                                        <Card
                                            containerStyle={{
                                                width: '100%', backgroundColor: 'rgba(0,0,0,0)',
                                                borderColor: 'black',
                                                alignSelf: 'center'
                                            }}
                                        >

                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
                                            </View>
                                            <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Trade'}</Text>
                                        </Card>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={{ width: '100%' }} onPress={() => { franchise.currentDraft.simPick(), this.update() }}>
                                    <Card
                                        containerStyle={{
                                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                            borderColor: 'black',
                                            alignSelf: 'center'
                                        }}
                                    >
                                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Sim Pick'}</Text>
                                    </Card>
                                </TouchableOpacity>

                            </View>


                    }
                    {
                        this.state.advance === false ? (
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.simulate(true)}}>
                                <Card
                                    containerStyle={{
                                        width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                        borderColor: 'black',
                                        alignSelf: 'center'
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.interval ? 'Stop Sim' : 'Sim To End'}</Text>
                                </Card>
                            </TouchableOpacity>


                        ) : null
                    }
                    {this.state.advance === false ? (
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.simulate() }}>
                            <Card
                                containerStyle={{
                                    width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                                    borderColor: 'black',
                                    alignSelf: 'center'
                                }}
                            // image={{ uri: selectedTeam.logoSrc }}
                            // 
                            >
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>
                                    {this.state.interval ? 'Skip' :'Sim To Next User Pick'}
                                    </Text>
                            </Card>
                        </TouchableOpacity>
                    ) : null


                    }




                </ScrollView>

            </Background>





        )
    }
}