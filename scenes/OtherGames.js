import React from "react";
import { ScrollView } from "react-native";
import Background from "../components/background";
import Matchup from "../components/Matchup";
import { teams } from "../data/script";

const OtherGames = ({ day }) => {

    getGames = () => {
        teams.sort(function(a, b) {
            if (a.seed > b.seed) {
                return 1;
            }
            if (a.seed < b.seed) {
                return -1;
            }
            return 0;
        })

        let games = [];
        let teamsDone = []

        teams.map((team, i) => {
            if(!teamsDone.includes(team)){
                games.push({
                    team: team,
                    opp: team.schedule[day-1]
                })
                teamsDone.push(team);
                teamsDone.push(team.schedule[day-1]);
            }
        })

        return games;
    }


  return (
    <Background>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {getGames().map((game, i) => (
            <Matchup
              key={i}
              leftImage={game.team.logoSrc}
              rightImage={game.team.schedule[day-1].logoSrc}
              leftText={game.team.played[day-1].userScore}
              rightText={game.team.played[day-1].oppScore}
            />
        )
        )}
      </ScrollView>
    </Background>
  );
};

export default OtherGames;
