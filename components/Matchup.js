import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Picache from  'picache';

const Matchup = ({ leftImage, rightImage, leftText, rightText }) => {
  return (
      <View style={styles.child}>

        <Text style={{ fontFamily: "advent-pro", fontSize: 30, marginLeft:20 }}>
          {leftText}
        </Text>

      <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5}} source={{ uri: leftImage }} />

      <Text style={{ fontFamily: "advent-pro", fontSize: 18}}>vs</Text>


      <Picache style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5}} source={{ uri: rightImage }} />

        <Text style={{ fontFamily: "advent-pro", fontSize: 30, marginRight:20 }}>
          {rightText}
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
    borderBottomWidth: 0.5
  },
  child: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 0.5
  },
});

export default Matchup;
