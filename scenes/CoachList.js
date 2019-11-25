import React from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Modal, Text, Dimensions } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { sortedRoster, collegeMode, releasePlayer, saveAsDraftClass, manageSaveName, selectedTeam, REDSHIRT_LOGO, checkRequirementsWithoutPlayer, displaySalary, teams } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
import CoachFilter from '../components/CoachFilter';
import { availableCoaches, canSignCoach } from '../data/Coach';
var {height, width} = Dimensions.get('window');



export default class CoachList extends React.Component {

    signCoach = (coach) =>{
      if(availableCoaches.includes(coach)){
        if(canSignCoach(coach, selectedTeam)){
          let temp = selectedTeam.coach;
          coach.teamLogoSrc = selectedTeam.logoSrc;
          if(temp != null){
            temp.teamLogoSrc = null;
            availableCoaches.push(temp);
          }
          selectedTeam.coach = coach;
          availableCoaches.splice(availableCoaches.indexOf(coach),1);
          this.props.update(Actions.pop);

        }else{
          Alert.alert('Not Enough Funds');
        }
        
      }
    }

    setCoachFilter(arr){
        const data = [];
        const empty = [];
    
        for(let i=0; i<arr.length; i++){
          data.push({
            type:'NORMAL',
            item: arr[i]
          })
        }
    
        this.setState({
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
            filteredList: arr
        });
      }


    // updateState = () =>{
    //     let data = [];

    //     if(this.state.filteredList != null){
    //         for(let i=0; i<this.state.filteredList.length; i++){
    //             data.push({
    //               type:'NORMAL',
    //               item: this.state.filteredList[i]
    //             })
    //           }
    //     }else{
    //     for(let i=0; i<this.props.selectedTeam.roster.length; i++){
    //         data.push({
    //           type:'NORMAL',
    //           item: sortedRoster(this.props.selectedTeam,'rating')[i]
    //         })
    //       }
    //     }
    //     this.setState({
    //       list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
    //       modalPlayer: null,
    //       modalVisible:false
    //     });
    // }



    constructor(props){
        super(props);
    
        const data = [];
        let arrayForFilter = [];
        this.setCoachFilter = this.setCoachFilter.bind(this);
        for(let i=0; i<teams.length; i++){
          if(teams[i].coach != null){
            arrayForFilter.push(teams[i].coach);
          }
        }

        arrayForFilter.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          }
          if (a.rating < b.rating) {
            return 1;
          } else {
            return 0;
          }
        });
        // for(let i=0; i<availableCoaches.length; i++){
        //   arrayForFilter.push(availableCoaches[i]);
        // }

            for(let i=0; i<arrayForFilter.length; i++){
              data.push({
                type:'NORMAL',
                item: arrayForFilter[i]
              })
            }
    
    
        this.state={
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
          arrayForFilter: arrayForFilter
        };
      
        this.layoutProvider = new LayoutProvider((i) => {
          return this.state.list.getDataForIndex(i).type
        }, (type, dim) => {
          switch(type){
            case 'NORMAL':
              dim.width = width;
              dim.height = 70;
              break;
            default :
              dim.width=0;
              dim.height=0;
              break
          }
        })
      }
    
      rowRenderer = (type,data) => {
            let coach = data.item;
                return(
                    <ListItem
                    title={coach.name}
                     leftAvatar={ coach.faceSrc } 
                     rightAvatar = {coach.teamLogoSrc}
                    subtitle={`Age: ${coach.age} Yrs: ${coach.years} Sal: $${displaySalary(coach.salary)} Ovr: ${coach.rating}\nOff: ${coach.offenseRating} Def: ${coach.defenseRating} Training: ${coach.training} Signing: ${coach.signingInterest}`}
                    rightTitle={' '}
                    onPress={() => {this.signCoach(coach)}}
                    ></ListItem>
                )
      }

    render() {
        return (
            <Background>

                <TeamHeader selectedTeam={selectedTeam} subText={'Coaching Budget: $' + displaySalary(selectedTeam.coachingBudget) }></TeamHeader>

<CoachFilter roster={this.state.arrayForFilter} setCoachFilter={this.setCoachFilter}></CoachFilter>

<RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>

            </Background>


        )
    }
}
