import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Divider, Slider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam,  signPlayer,  canSign, calculateCapRoom, displaySalary, collegeMode, offerContract, availableFreeAgents, getPlayerSigningInterest, teams } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';

export default class SecondChanceMenu extends React.Component {

    state = {
        interest: this.props.player.interest,
        secondChancePoints: this.props.secondChancePoints,
        declined: false
    }

    manage = (value) => {
        let interest = this.props.player.interest;
        let secondChancePoints = this.props.secondChancePoints - value;
        if(value > 1){
            interest+= (15*(value-1));
        }else{
            interest = this.props.player.interest;
        }
        this.setState({interest: interest, secondChancePoints: secondChancePoints})
    }

    secondChance = () => {
        if(this.state.interest > Math.random()*100){
            //swap teams
            for(let i=0; i<teams.length; i++){
                if(teams[i].roster.includes(this.props.player)){
                    teams[i].roster.splice(teams[i].roster.indexOf(this.props.player),1);
                }
            }
            selectedTeam.roster.push(this.props.player);
            this.props.player.teamLogoSrc = selectedTeam.logoSrc;
            this.props.player.teamName = selectedTeam.name;
            selectedTeam.manageFootballLineup();
            selectedTeam.secondChancePoints = this.state.secondChancePoints;
        }else{
            //do nothing
            this.setState({declined: true});
            selectedTeam.secondChancePoints = this.state.secondChancePoints;
        }

    }

    render() {

        

        return (
            <Background>
                <Card
                    containerStyle={{
                        width:'95%', backgroundColor:'rgba(255,255,255,0)', alignSelf:'center', borderColor:'rgba(0,0,0,0.9)'
                    }} >

                    <CachedImage style={{ width: 100, height:100, resizeMode:'contain',flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri= {selectedTeam.logoSrc } />
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{selectedTeam.name}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Second Chance Points: ' + this.props.secondChancePoints}</Text>
                    <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                    <CachedImage style={{ height: 125, width:125, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri= {this.props.player.faceSrc }/>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.props.player.positionString + ' #' + this.props.player.number + ' ' + this.props.player.name}</Text>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Interest: ' + this.state.interest}</Text>


                    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'Second Chance Points Remaining: ' + this.state.secondChancePoints}</Text>
                    <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={this.props.secondChancePoints}
                            value={1}
                            onValueChange={value => {this.manage(value)}}
                        />

                    
                    <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>
{
    this.state.declined ? 
    <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{'\"Sorry coach not interested, try again\"'}</Text>
    :null

}

<Button titleStyle={{ fontFamily: 'advent-pro' , color: 'black'}} buttonStyle={{ borderRadius:25, backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, marginBottom:10 }} title={"Second Chance"} onPress={() => {this.secondChance()}}></Button>


                </Card>



            </Background>
        )
    }
}

