import React from 'react';
import Picache from 'picache';
import {Text, View} from 'react-native';

export default class CachedImage extends React.Component {
  render() {
    if(this.props.uri && this.props.uri.length>0){

      return(
        <Picache style={this.props.style} source={{uri: this.props.uri}}/>
      )
    }
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center', height:this.props.style.height, width:this.props.style.width}}>
        <Text style={{textShadowRadius:2, textShadowColor:'rgb(0,0,0)', textAlign: 'center', fontSize: 20, color: 'black', fontFamily: 'advent-pro', letterSpacing:3, textTransform:'uppercase'}}>{this.props.name?`|${this.props.name}|`:''}</Text>
      </View>
    )
  }
}