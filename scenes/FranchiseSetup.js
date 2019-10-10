import React from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Background from '../components/background';

import {Card, Icon, Divider, Button } from 'react-native-elements';
import { resetSliders, collegeSliderPreset, Franchise, franchise, resetFranchise } from '../data/script';
import { Actions } from 'react-native-router-flux';

export default class FranchiseSetup extends React.Component{

    componentWillUnmount(){
        //updates a previous scenes state
        if(this.props.updateState != null){
            this.props.updateState();
        }
    }


    state={
        roster: 'current'
    }

    // modalFranchiseActions(action){
    //     this.setState({modalVisible:false});
    //     if(action==='load'){
    //       Actions.savesmenu({filtered:'franchise', saveType:'franchise'});
    //     }
    //     if(action === 'continue'){
        //   Actions.teamlist({ home: 4, updateState: this.update })
    //     }
    //   }


    manageRoster = () => {
        if(this.state.roster === 'load'){
            Actions.savesmenu({filtered:'roster', startNewFranchise:this.startNewFranchise, push:true, updateState:this.props.updateState})
        }

        else if(this.state.roster === 'download'){
            Actions.communityrosters({filtered:'Roster', updateState:this.props.updateState,startNewFranchise: this.startNewFranchise})
        }else{
            this.startNewFranchise();
        }
    }

    startNewFranchise = () => {
        this.setState({roster:'current'});
        // if(this.state.sliders === 'pro'){
        //     resetSliders();
        // }else if (this.state.sliders === 'college'){
        //     collegeSliderPreset();
        // }
        resetFranchise();
        Actions.replace('teamlist', ({ home: 4, updateState: this.update }));
    }


    constructor(props){
        super(props);
        this.startNewFranchise = this.startNewFranchise.bind(this);
    }
  
    render() {
        return (
      <Background>
            <ScrollView contentContainerStyle={{paddingBottom: 20, justifyContent:'center',alignItems:'center', paddingTop:20}}> 
            <View style={{width:'80%'}}>
                <Text style={{ color: 'black', fontSize: 30, fontFamily: 'advent-pro', textAlign:'center', marginBottom:10}}>{"Franchise Settings"}</Text>
                <Text style={{ color: 'black', fontSize: 20, fontFamily: 'advent-pro', textAlign:'center', marginBottom:10}}>{"Continue A Franchise"}</Text>
                <Divider style={{ height: 1, margin: 5, backgroundColor: 'black', width: '90%', alignSelf: 'center' }}></Divider>
                <Button titleStyle={{ fontFamily: 'advent-pro', color: 'white' }} 
                buttonStyle={{ backgroundColor: 'rgba(30,30,30,1)', borderColor: 'rgba(255,255,255,0)', borderWidth: 1, borderColor: 'black', width:'100%', marginBottom:10 }} 
                title={"Continue The Current Franchise"} 
                onPress={() => {Actions.teamlist({ home: 4, updateState: this.update })}}></Button>
                <Text style={{ color: 'black', fontSize: 15, fontFamily: 'advent-pro', textAlign:'center', marginBottom:10}}>{"Or"}</Text>
                <Button titleStyle={{ fontFamily: 'advent-pro', color: 'white' }} 
                buttonStyle={{ backgroundColor: 'rgba(30,30,30,1)', borderColor: 'rgba(255,255,255,0)', borderWidth: 1, borderColor: 'black', width:'100%', marginBottom:10 }} 
                title={"Load A Franchise"} 
                onPress={() => {Actions.savesmenu({filtered:'franchise', push:true, updateState: this.props.updateState});}}></Button>
       
  

<Text style={{ color: 'black', fontSize: 20, fontFamily: 'advent-pro', textAlign:'center', marginBottom:10}}>{"Create A New Franchise"}</Text>
                <Divider style={{ height: 1, margin: 5, backgroundColor: 'black', width: '90%', alignSelf: 'center' }}></Divider>

<Card
                        containerStyle={{
                            width: '100%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center',
                        }} >
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginBottom:10}}>Choose A Roster</Text>
                            <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.setState({roster: 'current'})}}>
                                <View style={this.state.roster === 'current'?
                                 {borderRightWidth:1, borderColor:'black', backgroundColor:'rgb(195,195,195)'} : 
                                 {borderRightWidth:1, borderColor:'black'}}>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Current</Text>
                                    </View>

                            
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1}} onPress={() => {this.setState({roster: 'load'}  )}}>
                            <View style={this.state.roster === 'load'?
                                 {borderRightWidth:1, borderColor:'black', backgroundColor:'rgb(195,195,195)'} : 
                                 {borderRightWidth:1, borderColor:'black'}}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Load</Text>
                            </View>


                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.setState({roster: 'download'})  }}>
                                <View style={this.state.roster === 'download'?
                                 {borderRightWidth:1, borderColor:'black', backgroundColor:'rgb(195,195,195)'} : 
                                 {borderRightWidth:1, borderColor:'black'}}>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Download</Text>
                                    </View>

                            
                        </TouchableOpacity>
                        </View>

                    </Card>




{

/* <Card
                        containerStyle={{
                            width: '100%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center',
                        }} >
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginBottom:10}}>Choose Slider Set</Text>
                            <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.setState({sliders: 'current'})}}>
                                <View  style={this.state.sliders === 'current'?
                                 {borderRightWidth:1, borderColor:'black', backgroundColor:'rgb(195,195,195)'} : 
                                 {borderRightWidth:1, borderColor:'black'}}>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Current</Text>
                                    </View>

                            
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1}} onPress={() => {this.setState({sliders: 'pro'})}}>
                            <View style={this.state.sliders === 'pro'?
                                 {borderRightWidth:1, borderColor:'black', backgroundColor:'rgb(195,195,195)'} : 
                                 {borderRightWidth:1, borderColor:'black'}}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Pro</Text>
                            </View>


                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.setState({sliders: 'college'})}}>
                                <View style={this.state.sliders === 'college'?
                                 {borderRightWidth:1, borderColor:'black', backgroundColor:'rgb(195,195,195)'} : 
                                 {borderRightWidth:1, borderColor:'black'}}>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>College</Text>
                                    </View>

                            
                        </TouchableOpacity>
                        </View>

                    </Card>  */
}

                    <Button titleStyle={{ fontFamily: 'advent-pro', color: 'white' }} 
                buttonStyle={{marginTop:10, backgroundColor: 'rgba(30,30,30,1)', borderColor: 'rgba(255,255,255,0)', borderWidth: 1, borderColor: 'black', width:'100%', marginBottom:10 }} 
                title={"Start New Franchise"} 
                onPress={() => {this.manageRoster()}}></Button>

             
                </View>
            </ScrollView>
            </Background>
        );
    }
}