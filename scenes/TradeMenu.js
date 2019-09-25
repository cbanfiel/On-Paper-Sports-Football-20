import React from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Button, Card, Icon, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { selectedTeam, selectedTeam2, trade, sortedRoster, displaySalary, CAPROOM, setPowerRankings, getDraftPickProjectedPick, inDraft, teams, returnStatsView, POS_QB_REQUIREMENTS, POS_HB_REQUIREMENTS, POS_WR_REQUIREMENTS, POS_TE_REQUIREMENTS, POS_OL_REQUIREMENTS, POS_DL_REQUIREMENTS, POS_LB_REQUIREMENTS, POS_DB_REQUIREMENTS, POS_K_REQUIREMENTS, POS_P_REQUIREMENTS } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';
import { LayoutProvider, DataProvider, RecyclerListView } from 'recyclerlistview';
var {height, width} = Dimensions.get('window');
import PositionFilter from '../components/PositionFilter';



export default class TradeMenu extends React.Component {

    setPositionFilter(arr, tm){
        const data = [];
        const empty = [];
    
        for(let i=0; i<arr.length; i++){
          data.push({
            type:'NORMAL',
            item: arr[i]
          })
        }
    
        if(tm === selectedTeam){
            this.setState({
              list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
              filteredList: arr
            });
        }else{
            this.setState({
                listT2: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
                filteredListT2: arr
              });
        }
        
      }


    constructor() {
        super();

        const data = [];
        const dataT2 = [];
        let arrayForFilter = [];
        let arrayForFilterT2 = [];
        this.setPositionFilter = this.setPositionFilter.bind(this);

            arrayForFilter = selectedTeam.roster;
            for(let i=0; i<selectedTeam.roster.length; i++){
                data.push({
                  type:'NORMAL',
                  item: sortedRoster(selectedTeam,'rating')[i]
                })
            }

            // for(let i=0; i<selectedTeam.draftPicks.length; i++){
            //     data.push({
            //       type:'NORMAL',
            //       item: selectedTeam.draftPicks[i]
            //     })
            //     arrayForFilter.push(selectedTeam.draftPicks[i]);
            // }

            arrayForFilterT2 = selectedTeam2.roster;
            for(let i=0; i<selectedTeam2.roster.length; i++){
                dataT2.push({
                  type:'NORMAL',
                  item: sortedRoster(selectedTeam2,'rating')[i]
                })
            }

            // for(let i=0; i<selectedTeam.draftPicks.length; i++){
            //     dataT2.push({
            //       type:'NORMAL',
            //       item: selectedTeam2.draftPicks[i]
            //     })
            //     arrayForFilterT2.push(selectedTeam2.draftPicks[i]);
            // }

        this.state = {
            t1Offers: [],
            t2Offers: [],
            declined: '',
            t1salary: selectedTeam.salary,
            t2salary: selectedTeam2.salary,
            modalVisible: false,
            modalPlayer: null,
            arrayForFilter: arrayForFilter,
            arrayForFilterT2: arrayForFilterT2,
            list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
            listT2: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(dataT2)
        }

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

          this.layoutProvider2 = new LayoutProvider((i) => {
            return this.state.listT2.getDataForIndex(i).type
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
        let player = data.item;
        if(player.isPick){
            let pick = player;
            return(
                <ListItem onPress={() => { this.addToTrade(pick, selectedTeam) }}
                title={pick.originalTeam + ' Draft Pick'}
                subtitle={'Round: ' + pick.round + ' Projected Pick: ' + getDraftPickProjectedPick(pick)}
                bottomDivider={true}
                leftAvatar={'https://www.2kratings.com/wp-content/uploads/NBA-Player.png'}
                rightTitle={this.state.t1Offers.includes(pick) ? "SELECTED" : null}
    
            ></ListItem>
            )
        }
        return(
            <ListItem onPress={() => { this.addToTrade(player, selectedTeam) }}
            title={player.positionString + ' #' + player.number + ' ' + player.name}
            leftAvatar={player.faceSrc} subtitle={'Rating: ' + player.rating}
            bottomDivider={true}
            rightSubtitle={'$' + displaySalary(player.salary)}
            rightTitle={this.state.t1Offers.includes(player) ? "SELECTED" : null}
            onLongPress={() => this.setModalVisible(true, player)}

        ></ListItem>
        );

    }


    rowRendererT2 = (type,data) => {
        let player = data.item;
        if(player.isPick){
            let pick = player;
            return(
                <ListItem onPress={() => { this.addToTrade(pick, selectedTeam2) }}
                title={pick.originalTeam + ' Draft Pick'}
                subtitle={'Round: ' + pick.round + ' Projected Pick: ' + getDraftPickProjectedPick(pick)}
                bottomDivider={true}
                leftAvatar={'https://www.2kratings.com/wp-content/uploads/NBA-Player.png'}
                rightTitle={this.state.t2Offers.includes(pick) ? "SELECTED" : null}
    
            ></ListItem>
            )
        }
        return(
            <ListItem onPress={() => { this.addToTrade(player, selectedTeam2) }}
            title={player.positionString + ' #' + player.number + ' ' + player.name}
            leftAvatar={player.faceSrc} subtitle={'Rating: ' + player.rating}
            bottomDivider={true}
            rightSubtitle={'$' + displaySalary(player.salary)}
            rightTitle={this.state.t2Offers.includes(player) ? "SELECTED" : null}
            onLongPress={() => this.setModalVisible(true, player)}

        ></ListItem>
        );

    }


    setModalVisible(visible, player) {
        this.setState({ modalVisible: visible, modalPlayer: player });
    }


    addToTrade(player, team) {
        this.setState({ declined: '' });

        if (team === selectedTeam) {
            let offer = this.state.t1Offers;
            if (!offer.includes(player)) {
                if (offer.length >= 5) {
                    return;
                }

                offer.push(player);
                this.setState({ t1salary: this.state.t1salary -= player.salary, t2salary: this.state.t2salary += player.salary });
            } else {
                offer.splice(offer.indexOf(player), 1);
                this.setState({ t1salary: this.state.t1salary += player.salary, t2salary: this.state.t2salary -= player.salary });

            }
            this.setState({ t1Offers: offer });
        } else {
            let offer = this.state.t2Offers;
            if (!offer.includes(player)) {
                if (offer.length >= 5) {
                    return;
                }

                offer.push(player);
                this.setState({ t2salary: this.state.t2salary -= player.salary, t1salary: this.state.t1salary += player.salary });

            } else {
                offer.splice(offer.indexOf(player), 1);
                this.setState({ t2salary: this.state.t2salary += player.salary, t1salary: this.state.t1salary -= player.salary });
            }
            this.setState({ t2Offers: offer });
        }

        const data = [];

        if(selectedTeam === team){
            if(this.state.filteredList!=null){
                for(let i=0; i<this.state.filteredList.length; i++){
                    data.push({
                      type:'NORMAL',
                      item: this.state.filteredList[i]
                    })
                }
            }else{
                for(let i=0; i<team.roster.length; i++){
                    data.push({
                      type:'NORMAL',
                      item: sortedRoster(team,'rating')[i]
                    })
                }
        
                // for(let i=0; i<team.draftPicks.length; i++){
                //     data.push({
                //       type:'NORMAL',
                //       item: team.draftPicks[i]
                //     })
                // }
            }
    
                this.setState({
                  list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
                });

        }else{
            if(this.state.filteredListT2!=null){
                for(let i=0; i<this.state.filteredListT2.length; i++){
                    data.push({
                      type:'NORMAL',
                      item: this.state.filteredListT2[i]
                    })
                }
            }else{
                for(let i=0; i<team.roster.length; i++){
                    data.push({
                      type:'NORMAL',
                      item: sortedRoster(team,'rating')[i]
                    })
                }
        
                // for(let i=0; i<team.draftPicks.length; i++){
                //     data.push({
                //       type:'NORMAL',
                //       item: team.draftPicks[i]
                //     })
                // }
            }

            this.setState({
                listT2: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data),
              });
        }
    }

    offer() {

        t1PlayerAmount = 0;
        t2PlayerAmount = 0;
        for (let i = 0; i < this.state.t1Offers.length; i++) {
            if (!this.state.t1Offers[i].isPick) {
                t1PlayerAmount++;
            }
        }
        for (let i = 0; i < this.state.t2Offers.length; i++) {
            if (!this.state.t2Offers[i].isPick) {
                t2PlayerAmount++;
            }
        }
        let t1Qbs = selectedTeam.qbs.length;
        let t1Rbs = selectedTeam.rbs.length;
        let t1Tes = selectedTeam.tes.length;
        let t1Wrs = selectedTeam.wrs.length;
        let t1Ol = selectedTeam.ol.length;
        let t1Dl = selectedTeam.dl.length;
        let t1Lb = selectedTeam.lbs.length;
        let t1Db = selectedTeam.dbs.length;
        let t1K = selectedTeam.ks.length;
        let t1P = selectedTeam.ps.length;

        let t2Qbs = selectedTeam2.qbs.length;
        let t2Rbs = selectedTeam2.rbs.length;
        let t2Tes = selectedTeam2.tes.length;
        let t2Wrs = selectedTeam2.wrs.length;
        let t2Ol = selectedTeam2.ol.length;
        let t2Dl = selectedTeam2.dl.length;
        let t2Lb = selectedTeam2.lbs.length;
        let t2Db = selectedTeam2.dbs.length;
        let t2K = selectedTeam2.ks.length;
        let t2P = selectedTeam2.ps.length;

        let t1CanTrade = false;
        let t2CanTrade = false;
  
        for(let i=0; i<this.state.t1Offers.length; i++){
            let ply = this.state.t1Offers[i];
            if(ply.isPick){
                //draft pick
            }
            else if(ply.position === 0){
                //forward
                t1Qbs--;
                t2Qbs++;
            }else if(ply.position === 1){
                t1Rbs--;
                t2Rbs++;
            }else if(ply.position === 3){
                t1Wrs--;
                t2Wrs++;
            }
            else if(ply.position === 4){
                t1Tes--;
                t2Tes++;
            }
            else if(ply.position >= 5 && ply.position <=9){
                t1Ol--;
                t2Ol++;
            }
            else if(ply.position >= 10 && ply.position <=12){
                t1Dl--;
                t2Dl++;
            }
            else if(ply.position >= 13 && ply.position <=15){
                t1Lb--;
                t2Lb++;
            }
            else if(ply.position >= 16 && ply.position <=18){
                t1Db--;
                t2Db++;
            }
            else if(ply.position === 19){
                t1K--;
                t2K++;
            }
            else if(ply.position === 20){
                t1P--;
                t2P++;
            }
        }

        for(let i=0; i<this.state.t2Offers.length; i++){
            let ply = this.state.t2Offers[i];
            if(ply.isPick){
                //draft pick
            }
            else if(ply.position === 0){
                //forward
                t2Qbs--;
                t1Qbs++;
            }else if(ply.position === 1){
                t2Rbs--;
                t1Rbs++;
            }else if(ply.position === 3){
                t2Wrs--;
                t1Wrs++;
            }
            else if(ply.position === 4){
                t2Tes--;
                t1Tes++;
            }
            else if(ply.position >= 5 && ply.position <=9){
                t2Ol--;
                t1Ol++;
            }
            else if(ply.position >= 10 && ply.position <=12){
                t2Dl--;
                t1Dl++;
            }
            else if(ply.position >= 13 && ply.position <=15){
                t2Lb--;
                t1Lb++;
            }
            else if(ply.position >= 16 && ply.position <=18){
                t2Db--;
                t1Db++;
            }
            else if(ply.position === 19){
                t2K--;
                t1K++;
            }
            else if(ply.position === 20){
                t2P--;
                t1P++;
            }
        }


        if(t1Qbs >= POS_QB_REQUIREMENTS && 
            t1Rbs>=POS_HB_REQUIREMENTS && 
            t1Wrs>= POS_WR_REQUIREMENTS &&
            t1Tes>= POS_TE_REQUIREMENTS &&
            t1Ol>= POS_OL_REQUIREMENTS &&
            t1Dl>= POS_DL_REQUIREMENTS&&
            t1Lb>= POS_LB_REQUIREMENTS &&
            t1Db>= POS_DB_REQUIREMENTS &&
            t1K>= POS_K_REQUIREMENTS &&
            t1P>= POS_P_REQUIREMENTS
            ){
            t1CanTrade = true;
        }


        if(t2Qbs >= POS_QB_REQUIREMENTS && 
            t2Rbs>=POS_HB_REQUIREMENTS && 
            t2Wrs>= POS_WR_REQUIREMENTS &&
            t2Tes>= POS_TE_REQUIREMENTS &&
            t2Ol>= POS_OL_REQUIREMENTS &&
            t2Dl>= POS_DL_REQUIREMENTS&&
            t2Lb>= POS_LB_REQUIREMENTS &&
            t2Db>= POS_DB_REQUIREMENTS &&
            t2K>= POS_K_REQUIREMENTS &&
            t2P>= POS_P_REQUIREMENTS
            ){
            t2CanTrade = true;
        }


        //Check for requirements DOES NOT HAPPEN IN OFFSEASON
        if (this.props.requirementsOff != true) {
            if (!t1CanTrade) {
                Alert.alert('Roster Requirements Not Met', 'This move will set the ' + selectedTeam.name + ' under the roster requirements, please sign more players before making this move');
                return;
            }
            if (!t2CanTrade) {
                Alert.alert('Roster Requirements Not Met', 'This move will set the ' + selectedTeam2.name + ' under the roster requirements, please sign more players before making this move');
                return;
            }
        }



        if (!trade(selectedTeam, selectedTeam2, this.state.t1Offers, this.state.t2Offers, this.props.isForced)) {
            this.state.declined = true;

        } else {
            this.setState({ t1Offers: [], t2Offers: [], declined: false })
            if (this.props.updateScene != null) {
                this.props.updateScene();
            }

            Actions.pop();
        }
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

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri={selectedTeam.logoSrc} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{'Cap Space: $' + displaySalary((this.state.t1salary - CAPROOM) * -1)}</Text>

                </View>
                {

                    this.state.declined === true ? (

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ padding: 15, borderRadius: 0, borderBottomWidth: 1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)' }} title="Offer Declined" disabled disabledTitleStyle={{ color: 'black' }} disabledStyle={{ backgroundColor: 'rgba(255,0,0,0.75)' }}></Button>


                    ) :
                        this.state.declined === false ? (
                            <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ padding: 15, borderRadius: 0, borderBottomWidth: 1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)' }} title="Offer Accepted" disabled disabledTitleStyle={{ color: 'black' }} disabledStyle={{ backgroundColor: 'rgba(10,200,60,0.75)' }}></Button>

                        ) :
                            <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ padding: 15, borderRadius: 0, borderBottomWidth: 1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)' }} title="Offer Trade" onPress={() => { this.offer(), Actions.refresh() }}></Button>

                }
                <PositionFilter roster={this.state.arrayForFilter} setPositionFilter={this.setPositionFilter} draftPicks={selectedTeam.draftPicks} team={selectedTeam}></PositionFilter>

                <RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRenderer} dataProvider={this.state.list} layoutProvider={this.layoutProvider} forceNonDeterministicRendering={false}/>


                {       //JUST CHECKING WHAT MENU TO GO BACK TO SEASON OR ROSTER
                    //         this.props.back==='rostermenu' ? (
                    // <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title="Back To Rosters" onPress={() => { Actions.rostermenu() }}></Button>
                    //         ) :
                    // <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , borderRadius:0, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)'}} title="Back To Season" onPress={() => { Actions.seasonmenu() }}></Button>

                }
                {/* <ScrollView contentContainerStyle={{paddingBottom: 20}}> */}

                    {/* {sortedRoster(selectedTeam, 'rating').map((player, i) => (
                        <ListItem onPress={() => { this.addToTrade(player, selectedTeam) }}
                            title={player.positionString + ' #' + player.number + ' ' + player.name}
                            key={i} leftAvatar={player.faceSrc} subtitle={'Rating: ' + player.rating}
                            bottomDivider={true}
                            rightSubtitle={'$' + displaySalary(player.salary)}
                            rightTitle={this.state.t1Offers.includes(player) ? "SELECTED" : null}
                            onLongPress={() => this.setModalVisible(true, player)}

                        ></ListItem>
                    ))
                    } */}

                    {/* {
                        selectedTeam.draftPicks.map((pick, i) => (
                        <ListItem onPress={() => { this.addToTrade(pick, selectedTeam) }}
                            title={pick.originalTeam + ' Draft Pick'}
                            key={i} subtitle={'Round: ' + pick.round + ' Projected Pick: ' + getDraftPickProjectedPick(pick)}
                            bottomDivider={true}
                            rightTitle={this.state.t1Offers.includes(pick) ? "SELECTED" : null}

                        ></ListItem>
                    ))
                    } */}

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <CachedImage
                        style={{ resizeMode: 'contain', height: 50 }}
                        uri={selectedTeam2.logoSrc} />
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{selectedTeam2.name}</Text>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20 }}>{'Cap Space: $' + displaySalary((this.state.t2salary - CAPROOM) * -1)}</Text>

                </View>
                <PositionFilter roster={this.state.arrayForFilterT2} setPositionFilter={this.setPositionFilter} draftPicks={selectedTeam2.draftPicks} team={selectedTeam2}></PositionFilter>

                <RecyclerListView style={{flex:1, padding: 0, margin: 0}} rowRenderer={this.rowRendererT2} dataProvider={this.state.listT2} layoutProvider={this.layoutProvider2} forceNonDeterministicRendering={false}/>

            </Background>
        )
    }
}