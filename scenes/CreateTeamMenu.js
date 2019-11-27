import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Card, Slider, Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { createTeam, conferences, teams, saveData, teamsData, collegeMode, franchise, resetFranchise, selectedTeam } from '../data/script';
import CachedImage from '../components/CachedImage';


let divisionsOn = false;
let divisionIds = [];

export default class CreateTeamMenu extends React.Component {
    state = {
        name: '',
        logoSrc: teamsData[Math.floor(Math.random() * teamsData.length)].logoSrc,
        rating: 75,
        conference: this.initialConference(),
        conferenceName: this.initialConferenceName(this.initialConference()),
        division: 0,
    }

    constructor(props) {
        super(props);
        this.divisionsOn();
    }

    divisionTeams() {
        let divTeams = [];
        for (let i = 0; i < teams.length; i++) {
            if (divTeams.length >= 5) {
                break;
            }
            if (teams[i].division === this.state.division) {
                divTeams.push(teams[i]);
            }
        }

        divTeams.sort(function (a, b) {
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;
            return 0;
        });

        return divTeams;
    }

    divisionsOn() {
        if (collegeMode) {
            let divisions = [];
            for (let i = 0; i < teams.length; i++) {
                if (!divisions.includes(teams[i].division)) {
                    divisions.push(teams[i].division);
                }
            }
            if (divisions.length > 1) {
                divisionIds = divisions;
                divisionsOn = true;
            }
        }
    }

    nextDivision() {
        let index = 0;
        for (let i = 0; i < divisionIds.length; i++) {
            if (this.state.division === divisionIds[i]) {
                index = i;
            }
        }
        index++;
        if (index > divisionIds.length - 1) {
            index = 0;
        }
        this.setState({ division: divisionIds[index] });
    }

    previousDivision() {
        let index = 0;
        for (let i = 0; i < divisionIds.length; i++) {
            if (this.state.division === divisionIds[i]) {
                index = i;
            }
        }
        index--;
        if (index < 0) {
            index = divisionIds.length - 1;
        }
        this.setState({ division: divisionIds[index] });
    }

    previousPortrait() {
        let index = 1;
        for (let i = 0; i < teamsData.length; i++) {
            if (this.state.logoSrc === teamsData[i].logoSrc) {
                index = i;
            }
        }
        index--;
        if (index < 0) {
            index = teamsData.length - 1;
        }
        this.setState({ logoSrc: teamsData[index].logoSrc });
    }

    nextPortrait() {
        let index = 1;
        for (let i = 0; i < teamsData.length; i++) {
            if (this.state.logoSrc === teamsData[i].logoSrc) {
                index = i;
            }
        }
        index++;
        if (index > teamsData.length - 1) {
            index = 0;
        }
        this.setState({ logoSrc: teamsData[index].logoSrc });
    }

    saveChanges() {
        if (this.state.name != '') {
            let team = createTeam(this.state.name, this.state.rating, this.state.logoSrc, this.state.conference);
            if (divisionsOn) {
                team.division = this.state.division;
                resetFranchise();
            }
            //roster autosave
            saveData('Roster_Autosave');
            Actions.popTo('mainmenu');
        }
    }

    setLogoSrc(value) {
        //check to see if it is link
        if (value.length < 5) {
            return;
        } else {
            this.setState({ logoSrc: value });
        }
    }

    initialConferenceName(input) {
        return conferences[input].name;
    }

    initialConference() {
        if (conferences[0].teams.length > conferences[1].teams.length) {
            return 1;
        }
        else if (conferences[1].teams.length > conferences[0].teams.length) {
            return 0;
        }
        else {
            return 0;
        }

    }


    render() {
        return (
            <Background>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

                    <Card
                        containerStyle={{
                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf: 'center'
                        }} >

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.previousPortrait()}>
                                <Text style={{ textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'<-'}</Text>

                            </TouchableOpacity>
                            <CachedImage uri={this.state.logoSrc} style={{ flex: 1, height: 75, width: 75, resizeMode: 'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} />
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.nextPortrait()}>
                                <Text style={{ textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'->'}</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.name + ' OVR:' + this.state.rating}</Text>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"NAME: "}</Text>
                        <Input onChangeText={value => this.setState({ name: value })} placeholder={'Enter Team Name'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"LOGO LINK: "}</Text>
                        <Input onChangeText={value => this.setLogoSrc(value)} placeholder={'Paste Link To Logo'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>


                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Rating: " + this.state.rating}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.rating}
                            onValueChange={value => this.setState({ rating: value })}
                        />

                        {divisionsOn ? (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.previousDivision()}>
                                        <Text style={{ textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'<-'}</Text>

                                    </TouchableOpacity>

                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Select Conference"}</Text>

                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.nextDivision()}>
                                        <Text style={{ textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'->'}</Text>
                                    </TouchableOpacity>
                                </View>



                                <View style={{ flexDirection: 'row', marginTop: 10 }}>

                                    {
                                        this.divisionTeams().map((team, i) => (
                                            <CachedImage key={i} uri={team.logoSrc} style={{ flex: 1, height: 30, width: 30, resizeMode: 'contain', flexDirection: 'column', flex: 1, alignSelf: 'center', marginBottom: 5 }} />
                                        ))


                                    }


                                </View>


                            </View>
                        ) :
                            <View>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Conference: " + this.state.conferenceName}</Text>
                                <Slider
                                    thumbTintColor={'rgb(180,180,180)'}
                                    maximumTrackTintColor={'rgb(180,180,180)'}
                                    step={1}
                                    minimumValue={0}
                                    maximumValue={conferences.length - 1}
                                    value={this.state.conference}
                                    onValueChange={value => this.setState({ conference: value, conferenceName: conferences[value].name })}
                                />
                                <View>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', margin: 5 }}>{conferences[0].name + ' Teams: ' + conferences[0].teams.length}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', margin: 5 }}>{conferences[1].name + ' Teams: ' + conferences[1].teams.length}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', margin: 5 }}>{'Total Teams: ' + teams.length}</Text>

                                </View>
                            </View>
                        }


                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginTop: 15 }} title="Create Team" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

