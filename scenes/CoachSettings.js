import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { selectedTeam, OFF_PRO, OFF_SPREAD, OFF_OPTION, OFF_PISTOL, DEF_43, DEF_34, DEF_335, DEF_425, DEF_52 } from '../data/script';
import CachedImage from '../components/CachedImage';

export default class CoachSettings extends React.Component {
    state = {
        offVsDefFocus: selectedTeam.offVsDefFocus,
        offenseType: selectedTeam.offenseType,
        defenseType: selectedTeam.defenseType,
        runVsPass: selectedTeam.runVsPass,
        offTempo: selectedTeam.offTempo

    }



    saveChanges() {
        selectedTeam.offVsDefFocus = this.state.offVsDefFocus;
        selectedTeam.offenseType = this.state.offenseType;
        selectedTeam.defenseType = this.state.defenseType;
        selectedTeam.runVsPass = this.state.runVsPass;
        selectedTeam.offTempo = this.state.offTempo;

        if(this.props.inGame!=true){
            // if(this.state.rotationSize != selectedTeam.rotationSize){
            //     selectedTeam.rotationSize = this.state.rotationSize;
            //     selectedTeam.reorderLineup();
            // }
        }
        Actions.pop();
    }


    getOffVsDefFocusString() {
        if (this.state.offVsDefFocus === 0) {
            return "Focus: Balanced"
        } else if (this.state.offVsDefFocus > 0) {
            return "Focus: Offense"
        } else {
            return "Focus: Defense"
        }
    }

    getOffenseType(){
        if(this.state.offenseType === OFF_PRO){
            return "Pro Style"
        }
        if(this.state.offenseType === OFF_SPREAD){
            return "Spread"
        }
        if(this.state.offenseType === OFF_OPTION){
            return "Option"
        }
        if(this.state.offenseType === OFF_PISTOL){
            return "Pistol"
        }
    }

    getDefenseType(){
        if(this.state.defenseType === DEF_43){
            return "4-3"
        }
        if(this.state.defenseType === DEF_34){
            return "3-4"
        }
        if(this.state.defenseType === DEF_335){
            return "3-3-5"
        }
        if(this.state.defenseType === DEF_425){
            return "4-2-5"
        }
        if(this.state.defenseType === DEF_52){
            return "5-2"
        }
    }

    getRunVsPass(){
        if(this.state.runVsPass>50){
            return "Focus: Pass";
        }
        if(this.state.runVsPass<50){
            return "Focus: Run";
        }

        return "Focus: Balanced";
    }
    getOffTempo(){
        if(this.state.offTempo>1){
            return `Tempo: Fast + ${this.state.offTempo}`;
        }
        if(this.state.offTempo<-1){
            return `Tempo: Slow  ${this.state.offTempo}`;
        }

        return `Tempo: Balanced  ${this.state.offTempo}`;
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
{
                this.props.inGame ===  true? (

                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{'Note: These changes only affect the current game, to make them permanent make sure to set them in your teams Coach Settings'}</Text>
                        </View>    
                ): null
}

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CachedImage uri={selectedTeam.logoSrc} style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }} />
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getOffVsDefFocusString()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-3}
                            maximumValue={3}
                            value={this.state.offVsDefFocus}
                            onValueChange={value => { this.setState({ offVsDefFocus: value }) }}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getOffenseType()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={3}
                            value={this.state.offenseType}
                            onValueChange={value => { this.setState({ offenseType: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getDefenseType()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={4}
                            value={this.state.defenseType}
                            onValueChange={value => { this.setState({ defenseType: value }) }}
                        />

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getRunVsPass()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={60}
                            value={this.state.runVsPass}
                            onValueChange={value => { this.setState({ runVsPass: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.getOffTempo()}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-5}
                            maximumValue={5}
                            value={this.state.offTempo}
                            onValueChange={value => { this.setState({ offTempo: value }) }}
                        />

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black' }} title="Commit Changes" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

