import React from 'react';
import { View, ScrollView, Text, Modal, TouchableOpacity } from 'react-native';
import { Button, Divider, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';
let reserves=[];

export default class EditLineupMenu extends React.Component {


    componentWillUnmount(){
        //updates a previous scenes state
        if(this.props.updateState != null){
            this.props.updateState();
        }
    }


    setModalVisible(visible, player) {
        this.setState({ modalVisible: visible, modalPlayer: player });
      }


    state={
        selectedPlayer: null,
        selectedPlayer2: null,
        arr : '',
        pos : '',
        arr2 : '',
        pos2 : '',
        modalVisible: false,
        modalPlayer: null
    }

    selectPlayer(playa, arr , pos){
        if(this.state.selectedPlayer === playa){
            this.setState({selectedPlayer: null});
            return;
        }
        if(this.state.selectedPlayer2 === playa){
            this.setState({selectedPlayer2: null});
            return;
        }


        if(this.state.selectedPlayer == null){
            this.setState({selectedPlayer: playa, arr : arr, pos : pos});
        }else if(this.state.selectedPlayer2 == null){
            this.setState({selectedPlayer2: playa, arr2: arr, pos2 : pos})
        }

        const timer = setTimeout(
      function() {
        if(this.state.selectedPlayer!= null){
            if(this.state.selectedPlayer2!=null){
                this.swap();
            }
        }
          clearTimeout(timer);
      }
      .bind(this),
      20
  );
        
    }

    clearSelections(){
        this.setState({selectedPlayer: null, selectedPlayer2: null});
    }

    swap(){
        this.state.arr[this.state.pos] = this.state.selectedPlayer2;
        this.state.arr2[this.state.pos2] = this.state.selectedPlayer;
        
        this.setState({selectedPlayer: null, selectedPlayer2: null, arr:'', arr2:'', pos:'', pos2:''});
        // selectedTeam.manageUsage();
        Actions.refresh();
    }

    autoReorder(){
        selectedTeam.reorderLineup();
        Actions.refresh();
    }

    render() {
        return (
            <Background>

{
            this.state.modalPlayer != null ? (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: '95%',
                            height: '75%', backgroundColor: 'rgba(255,255,255,1)', alignSelf: 'center', 
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                                style={{ alignSelf: 'flex-end', padding: 15 }}>
                                <Icon name="close" ></Icon>
                            </TouchableOpacity>
                            <PlayerCardModal modalPlayer = {this.state.modalPlayer}></PlayerCardModal>
                           </View>
                    </View>
                </Modal>
            ) : null
        }

                <TeamHeader selectedTeam={selectedTeam}></TeamHeader>

                <View style={{ backgroundColor: 'rgba(255,255,255,0)'}}>
                    <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title="Auto Reorder Lineup" onPress={() => { this.autoReorder() }}></Button>
                </View>



                <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                    {
                    selectedTeam.qbs.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'QB ' + (i===0? 'STARTER' : 'BACKUP')}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.qbs, i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.rbs.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'RB ' + (i+1)}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.rbs , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.wrs.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'WR ' + (i+1)}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.wrs, i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.tes.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'TE ' + (i+1)}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.tes , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.ol.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'OL ' + (i+1)}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.ol, i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.dl.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'DL ' + (i+1)}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.dl , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.lbs.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc }
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'LB ' + (i+1)}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.lbs, i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                    {
                    selectedTeam.dbs.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'DB ' + (i+1)}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.dbs , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                       {
                    selectedTeam.ks.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'K ' + (i===0? 'STARTER' : 'BACKUP')}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.ks , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
                       {
                    selectedTeam.ps.map((player, i) => (
                            <ListItem 
                                title={player.positionString + ' #' + player.number + ' ' + player.name}
                                key={i} leftAvatar={ player.faceSrc } 
                                subtitle={'Rating: ' + player.rating}
                                rightTitle={'P ' + (i===0? 'STARTER' : 'BACKUP')}
                                color={this.state.selectedPlayer === player? 'rgba(53,115,209,.75)': this.state.selectedPlayer2 === player? 'rgba(53,115,209,.75)': null}
                                onPress={() => this.selectPlayer(player, selectedTeam.ps , i)}
                                onLongPress={() => this.setModalVisible(true, player)}

                                ></ListItem>
                    ))}
               
                    
                </ScrollView>

                

                


            </Background>





        )
    }
}