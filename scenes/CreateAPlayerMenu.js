import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Button, Card, Slider, Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import {createPlayer, saveData} from '../data/script';
import CachedImage from '../components/CachedImage';



export default class CreateAPlayerMenu extends React.Component {
    state = {
        name: 'New Player',
        number: 0,
        positionString: 'QB',
        position: 0,
        age: 21,
        salary: 1200000,
        faceSrc: 'https://www.2kratings.com/wp-content/uploads/NBA-Player.png',
        height:"6\"0'",
        team : null
    }

    setFaceSource(value){
        //check to see if it is link
        if(value.length < 5){
            return;
        }else{
            this.setState({faceSrc: value});
        }
    }

    saveChanges() {
        let ply = createPlayer(this.state.name, this.state.number, this.state.position, this.state.age, this.state.salary, this.state.faceSrc, this.state.height, this.state.team);
        //roster autosave
        saveData('Roster_Autosave');
        Actions.replace('playerprofile', { selectedPlayer: ply });
    }

    height(value){
        let height='';
        switch(value){
            case 0:
            height = "5\"5'";
            break;
            case 1:
            height = "5\"6'";
            break;
            case 2:
            height = "5\"7'";
            break;
            case 3:
            height = "5\"8'";
            break;
            case 4:
            height = "5\"9'";
            break;
            case 5:
            height = "5\"10'";
            break;
            case 6:
            height = "5\"11'";
            break;
            case 7:
            height = "6\"0'";
            break;
            case 8:
            height = "6\"1'";
            break;
            case 9:
            height = "6\"2'";
            break;
            case 10:
            height = "6\"3'";
            break;
            case 11:
            height = "6\"4'";
            break;
            case 12:
            height = "6\"5'";
            break;
            case 13:
            height = "6\"6'";
            break;
            case 14:
            height = "6\"7'";
            break;
            case 15:
            height = "6\"8'";
            break;
            case 16:
            height = "6\"9'";
            break;
            case 17:
            height = "6\"10'";
            break;
            case 18:
            height = "6\"11'";
            break;
            case 19:
            height = "7\"0'";
            break;
            case 20:
            height = "7\"1'";
            break;
            case 21:
            height = "7\"2'";
            break;
            case 22:
            height = "7\"3'";
            break;
            case 23:
            height = "7\"4'";
            break;
            case 24:
            height = "7\"5'";
            break;
            case 25:
            height = "7\"6'";
            break;
        }

        this.setState({height : height});
    }

    updateTeam = (team) =>{
        this.setState({team : team});
    }

    position(value) {
            if (value === 0) {
              str = "QB";
            } else if (value === 1) {
              str = "RB";
            } else if (value === 2) {
              str = "FB";
            } else if (value === 3) {
              str = "WR";
            } else if (value === 4) {
              str = "TE";
            } else if (value === 5) {
              str = "LT";
            } else if (value === 6) {
              str = "LG";
            } else if (value === 7) {
              str = "C";
            } else if (value === 8) {
              str = "RG";
            } else if (value === 9) {
              str = "RT";
            } else if (value === 10) {
              str = "LE";
            } else if (value === 11) {
              str = "RE";
            } else if (value === 12) {
              str = "DT";
            } else if (value === 13) {
              str = "LOLB";
            } else if (value === 14) {
              str = "MLB";
            } else if (value === 15) {
              str = "ROLB";
            } else if (value === 16) {
              str = "CB";
            } else if (value === 17) {
              str = "FS";
            } else if (value === 18) {
              str = "SS";
            } else if (value === 19) {
              str = "K";
            } else if (value === 20) {
              str = "P";
            }

        this.setState({ position: value, positionString: str })
    }


    render() {
        return (
            <Background>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    <Card
                        containerStyle={{
                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center'
                        }} >


                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                this.state.team != null?
                                <CachedImage uri={this.state.team.logoSrc  } style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }}/>
                                : null
                            }

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.team == null? 'Free Agents' : this.state.team.name}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>   

                        <Image rounded style={{ height: 75, width: 75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} source={{ uri: this.state.faceSrc }} />
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.positionString + ' #' + this.state.number + ' ' + this.state.name}</Text>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"NAME: "}</Text>
                        <Input onChangeText={value => this.setState({ name: value })} placeholder={this.state.name} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"FACE LINK: "}</Text>
                        <Input onChangeText={value => this.setFaceSource(value)} placeholder={'Paste Link To Photo'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"POS: " + this.state.positionString}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={20}
                            value={this.state.position}
                            onValueChange={value => this.position(value)}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"#: " + this.state.number}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={99}
                            value={this.state.number}
                            onValueChange={value => this.setState({ number: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"AGE: " + this.state.age}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={18}
                            maximumValue={49}
                            value={this.state.age}
                            onValueChange={value => this.setState({ age: value })}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"HEIGHT: " + this.state.height}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={16}
                            value={7}
                            onValueChange={value => this.height(value)}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"SALARY: $" + this.state.salary}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={10000}
                            minimumValue={1000000}
                            maximumValue={50000000}
                            value={this.state.salary}
                            onValueChange={value => this.setState({ salary: value })}
                        />

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black', marginBottom:10 }} title="Select Team" onPress={() => { Actions.push('teamlist', {updateTeam : this.updateTeam, home:6}) }}></Button>
                        

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black' }} title="Create Player" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

