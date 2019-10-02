import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import CachedImage from '../components/CachedImage';
import {Card, Icon, Divider, Button } from 'react-native-elements';
import { returnStatsView, calculateCapRoom, displaySalary, setPowerRankings } from '../data/script';
import Picache from 'picache';

export default class TeamCardModal extends Component {


    state={
        sliders:'current',
        roster: 'current'
    }

    render() {
        return (
            <ScrollView style={{flex:1, backgroundColor:'white'}} contentContainerStyle={{alignItems:'center'}}> 
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
                onPress={() => {}}></Button>
       
  

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
                        <TouchableOpacity style={{flex:1}} onPress={() => {}}>
                                <View style={{borderRightWidth:1, borderColor:'black'}}>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Current</Text>
                                    </View>

                            
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1}} onPress={() => {}}>
                            <View style={{ borderRightWidth:1, borderColor:'black'}}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Load</Text>
                            </View>


                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={() => {}}>
                                <View>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Download</Text>
                                    </View>

                            
                        </TouchableOpacity>
                        </View>

                    </Card>






<Card
                        containerStyle={{
                            width: '100%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center',
                        }} >
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginBottom:10}}>Choose Sliders</Text>
                            <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.collegeSliders()}}>
                                <View  style={this.state.sliders === 'current'? {borderRightWidth:1, borderColor:'black', backgroundColor:'rgb(225,225,225)'} : {borderRightWidth:1, borderColor:'black'}}>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Current</Text>
                                    </View>

                            
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1}} onPress={() => {this.resetSliders()}}>
                            <View style={{ borderRightWidth:1, borderColor:'black'}}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>Pro</Text>
                            </View>


                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.collegeSliders()}}>
                                <View>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>College</Text>
                                    </View>

                            
                        </TouchableOpacity>
                        </View>

                    </Card>

                    <Button titleStyle={{ fontFamily: 'advent-pro', color: 'white' }} 
                buttonStyle={{marginTop:10, backgroundColor: 'rgba(30,30,30,1)', borderColor: 'rgba(255,255,255,0)', borderWidth: 1, borderColor: 'black', width:'100%', marginBottom:10 }} 
                title={"Start New Franchise"} 
                onPress={() => {}}></Button>

             
                </View>
            </ScrollView>
        );
    }
}