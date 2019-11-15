import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CachedImage from './CachedImage';
import { teams, availableCoaches } from '../data/script';

var {height, width} = Dimensions.get('window');



export default class CoachFilter extends React.Component {

    state={
        coaches : this.props.coaches
    }

    setFilter(filter){
        let filteredArray = [];
        if(filter === 'available'){
            for(let i=0; i<availableCoaches.length; i++){
                filteredArray.push(availableCoaches[i]);
              }
        }

        if(filter === 'signed'){
           for(let i=0; i<teams.length; i++){
               filteredArray.push(teams[i].coach);
           }
        }
        this.props.setCoachFilter(filteredArray);
    }

    render() {
        return (
                <View style={{ backgroundColor: 'rgba(255,255,255,0)', height:50, width:width, flexDirection:'row', justifyContent:'center', alignItems:'center', display:'flex'}}>
                    <TouchableOpacity  onPress={() => this.setFilter('available')} style={{flex:1}}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Available</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('signed')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Signed</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
               
        )
    }
}

