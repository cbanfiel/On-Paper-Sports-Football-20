const portraits = require('./Portraits.json');
const draftData = require("./JSON/DraftData.json");

export let coachRetirements = [];
export let availableCoaches = [];

export class Coach {
    constructor() {
        let firstName = draftData[Math.floor(Math.random() * draftData.length)].firstname;
        let lastName = draftData[Math.floor(Math.random() * draftData.length)].lastname;
        this.offenseRating = Math.floor(Math.random() * 60) + 40;
        this.defenseRating = Math.floor(Math.random() * 60) + 40;
        this.signingInterest = Math.floor(Math.random() * 60) + 40;
        this.training = Math.floor(Math.random() * 60) + 40;
        this.trading = Math.floor(Math.random() * 60) + 40;
        this.name = firstName + " " + lastName;
        this.faceSrc = portraits[Math.floor(Math.random() * portraits.length)];
        this.teamLogoSrc;
        this.years = Math.round(Math.random() * 4) + 1;
        this.salary = (Math.round(Math.random() * 9) + 1) * 1000000;
        this.age = (Math.round(Math.random() * 20) + 45);
        //Coach Sliders
        this.offVsDefFocus = Math.round(Math.random() * 4) - 2;
        this.offenseType = Math.floor(Math.random() * 4);
        this.runPlays = [];
        this.passPlays = [];
        this.defenseType = Math.floor(Math.random() * 3);
        //run pref is lower number
        //rand between 40-60
        this.runVsPass = (Math.round(Math.random() * 10)) + 55;
        //limit between -3 and 3
        this.offTempo = (Math.round(Math.random() * 6)) - 3;
        this.rating = 75;
        this.calculateRating();
    }

    calculateRating() {
        if(this.offenseRating>99){
            this.offenseRating = 99;
        }
        if(this.offenseRating<40){
            this.offenseRating = 40;
        }
        if(this.defenseRating>99){
            this.defenseRating = 99;
        }
        if(this.defenseRating<40){
            this.defenseRating = 40;
        }
        if(this.training>99){
            this.training = 99;
        }
        if(this.training<40){
            this.training = 40;
        }
        if(this.trading>99){
            this.trading = 99;
        }
        if(this.trading<40){
            this.trading = 40;
        }
        if(this.signingInterest>99){
            this.signingInterest = 99;
        }
        if(this.signingInterest<40){
            this.signingInterest = 40;
        }
        this.rating = Math.round((this.offenseRating + this.defenseRating + this.signingInterest + this.training) / 4);
    }

    generateRatings(rating) {
        let diff = rating - this.rating;
        let change = 1;
        if(diff < 0){
            change = -1;
        }
        while(this.rating != rating){
            this.offenseRating += change;
            this.defenseRating += change;
            this.trading += change;
            this.training += change;
            this.signingInterest += change;
            this.calculateRating();
            if(change > 0 && this.rating >= rating){
                return;
            }
            if(change < 0 && this.rating <= rating){
                return;
            }

        }


    }
}

export function coachSetup(teams){
    generateFreeAgentCoaches(teams);
}

export function coachOffseasonSetup(teams){

    coachRetirements = [];

    for(let i=0; i<teams.length; i++){
        coachProgression(teams[i].coach);
        if(didCoachRetire(teams[i].coach) || checkCoachContractExpiration(teams[i].coach)){
            teams[i].coach = null;
        }
    }

    for(let i=0; i<availableCoaches.length; i++){
        //NO PROGRESSION FOR FA COACHES!
        if(didCoachRetire(availableCoaches[i])){
            availableCoaches.splice(availableCoaches.indexOf(availableCoaches[i],1));
            availableCoaches.push(new Coach());
        }
    }

    if(availableCoaches.length < (teams.length/2)){
        generateFreeAgentCoaches(teams);
    }
}

export function coachSigning(teams){
    for(let i=0; i<teams.length; i++){
        if(teams[i].coach == null){
            let index = Math.floor(Math.random()*availableCoaches.length);
            // let years = Math.round(Math.random()*5)+1;
            let coach = availableCoaches[index];
            console.log(coach.name + " signs with the " + teams[i].name);
            // coach.years = years;
            teams[i].coach = coach;
            availableCoaches.splice(index, 1);
        }
    }
}

const coachProgression = (coach) => {
    let growth = scaleBetween(coach.age, 0,4,70,40);
    coach.offenseRating += Math.round(Math.random()*growth);
    coach.defenseRating += Math.round(Math.random()*growth);
    coach.trading += Math.round(Math.random()*growth);
    coach.training += Math.round(Math.random()*growth);
    coach.signingInterest += Math.round(Math.random()*growth);
    coach.calculateRating();
}

const coachSalaryCalculation = (coach) =>{
    return Math.round(scaleBetween(coach.rating, 700000,10000000,40,99));
}

function generateFreeAgentCoaches(teams){
    for(let i=0; i<teams.length/2; i++){
      let coach = new Coach();
      let rating = 40;
      rating += Math.round(Math.random()*30);
      coach.generateRatings(rating);
      availableCoaches.push(coach);
    }
  }


const didCoachRetire = (coach) =>{
    coach.age++;
    if(coach.age >= 59){
        let retirementChance = scaleBetween(coach.age, 10, 70, 59,80);
        if(retirementChance > Math.random()*100){
            coachRetirements.push(coach);
        }
    }
}

const releaseCoach = (coach) =>{
    coach.teamLogoSrc = null;
    coach.years = Math.floor(Math.random()*4) + 1;
    coach.salary = coachSalaryCalculation(coach);
    availableCoaches.push(coach);
}

export const coachSigningInterest = (coach, team) => {
    return true;
}

const checkCoachContractExpiration = (coach) => {
    coach.years--;
    if(coach.years < 1){
        releaseCoach(coach);
        return true;
    }else{
        return false
    }
}

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (
      ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
    );
  }