import React from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Modal, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { sortedRoster, collegeMode, releasePlayer, saveAsDrasaveClass, manageSaveName, selectedTeam } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';


export default class TrainingScreen extends React.Component {

    componentWillUnmount(){
        if(this.props.update!= null){
            this.props.update();
        }
    }


    state = {
        player: this.props.player,
        points: this.props.points,
        passGrowth: (this.props.player.pass - this.props.player.passOld),
        awarenessGrowth: (this.props.player.awareness - this.props.player.awarenessOld),
        rushGrowth: (this.props.player.rush - this.props.player.rushOld),
        speedGrowth: (this.props.player.speed - this.props.player.speedOld),
        catchGrowth: (this.props.player.catch - this.props.player.catchOld),
        blockGrowth: (this.props.player.block - this.props.player.blockOld),
        breakBlockGrowth: (this.props.player.breakBlock - this.props.player.breakBlockOld),
        tackleGrowth: (this.props.player.tackle - this.props.player.tackleOld),
        kickGrowth: (this.props.player.kick - this.props.player.kickOld),

        pass: this.props.player.pass,
        awareness: this.props.player.awareness,
        rush: this.props.player.rush,
        speed: this.props.player.speed,
        catch: this.props.player.catch,
        block: this.props.player.block,
        breakBlock: this.props.player.breakBlock,
        tackle: this.props.player.tackle,
        kick: this.props.player.kick,
        disabled: this.props.points<=0,
    }

    train(attr) {
        if(this.state.disabled){
            return;
        }
        if(this.state.player.trained){
            Alert.alert('You already sent ' + this.state.player.name + ' to a camp this year');
            return;
        }


        this.setState({ points: this.state.points - 1, disabled:true });
        let growth = Math.round(Math.random() * 3);
        this.growthAnimation(growth, attr);
    }

    growthAnimation(growth, attr) {
        let pts = growth;
        const timer = setInterval(
            function () {
                if (attr === 'pass') {
                    if(this.state.pass>=99){
                        //nothing
                    }else{
                        this.setState({pass: this.state.pass+1, passGrowth: this.state.passGrowth+1});
                    }
                }
                if (attr === 'awareness') {
                    if(this.state.awareness>=99){
                        //nothing
                    }else{
                        this.setState({awareness: this.state.awareness+1, awarenessGrowth: this.state.awarenessGrowth+1});
                    }
                }
                if (attr === 'rush') {
                    if(this.state.rush>=99){
                        //nothing
                    }else{
                        this.setState({rush: this.state.rush+1, rushGrowth: this.state.rushGrowth+1});
                    }
                }
                if (attr === 'speed') {
                    if(this.state.speed>=99){

                    }else{
                        this.setState({speed: this.state.speed+1, speedGrowth: this.state.speedGrowth+1});
                    }
                }
                if (attr === 'catch') {
                    if(this.state.catch>=99){
                        //nothing
                    }else{
                    this.setState({catch: this.state.catch+1, catchGrowth: this.state.catchGrowth+1});
                }
            }
            if (attr === 'block') {
                if(this.state.block>=99){
                    //nothing
                }else{
                this.setState({block: this.state.block+1, blockGrowth: this.state.blockGrowth+1});
            }
        }
            if (attr === 'breakBlock') {
                if(this.state.breakBlock>=99){
                    //nothing
                }else{
                this.setState({breakBlock: this.state.breakBlock+1, breakBlockGrowth: this.state.breakBlockGrowth+1});
            }
        }
            if (attr === 'tackle') {
                if(this.state.tackle>=99){
                    //nothing
                }else{
                this.setState({tackle: this.state.tackle+1, tackleGrowth: this.state.tackleGrowth+1});
            }
        }
            if (attr === 'kick') {
                if(this.state.kick>=99){
                    //nothing
                }else{
                this.setState({kick: this.state.kick+1, kickGrowth: this.state.kickGrowth+1});
            }
        }
        pts--;


                if (pts <= 0) {
                    clearInterval(timer);
                    this.props.player.pass = this.state.pass;
                    this.props.player.awareness = this.state.awareness;
                    this.props.player.rush = this.state.rush;
                    this.props.player.speed = this.state.speed;
                    this.props.player.catch = this.state.catch;
                    this.props.player.block = this.state.block;
                    this.props.player.calculateRating();
                    selectedTeam.trainingPoints= this.state.points;
                    this.props.player.trained = true;
                    const popTimer = setTimeout(function(){
                        Actions.pop();
                    }.bind(this), 400);
                }
            }.bind(this),200
);
    }

    render() {
        return (
            <Background>

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20, padding: 20 }}>{this.state.player.positionString + ' #' + this.state.player.number + ' ' + this.state.player.name}</Text>
                </View>

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20, padding: 20 }}>{'Training Points Remaining: ' + this.state.points}</Text>
                </View>

                <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                    <ListItem
                        title={'Pass: ' + this.state.pass}
                        rightTitle={this.state.passGrowth >= 0 ? 'Growth: +' + this.state.passGrowth : 'Growth: ' + this.state.passGrowth}
                        rightTitleStyle={this.state.passGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        subtitle={'PASS TRAINING'}
                        onPress={() => { this.train('pass') }}

                    ></ListItem>
                    <ListItem
                        title={'Awareness: ' + this.state.awareness}
                        rightTitle={this.state.awarenessGrowth >= 0 ? 'Growth: +' + this.state.awarenessGrowth : 'Growth: ' + this.state.awarenessGrowth}
                        rightTitleStyle={this.state.awarenessGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => {  this.train('awareness') }}
                        subtitle={'AWARENESS TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Rush: ' + this.state.rush}
                        rightTitle={this.state.rushGrowth >= 0 ? 'Growth: +' + this.state.rushGrowth : 'Growth: ' + this.state.rushGrowth}
                        rightTitleStyle={this.state.rushGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('rush') }}
                        subtitle={'RUSHING TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Speed: ' + this.state.speed}
                        rightTitle={this.state.speedGrowth >= 0 ? 'Growth: +' + this.state.speedGrowth : 'Growth: ' + this.state.speedGrowth}
                        rightTitleStyle={this.state.speedGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('speed') }}
                        subtitle={'SPEED TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Catch: ' + this.state.catch}
                        rightTitle={this.state.catchGrowth >= 0 ? 'Growth: +' + this.state.catchGrowth : 'Growth: ' + this.state.catchGrowth}
                        rightTitleStyle={this.state.catchGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('catch') }}
                        subtitle={'CATCH TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Block: ' + this.state.block}
                        rightTitle={this.state.blockGrowth >= 0 ? 'Growth: +' + this.state.blockGrowth : 'Growth: ' + this.state.blockGrowth}
                        rightTitleStyle={this.state.blockGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('block') }}
                        subtitle={'BLOCKING TRAINING'}

                    ></ListItem>
                     <ListItem
                        title={'Break Block: ' + this.state.breakBlock}
                        rightTitle={this.state.breakBlockGrowth >= 0 ? 'Growth: +' + this.state.breakBlockGrowth : 'Growth: ' + this.state.breakBlockGrowth}
                        rightTitleStyle={this.state.breakBlockGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('breakBlock') }}
                        subtitle={'BREAK BLOCK TRAINING'}

                    ></ListItem>
                     <ListItem
                        title={'Tackle: ' + this.state.tackle}
                        rightTitle={this.state.tackleGrowth >= 0 ? 'Growth: +' + this.state.tackleGrowth : 'Growth: ' + this.state.tackleGrowth}
                        rightTitleStyle={this.state.tackleGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('tackle') }}
                        subtitle={'TACKLE TRAINING'}

                    ></ListItem>
                     <ListItem
                        title={'Kick: ' + this.state.kick}
                        rightTitle={this.state.kickGrowth >= 0 ? 'Growth: +' + this.state.kickGrowth : 'Growth: ' + this.state.kickGrowth}
                        rightTitleStyle={this.state.kickGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('kick') }}
                        subtitle={'KICKING TRAINING'}

                    ></ListItem>

                </ScrollView>


            </Background>





        )
    }
}