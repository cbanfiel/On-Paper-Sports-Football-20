import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, ScrollView} from 'react-native';
import CachedImage from '../components/CachedImage';
import { Button, Card, Icon, Divider } from 'react-native-elements';
import { returnStatsView } from '../data/script';



export default class PlayerCardModal extends Component {
    render() {
        return (
            <ScrollView style={{flex:1, backgroundColor:'white'}}>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50, flex: 1 }}
                        uri={this.props.modalPlayer.faceSrc} />
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro', flex: 2, textAlign: 'center' }}>{this.props.modalPlayer.positionString + ' #' + this.props.modalPlayer.number + ' ' + this.props.modalPlayer.name}</Text>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50, flex: 1 }}
                        uri={this.props.modalPlayer.teamLogoSrc} />
                </View>

                <Divider style={{ height: 1, margin: 5, backgroundColor: 'black', width: '90%', alignSelf: 'center' }}></Divider>
                <View style={{ flexDirection: 'column', padding: 10, alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"YRS: " + this.props.modalPlayer.years}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"SAL: $" + this.props.modalPlayer.salary}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"HEIGHT: " + this.props.modalPlayer.height}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"AGE: " + this.props.modalPlayer.age}</Text>

                    <Divider style={{ height: 1, margin: 10, backgroundColor: 'black', width: '90%', alignSelf: 'center' }}></Divider>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"OVR: " + this.props.modalPlayer.rating}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"PASS: " + this.props.modalPlayer.pass}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"AWARENESS: " + this.props.modalPlayer.awareness}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"RUSH: " + this.props.modalPlayer.rush}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"SPEED: " + this.props.modalPlayer.speed}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"CATCH: " + this.props.modalPlayer.catch}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"BLOCK: " + this.props.modalPlayer.block}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"BREAKBLOCK: " + this.props.modalPlayer.breakBlock}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"TACKLE: " + this.props.modalPlayer.tackle}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{"KICK: " + this.props.modalPlayer.kick}</Text>

                    <Divider style={{ height: 1, margin: 10, backgroundColor: 'black', width: '90%', alignSelf: 'center' }}></Divider>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'advent-pro' }}>{returnStatsView(this.props.modalPlayer)}</Text>
                </View>
            </ScrollView>
        );
    }
}