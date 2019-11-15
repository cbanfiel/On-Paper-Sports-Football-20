const portraits = require('./Portraits.json');
const draftData = require("./JSON/DraftData.json");

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







        this.rating = Math.round((this.offenseRating + this.defenseRating + this.signingInterest + this.training + this.trading) / 5);
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