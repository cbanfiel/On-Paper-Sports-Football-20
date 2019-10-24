import React from 'react';
import { TouchableOpacity, Text, ScrollView, View, Clipboard } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, Season, exportTeamJSON, availableFreeAgents, saveData } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import Picache from 'picache';
let season = new Season()


export default class RosterMenu extends React.Component {
  state = {
    team: selectedTeam
  }

  updateState = () => {
    this.setState({ team: selectedTeam });


    //roster autosave
    saveData('Roster_Autosave');

  }

  // static onEnter(){
  //   console.log("Not called");
  //   if(this.props.forceRefresh){
  //     console.log("called");
  //     Actions.refresh();

  //   }
  // }

  writeToClipboard = async (text) => {
    await Clipboard.setString(text);
    alert('Roster Data Copied to Clipboard...');
  };

  render() {
    return (
      <Background>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>



          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.rosterlist({ selectedTeam: selectedTeam, back: 'rostermenu', updateState: this.updateState })}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 35, width: 35, margin: 5 }} source={{ uri: selectedTeam.logoSrc }} />
                <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name + ' Team Roster'}</Text>
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', alignItems: "flex-start" }}>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.roster[0].faceSrc }} />
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.roster[0].positionString + ' #' + selectedTeam.roster[0].number + ' ' + selectedTeam.roster[0].name + ' OVR: ' + selectedTeam.roster[0].rating}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.roster[1].faceSrc }} />
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.roster[1].positionString + ' #' + selectedTeam.roster[1].number + ' ' + selectedTeam.roster[1].name + ' OVR: ' + selectedTeam.roster[1].rating}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.roster[2].faceSrc }} />
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.roster[2].positionString + ' #' + selectedTeam.roster[2].number + ' ' + selectedTeam.roster[2].name + ' OVR: ' + selectedTeam.roster[2].rating}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.roster[3].faceSrc }} />
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.roster[3].positionString + ' #' + selectedTeam.roster[3].number + ' ' + selectedTeam.roster[3].name + ' OVR: ' + selectedTeam.roster[3].rating}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Picache style={{ overflow: 'hidden', resizeMode: 'contain', height: 50, width: 50, margin: 5, }} source={{ uri: selectedTeam.roster[4].faceSrc }} />
                    <Text style={{ textAlign: "center", fontSize: 15, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.roster[4].positionString + ' #' + selectedTeam.roster[4].number + ' ' + selectedTeam.roster[4].name + ' OVR: ' + selectedTeam.roster[4].rating}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.editlineupmenu({ updateState: this.updateState }) }}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Edit Lineup'}</Text>
            </Card>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.playerrolemenu({updateState: this.updateState})}}>
                        <Card
                            containerStyle={{
                                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                                borderColor: 'black',
                                alignSelf:'center'
                            }}
                            >

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc } />
                            </View>
                            <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Edit Player Roles'}</Text>
                        </Card>
                    </TouchableOpacity> */}


          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.push('coachsettings') }}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Coach Settings'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.teamlist({ home: 3, back: 'rostermenu', isForced: 'true', updateState: this.updateState })}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Trade'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.signplayermenu({ back: 'rostermenu', freeAgents: availableFreeAgents, updateState: this.updateState }) }}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Free Agency'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.push('rosterlist', { selectedTeam: selectedTeam, back: 'rostermenu', view: 'releasePlayer', updateState: this.updateState }) }}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Release Player'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.playersearch() }}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Player Search'}</Text>
            </Card>
          </TouchableOpacity>


          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.editteam({ update: this.updateState }) }}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Edit Team'}</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.draftclassmenu() }}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Edit Draft Class'}</Text>
            </Card>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.writeToClipboard(exportTeamJSON(selectedTeam)) }}>
            <Card
              containerStyle={{
                width: '95%', backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'black',
                alignSelf: 'center'
              }}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={selectedTeam.logoSrc} />
              </View>
              <Divider style={{ backgroundColor: 'black', height: 1, margin: 5 }} ></Divider>
              <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Export Team JSON'}</Text>
            </Card>
          </TouchableOpacity> */}




        </ScrollView>
      </Background>



    )
  }
}