import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Background from "../components/background";
import NewsStory from "../components/NewsStory";
import { franchise } from '../data/script';

export default class News extends Component {
  render() {
    console.log(franchise.season.news)
    return (
        <Background>
            <View>
                <Text style={styles.header}>{'On Paper Sports News'}</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        {
            franchise.season.news.newsStories.map((story, i) => (
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
