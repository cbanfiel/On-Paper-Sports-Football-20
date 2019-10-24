import React from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { setSliders, setFranchiseSliders, conferences, gamesPerSeason, playoffSeeds, seriesWinCount, conferencesOn, teams, franchise, collegeMode, difficulty, tradeThreshold, resetSliders, collegeSliderPreset, trainingPointsAvailable, qbCompletionSlider, passSlider, runSlider, rosterSize, playerSigningDifficulty } from '../data/script';

export default class SlidersMenu extends React.Component {

    state = {
        games: gamesPerSeason,
        seeds: playoffSeeds,
        gamesToWin: seriesWinCount,
        conferencesOn: conferencesOn,
        maxSeeds: this.getMaxSeeds(),
        seedSelection: this.getMaxSeeds(),
        collegeMode: collegeMode,
        difficulty: difficulty,
        tradeDifficulty : tradeThreshold,
        trainingPointsAvailable: trainingPointsAvailable,
        passSlider : passSlider,
        runSlider : runSlider,
        qbCompletionSlider : qbCompletionSlider,
        rosterSize : rosterSize,
        playerSigningDifficulty: playerSigningDifficulty
    }


    checkGameSliders() {
        if (this.state.passSlider != passSlider) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.runSlider != runSlider) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.qbCompletionSlider != qbCompletionSlider) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.difficulty != difficulty) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.trainingPointsAvailable != trainingPointsAvailable) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.rosterSize != rosterSize) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (Math.round(this.state.tradeDifficulty*100) != Math.round(tradeThreshold*100)) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if(this.state.playerSigningDifficulty != playerSigningDifficulty){
            this.setState({ gameSlidersChanged: true });
            return;
        }

        this.setState({ gameSlidersChanged: false });
    }

    checkFranchiseSliders() {
        const timer = setTimeout(
            function () {
                if (this.state.games != gamesPerSeason) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }
                if (this.state.seeds != playoffSeeds) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }
                if (this.state.gamesToWin != seriesWinCount) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }
                if (this.state.conferencesOn != conferencesOn) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }
                if (this.state.collegeMode != collegeMode) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }

                this.setState({ franchiseSlidersChanged: false });
                clearTimeout(timer);
            }
                .bind(this),
            20
        );



    }

    difficultyString(value) {
        if (value === 2) {
            return "MVP"
        }
        if (value === 1) {
            return "Superstar"
        }
        if (value === 0) {
            return "All-Star"
        }
        if (value === -1) {
            return "Pro"
        }
        if (value === -2) {
            return "Rookie"
        }
    }

    playoffSeeds(value) {
        if (value === 0) {
            this.setState({ seeds: 1 });
        } else if (value === 1) {
            this.setState({ seeds: 2 });
        }
        //test
        else if (value === 2) {
            this.setState({ seeds: 3 });
        }
        else if (value === 3) {
            this.setState({ seeds: 4 });
        }
        else if (value === 4) {
            this.setState({ seeds: 6 });
        }
        else if (value === 5) {
            this.setState({ seeds: 8 });
        } else if (value === 6) {
            this.setState({ seeds: 16 });
        }
        else if (value === 7) {
            this.setState({ seeds: 32 });
        }
        else if (value === 8) {
            this.setState({ seeds: 64 });
        }
    }
    updateMaxSeeds(confOn) {

        if (confOn === false) {
            if (teams.length >= 64) {
                return 8;
            } else if (teams.length >= 32) {
                return 7;
            }
            else if (teams.length >= 16) {
                return 6;
            } else if (teams.length >= 8) {
                return 5;
            }
            else if (teams.length >= 6) {
                return 4;
            }
            else if (teams.length >= 4) {
                return 3;
            }
            else if (teams.length >= 3) {
                return 2;
            }
            else if (teams.length >= 2) {
                return 1;
            }
            else if (teams.length >= 1) {
                return 0;
            }
        } else {
            return this.getMaxSeeds();
        }

    }

    getMaxSeeds() {
        if (conferences[0].teams.length <= conferences[1].teams.length) {
            if (conferences[0].teams.length >= 64) {
                return 8;
            }
            else if (conferences[0].teams.length >= 32) {
                return 7;
            } else if (conferences[0].teams.length >= 16) {
                return 6;
            } else if (conferences[0].teams.length >= 8) {
                return 5;
            }
            else if (conferences[0].teams.length >= 6) {
                return 4;
            }
            else if (conferences[0].teams.length >= 4) {
                return 3;
            }
            else if (conferences[0].teams.length >= 3) {
                return 2;
            }
            else if (conferences[0].teams.length >= 2) {
                return 1;
            }
            else if (conferences[0].teams.length >= 1) {
                return 0;
            }
        }
        else if (conferences[0].teams.length >= conferences[1].teams.length) {
            if (conferences[1].teams.length >= 64) {
                return 8;
            }
            else if (conferences[1].teams.length >= 32) {
                return 7;
            } else if (conferences[1].teams.length >= 16) {
                return 6;
            } else if (conferences[1].teams.length >= 8) {
                return 5;
            }
            else if (conferences[1].teams.length >= 6) {
                return 4;
            }
            else if (conferences[1].teams.length >= 4) {
                return 3;
            }
            else if (conferences[1].teams.length >= 3) {
                return 2;
            }
            else if (conferences[1].teams.length >= 2) {
                return 1;
            }
            else if (conferences[1].teams.length >= 1) {
                return 0;
            }
        }
    }


    saveChanges() {
        setSliders(this.state.difficulty, this.state.tradeDifficulty, this.state.trainingPointsAvailable, this.state.passSlider, this.state.runSlider, this.state.qbCompletionSlider, this.state.rosterSize, this.state.playerSigningDifficulty);
        this.setState({ gameSlidersChanged: false });
    }

    saveFranchiseChanges() {

            if(teams.length >= 4){
                Alert.alert(
                    'THESE CHANGES WILL RESTART YOUR FRANCHISE',
                    'This will overwrite your current franchise and implement the selected changes in a new one, the roster will remain the same but progress in the franchise will be reset',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {
                        setFranchiseSliders(this.state.games, this.state.seeds, this.state.gamesToWin, this.state.conferencesOn, this.state.collegeMode);
                        this.setState({ franchiseSlidersChanged: false });}},
                    ],
                    {cancelable: true},
                  );

            }else{
              Alert.alert('LESS THAN 4 TEAMS','Currently for franchise mode you must have at least 4 teams' );
      
            }
    }

    resetSliders(){
        resetSliders();
        this.setState({
                games: gamesPerSeason,
                seeds: playoffSeeds,
                gamesToWin: seriesWinCount,
                conferencesOn: conferencesOn,
                maxSeeds: this.getMaxSeeds(),
                seedSelection: this.getMaxSeeds(),
                collegeMode: collegeMode,
                difficulty: difficulty,
                tradeDifficulty : tradeThreshold,
                trainingPointsAvailable: trainingPointsAvailable,
                passSlider : passSlider,
                runSlider : runSlider,
                qbCompletionSlider : qbCompletionSlider,
            franchiseSlidersChanged: false,
            gameSlidersChanged: false,
            rosterSize: rosterSize
        });
    }

    collegeSliders(){
        collegeSliderPreset();
        this.setState({
            games: gamesPerSeason,
                seeds: playoffSeeds,
                gamesToWin: seriesWinCount,
                conferencesOn: conferencesOn,
                maxSeeds: this.getMaxSeeds(),
                seedSelection: this.getMaxSeeds(),
                collegeMode: collegeMode,
                difficulty: difficulty,
                tradeDifficulty : tradeThreshold,
                trainingPointsAvailable: trainingPointsAvailable,
                passSlider : passSlider,
                runSlider : runSlider,
                qbCompletionSlider : qbCompletionSlider,
            franchiseSlidersChanged: false,
            gameSlidersChanged: false,
            rosterSize: rosterSize
    });
    }

    render() {
        return (
            <Background>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                <Card
                        containerStyle={{
                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center',
                        }} >
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro', marginBottom:10}}>Slider Presets</Text>
                            <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.resetSliders()}}>
                            <View style={{ borderRightWidth:1, borderColor:'white'}}>
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


                    <Card
                        containerStyle={{
                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center'
                        }} >

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Game Sliders'}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Difficulty: " + this.difficultyString(this.state.difficulty)}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-2}
                            maximumValue={2}
                            value={this.state.difficulty}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ difficulty: value }) }}
                        />

                        {/* <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Average Possesion Time: " + this.state.soc +" Seconds"}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={35}
                            value={this.state.soc}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ soc: value }) }}
                        /> */}

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Trade Difficulty: " + Math.floor(this.state.tradeDifficulty * 100)}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={0.05}
                            minimumValue={-1}
                            maximumValue={1}
                            value={this.state.tradeDifficulty}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ tradeDifficulty: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"QB Completion Slider: " + this.state.qbCompletionSlider}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={100}
                            value={this.state.qbCompletionSlider}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ qbCompletionSlider: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Pass Yardage Modifier: " + this.state.passSlider}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={10}
                            value={this.state.passSlider}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ passSlider: value }) }}
                        />

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Run Yardage Modifier: " + this.state.runSlider}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={10}
                            value={this.state.runSlider}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ runSlider: value }) }}
                        />

              
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Training Points Available: " + this.state.trainingPointsAvailable}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={5}
                            value={this.state.trainingPointsAvailable}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ trainingPointsAvailable: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Team Roster Size: " + this.state.rosterSize}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={53}
                            maximumValue={70}
                            value={this.state.rosterSize}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ rosterSize: value }) }}
                        />

                        
<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Player Signing Difficulty: " + this.state.playerSigningDifficulty}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={5}
                            minimumValue={20}
                            maximumValue={150}
                            value={this.state.playerSigningDifficulty}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ playerSigningDifficulty: value }) }}
                        />


                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(255,0,0,0.75)', borderColor: 'rgba(255,255,255,0)', borderWidth: 1, borderColor: 'black' }} title={this.state.gameSlidersChanged ? "Commit Game Slider Changes" : "Current"} disabled={this.state.gameSlidersChanged ? false : true} disabledStyle={{ backgroundColor: 'rgba(10,200,60,0.75)' }} disabledTitleStyle={{ color: 'black' }} onPress={() => { this.saveChanges() }}></Button>

                    </Card>

                    <Card
                        containerStyle={{
                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center'
                        }} >

                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Franchise Sliders'}</Text>
                            <Text style={{ textAlign: "center", fontSize: 14, color: 'black', fontFamily: 'advent-pro' }}>{'Note: Modyfying these sliders will require a new franchise to be started, The franchise you are currently in will be restarted.'}</Text>

                        </View>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Season Games: " + this.state.games}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={2}
                            maximumValue={82}
                            value={this.state.games}
                            onValueChange={value => { this.checkFranchiseSliders(), this.setState({ games: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Playoff Seeds: " + this.state.seeds}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={this.state.maxSeeds}
                            value={this.state.seedSelection}
                            onValueChange={value => { this.checkFranchiseSliders(), this.playoffSeeds(value) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"Series Length: Best Of " + (this.state.gamesToWin + this.state.gamesToWin - 1)}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={4}
                            value={this.state.gamesToWin}
                            onValueChange={value => { this.checkFranchiseSliders(), this.setState({ gamesToWin: value }) }}
                        />

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0)', marginBottom: 10, borderWidth: 1, borderColor: 'black' }} title={this.state.conferencesOn ? 'Conferences: ON' : 'Conferences: OFF'} onPress={() => { this.checkFranchiseSliders(), this.setState({ maxSeeds: this.updateMaxSeeds(!this.state.conferencesOn), seedSelection: this.updateMaxSeeds(!this.state.conferencesOn), conferencesOn: !this.state.conferencesOn }), this.playoffSeeds(this.updateMaxSeeds(!this.state.conferencesOn)) }}></Button>

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0)', borderWidth: 1, borderColor: 'black', marginBottom: 10 }} title={this.state.collegeMode ? 'Offseason Type: College' : 'Offseason Type: Pro'} onPress={() => { this.setState({ collegeMode: !this.state.collegeMode }), this.checkFranchiseSliders() }}></Button>

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(255,0,0,0.75)', borderColor: 'rgba(255,255,255,0)', borderWidth: 1, borderColor: 'black' }} title={this.state.franchiseSlidersChanged ? "Commit Franchise Slider Changes" : "Current"} disabled={this.state.franchiseSlidersChanged ? false : true} disabledStyle={{ backgroundColor: 'rgba(10,200,60,0.75)' }} disabledTitleStyle={{ color: 'black' }} onPress={() => { this.saveFranchiseChanges() }}></Button>


                    </Card>



                    <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0)', borderWidth: 1, borderColor: 'black', width:'90%', marginTop:10, alignSelf:'center', marginBottom:10 }} title={"Reset To Default Sliders"} onPress={() => { this.resetSliders() }}></Button>

                </ScrollView>
            </Background>





        )
    }
}

