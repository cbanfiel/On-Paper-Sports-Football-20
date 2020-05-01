import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Background from "../components/background";
import { generateNewsStories } from "../data/NewsStories";
import CachedImage from "../components/CachedImage";

export default class News extends Component {
  generateNewsStories = () => {

    //game of the week

    let gameOfTheWeek = "";

    //free agency where will (expiring contract) land

    //rumor
    //made up crap
  };
  
  render() {
    let newsStory = generateNewsStories()
    return (
        <Background>

            <Text>On Paper Sports News</Text>
      <View style={styles.article}>
          <View style={{flexDirection: 'row', justifyContent:'space-around', flex:1}}>
      <CachedImage style={styles.img} uri={newsStory.image1} />
      <CachedImage style={styles.img} uri={newsStory.image2} />

          </View>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{newsStory.title}</Text>
        <Text style={styles.story}>
          {newsStory.story}
        </Text>

      </View>

      </View>
        </Background>
    );
  }
}

const styles = StyleSheet.create({
    article:{
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 0.5
    },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
    fontFamily: "advent-pro",
  },
  story: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
    fontFamily: "advent-pro",
  },img: {
      flex:1, 
    overflow: "hidden",
    resizeMode: "contain",
    height: 75,
    width: 75,
    margin: 5,
  }
});
