import { teams, tradeValueCalculation } from "./script"


export const generateNewsStories = () => {
    let stories = [];

    stories.push(generatePreseasonTopTeamStory());
    stories.push(generateTopFreeAgentNewsStory());
    stories.push(generatePreseasonTopPlayerStory());
    stories.push(generatePreseasonRandomPlayerStory());
    stories.push(generatePreseasonBigGameStory())

    return stories;
}


export const getAllPlayers = () => {
    let allPlayers = [];
    for(let i=0; i<teams.length; i++){
        for(let j=0; j<teams[i].roster.length; j++){
            let player = teams[i].roster[j];
            allPlayers.push(player);
        }
    }

    allPlayers.sort(function(a,b){
        if(tradeValueCalculation(a) < tradeValueCalculation(b)){
            return 1;
        }
        if(tradeValueCalculation(a) > tradeValueCalculation(b)){
            return -1;
        }

        return 0;
    })
    return allPlayers;
}


export const generateTopFreeAgentNewsStory = () => {
    //FREE AGENCY 

    let allPlayers = getAllPlayers();

    let expiring = allPlayers.filter(player => player.years < 2);

    let selectedPlayer = expiring[Math.floor(Math.random()*5)];
    let titles = [
        `Where will ${selectedPlayer.name} land?`,
        `The hunt to sign ${selectedPlayer.name}`,
        `Who will sign ${selectedPlayer.name}?`,
        `The chase for ${selectedPlayer.name}`,
    ]

    let stories = [
        [`The ${selectedPlayer.teamName} star ${selectedPlayer.positionString} is expected to land a big salary this offseason.`]
    ]

    let story = {
        title: titles[Math.floor(Math.random()*titles.length)],
        story: stories[Math.floor(Math.random()*stories.length)],
        image1: selectedPlayer.faceSrc,
        image2: selectedPlayer.teamLogoSrc
    }

    return story;
}


let generatePreseasonTopTeamStory = () => {
    teams.sort(function(a,b){
        if(a.rating < b.rating){
            return 1;
        }
        if(a.rating > b.rating){
            return -1;
        }

        return 0;
    })
    let rand = Math.floor(Math.random()*3)
    let team = teams[rand];

    let titles = [
        `The ${team.name} are favored to come out on top this year`,
        `Why the ${team.name} are leading the pack out of the gates`,
        `What to expect from the ${team.name} this year`,
        `The ${team.name} are championship favorites`,
        `Why the ${team.name} are championship favorites`,
    ]

    let stories = [
        `Why our expert makers our picking the ${team.name} to come out on top this year`
    ]

    
    let story = {
        title: titles[Math.floor(Math.random()*titles.length)],
        story: stories[Math.floor(Math.random()*stories.length)],
        image1: team.logoSrc
    }

    return story;
}

let generatePreseasonTopPlayerStory = () => {
    let allPlayers = getAllPlayers();


    let player = allPlayers[0]

    let titles = [
        `Can ${player.name} lead the ${player.teamName} to greatness?`,
        `Looking at ${player.name}'s upcoming season`,
    ]

    let stories = [
        `Fans around the league are expecting a lot from ${player.name} this upcoming season`
    ]

    let story = {
        title: titles[Math.floor(Math.random()*titles.length)],
        story: stories[Math.floor(Math.random()*stories.length)],
        image1: player.faceSrc,
        image2: player.teamLogoSrc
    }

    return story;
}

let generatePreseasonRandomPlayerStory = () => {
    let allPlayers = getAllPlayers();


    let player = allPlayers[Math.floor(Math.random()*allPlayers.length)]

    let titles = [
        `After his arrest in the offseason ${player.positionString} ${player.name} is looking to make a change`,
        `Struggling through the loss of his mother ${player.positionString} ${player.name} is looking to honor her this upcoming season`,
    ]

    let stories = [
        `${player.name} has spoken with reporters on what fans should expect from him this season`
    ]

    let story = {
        title: titles[Math.floor(Math.random()*titles.length)],
        story: stories[Math.floor(Math.random()*stories.length)],
        image1: player.faceSrc,
        image2: player.teamLogoSrc
    }

    return story;
}

let generatePreseasonBigGameStory = () => {
    let games = [];
    let teamsIn = []

    teams.forEach(team => {
        if(!teamsIn.includes(team)){
            teamsIn.push(team);
            teamsIn.push(team.schedule[0])
            let hype = (team.rating + team.schedule[0].rating) / 2
    
            let game = {
                team1: team,
                team2: team.schedule[0],
                hype
            }
    
            games.push(game)
        }
    })


    games.sort(function(a,b){
        if(a.hype < b.hype){
            return 1;
        }
        if(a.hype > b.hype){
            return -1;
        }

        return 0;
    })

    let game = games[0];



    let titles = [
        `Looking forward to this weeks matchup`
    ]

    let stories = [
        `The ${game.team1.name} face off against the ${game.team2.name}`
    ]

    let story = {
        title: titles[Math.floor(Math.random()*titles.length)],
        story: stories[Math.floor(Math.random()*stories.length)],
        image1: game.team1.logoSrc,
        image2: game.team2.logoSrc
    }

    return story;

}

