import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import {selectedTeam} from '../data/script';
import CachedImage from '../components/CachedImage';

export default class EditPlayerRatings extends React.Component {
    state = {
        awareness: this.props.selectedPlayer.awareness,
        rating: this.props.selectedPlayer.rating,
        rush: this.props.selectedPlayer.rush,
        pass: this.props.selectedPlayer.pass,
        speed: this.props.selectedPlayer.speed,
        catch: this.props.selectedPlayer.catch,
        block: this.props.selectedPlayer.block,
        breakBlock: this.props.selectedPlayer.breakBlock,
        tackle: this.props.selectedPlayer.tackle,
        kick: this.props.selectedPlayer.kick,
    }

    ratingFormula(){
        let rat = 40;
        switch (this.props.selectedPlayer.position) {
            case 0:
              rat = Math.round(
                ((this.state.pass + this.state.awareness) * 2 + this.state.speed) / 5
              );
              break;
            case 1:
              rat = Math.round(
                (this.state.speed + this.state.rush * 2 + this.state.awareness) / 4
              );
              break;
            case 2:
              rat = Math.round(
                (this.state.block + this.state.rush * 2 + this.state.awareness) / 4
              );
              break;
            case 3:
              rat = Math.round(
                (this.state.catch + this.state.speed + this.state.awareness) / 3
              );
              break;
            case 4:
              rat = Math.round(
                (this.state.block + this.state.catch + this.state.speed + this.state.awareness) / 4
              );
              break;
            case 5:
              rat = Math.round((this.state.block + this.state.awareness) / 2);
              break;
            case 6:
              rat = Math.round((this.state.block + this.state.awareness) / 2);
              break;
            case 7:
              rat = Math.round((this.state.block + this.state.awareness) / 2);
              break;
            case 8:
              rat = Math.round((this.state.block + this.state.awareness) / 2);
              break;
            case 9:
              rat = Math.round((this.state.block + this.state.awareness) / 2);
              break;
            case 10:
              rat = Math.round(
                (this.state.tackle + this.state.breakBlock + this.state.awareness) / 3
              );
              break;
            case 11:
              rat = Math.round(
                (this.state.tackle + this.state.breakBlock + this.state.awareness) / 3
              );
              break;
            case 12:
              rat = Math.round(
                (this.state.tackle + this.state.breakBlock + this.state.awareness) / 3
              );
              break;
            case 13:
              rat = Math.round(
                (this.state.tackle + this.state.breakBlock + this.state.awareness + this.state.speed) / 4
              );
              break;
            case 14:
              rat = Math.round(
                (this.state.tackle + this.state.breakBlock + this.state.awareness + this.state.speed) / 4
              );
              break;
            case 15:
              rat = Math.round(
                (this.state.tackle + this.state.breakBlock + this.state.awareness + this.state.speed) / 4
              );
              break;
            case 16:
              rat = Math.round(
                (this.state.tackle + this.state.catch + this.state.awareness + this.state.speed) / 4
              );
              break;
            case 17:
              rat = Math.round(
                (this.state.tackle + this.state.catch + this.state.awareness + this.state.speed) / 4
              );
              break;
            case 18:
              rat = Math.round(
                (this.state.tackle + this.state.catch + this.state.awareness + this.state.speed) / 4
              );
              break;
            case 19:
              rat = Math.round(
                (this.state.kick + this.state.awareness) / 2
              );
              break;
            case 20:
              rat = Math.round(
                (this.state.kick + this.state.awareness) / 2
              );
              break;
            default:
              rat = 40;
              break;
        }

        this.setState({rating: rat});
    }

    saveChanges(){
        this.props.selectedPlayer.rating=this.state.rating;
        this.props.selectedPlayer.awareness=this.state.awareness;
        this.props.selectedPlayer.rush=this.state.rush;
        this.props.selectedPlayer.pass=this.state.pass;
        this.props.selectedPlayer.speed=this.state.speed;
        this.props.selectedPlayer.catch=this.state.catch;
        this.props.selectedPlayer.block=this.state.block;
        this.props.selectedPlayer.breakBlock=this.state.breakBlock;
        this.props.selectedPlayer.tackle=this.state.tackle;
        this.props.selectedPlayer.kick=this.state.kick;
        selectedTeam.reorderLineup();
        this.props.updateState();
        Actions.pop();

    }

    overallSlider(value){
        change=(this.state.rating - value);
        this.setState({
            rating: value,
            awareness: (this.state.awareness - change>99 ? 99 : this.state.awareness-change<40 ? 40 : this.state.awareness-change ),
            rush: (this.state.rush - change>99 ? 99 : this.state.rush-change<40 ? 40 : this.state.rush-change ),
            pass: (this.state.pass - change>99 ? 99 : this.state.pass-change<40 ? 40 : this.state.pass-change ),
            speed: (this.state.speed - change>99 ? 99 : this.state.speed-change<40 ? 40 : this.state.speed-change ),
            catch: (this.state.catch - change>99 ? 99 : this.state.catch-change<40 ? 40 : this.state.catch-change),
            block: (this.state.block - change>99 ? 99 : this.state.block-change<40 ? 40 : this.state.block-change),
            breakBlock: (this.state.breakBlock - change>99 ? 99 : this.state.breakBlock-change<40 ? 40 : this.state.breakBlock-change),
            tackle: (this.state.tackle - change>99 ? 99 : this.state.tackle-change<40 ? 40 : this.state.tackle-change),
            kick: (this.state.kick - change>99 ? 99 : this.state.kick-change<40 ? 40 : this.state.kick-change),
        })

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
                            <CachedImage uri={this.props.selectedPlayer.teamLogoSrc } style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }}/>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.teamName}</Text>
                        </View>

                        <CachedImage rounded style={{ height: 75, width: 75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri={this.props.selectedPlayer.faceSrc } />
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.positionString + ' #' + this.props.selectedPlayer.number + ' ' + this.props.selectedPlayer.name}</Text>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"OVR: " + this.state.rating}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.rating}
                            onValueChange={value => this.overallSlider(value)}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"AWR: " + this.state.awareness}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.awareness}
                            onValueChange={value => {this.setState({ awareness: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"RUSH: " + this.state.rush}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.rush}
                            onValueChange={value =>{ this.setState({ rush: value }), this.ratingFormula()}}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"PASS: " + this.state.pass}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.pass}
                            onValueChange={value =>{ this.setState({ pass: value }), this.ratingFormula()}}
                        />

                        

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"SPEED: " + this.state.speed}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.speed}
                            onValueChange={value => this.setState({ speed: value })}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"CATCH: " + this.state.catch}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.catch}
                            onValueChange={value => {this.setState({ catch: value }), this.ratingFormula()}}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"BLOCK: " + this.state.block}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.block}
                            onValueChange={value => {this.setState({ block: value }), this.ratingFormula()}}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"BREAKBLOCK: " + this.state.breakBlock}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.breakBlock}
                            onValueChange={value => {this.setState({ breakBlock: value }), this.ratingFormula()}}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"TACKLE: " + this.state.tackle}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.tackle}
                            onValueChange={value => {this.setState({ tackle: value }), this.ratingFormula()}}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"KICK: " + this.state.kick}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={40}
                            maximumValue={99}
                            value={this.state.kick}
                            onValueChange={value => {this.setState({ kick: value }), this.ratingFormula()}}
                        />

                <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'black'}} title="Commit Changes" onPress={() => {this.saveChanges()}}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

