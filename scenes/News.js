import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Background from "../components/background";
import { generateNewsStories } from "../data/NewsStories";
import CachedImage from "../components/CachedImage";
import NewsStory from "../components/NewsStory";

export default class News extends Component {
  generateNewsStories = () => {

    //game of the week

    let gameOfTheWeek = "";

    //free agency where will (expiring contract) land

    //rumor
    //made up crap
  };
  
  render() {
    let newsStories = generateNewsStories()
    return (
        <Background>
            <View>
                <Text style={styles.header}>OPS Around The League</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        {
            newsStories.map((story, i) => (
                <NewsStory newsStory={story} key={i}/>
            ))
        }


      </ScrollView>
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
    header:{
        textAlign: "center",
        fontSize: 22,
        color: "black",
        fontFamily: "advent-pro",
    },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "black",
    fontFamily: "advent-pro",
  },
  story: {
    textAlign: "center",
    fontSize: 18,
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
