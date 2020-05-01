import { teams } from "./script"

export const generateNewsStories=() => {

    let newsStories = [];

    //FREE AGENCY 
    let allPlayers = [];
    for(let i=0; i<teams.length; i++){
        for(let j=0; j<teams[i].roster.length; j++){
            let player = teams[i].roster[j];
            allPlayers.push(player);
        }
    }

    allPlayers.sort(function(a,b){
        if(a.rating < b.rating){
            return 1;
        }
        if(a.rating > b.rating){
            return -1;
        }

        return 0;
    })

    let expiring = allPlayers.filter(player => player.years < 2);

    let selectedPlayer = expiring[Math.floor(Math.random()*5)];
    let freeAgencyTitles = [
        `Where will ${selectedPlayer.name} land?`,
        `The hunt to sign ${selectedPlayer.name}`,
        `Who will sign ${selectedPlayer.name}?`,
        `The chase for ${selectedPlayer.name}`,
    ]

    let freeAgencyStory = [
        [`The ${selectedPlayer.teamName} star is expected to land a big salary this offseason.`]
    ]

    let story = {
        title: freeAgencyTitles[Math.floor(Math.random()*freeAgencyTitles.length)],
        story: freeAgencyStory[Math.floor(Math.random()*freeAgencyStory.length)],
        image1: selectedPlayer.faceSrc,
        image2: selectedPlayer.teamLogoSrc
    }

    return story;
}

