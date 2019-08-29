var teamsData = require("./JSON/Teams.json");
var playerData = require("./JSON/Players.json");
var freeAgents = require("./JSON/FreeAgents.json");

var draftData = require("./JSON/DraftData.json");

import * as FileSystem from "expo-file-system";

//for draft trades
export let inDraft = false;

export function setInDraft() {
  inDraft = true;
}

export let franchise;
export let selectedTeam;
export let home;
export let away;
const POS_QB = 0;
const POS_HB = 1;
const POS_FB = 2;
const POS_WR = 3;
const POS_TE = 4;
const POS_LT = 5;
const POS_LG = 6;
const POS_C = 7;
const POS_RG = 8;
const POS_RT = 9;
const POS_LE = 10;
const POS_RE = 11;
const POS_DT = 12;
const POS_LOLB = 13;
const POS_MLB = 14;
const POS_ROLB = 15;
const POS_CB = 16;
const POS_FS = 17;
const POS_SS = 18;
const POS_K = 19;
const POS_P = 20;

//OFFENSE TYPES
const OFF_PRO = 0;
//3 wrs 1TE 1RB
const OFF_SPREAD = 1;
//4wrs 1RB
const OFF_PISTOL = 2;
//3 wrs 1TE 1RB
const OFF_OPTION = 3;
//4wrs 1rb

//DEFENSE TYEPS
const DEF_43 = 0;
const DEF_34 = 1;
const DEF_335 = 2;
const DEF_425 = 3;
const DEF_52 = 4;




const rosterSize = 70;
export const CAPROOM = 190000000;
const VETERANSMINIMUM = 900000;

const POS_QB_REQUIREMENTS = 2;
const POS_HB_REQUIREMENTS = 3;
const POS_FB_REQUIREMENTS = 0;
const POS_WR_REQUIREMENTS = 5;
const POS_TE_REQUIREMENTS = 2;
const POS_OL_REQUIREMENTS = 5;
const POS_DL_REQUIREMENTS = 5;
const POS_LB_REQUIREMENTS = 3;
const POS_DB_REQUIREMENTS = 5;
const POS_K_REQUIREMENTS = 1;
const POS_P_REQUIREMENTS = 1;


//sliders
export let twoPointPercentageLow = 20;
export let twoPointPercentageHigh = 73;
export let threePointPercentageLow = 25;
export let threePointPercentageHigh = 55;
export let defenseLow = 0;
export let defenseHigh = 16;
export let secondsOffClock = 16;
export let tradeThreshold = 0.3;
export let reboundSlider = 50;
export let trainingPointsAvailable = 2;

//hockey sliders
export let defenseSlider = 12;
export let offenseSlider = 6;
export let passSkillFactorSlider = 7;
export let shotSkillFactorSlider = 7;
export let goalieAdjustmentSlider = 3;

//Seconds Off Clock Random Factor
let secondsOffClockRandomFactor = 6;
export let gamesPerSeason = 12;
export let playoffSeeds = 4;
export let seriesWinCount = 1;
export let conferencesOn = false;
export let collegeMode = true;
export let difficulty = -1;
//************************************ */

let autoSign = true;

export function setAutoSign(bool) {
  autoSign = bool;
}

export function resetSliders() {
  tradeThreshold = 0.3;
  trainingPointsAvailable = 2;
  defenseSlider = 12;
  offenseSlider = 6;
  passSkillFactorSlider = 7;
  shotSkillFactorSlider = 7;
  goalieAdjustmentSlider = 3;
}

export function collegeSliderPreset() {
  twoPointPercentageLow = 20;
  twoPointPercentageHigh = 73;
  threePointPercentageLow = 25;
  threePointPercentageHigh = 55;
  defenseLow = 0;
  defenseHigh = 16;
  secondsOffClock = 24;
  gamesPerSeason = 38;
  seriesWinCount = 1;
  conferencesOn = false;
  collegeMode = true;
  difficulty = -1;
  tradeThreshold = 0.3;
  reboundSlider = 50;
  trainingPointsAvailable = 2;

  if (teams.length >= 64) {
    playoffSeeds = 64;
  } else if (teams.length >= 32) {
    playoffSeeds = 32;
  } else if (teams.length >= 16) {
    playoffSeeds = 16;
  } else if (teams.length >= 8) {
    playoffSeeds = 8;
  } else if (teams.length >= 4) {
    playoffSeeds = 4;
  } else if (teams.length >= 2) {
    playoffSeeds = 2;
  } else if (teams.length >= 1) {
    playoffSeeds = 1;
  }
}

export function setSliders(
  def,
  off,
  pass,
  shot,
  goalies,
  diff,
  tradeDiff,
  tptsavail
) {
  defenseSlider = def;
  offenseSlider = off;
  passSkillFactorSlider = pass;
  shotSkillFactorSlider = shot;
  goalieAdjustmentSlider = goalies;
  difficulty = diff;
  tradeThreshold = tradeDiff;
  trainingPointsAvailable = tptsavail;
}

export function setFranchiseSliders(gps, ps, swc, confOn, collm, skipNew) {
  gamesPerSeason = gps;
  playoffSeeds = ps;
  seriesWinCount = swc;
  conferencesOn = confOn;
  collegeMode = collm;

  if (skipNew === true) {
    console.log("Load Franchise Save");
    return;
  }
  franchise = new Franchise();
}

export let refreshOff;

export function setRefreshOff(ans) {
  refreshOff = ans;
}

class Player {
  constructor(player) {
    this.name = player.name;
    this.position = player.position;
    this.positionString;
    this.getPositionString();
    this.faceSrc = player.faceSrc;
    this.teamLogoSrc;
    this.teamName;
    this.usage = 0;
    this.reboundUsage = 0;
    this.number = player.number;
    this.height = player.height;
    this.years = player.years;
    this.age = player.age;
    this.salary = player.salary;
    this.previousSeasonsStats = [];
    this.role = 0;
    this.tempRole = 0;
    this.trained = false;

    //rotation
    this.minutes = 0;
    this.minutesRemaining = 0;
    this.minutesPlayed = 0;
    this.minutesPlayedThisQuarter = 0;

    //game stats
    this.points = 0;
    this.rebounds = 0;
    this.offRebounds = 0;
    this.twoPointersAtt = 0;
    this.twoPointersMade = 0;
    this.threePointersAtt = 0;
    this.threePointersMade = 0;
    this.freeThrowsMade = 0;
    this.freeThrowsAttempted = 0;

    //season stats
    this.seasonPoints = 0;
    this.seasonRebounds = 0;
    this.seasonOffRebounds = 0;
    this.seasonTwoPointersAtt = 0;
    this.seasonTwoPointersMade = 0;
    this.seasonThreePointersAtt = 0;
    this.seasonThreePointersMade = 0;
    this.seasonFreeThrowsMade = 0;
    this.seasonFreeThrowsAttempted = 0;
    this.statsHistory = [];
    //ratings
    this.off = 40;
    this.def = 40;
    this.threePoint = 40;
    this.reb = 40;
    this.ft = 40;

    //for training screen
    this.offOld = 40;
    this.defOld = 40;
    this.passOld = 40;
    this.faceOffOld = 40;
    this.reflexesOld = 40;
    this.positioningOld = 40;

    this.rating = 80;

    //JSON
    this.team = player.team;

    //hockey
    this.positioning = 40;
    this.reflexes = 40;
    this.faceOff = 40;

    //FOOTBALL RATINGS BABYYYY
    this.pass = player.pass;
    this.awareness = player.awareness;
    this.rush = player.rush;
    this.speed = player.speed;
    this.catch = player.catch;
    this.block = player.block;
    this.breakBlock = player.breakBlock;
    this.tackle = player.tackle;
    this.kick = player.kick;

    //training
    this.passOld = player.pass;
    this.awarenessOld = player.awareness;
    this.rushOld = player.rush;
    this.speedOld = player.speed;
    this.catchOld = player.catch;
    this.blockOld = player.block;
    this.breakBlockOld = player.breakBlock;
    this.tackleOld = player.tackle;
    this.kickOld = player.kick;

    //football stats
    this.completions = 0;
    this.attempts = 0;
    this.touchdowns = 0;
    this.yards = 0;
    this.rushYards = 0;
    this.rushAttempts = 0;
    this.rushTouchdowns = 0;
    this.kicksAttempted = 0;
    this.kicksMade = 0;
    this.receptions = 0;
    this.tackles = 0;
    this.interceptions = 0;
    this.fumbles = 0;
    this.fumblesRecovered = 0;
    this.sacks = 0;

    this.seasonCompletions = 0;
    this.seasonAttempts = 0;
    this.seasonTouchdowns = 0;
    this.seasonYards = 0;
    this.seasonRushYards = 0;
    this.seasonRushAttempts = 0;
    this.seasonRushTouchdowns = 0;
    this.seasonKicksAttempted = 0;
    this.seasonKicksMade = 0;
    this.seasonReceptions = 0;
    this.seasonTackles = 0;
    this.seasonInterceptions = 0;
    this.seasonFumbles = 0;
    this.seasonFumblesRecovered = 0;
    this.seasonSacks = 0;

    //hockey stats
    this.saves = 0;
    this.goalsAllowed = 0;
    this.shots = 0;
    this.goals = 0;
    this.assists = 0;
    this.assistUsage = 0;
    this.gamesStarted = 0;

    this.iceTime = 0;
    this.shiftLength = 0;

    this.seasonGoals = 0;
    this.seasonSaves = 0;
    this.seasonGoalsAllowed = 0;
    this.seasonShots = 0;
    this.seasonAssists = 0;

    // console.log(this.name + " " + this.years + " " + this.salary);
  }

  getPositionString() {
    if (this.position === 0) {
      this.positionString = "QB";
    } else if (this.position === 1) {
      this.positionString = "RB";
    } else if (this.position === 2) {
      this.positionString = "FB";
    } else if (this.position === 3) {
      this.positionString = "WR";
    } else if (this.position === 4) {
      this.positionString = "TE";
    } else if (this.position === 5) {
      this.positionString = "LT";
    } else if (this.position === 6) {
      this.positionString = "LG";
    } else if (this.position === 7) {
      this.positionString = "C";
    } else if (this.position === 8) {
      this.positionString = "RG";
    } else if (this.position === 9) {
      this.positionString = "RT";
    } else if (this.position === 10) {
      this.positionString = "LE";
    } else if (this.position === 11) {
      this.positionString = "RE";
    } else if (this.position === 12) {
      this.positionString = "DT";
    } else if (this.position === 13) {
      this.positionString = "LOLB";
    } else if (this.position === 14) {
      this.positionString = "MLB";
    } else if (this.position === 15) {
      this.positionString = "ROLB";
    } else if (this.position === 16) {
      this.positionString = "CB";
    } else if (this.position === 17) {
      this.positionString = "FS";
    } else if (this.position === 18) {
      this.positionString = "SS";
    } else if (this.position === 19) {
      this.positionString = "K";
    } else if (this.position === 20) {
      this.positionString = "P";
    }
  }

  calculateRating() {
    //BLOCK OVER 99
    if (this.pass >= 99) {
      this.pass = 99;
    }
    if (this.awareness >= 99) {
      this.awareness = 99;
    }
    if (this.rush >= 99) {
      this.rush = 99;
    }
    if (this.speed >= 99) {
      this.speed = 99;
    }
    if (this.catch >= 99) {
      this.catch = 99;
    }
    if (this.block >= 99) {
      this.block = 99;
    }
    if (this.breakBlock >= 99) {
      this.breakBlock = 99;
    }
    if (this.tackle >= 99) {
      this.tackle = 99;
    }
    if (this.kick >= 99) {
      this.kick = 99;
    }

    //under 40 too
    if (this.pass <= 40) {
      this.pass = 40;
    }
    if (this.awareness <= 40) {
      this.awareness = 40;
    }
    if (this.rush <= 40) {
      this.rush = 40;
    }
    if (this.speed <= 40) {
      this.speed = 40;
    }
    if (this.catch <= 40) {
      this.catch = 40;
    }
    if (this.block <= 40) {
      this.block = 40;
    }
    if (this.breakBlock <= 40) {
      this.breakBlock = 40;
    }
    if (this.tackle <= 40) {
      this.tackle = 40;
    }
    if (this.kick <= 40) {
      this.kick = 40;
    }

    // let bestrating = [this.off, this.def, this.pass, this.faceOff];
    // bestrating.sort(function (a, b) {
    //     if (a < b) {
    //         return 1;
    //     }
    //     if (a > b) {
    //         return -1;
    //     }
    //     return 0;
    // });

    // if (this.position != 4) {
    //     this.rating = Math.round(((this.off * 2) + (this.def * 2) + (this.pass) + (bestrating[0] * 2)) / 7);
    //     if (this.rating >= 99) {
    //         this.rating = 99;
    //     }
    // } else {
    //     this.rating = Math.round((this.positioning + this.reflexes)/2);
    // }

    switch (this.position) {
      case 0:
        this.rating = Math.round(
          ((this.pass + this.awareness) * 2 + this.speed) / 5
        );
        break;
      case 1:
        this.rating = Math.round(
          (this.speed + this.rush * 2 + this.awareness) / 4
        );
        break;
      case 2:
        this.rating = Math.round(
          (this.block + this.rush * 2 + this.awareness) / 4
        );
        break;
      case 3:
        this.rating = Math.round(
          (this.catch + this.speed + this.awareness) / 3
        );
        break;
      case 4:
        this.rating = Math.round(
          (this.block + this.catch + this.speed + this.awareness) / 4
        );
        break;
      case 5:
        this.rating = Math.round((this.block + this.awareness) / 2);
        break;
      case 6:
        this.rating = Math.round((this.block + this.awareness) / 2);
        break;
      case 7:
        this.rating = Math.round((this.block + this.awareness) / 2);
        break;
      case 8:
        this.rating = Math.round((this.block + this.awareness) / 2);
        break;
      case 9:
        this.rating = Math.round((this.block + this.awareness) / 2);
        break;
      case 10:
        this.rating = Math.round(
          (this.tackle + this.breakBlock + this.awareness) / 3
        );
        break;
      case 11:
        this.rating = Math.round(
          (this.tackle + this.breakBlock + this.awareness) / 3
        );
        break;
      case 12:
        this.rating = Math.round(
          (this.tackle + this.breakBlock + this.awareness) / 3
        );
        break;
      case 13:
        this.rating = Math.round(
          (this.tackle + this.breakBlock + this.awareness + this.speed) / 4
        );
        break;
      case 14:
        this.rating = Math.round(
          (this.tackle + this.breakBlock + this.awareness + this.speed) / 4
        );
        break;
      case 15:
        this.rating = Math.round(
          (this.tackle + this.breakBlock + this.awareness + this.speed) / 4
        );
        break;
      case 16:
        this.rating = Math.round(
          (this.tackle + this.catch + this.awareness + this.speed) / 4
        );
        break;
      case 17:
        this.rating = Math.round(
          (this.tackle + this.catch + this.awareness + this.speed) / 4
        );
        break;
      case 18:
        this.rating = Math.round(
          (this.tackle + this.catch + this.awareness + this.speed) / 4
        );
        break;
      case 19:
        this.rating = Math.round(
          (this.kick + this.awareness) / 2
        );
        break;
      case 20:
        this.rating = Math.round(
          (this.kick + this.awareness) / 2
        );
        break;
      default:
        this.rating = 40;
        break;
    }
  }
}
class Team {
  constructor(team) {
    this.conferenceId = team.conferenceId;
    this.id = team.id;
    this.name = team.name;
    this.rating = 0;
    this.logoSrc = team.logoSrc;
    this.schedule = [];
    this.played = [];
    this.wins = 0;
    this.losses = 0;
    this.otLosses = 0;
    this.roster = [];
    this.lineup = [];
    this.history = [];
    this.seed = 1;
    this.ratingRank;
    this.powerRanking = 30;
    // this.calculateRating();
    this.firstTeam;
    this.secondTeam = [];
    this.bench = [];
    this.constantBench = [];
    this.trainingPoints = 0;
    // this.reorderLineup();

    this.draftPicks = [
      {
        round: 1,
        originalTeam: this.name,
        value: null,
        salary: 0,
        isPick: true,
        projectedPick: null,
        currentTeam: null
      },
      {
        round: 2,
        originalTeam: this.name,
        value: null,
        salary: 0,
        isPick: true,
        projectedPick: null,
        currentTeam: null
      },
      {
        round: 3,
        originalTeam: this.name,
        value: null,
        salary: 0,
        isPick: true,
        projectedPick: null,
        currentTeam: null
      },
      {
        round: 4,
        originalTeam: this.name,
        value: null,
        salary: 0,
        isPick: true,
        projectedPick: null,
        currentTeam: null
      },
      {
        round: 5,
        originalTeam: this.name,
        value: null,
        salary: 0,
        isPick: true,
        projectedPick: null,
        currentTeam: null
      },
      {
        round: 6,
        originalTeam: this.name,
        value: null,
        salary: 0,
        isPick: true,
        projectedPick: null,
        currentTeam: null
      },
      {
        round: 7,
        originalTeam: this.name,
        value: null,
        salary: 0,
        isPick: true,
        projectedPick: null,
        currentTeam: null
      }
    ];

    //stats
    this.seasonPoints = 0;
    this.seasonPointsAllowed = 0;
    this.seasonShots = 0;
    this.seasonSaves = 0;
    this.seasonGoalsAllowed = 0;


    this.expiring = {
      name: "Expiring Contracts",
      roster: [],
      logoSrc: "https://i.ibb.co/5h2T9Kq/test.png",
      reorderLineup: function () {
        availableFreeAgents.roster.sort(function (a, b) {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return 1;
          return 0;
        });
      }
    };

    //salary cap
    this.salary = 0;

    //Coach Sliders
    this.offVsDefFocus = Math.round(Math.random() * 6) - 3;
    this.qualityVsQuantity = Math.round(Math.random() * 6) - 3;
    this.defenseAggresiveVsConservative = Math.round(Math.random() * 6) - 3;
    this.forwardsVsDefensemen = Math.round(Math.random() * 6) - 3;

    //hockey coach sliders
    this.freezeThePuckVsPlayThePuck = Math.round(Math.random() * 6) - 3;

    //football
    this.qbs = [];
    this.rbs = [];
    this.fbs = [];
    this.tes = [];
    this.wrs = [];
    this.ol = [];
    this.dl = [];
    this.lbs = [];
    this.dbs = [];
    this.ks = [];
    this.ps = [];

    this.offenseType = Math.floor(Math.random()*4);
    this.defenseType = Math.floor(Math.random()*3);

    this.offStarters = {passers: [], runners:[], recievers:[], blockers:[]};
    this.defStarters = {rushers: [], intercepters: []}
  }

  releaseExpiring() {
    for (let i = 0; i < this.expiring.roster.length; i++) {
      availableFreeAgents.roster.push(this.expiring.roster[i]);
    }
    this.expiring.roster = [];
  }

  calculateRating() {
    try {
      let total = 0;
      let rat = 0;
      let kickers = 0;
      for (let i = 0; i < this.roster.length; i++) {
        if(this.roster[i].position === POS_K || this.roster[i].position === POS_P){
          kickers++;
        }else{
          total+= this.roster[i].rating;
        }
      }
      rat = Math.round(
        (total / (this.roster.length-kickers))
      );

      this.rating  = Math.round(scaleBetween(rat,60,99,65,85));

    } catch (err) {
      console.log(this.name + "calculateRating()");
    }
  }

  /*
1st quarter, first 8 minutes: 1st team
1st quarter, last 4 minutes; 
2nd quarter, first 4 minutes: 2nd team
3rd quarter, first 8 minutes: 1st team
3rd quarter, last 4 minutes;

4th quarter, first 4 minutes: 2nd team
4th quarter, last 8 minutes: 1st team

*/

  checkRequirements(){
  let diff = 0;
  if(this.qbs.length < POS_QB_REQUIREMENTS){
    diff = POS_QB_REQUIREMENTS - this.qbs.length;
    return {
      position: POS_QB,
      amount: diff
    }
  }
  if(this.rbs.length < POS_HB_REQUIREMENTS){
    diff = POS_HB_REQUIREMENTS - this.rbs.length;
    return {
      position: POS_HB,
      amount: diff
    }
  }
  if(this.wrs.length < POS_WR_REQUIREMENTS){
    diff = POS_WR_REQUIREMENTS - this.wrs.length;
    return {
      position: POS_WR,
      amount: diff
    }
  }
  // if(this.tes.length < POS_TE_REQUIREMENTS){
  //   diff = POS_TE_REQUIREMENTS - this.tes.length;
  //   return {
  //     position: POS_TE,
  //     amount: diff
  //   }
  // }
  if(this.ol.length < POS_OL_REQUIREMENTS){
    diff = POS_OL_REQUIREMENTS - this.ol.length;
    return {
      position: POS_LT,
      amount: diff
    }
  }
  if(this.dl.length < POS_DL_REQUIREMENTS){
    diff = POS_DL_REQUIREMENTS - this.dl.length;
    return {
      position: POS_LE,
      amount: diff
    }
  }
  if(this.dbs.length < POS_DB_REQUIREMENTS){
    diff = POS_DB_REQUIREMENTS - this.dbs.length;
    return {
      position: POS_CB,
      amount: diff
    }
  }
  if(this.ks.length < POS_K_REQUIREMENTS){
    diff = POS_K_REQUIREMENTS - this.ks.length;
    return {
      position: POS_K,
      amount: diff
    }
  }
  if(this.ps.length < POS_P_REQUIREMENTS){
    diff = POS_P_REQUIREMENTS - this.ps.length;
    return {
      position: POS_P,
      amount: diff
    }
  }

  return null;
}

  manageFootballLineup() {
    this.roster.sort(function (a, b) {
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      } else {
        return 0;
      }
    });


    this.qbs = [];
    this.rbs = [];
    this.fbs = [];
    this.tes = [];
    this.wrs = [];
    this.ol = [];
    this.dl = [];
    this.lbs = [];
    this.dbs = [];
    this.ks = [];
    this.ps = [];


    for (let i = 0; i < this.roster.length; i++) {
      let player = this.roster[i];
      if (player.position === 0) {
        this.qbs.push(player);
      } else if (player.position === 1) {
        this.rbs.push(player);
      } else if (player.position === 2) {
        this.fbs.push(player);
      } else if (player.position === 3) {
        this.wrs.push(player);
      } else if (player.position === 4) {
        this.tes.push(player);
      }
      else if (player.position > 4 && player.position < 10) {
        this.ol.push(player);
      }
      else if (player.position >=POS_LE && player.position <= POS_DT) {
        this.dl.push(player);
      }
      else if (player.position >= 13 && player.position <= 15) {
        this.lbs.push(player);
      }
      else if (player.position > 15 && player.position < 19) {
        this.dbs.push(player);
      }
      else if (player.position === 19) {
        this.ks.push(player);
      }
      else if (player.position === 20) {
        this.ps.push(player);
      }
    }

    let missingRequirements = this.checkRequirements()
    if(missingRequirements != null){
      console.log(this.name + ' is under requirements.. missing: ' + missingRequirements.amount + ' of positionId: ' + missingRequirements.position);
    }

  }

  reorderLineup() {
    // this.manageHockeyLineups();
    this.manageFootballLineup();
    this.calculateRating();
  }

  setPlayerRoles() {
    try {
      for (let i = 0; i < this.roster.length; i++) {
        this.roster[i].role = 0;
        this.roster[i].tempRole = 0;
      }

      for (let i = 0; i < this.firstTeam.length; i++) {
        this.firstTeam[i].role = 3;
        this.firstTeam[i].tempRole = 3;
      }

      for (let i = 0; i < this.secondTeam.length; i++) {
        this.secondTeam[i].role = 1;
        this.secondTeam[i].tempRole = 1;
      }

      let tot = 0;
      for (let i = 0; i < this.firstTeam.length; i++) {
        tot += this.firstTeam[i].rating;
      }

      for (let i = 0; i < this.firstTeam.length; i++) {
        let amt = (this.firstTeam[i].rating / tot) * 100;
        if (amt > 21) {
          // console.log(this.firstTeam[i].name);
          this.firstTeam[i].role = 4;
          this.firstTeam[i].tempRole = 4;
          break;
        }
      }

      this.secondTeam.sort(function (a, b) {
        if (a.rating > b.rating) {
          return -1;
        }
        if (a.rating < b.rating) {
          return 1;
        } else {
          return 0;
        }
      });

      this.secondTeam[0].role = 2;
      this.secondTeam[0].tempRole = 2;
    } catch (err) {
      console.log("Role Error");
    }
  }

  manageUsage() {
    try {
      let rebTotal = 0;
      for (let i = 0; i < this.firstTeam.length; i++) {
        rebTotal += this.firstTeam[i].reb + this.firstTeam[i].position * 20;
      }

      for (let i = 0; i < this.firstTeam.length; i++) {
        this.firstTeam[i].reboundUsage =
          ((this.firstTeam[i].reb + this.firstTeam[i].position * 20) /
            rebTotal) *
          100;
      }

      // rebTotal = 0;
      // for (let i = 0; i < this.secondTeam.length; i++) {
      //     rebTotal += this.secondTeam[i].reb + (this.secondTeam[i].position * 20);
      // }

      // for (let i = 0; i < this.secondTeam.length; i++) {
      //     this.secondTeam[i].reboundUsage = ((this.secondTeam[i].reb + (this.secondTeam[i].position * 20)) / rebTotal) * 100;
      // }

      let tot = 0;
      for (let i = 0; i < this.firstTeam.length; i++) {
        tot +=
          scaleBetween(this.firstTeam[i].off, 0, 400, 40, 99) +
          scaleBetween(this.firstTeam[i].threePoint, 0, 400, 40, 99) / 4;
        if (i < 2) {
          //backcourt
          tot += this.frontCourtVsBackCourt * 35;
        } else {
          //frontcourt
          tot -= this.frontCourtVsBackCourt * 35;
        }
      }

      for (let i = 0; i < this.firstTeam.length; i++) {
        let usage =
          scaleBetween(this.firstTeam[i].off, 0, 400, 40, 99) +
          scaleBetween(this.firstTeam[i].threePoint, 0, 400, 40, 99) / 4;
        if (i < 2) {
          //backcourt
          tot += this.frontCourtVsBackCourt * 35;
        } else {
          //frontcourt
          tot -= this.frontCourtVsBackCourt * 35;
        }

        this.firstTeam[i].usage = (usage / tot) * 100;
      }

      // tot = 0;
      // for (let i = 0; i < this.secondTeam.length; i++) {
      //     tot += (this.secondTeam[i].off + (this.secondTeam[i].threePoint / 4));
      // }

      // for (let i = 0; i < this.secondTeam.length; i++) {
      //     this.secondTeam[i].usage = ((this.secondTeam[i].off + (this.secondTeam[i].threePoint / 4)) / tot) * 100;
      // }

      if (this.roster.length <= this.rotationSize) {
        console.log(this.name + " Does not have enough players");
        this.rotationSize = this.roster.length - 1;
      }

      //MINUTES IN ROTATION
      tot = 0;

      let includedInRotation = [...this.firstTeam];
      for (let i = 0; i < this.bench.length; i++) {
        if (includedInRotation.length >= this.rotationSize) {
          break;
        } else {
          includedInRotation.push(this.bench[i]);
        }
      }

      for (let i = 0; i < includedInRotation.length; i++) {
        tot += scaleBetween(includedInRotation[i].rating, 300, 1000, 80, 99);
        tot += scaleBetween(includedInRotation[i].role, 0, 600, 0, 4);
      }

      for (let i = 0; i < includedInRotation.length; i++) {
        includedInRotation[i].minutes = Math.round(
          ((scaleBetween(includedInRotation[i].rating, 300, 1000, 80, 99) +
            scaleBetween(includedInRotation[i].role, 0, 600, 0, 4)) /
            tot) *
          240
        );
      }

      for (let i = 0; i < includedInRotation.length; i++) {
        if (includedInRotation[i].minutes >= 38) {
          let rem = includedInRotation[i].minutes - 38;
          includedInRotation[i].minutes = 38;

          let index = i + 1;
          while (rem > 0) {
            includedInRotation[index].minutes++;
            rem--;
            index++;
            if (index >= includedInRotation.length - 1) {
              index = i + 1;
            }
          }
        }
      }

      this.bench = [];
      for (let i = 0; i < includedInRotation.length; i++) {
        if (!this.firstTeam.includes(includedInRotation[i])) {
          this.bench.push(includedInRotation[i]);
        }
      }
    } catch (err) {
      console.log(this.name + " ERROR");
      console.log(err);
    }

    //messes up
    // this.lineup = this.firstTeam;
    // this.lineup=[];
    // this.lineup = this.lineup.concat(this.firstTeam);
    // this.lineup = this.firstTeam;
    this.lineup = this.firstTeam.slice(0);

    this.bench.sort(function (a, b) {
      if (a.minutes > b.minutes) {
        return 1;
      }
      if (a.minutes > b.minutes) {
        return -1;
      } else {
        return 0;
      }
    });

    this.constantBench = [...this.bench];
  }

  generateBenchWarmers() {
    let benchWarmers = [];

    for (let i = 0; i < this.roster.length; i++) {
      if (
        !this.firstTeam.includes(this.roster[i]) &&
        !this.secondTeam.includes(this.roster[i])
      ) {
        benchWarmers.push(this.roster[i]);
      }
    }

    return benchWarmers;
  }
}

//INITIAL JSON READING
//PARSING JSON
export let teams = [];
export let conferences = [];

let easternConference = {
  name: "Eastern Conference",
  teams: [],
  logoSrc: "https://i.ibb.co/5h2T9Kq/test.png",
  id: 0
};

let westernConference = {
  name: "Western Conference",
  teams: [],
  logoSrc: "https://i.ibb.co/5h2T9Kq/test.png",
  id: 1
};

conferences.push(easternConference, westernConference);

export let availableFreeAgents = {
  name: "Free Agents",
  roster: [],
  logoSrc: "https://i.ibb.co/5h2T9Kq/test.png",
  reorderLineup: function () {
    availableFreeAgents.roster.sort(function (a, b) {
      if (a.rating > b.rating) return -1;
      if (a.rating < b.rating) return 1;
      return 0;
    });
  }
};

export function loadRosters() {
  teams = [];
  for (let i = 0; i < conferences.length; i++) {
    conferences[i].teams = [];
  }

  for (let i = 0; i < teamsData.length; i++) {
    teams.push(new Team(teamsData[i]));
    for (let j = 0; j < playerData.length; j++) {
      if (playerData[j].team === teams[i].id) {
        ply = new Player(playerData[j]);
        ply.calculateRating();
        teams[i].roster.push(ply);
        ply.teamLogoSrc = teams[i].logoSrc;
        ply.teamName = teams[i].name;
      }
    }
    if (teams[i].roster.length <= 0) {
      generateCustomRoster(teams[i], 65);
    }
    for (let k = 0; k < conferences.length; k++) {
      if (teams[i].conferenceId === conferences[k].id) {
        conferences[k].teams.push(teams[i]);
      }
    }
    teams[i].reorderLineup();
    teams[i].calculateRating();
    sortedRoster(teams[i], "rating");
  }
  setTeamSalaries();

  //NO NEEED TO PARSE JSON ITS ALREADY IN OBJECT FORMAT
  // for (let i = 0; i < rosterData.length; i++) {
  //     teams.push(new Team(rosterData[i]));
  // }
  availableFreeAgents.roster = [];
  for (let i = 0; i < freeAgents.length; i++) {
    availableFreeAgents.roster.push(new Player(freeAgents[i]));
    availableFreeAgents.roster[i].calculateRating();
    availableFreeAgents.roster[i].teamLogoSrc = availableFreeAgents.logoSrc;
    availableFreeAgents.roster[i].teamName = availableFreeAgents.name;
  }
  availableFreeAgents.reorderLineup();
  setSalaryExpectations(availableFreeAgents);


  //temporary
  generateFreeAgents(300, 16);
  generateDraftClass();
}

//DRAFT CLASS GENERATOR
export let draftClass = {
  name: "Draft Class",
  roster: [],
  logoSrc: "https://i.ibb.co/5h2T9Kq/test.png",
  reorderLineup: function () {
    draftClass.roster.sort(function (a, b) {
      if (a.rating > b.rating) return -1;
      if (a.rating < b.rating) return 1;
      return 0;
    });
  }
};

export function generateCustomRoster(team, rating) {
  team.roster = [];
  let qbs = 0;
  let hbs = 0;
  let wrs = 0;
  let tes = 0;
  let ol = 0;
  let dl = 0;
  let lbs = 0;
  let dbs = 0;
  let ks=0;
  let ps= 0;
  for (let i = 0; i < rosterSize; i++) {
    let name =
      draftData[Math.floor(Math.random() * draftData.length)].firstname +
      " " +
      draftData[Math.floor(Math.random() * draftData.length)].lastname;
    let faceSrc = draftData[0].faceSrc;
    let age = draftData[Math.floor(Math.random() * draftData.length)].age;
    let playerComparison = Math.floor(Math.random() * draftData.length);

    if (qbs < POS_QB_REQUIREMENTS) {
      while (draftData[playerComparison].position != POS_QB) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      qbs++;
    } else if (hbs < POS_HB_REQUIREMENTS) {
      while (draftData[playerComparison].position != POS_HB) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      hbs++;
    } else if (wrs < POS_WR_REQUIREMENTS) {
      while (draftData[playerComparison].position != POS_WR) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      wrs++;
    }
    else if (tes < POS_TE_REQUIREMENTS) {
      while (draftData[playerComparison].position != POS_TE) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      tes++;
    }
    else if (ol < POS_OL_REQUIREMENTS) {
      while (draftData[playerComparison].position < POS_LT || draftData[playerComparison].position > POS_RT) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      ol++;
    }
    else if (dl < POS_DL_REQUIREMENTS) {
      while (draftData[playerComparison].position < POS_LE || draftData[playerComparison].position > POS_DT) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      dl++;
    }
    else if (lbs < POS_LB_REQUIREMENTS) {
      while (draftData[playerComparison].position < POS_LOLB || draftData[playerComparison].position > POS_ROLB) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      lbs++;
    }
    else if (dbs < POS_DB_REQUIREMENTS) {
      while (draftData[playerComparison].position < POS_CB || draftData[playerComparison].position > POS_SS) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      dbs++;
    }
    else if (ks < POS_K_REQUIREMENTS) {
      while (draftData[playerComparison].position != POS_K) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      ks++;
    }
    else if (ps < POS_P_REQUIREMENTS) {
      while (draftData[playerComparison].position != POS_P) {
        playerComparison = Math.floor(Math.random() * draftData.length);
      }
      ps++;
    }
  
    let number = draftData[playerComparison].number;
    let position = draftData[playerComparison].position;
    let height = draftData[playerComparison].height;
    let pass =
    draftData[playerComparison].pass  -
    Math.floor(Math.random() * 12);
  let awareness =
    draftData[playerComparison].awareness  -
    Math.floor(Math.random() * 12);
  let rush =
    draftData[playerComparison].rush  -
    Math.floor(Math.random() * 12);
  let speed =
    draftData[playerComparison].speed  -
    Math.floor(Math.random() * 12);
  let catching =
    draftData[playerComparison].catch  -
    Math.floor(Math.random() * 12);
  let block =
    draftData[playerComparison].block  -
    Math.floor(Math.random() * 12);
    let breakBlock =
    draftData[playerComparison].breakBlock  -
    Math.floor(Math.random() * 12);
    let tackle =
    draftData[playerComparison].tackle  -
    Math.floor(Math.random() * 12);
    let kick =
    draftData[playerComparison].kick  -
    Math.floor(Math.random() * 12); 
    //2 years the plus one is because the contract years go down AFTER the draft not before but contract years should be 2 for rookies
    let years = Math.floor(Math.random() * 3) + 1;
    let salary = 2400000;

    //RATING FORMULA

    
    let ply = new Player({
      name: name,
      faceSrc: faceSrc,
      number: number,
      age: age,
      position: position,
      height: height,
      pass: pass,
      awareness: awareness,
      rush: rush,
      speed: speed,
      catch: catching,
      block: block,
      breakBlock: breakBlock,
      tackle: tackle,
      kick: kick,
      years: years,
      salary: salary
    });
    ply.calculateRating();
    team.roster.push(ply);
  }

  for (let i = 0; i < team.roster.length; i++) {
    team.roster[i].teamName = team.name;
    team.roster[i].teamLogoSrc = team.logoSrc;
  }

  team.reorderLineup();
  // team.calculateRating();

  if (team.rating > rating) {
    while (team.rating != rating) {
      for (let i = 0; i < team.roster.length; i++) {
        team.roster[i].awareness--;
        team.roster[i].pass--;
        team.roster[i].tackle--;
        team.roster[i].block--;
        team.roster[i].breakBlock--;
        team.roster[i].calculateRating();
        team.calculateRating();
        if (team.rating <= rating) {
          return;
        }
      }
    }
  }

  if (team.rating < rating) {
    while (team.rating != rating) {
      for (let i = 0; i < team.roster.length; i++) {
        team.roster[i].awareness++;
        team.roster[i].pass++;
        team.roster[i].tackle++;
        team.roster[i].block++;
        team.roster[i].breakBlock++;
        team.roster[i].calculateRating();
        team.calculateRating();
        if (team.rating >= rating) {
          return;
        }
      }
    }
  }
}

export function generateFreeAgents(amount, ratingSubtraction) {
  availableFreeAgents.roster = [];
  for (let i = 0; i < amount; i++) {
    let name =
      draftData[Math.floor(Math.random() * draftData.length)].firstname +
      " " +
      draftData[Math.floor(Math.random() * draftData.length)].lastname;
    let faceSrc = draftData[0].faceSrc;
    let age = Math.floor(Math.random() * 15) + 20;
    if (collegeMode) {
      age = 18;
    }
    
    let playerComparison = Math.floor(Math.random() * draftData.length);
    let number = draftData[playerComparison].number;
    let position = draftData[playerComparison].position;
    let height = draftData[playerComparison].height;
    let pass =
      draftData[playerComparison].pass -
      ratingSubtraction +
      Math.floor(Math.random() * 5);
    let awareness =
      draftData[playerComparison].awareness -
      ratingSubtraction +
      Math.floor(Math.random() * 5);
    let rush =
      draftData[playerComparison].rush -
      ratingSubtraction +
      Math.floor(Math.random() * 5);
    let speed =
      draftData[playerComparison].speed -
      ratingSubtraction +
      Math.floor(Math.random() * 5);
    let catching =
      draftData[playerComparison].catch -
      ratingSubtraction +
      Math.floor(Math.random() * 5);
    let block =
      draftData[playerComparison].block -
      ratingSubtraction +
      Math.floor(Math.random() * 5);
      let breakBlock =
      draftData[playerComparison].breakBlock -
      ratingSubtraction +
      Math.floor(Math.random() * 5);
      let tackle =
      draftData[playerComparison].tackle -
      ratingSubtraction +
      Math.floor(Math.random() * 5);
      let kick =
      draftData[playerComparison].kick -
      ratingSubtraction +
      Math.floor(Math.random() * 5);  
    //2 years the plus one is because the contract years go down AFTER the draft not before but contract years should be 2 for rookies
    let years = 2 + 1;
    let salary = 1200000;

    if (collegeMode) {
      years = 4;
    }

    //RATING FORMULA

    let ply = new Player({
      name: name,
      faceSrc: faceSrc,
      number: number,
      age: age,
      position: position,
      height: height,
      pass: pass,
      awareness: awareness,
      rush: rush,
      speed: speed,
      catch: catching,
      block: block,
      breakBlock: breakBlock,
      tackle: tackle,
      kick: kick,
      years: years,
      salary: salary
    });

    ply.calculateRating();
    availableFreeAgents.roster.push(ply);
  }
}

function generateDraftClass() {
  draftClass.roster = [];
  for (let i = 0; i < Math.floor(teams.length * 10); i++) {
    let name =
      draftData[Math.floor(Math.random() * draftData.length)].firstname +
      " " +
      draftData[Math.floor(Math.random() * draftData.length)].lastname;
    let faceSrc = draftData[0].faceSrc;
    let age = draftData[Math.floor(Math.random() * draftData.length)].age;
    
    let playerComparison = Math.floor(Math.random() * draftData.length);
    let number = draftData[playerComparison].number;
    let position = draftData[playerComparison].position;
    let height = draftData[playerComparison].height;

    let pass =
      draftData[playerComparison].pass - 15 + Math.floor(Math.random() * 5);
    let awareness =
      draftData[playerComparison].awareness - 15 + Math.floor(Math.random() * 5);
    let rush =
      draftData[playerComparison].rush -
      15 +
      Math.floor(Math.random() * 5);
    let speed = draftData[playerComparison].speed - 15 + Math.floor(Math.random() * 5);
    let block = draftData[playerComparison].block - 15 + Math.floor(Math.random() * 5);
    let catching = draftData[playerComparison].catch - 15 + Math.floor(Math.random() * 5);

      let breakBlock = draftData[playerComparison].breakBlock - 15 + Math.floor(Math.random() * 5);
      let tackle =
      draftData[playerComparison].tackle - 15 + Math.floor(Math.random() * 5);
      let kick =
      draftData[playerComparison].kick - 15 + Math.floor(Math.random() * 5);
    //2 years the plus one is because the contract years go down AFTER the draft not before but contract years should be 2 for rookies
    let years = 2 + 1;
    let salary = 1200000;


    //RATING FORMULA
    let ply = new Player({
      name: name,
      faceSrc: faceSrc,
      number: number,
      age: age,
      position: position,
      height: height,
      pass: pass,
      awareness: awareness,
      rush: rush,
      speed: speed,
      catch: catching,
      block: block,
      breakBlock: breakBlock,
      tackle: tackle,
      kick: kick,
      years: years,
      salary: salary
    });

    ply.calculateRating();
    draftClass.roster.push(ply);
  }
}

loadRosters();

//*********************************************************/

//Random Selections For Menu Display
export let randomTeamSelections = [];
export let generated1;
export let generated2;
export let generated3;
export let generated4;
menuDisplayTeams();

export function menuDisplayTeams() {
  randomTeamSelections = [];

  while (randomTeamSelections.length < 8) {
    let selection = Math.floor(Math.random() * teams.length);
    if (randomTeamSelections.indexOf(selection) === -1)
      randomTeamSelections.push(selection);
  }

  home = teams[randomTeamSelections[0]];
  away = teams[randomTeamSelections[1]];
  selectedTeam = teams[randomTeamSelections[2]];
  generated1 = teams[randomTeamSelections[3]];
  generated2 = teams[randomTeamSelections[4]];
  generated3 = teams[randomTeamSelections[5]];
  generated4 = teams[randomTeamSelections[6]];
}

export function setHomeAway(h, a) {
  home = h;
  away = a;
}

export function setHome(h) {
  home = h;
}

export function setAway(a) {
  away = a;
}

export function setSelectedTeam(t) {
  selectedTeam = t;
}

//My favorite function <3
function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
  );
}

export class Results {
  constructor(userScore, oppScore) {
    this.oppScore = oppScore;
    this.userScore = userScore;
    if (userScore > oppScore) {
      this.won = true;
    } else {
      this.won = false;
    }
  }
}

export class Game {
  constructor() {
    this.time = 15 * 4 * 60;
    this.homescore = 0;
    this.awayscore = 0;
    this.shotsAtt = 0;
    this.shotsMade = 0;
    this.threesAtt = 0;
    this.threesMade = 0;
    this.iceTime = 0;
    this.possResult = [];
    this.quarter = 1;
    this.overtime = false;

    this.down = 1;
    this.yardsToFirst = 10;
    this.yardMarker = 20;

    this.inPossesion = home;
  }

  checkForTouchDown(yds) {
    if (this.yardMarker + yds >= 100) {
      return true;
    } else {
      return false;
    }
  }

  selectReciever(off) {
    let recievers = [];
    recievers.push(off.wrs[0]);
    recievers.push(off.wrs[1]);
    recievers.push(off.wrs[2]);
    if(off.tes.length>1){
      recievers.push(off.tes[0]);
    }else{
    recievers.push(off.wrs[3]);
    }
    recievers.push(off.rbs[0]);
    let reciever;

    

    let tot = 0;
    try{
    for (let i = 0; i < recievers.length; i++) {
      tot += recievers[i].catch + recievers[i].speed;
    }
  }catch(e){
    console.log(off.name);
  }
    let rand = Math.random() * 100;
    let selection = 0;
    for (let i = 0; i < recievers.length; i++) {
      selection += ((recievers[i].catch + recievers[i].speed) / tot) * 100;
      if (rand <= selection) {
        return recievers[i];
      }
    }


  }

  selectDBTackler(def){
    let tacklers = [];
    tacklers.push(def.dbs[0]);
    tacklers.push(def.dbs[1]);
    tacklers.push(def.dbs[2]);
    tacklers.push(def.dbs[3]);

    let tot = 0;
    for (let i = 0; i < tacklers.length; i++) {
      tot += tacklers[i].tackle + tacklers[i].awareness;
    }
    let rand = Math.random() * 100;
    let selection = 0;
    for (let i = 0; i < tacklers.length; i++) {
      selection += ((tacklers[i].tackle + tacklers[i].awareness) / tot) * 100;
      if (rand <= selection) {
        return tacklers[i];
      }
    }
  }

  selectLBTackler(def){
    let tacklers = [];

   

    for(let i=0; i<def.lbs.length; i++){
      tacklers.push(def.lbs[i]);
      if(i>=3){
        break;
      }
    }

    let tot = 0;
    for (let i = 0; i < tacklers.length; i++) {
      tot += tacklers[i].tackle + tacklers[i].awareness;
    }
    let rand = Math.random() * 100;
    let selection = 0;
    for (let i = 0; i < tacklers.length; i++) {
      selection += ((tacklers[i].tackle + tacklers[i].awareness) / tot) * 100;
      if (rand <= selection) {
        return tacklers[i];
      }
    }
  }

  selectDLTackler(def){
    let tacklers = [];
    tacklers.push(def.dl[0]);
    tacklers.push(def.dl[1]);
    tacklers.push(def.dl[2]);
    tacklers.push(def.dl[3]);

    let tot = 0;
    for (let i = 0; i < tacklers.length; i++) {
      tot += tacklers[i].tackle + tacklers[i].awareness;
    }
    let rand = Math.random() * 100;
    let selection = 0;
    for (let i = 0; i < tacklers.length; i++) {
      selection += ((tacklers[i].tackle + tacklers[i].awareness) / tot) * 100;
      if (rand <= selection) {
        return tacklers[i];
      }
    }
  }

  selectRunner(off){
    if(Math.random()*100 > 85){
      //backup rb run
      return off.rbs[1];
    }

    if(off.offenseType === OFF_SPREAD){
      if(Math.random()*100 > 80){
        return off.qbs[0];
      }else{
        return off.rbs[0];
      }
    }

    if(off.offenseType === OFF_OPTION){
      if(Math.random()*100 > 65){
        return off.qbs[0];
      }else{
        return off.rbs[0];
      }
    }

    return off.rbs[0];
  }


  footballPlay() {
    let result = ""
    let spotlightPlayer;

    let yardModifier = 0;


    

    let off = this.inPossesion;
    let def;
    if (off === home) {
      def = away;
    } else {
      def = home;
    }

    let ratingDiff = Math.round((off.rating - def.rating) / 2);

    if (Math.random() * 100 < 4 + ratingDiff) {
      yardModifier += Math.round(Math.random() * 60);
    }else{
      yardModifier = Math.round(Math.random()* ratingDiff);
    }

    if(yardModifier < 0){
      yardModifier = 0;
    }


    if (this.down >= 4) {

      let kickerDistance = scaleBetween(off.ks[0].kick, 25, 60, 40, 99);
      if (kickerDistance >= (100 - this.yardMarker)) {
        //att fg
        off.ks[0].kicksAttempted++;

        let kickerPercentage = scaleBetween(off.ks[0].kick, 50, 99, 40, 99);
        let distanceAdjustment = scaleBetween((100 - this.yardMarker), 0, 30, 0, 60);

        let percent = kickerPercentage - distanceAdjustment;
        // console.log('kickerpower' + kickerDistance);
        // console.log('distance' + (100- this.yardMarker));

        // console.log(kickerPercentage);
        // console.log(distanceAdjustment);
        // console.log(percent);
        if (percent > Math.random() * 100) {
          off.ks[0].kicksMade++;
          if (off === home) {
            this.homescore += 3;
          } else {
            this.awayscore += 3;
          }
          spotlightPlayer = off.ks[0];
          result = "makes a " + (100 - this.yardMarker) + "yard fieldgoal!";
        } else {
          spotlightPlayer = off.ks[0];
          result = "misses a " + (100 - this.yardMarker) + "yard fieldgoal!";
        }

        this.inPossesion = def;
        this.yardMarker = 20;
        this.down = 1;
        this.yardsToFirst = 10;

      } else {

        let punter = off.ps[0];
        if(off.ps.length < 1){
          punter = off.ks[0];
        }
        spotlightPlayer = punter;


        let power = scaleBetween(punter.kick, 20, 55, 40, 99);
        let rand = Math.random() * 10;

        let kickDistance = Math.round(power + rand);

        let smtn = kickDistance + this.yardMarker;

        if (smtn <= 0) {
          this.yardMarker = 20;
        } else {
          this.yardMarker = 100 - smtn
        }

        result = "punts it away for " + kickDistance + " yards!";

        this.inPossesion = def;
        this.yardMarker = 20;
        this.down = 1;
        this.yardsToFirst = 10;


        //punt
      }

    } else {

      let yardsGained = 0;
      //slider setup move out of function when complete
      oLineSlider = 12;
      dLineSlider = 12;

      let oLineModifier = 0;
      for (let i = 0; i < 5; i++) {
        oLineModifier += off.ol[i].rating;
      }

      let dLineModifier = 0;
      for (let i = 0; i < 4; i++) {
        dLineModifier += def.dl[i].rating;
      }

      let scaledOline = scaleBetween(oLineModifier, 0, oLineSlider, (40 * 5), (99 * 5));
      let scaledDline = scaleBetween(dLineModifier, 0, dLineSlider, (40 * 3), (99 * 5));


      // console.log(`scaledOline:  ${scaledOline}`);
      // console.log(`scaledDline:  ${scaledDline}`);

      let lineInteraction = Math.random()*scaledOline - Math.random()*scaledDline;


      let playSelection = Math.random() * 100;
      
      if(this.down >= 3 && this.yardsToFirst >= 5){
        playSelection += 20;
      }

      if (playSelection > 40) {
        //pass
        let qb = off.qbs[0];
        let scaledQbAwareness = scaleBetween(qb.awareness, 0, 15, 40, 99);
        let scaledQbPass = scaleBetween(qb.pass, 0, 15, 40, 99);


        let target = this.selectReciever(off);
        
        let defender = def.dbs[0];

        let speedVsSpeed = (target.speed - defender.speed) / 2;
        let scaledCatch = scaleBetween(target.catch, 0, 10, 40, 99)

        let scaledDefenderAwareness = scaleBetween(defender.awareness, 0, 10, 40, 99);

        let completionPercentage = 37 + scaledQbAwareness + scaledQbPass + speedVsSpeed + scaledCatch - scaledDefenderAwareness + lineInteraction;
        qb.attempts++;
        if (Math.random() * 100 < completionPercentage) {
          //completion
          qb.completions++;
          target.receptions++;
          let wrSkill = scaleBetween(target.rating, 0, 9, 40, 99);
          let random = Math.random()*8;
          let wrYardage = wrSkill + (Math.random() * scaledQbPass) - random;
          let yardsAfterCatch = scaleBetween(target.speed, 0, 5, 60, 99);
          if (yardsAfterCatch < 0) {
            yardsAfterCatch = 0;
          }
          let tackler;
          yardsGained = Math.round(wrYardage + yardsAfterCatch + yardModifier);
          if(yardsGained > 12){
            tackler = this.selectDBTackler(def);
          }else{
            if(Math.random()*100 > 50){
              tackler = this.selectLBTackler(def);
            }else{
              tackler = this.selectDBTackler(def);
            }
          }
          qb.yards += yardsGained;
          target.yards += yardsGained;
          tackler.tackles++;
          if (this.checkForTouchDown(yardsGained)) {
            qb.touchdowns++;
            target.touchdowns++;
          }
          spotlightPlayer = qb;
          result = " throws a complete pass to " + target.name + " for " + yardsGained + " yards!";
        } else {
          //incomplete check for int
          spotlightPlayer = qb;
          result = " throws an incomplete pass intended for " + target.name;

          let defenderInt = scaleBetween(defender.catch, 0, 5, 40, 99);

          let qbDecisionMaking = scaleBetween(qb.awareness, 0, 5, 40, 99);
          let random  = Math.random()*10;
          let intPercentage = random - qbDecisionMaking + defenderInt;
          // console.log(intPercentage);
          if(intPercentage > Math.random()*100){
            //int
            defender.interceptions++;
            qb.interceptions++;
            let yardsReturned = Math.round(Math.random()*15);
            this.inPossesion = def;
            this.yardMarker = (100 - this.yardMarker) + yardsReturned;
            this.down = 1;
            this.yardsToFirst = 10;
            spotlightPlayer = defender;
            result = " intercepts  " + qb.name;
          }




          yardsGained = 0;
        }

      } else {
        //run
        let runner = this.selectRunner(off);

        let initialYardage = scaleBetween(runner.speed, 0, 4, 40, 99);

        let yardsAfterContact = scaleBetween(runner.rush, 0, 4, 40, 99);

        let randYards = Math.random()*4;

        yardsGained = Math.round(initialYardage - randYards + yardModifier + lineInteraction + yardsAfterContact);

        // console.log(`lineInteraction:  ${lineInteraction}`);
        // console.log(`initialYdg:  ${initialYardage}`);
        // console.log(`randYards:  ${randYards}`);
        // console.log(`ydsGained:  ${yardsGained}`);
        // console.log(' ');



        if(yardsGained > 12){
          tackler = this.selectDBTackler(def);
        }else{
          if(Math.random()*100 > 50){
            tackler = this.selectLBTackler(def);
          }else{
            tackler = this.selectDLTackler(def);
          }
        }

        tackler.tackles++;
        runner.rushAttempts++;
        runner.rushYards += yardsGained;
        if (this.checkForTouchDown(yardsGained)) {
          runner.rushTouchdowns++;
        }
        spotlightPlayer = runner;
        result = " runs for " + yardsGained + " yards";
      }

      // console.log('time: ' + this.time);
      // console.log('down: ' + this.down);
      // console.log('yardsToFirst: ' + this.yardsToFirst);
      // console.log('yardMarker: ' + this.yardMarker);
      // console.log(this.inPossesion.name);
      // console.log(off.name);
      // console.log('uhhhhhhhhhh');


      this.time -= Math.round(25 + Math.random() * 20);
      this.down++;
      this.yardsToFirst -= yardsGained;
      this.yardMarker += yardsGained;

      if (this.yardsToFirst <= 0) {
        this.down = 1;
        this.yardsToFirst = 10;
      }

      if (this.yardMarker >= 100) {
        //touchdown
        result = 'TOUCHDOWN! ' + result;
        if (off === home) {
          this.homescore += 7;
        } else {
          this.awayscore += 7;
        }
        this.inPossesion = def;
        this.yardMarker = 20;
        this.down = 1;
        this.yardsToFirst = 10;

      }
    }


    this.possResult.unshift({
      shooter: spotlightPlayer,
      result: result,
      homeScore: this.homescore,
      awayScore: this.awayscore
    })


  }

  clearStats() {
    //clearStats
    //lineup bug fix
    // home.lineup=[];
    // home.lineup = home.lineup.concat(home.firstTeam);
    // away.lineup=[];
    // away.lineup = away.lineup.concat(away.firstTeam);
    // this.manageLineupUsage(home);
    // this.manageLineupUsage(away);

    for (let i = 0; i < home.roster.length; i++) {
      //clear in game stats
      home.roster[i].completions = 0;
      home.roster[i].attempts = 0;
      home.roster[i].touchdowns = 0;
      home.roster[i].yards = 0;
      home.roster[i].rushYards = 0;
      home.roster[i].rushAttempts = 0;
      home.roster[i].rushTouchdowns = 0;
      home.roster[i].kicksAttempted = 0;
      home.roster[i].kicksMade = 0;
      home.roster[i].receptions = 0;
      home.roster[i].tackles = 0;
      home.roster[i].interceptions = 0;
      home.roster[i].fumbles = 0;
      home.roster[i].fumblesRecovered = 0;
      home.roster[i].sacks = 0;
    }

    for (let i = 0; i < away.roster.length; i++) {
      //clear in game stats
      away.roster[i].completions = 0;
      away.roster[i].attempts = 0;
      away.roster[i].touchdowns = 0;
      away.roster[i].yards = 0;
      away.roster[i].rushYards = 0;
      away.roster[i].rushAttempts = 0;
      away.roster[i].rushTouchdowns = 0;
      away.roster[i].kicksAttempted = 0;
      away.roster[i].kicksMade = 0;
      away.roster[i].receptions = 0;
      away.roster[i].tackles = 0;
      away.roster[i].interceptions = 0;
      away.roster[i].fumbles = 0;
      away.roster[i].fumblesRecovered = 0;
      away.roster[i].sacks = 0;
    }
  }

  jumpBall() {
    if (Math.floor(Math.random() * 2) > 0) {
      return true;
    } else {
      return false;
    }
  }

  chooseStartingGoalies() {
    let rand = Math.random() * 100;
    let tot = 0;
    for (let i = 0; i < home.goalies.length; i++) {
      tot += home.goalies[i].goalieUsage;
      if (tot >= rand) {
        home.inNet = home.goalies[i];
        home.inNet.gamesStarted++;
        break;
      }
    }

    rand = Math.random() * 100;
    tot = 0;
    for (let i = 0; i < away.goalies.length; i++) {
      tot += away.goalies[i].goalieUsage;
      if (tot >= rand) {
        away.inNet = away.goalies[i];
        away.inNet.gamesStarted++;
        break;
      }
    }
  }

  playGame() {



    this.clearStats();

    // this.chooseStartingGoalies();

    //jumpball
    if (this.jumpBall()) {
      while (this.time > 0) {
        while (this.inPossesion === home) {
          this.footballPlay(home, away);
        }
        while (this.inPossesion === away) {
          this.footballPlay(away, home);
        }
        if (this.time <= 0) {
          if (this.homescore === this.awayscore) {
            this.overtime = true;
            this.time = 5 * 60;
          }
        }
      }
    } else {
      while (this.time > 0) {
        while (this.inPossesion === away) {
          this.footballPlay(away, home);
        }
        while (this.inPossesion === home) {
          this.footballPlay(home, away);
        }
        if (this.time <= 0) {
          if (this.homescore === this.awayscore) {
            this.overtime = true;
            this.time = 5 * 60;
          }
        }
      }
    }
    this.saveStats();

    //FIX annoying ass gltich
    // home.bench = [...home.constantBench];
    // away.bench = [...away.constantBench];

    // this.homescore = homescore;
    // this.awayscore = awayscore;
    // console.log(this.shotsAtt);
    // console.log('made:' + this.shotsMade);
    // console.log(this.threesAtt);
    // console.log(this.threesMade);
  }

  saveStats() {
    //LOOP TO SET STATS IN HISTORY
    home.seasonPoints += this.homescore;
    home.seasonPointsAllowed += this.awayscore;

    //reset starters
    // home.onIce = home.offLine1.concat(home.defLine1);
    // away.onIce = away.offLine1.concat(away.defLine1);

    away.seasonPoints += this.awayscore;
    away.seasonPointsAllowed += this.homescore;

    for (let i = 0; i < home.roster.length; i++) {
      home.roster[i].statsHistory.push({
        completions: home.roster[i].completions ,
        attempts: home.roster[i].attempts ,
        touchdowns: home.roster[i].touchdowns ,
        yards: home.roster[i].yards ,
        rushYards: home.roster[i].rushYards ,
        rushAttempts: home.roster[i].rushAttempts ,
        rushTouchdowns: home.roster[i].rushTouchdowns ,
        kicksAttempted: home.roster[i].kicksAttempted ,
        kicksMade: home.roster[i].kicksMade ,
        receptions: home.roster[i].receptions ,
        tackles: home.roster[i].tackles ,
        interceptions: home.roster[i].interceptions ,
        fumbles: home.roster[i].fumbles ,
        fumblesRecovered: home.roster[i].fumblesRecovered ,
        sacks: home.roster[i].sacks 
      });
      home.roster[i].seasonCompletions += home.roster[i].completions,
        home.roster[i].seasonAttempts += home.roster[i].attempts,
        home.roster[i].seasonTouchdowns += home.roster[i].touchdowns,
        home.roster[i].seasonYards += home.roster[i].yards,
        home.roster[i].seasonRushYards += home.roster[i].rushYards,
        home.roster[i].seasonRushAttempts += home.roster[i].rushAttempts,
        home.roster[i].seasonRushTouchdowns += home.roster[i].rushTouchdowns,
        home.roster[i].seasonKicksAttempted += home.roster[i].kicksAttempted,
        home.roster[i].seasonKicksMade += home.roster[i].kicksMade,
        home.roster[i].seasonReceptions += home.roster[i].receptions,
        home.roster[i].seasonTackles += home.roster[i].tackles,
        home.roster[i].seasonInterceptions += home.roster[i].interceptions,
        home.roster[i].seasonFumbles += home.roster[i].fumbles,
        home.roster[i].seasonFumblesRecovered += home.roster[i].fumblesRecovered,
        home.roster[i].seasonSacks += home.roster[i].sacks
    }

    for (let i = 0; i < away.roster.length; i++) {
      away.roster[i].statsHistory.push({
        completions: away.roster[i].completions,
        attempts: away.roster[i].attempts,
        touchdowns: away.roster[i].touchdowns,
        yards: away.roster[i].yards,
        rushYards: away.roster[i].rushYards,
        rushAttempts: away.roster[i].rushAttempts,
        rushTouchdowns: away.roster[i].rushTouchdowns,
        kicksAttempted: away.roster[i].kicksAttempted,
        kicksMade: away.roster[i].kicksMade,
        receptions: away.roster[i].receptions,
        tackles: away.roster[i].tackles,
        interceptions: away.roster[i].interceptions,
        fumbles: away.roster[i].fumbles,
        fumblesRecovered: away.roster[i].fumblesRecovered,
        sacks: away.roster[i].sacks
      });
      away.roster[i].seasonCompletions += away.roster[i].completions,
        away.roster[i].seasonAttempts += away.roster[i].attempts,
        away.roster[i].seasonTouchdowns += away.roster[i].touchdowns,
        away.roster[i].seasonYards += away.roster[i].yards,
        away.roster[i].seasonRushYards += away.roster[i].rushYards,
        away.roster[i].seasonRushAttempts += away.roster[i].rushAttempts,
        away.roster[i].seasonRushTouchdowns += away.roster[i].rushTouchdowns,
        away.roster[i].seasonKicksAttempted += away.roster[i].kicksAttempted,
        away.roster[i].seasonKicksMade += away.roster[i].kicksMade,
        away.roster[i].seasonReceptions += away.roster[i].receptions,
        away.roster[i].seasonTackles += away.roster[i].tackles,
        away.roster[i].seasonInterceptions += away.roster[i].interceptions,
        away.roster[i].seasonFumbles += away.roster[i].fumbles,
        away.roster[i].seasonFumblesRecovered += away.roster[i].fumblesRecovered,
        away.roster[i].seasonSacks += away.roster[i].sacks
    }
  
  }
}

export class Season {
  constructor() {
    this.games = gamesPerSeason;
    this.day = 0;
    this.endOfSeason = false;

    //clear stats
    for (let i = 0; i < teams.length; i++) {
      teams[i].wins = 0;
      teams[i].losses = 0;
      teams[i].schedule = [];
      teams[i].played = [];
      teams[i].seasonPoints = 0;
      teams[i].seasonPointsAllowed = 0;
      teams[i].seasonSaves = 0;
      teams[i].seasonGoalsAllowed = 0;
      teams[i].seasonShots = 0;
      teams[i].seasonAssists = 0;

      for (let j = 0; j < teams[i].roster.length; j++) {
        teams[i].roster[j].completions = 0;
        teams[i].roster[j].attempts = 0;
        teams[i].roster[j].touchdowns = 0;
        teams[i].roster[j].yards = 0;
        teams[i].roster[j].rushYards = 0;
        teams[i].roster[j].rushAttempts = 0;
        teams[i].roster[j].rushTouchdowns = 0;
        teams[i].roster[j].kicksAttempted = 0;
        teams[i].roster[j].kicksMade = 0;
        teams[i].roster[j].receptions = 0;
        teams[i].roster[j].tackles = 0;
        teams[i].roster[j].interceptions = 0;
        teams[i].roster[j].fumbles = 0;
        teams[i].roster[j].fumblesRecovered = 0;
        teams[i].roster[j].sacks = 0;
    
        teams[i].roster[j].seasonCompletions = 0;
        teams[i].roster[j].seasonAttempts = 0;
        teams[i].roster[j].seasonTouchdowns = 0;
        teams[i].roster[j].seasonYards = 0;
        teams[i].roster[j].seasonRushYards = 0;
        teams[i].roster[j].seasonRushAttempts = 0;
        teams[i].roster[j].seasonRushTouchdowns = 0;
        teams[i].roster[j].seasonKicksAttempted = 0;
        teams[i].roster[j].seasonKicksMade = 0;
        teams[i].roster[j].seasonReceptions = 0;
        teams[i].roster[j].seasonTackles = 0;
        teams[i].roster[j].seasonInterceptions = 0;
        teams[i].roster[j].seasonFumbles = 0;
        teams[i].roster[j].seasonFumblesRecovered = 0;
        teams[i].roster[j].seasonSacks = 0;
      }
    }
    //for free agents

    for (let i = 0; i < availableFreeAgents.roster.length; i++) {
      availableFreeAgents.roster[i].completions = 0;
      availableFreeAgents.roster[i].attempts = 0;
      availableFreeAgents.roster[i].touchdowns = 0;
      availableFreeAgents.roster[i].yards = 0;
      availableFreeAgents.roster[i].rushYards = 0;
      availableFreeAgents.roster[i].rushAttempts = 0;
      availableFreeAgents.roster[i].rushTouchdowns = 0;
      availableFreeAgents.roster[i].kicksAttempted = 0;
      availableFreeAgents.roster[i].kicksMade = 0;
      availableFreeAgents.roster[i].receptions = 0;
      availableFreeAgents.roster[i].tackles = 0;
      availableFreeAgents.roster[i].interceptions = 0;
      availableFreeAgents.roster[i].fumbles = 0;
      availableFreeAgents.roster[i].fumblesRecovered = 0;
      availableFreeAgents.roster[i].sacks = 0;
  
      availableFreeAgents.roster[i].seasonCompletions = 0;
      availableFreeAgents.roster[i].seasonAttempts = 0;
      availableFreeAgents.roster[i].seasonTouchdowns = 0;
      availableFreeAgents.roster[i].seasonYards = 0;
      availableFreeAgents.roster[i].seasonRushYards = 0;
      availableFreeAgents.roster[i].seasonRushAttempts = 0;
      availableFreeAgents.roster[i].seasonRushTouchdowns = 0;
      availableFreeAgents.roster[i].seasonKicksAttempted = 0;
      availableFreeAgents.roster[i].seasonKicksMade = 0;
      availableFreeAgents.roster[i].seasonReceptions = 0;
      availableFreeAgents.roster[i].seasonTackles = 0;
      availableFreeAgents.roster[i].seasonInterceptions = 0;
      availableFreeAgents.roster[i].seasonFumbles = 0;
      availableFreeAgents.roster[i].seasonFumblesRecovered = 0;
      availableFreeAgents.roster[i].seasonSacks = 0;
    }

    for (let i = 0; i < this.games; i++) {
      shuffle(teams);
      for (let j = 0; j < teams.length; j++) {
        if (teams[j].schedule[i] == null) {
          try {
            teams[j].schedule[i] = teams[j + 1];
            teams[j + 1].schedule[i] = teams[j];
          } catch {
            teams[j].schedule[i] = teams[j];
          }
        }
      }
    }
  }

  manualDay() {
    if (this.games <= this.day) {
      this.endOfSeason = true;
      return;
    }
    home = selectedTeam;
    away = home.schedule[this.day];
    if (home.played[this.day] == null) {
      let game = new Game();
      return game;
    }
  }

  simDay() {
    if (this.games <= this.day) {
      this.endOfSeason = true;
      return;
    }

    for (let i = 0; i < teams.length; i++) {
      home = teams[i];
      away = home.schedule[this.day];
      if (home === away) {
        //bye week
        home.played[this.day] = new Results(1, 0);
        home.wins++;
        for (let i = 0; i < home.roster.length; i++) {
          home.roster[i].statsHistory.push({
            goals: 0,
            saves: 0,
            goalsAllowed: 0,
            shots: 0,
            assists: 0
          });
        }
      } else {
        if (home.played[this.day] == null) {
          let game = new Game();
          game.playGame();
          home.played[this.day] = new Results(game.homescore, game.awayscore);
          away.played[this.day] = new Results(game.awayscore, game.homescore);

          if (game.homescore > game.awayscore) {
            home.wins++;
            if (game.overtime) {
              away.otLosses++;
            }
            away.losses++;
          } else {
            if (game.overtime) {
              home.otLosses++;
            }
            home.losses++;
            away.wins++;
          }

          //WHY WAS THIS IN HERE????? UHH WHAT

          // availableFreeAgents.roster[i].statsHistory.push({
          //     points: 0,
          //     twoPointersAtt: 0,
          //     twoPointersMade: 0,
          //     rebounds: 0,
          //     threePointersAtt: 0,
          //     threePointersMade: 0
          // });
        }
      }
    }

    for (let i = 0; i < availableFreeAgents.roster.length; i++) {
      availableFreeAgents.roster[i].statsHistory.push({
        points: 0,
        twoPointersAtt: 0,
        twoPointersMade: 0,
        rebounds: 0,
        threePointersAtt: 0,
        threePointersMade: 0
      });
    }
    this.day++;
  }
  simToEnd() {
    while (this.day < this.games) {
      if (this.games <= this.day) {
        this.endOfSeason = true;
        return;
      }

      for (let i = 0; i < teams.length; i++) {
        home = teams[i];
        away = home.schedule[this.day];
        if (home === away) {
          //bye week
          home.played[this.day] = new Results(1, 0);
          home.wins++;
          for (let i = 0; i < home.roster.length; i++) {
            home.roster[i].statsHistory.push({
              goals: 0,
              saves: 0,
              goalsAllowed: 0,
              shots: 0,
              assists: 0
            });
          }
        } else {
          if (home.played[this.day] == null) {
            let game = new Game();
            game.playGame();
            home.played[this.day] = new Results(game.homescore, game.awayscore);
            away.played[this.day] = new Results(game.awayscore, game.homescore);
            if (game.homescore > game.awayscore) {
              home.wins++;
              if (game.overtime) {
                away.otLosses++;
              }
              away.losses++;
            } else {
              if (game.overtime) {
                home.otLosses++;
              }
              home.losses++;
              away.wins++;
            }
          }
        }
      }
      this.day++;
    }
    this.endOfSeason = true;
  }
}

export class Franchise {
  constructor() {
    this.season = new Season();
    this.offSeason = false;
    this.advance = false;
    this.stage;
    this.currentDraft;
    this.playoffs;
    this.pastChampions = [];
    this.classLength = 0;

    this.retirements = {
      name: "Retirements",
      roster: [],
      logoSrc: "https://i.ibb.co/5h2T9Kq/test.png",
      reorderLineup: function () {
        draftClass.roster.sort(function (a, b) {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return 1;
          return 0;
        });
      }
    };
  }

  startPlayoffs() {
    for (let i = 0; i < conferences.length; i++) {
      conferences[i].teams.sort(function (a, b) {
        if (a.wins > b.wins) return -1;
        if (a.wins < b.wins) return 1;
        return 0;
      });
    }

    //JUST IN CASE OF PLAYOFF SEED NUMBER BEING BIGGER THAN CONF TEAMS
    this.playoffs = new Playoffs();
    if (conferencesOn) {
      if (conferences[0].teams.length < playoffSeeds) {
        playoffSeeds = setCustomPlayoffSeeds();
      }
      if (conferences[1].teams.length < playoffSeeds) {
        playoffSeeds = setCustomPlayoffSeeds();
      }

      for (let i = 0; i < playoffSeeds; i++) {
        this.playoffs.eastTeams.push(easternConference.teams[i]);
        this.playoffs.westTeams.push(westernConference.teams[i]);
      }
    } else {
      if (teams.length < playoffSeeds) {
        playoffSeeds = setCustomPlayoffSeeds();
      }

      for (let i = 0; i < playoffSeeds; i++) {
        if (i % 2 == 0) {
          teams[i].conferenceId = 0;
          this.playoffs.eastTeams.push(teams[i]);
        } else {
          teams[i].conferenceId = 1;
          this.playoffs.westTeams.push(teams[i]);
        }
      }
    }

    this.playoffs.playoffMatchupGen();
  }

  sim20() {
    for (let i = 0; i <= 20; i++) {
      this.season.simToEnd();
      sortStandings();
      this.offSeason = true;
      this.advance = true;
      this.startPlayoffs();
      this.playoffs.simPlayoffs();
      this.training();

      //retirments
      this.retirementStage();

      if (!collegeMode) {
        this.currentDraft = this.manualDraft();
        this.currentDraft.simDraft();
        this.checkForBustOrStar();
      }

      this.freeAgencySetup();
      this.freeAgency();
      setSalaryExpectations(availableFreeAgents);
      this.signing();
      //roster size limit
      //temporary

      // this.releasePlayers();

      //new season
      this.advanceToNextYear();
    }
  }

  simDay() {
    this.season.simDay();
    sortStandings();
    this.checkForOffseason();
  }
  simToEnd() {
    this.season.simToEnd();
    sortStandings();
    if (this.offSeason === true) {
      this.advance = true;
    }
    this.checkForOffseason();
  }

  checkForOffseason() {
    if (this.season.endOfSeason === true) {
      this.stage = "playoffs";
      this.simStage();
    }
  }

  simStage() {
    //playoffs

    if (this.stage === "playoffs") {
      this.startPlayoffs();
      this.offSeason = true;
    }

    //training and age ++
    if (this.stage === "retirements") {
      this.training();

      //retirments
      this.retirementStage();
    }
    if (this.stage === "draft") {
      //draft
      this.currentDraft = this.manualDraft();
    }
    if (this.stage === "resigning") {
      //bust or star for drafted
      if (!collegeMode) {
        this.checkForBustOrStar();
      }

      //free agency
      this.freeAgencySetup();
    }

    if (this.stage === "freeagency") {
      if (collegeMode) {
        this.freeAgencySetup();
      } else {
        this.freeAgency();
      }

      setSalaryExpectations(availableFreeAgents);
    }

    if (this.stage === "freeagencyend") {
      this.signing();
      //roster size limit
      this.releasePlayers();

      this.trainingPoints();
    }

    if (this.stage === "advance") {
      //new season
      this.advanceToNextYear();
    }
  }

  trainingPoints() {
    for (let i = 0; i < teams.length; i++) {
      teams[i].trainingPoints = trainingPointsAvailable;
      for (let j = 0; j < teams[i].roster.length; j++) {
        teams[i].roster[j].trained = false;
      }
    }
  }

  training() {
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].roster.length; j++) {
        let ply = teams[i].roster[j];
        ply.age++;

        let history = "";
        //SAVE PREVIOUS SEASONS STATS
        history = returnSeasonStatsListView(ply);

        ply.previousSeasonsStats.push({
          team: teams[i].logoSrc,
          data: history
        });

        //to show growth
        ply.passOld = ply.pass;
    ply.awarenessOld = ply.awareness;
    ply.rushOld = ply.rush;
    ply.speedOld = ply.speed;
    ply.catchOld = ply.catch;
    ply.blockOld = ply.block;
    ply.breakBlockOld = ply.breakBlock;
    ply.tackleOld = ply.tackle;
    ply.kickOld = ply.kick;
    

          //slight boost for really young players
          if (ply.age <= 23) {
            ply.awareness += Math.round(Math.random() * 1);
            if(ply.position === POS_QB){
              ply.pass += Math.round(Math.random() * 1);

            }

            if(ply.position >= POS_HB && ply.position <= POS_TE){
              ply.rush += Math.round(Math.random() * 1);
              ply.speed += Math.round(Math.random() * 1);
              ply.catch += Math.round(Math.random() * 1);
              ply.block += Math.round(Math.random() * 1);
            }

            if(ply.position >= POS_LT && ply.position <= POS_RT){
              ply.block += Math.round(Math.random() * 1);
            }

            if(ply.position >= POS_LE && ply.position <= POS_RE){
              ply.breakBlock += Math.round(Math.random() * 1);
              ply.tackle += Math.round(Math.random() * 1);
            }

            if(ply.position >= POS_LOLB && ply.position <= POS_SS){
              ply.breakBlock += Math.round(Math.random() * 1);
              ply.tackle += Math.round(Math.random() * 1);
              ply.catch += Math.round(Math.random() * 1);
              ply.speed += Math.round(Math.random() * 1);
            }

            if(ply.position >= POS_K && ply.position <= POS_P){
              ply.kick += Math.round(Math.random() * 1);
            }
          }

          if (ply.age <= 26) {
            ply.awareness += Math.round(Math.random() * 4) -1;
            if(ply.position === POS_QB){
              ply.pass += Math.round(Math.random() * 4) -1;

            }

            if(ply.position >= POS_HB && ply.position <= POS_TE){
              ply.rush += Math.round(Math.random() * 4) -1;
              ply.speed += Math.round(Math.random() * 4) -1;
              ply.catch += Math.round(Math.random() * 4) -1;
              ply.block += Math.round(Math.random() * 4) -1;
            }

            if(ply.position >= POS_LT && ply.position <= POS_RT){
              ply.block += Math.round(Math.random() * 4) -1;
            }

            if(ply.position >= POS_LE && ply.position <= POS_RE){
              ply.breakBlock += Math.round(Math.random() * 4) -1;
              ply.tackle += Math.round(Math.random() * 4) -1;
            }

            if(ply.position >= POS_LOLB && ply.position <= POS_SS){
              ply.breakBlock += Math.round(Math.random() * 4) -1;
              ply.tackle += Math.round(Math.random() * 4) -1;
              ply.catch += Math.round(Math.random() * 4) -1;
              ply.speed += Math.round(Math.random() * 4) -1;
            }

            if(ply.position >= POS_K && ply.position <= POS_P){
              ply.kick += Math.round(Math.random() * 4) -1;
            }
          } else if (ply.age < 30) {
            ply.awareness += Math.round(Math.random()  *2);
            if(ply.position === POS_QB){
              ply.pass += Math.round(Math.random()  *2);

            }

            if(ply.position >= POS_HB && ply.position <= POS_TE){
              ply.rush += Math.round(Math.random() * 2);
              ply.speed += Math.round(Math.random() * 2);
              ply.catch += Math.round(Math.random() * 2);
              ply.block += Math.round(Math.random() * 2);
            }

            if(ply.position >= POS_LT && ply.position <= POS_RT){
              ply.block += Math.round(Math.random() * 2);
            }

            if(ply.position >= POS_LE && ply.position <= POS_RE){
              ply.breakBlock += Math.round(Math.random() * 2);
              ply.tackle += Math.round(Math.random() * 2);
            }

            if(ply.position >= POS_LOLB && ply.position <= POS_SS){
              ply.breakBlock += Math.round(Math.random() * 2);
              ply.tackle += Math.round(Math.random() * 2);
              ply.catch += Math.round(Math.random() * 2);
              ply.speed += Math.round(Math.random() * 2);
            }

            if(ply.position >= POS_K && ply.position <= POS_P){
              ply.kick += Math.round(Math.random() * 2);
            }
          } else if (ply.age < 35) {
            ply.awareness += Math.round(Math.random()  *3);
            if(ply.position === POS_QB){
              ply.pass += Math.round(Math.random() * 3) -3;

            }

            if(ply.position >= POS_HB && ply.position <= POS_TE){
              ply.rush += Math.round(Math.random() * 3) -3;
              ply.speed += Math.round(Math.random() * 3) -3;
              ply.catch += Math.round(Math.random() * 3) -3;
              ply.block += Math.round(Math.random() * 3) -3;
            }

            if(ply.position >= POS_LT && ply.position <= POS_RT){
              ply.block += Math.round(Math.random() * 3) -3;
            }

            if(ply.position >= POS_LE && ply.position <= POS_RE){
              ply.breakBlock += Math.round(Math.random() * 3) -3;
              ply.tackle += Math.round(Math.random() * 3) -3;
            }

            if(ply.position >= POS_LOLB && ply.position <= POS_SS){
              ply.breakBlock += Math.round(Math.random() * 3) -3;
              ply.tackle += Math.round(Math.random() * 3) -3;
              ply.catch += Math.round(Math.random() * 3) -3;
              ply.speed += Math.round(Math.random() * 3) -3;
            }

            if(ply.position >= POS_K && ply.position <= POS_P){
              ply.kick += Math.round(Math.random() * 3) -3;
            }
          } else {
            ply.awareness += Math.round(Math.random()  *1);
            if(ply.position === POS_QB){
              ply.pass -= Math.round(Math.random() *5);

            }

            if(ply.position >= POS_HB && ply.position <= POS_TE){
              ply.rush -= Math.round(Math.random() *5);
              ply.speed -= Math.round(Math.random() *5);
              ply.catch -= Math.round(Math.random() *5);
              ply.block -= Math.round(Math.random() *5);
            }

            if(ply.position >= POS_LT && ply.position <= POS_RT){
              ply.block -= Math.round(Math.random() *5);
            }

            if(ply.position >= POS_LE && ply.position <= POS_RE){
              ply.breakBlock -= Math.round(Math.random() *5);
              ply.tackle -= Math.round(Math.random() *5);
            }

            if(ply.position >= POS_LOLB && ply.position <= POS_SS){
              ply.breakBlock -= Math.round(Math.random() *5);
              ply.tackle -= Math.round(Math.random() *5);
              ply.catch -= Math.round(Math.random() *5);
              ply.speed -= Math.round(Math.random() *5);
            }

            if(ply.position >= POS_K && ply.position <= POS_P){
              ply.kick -= Math.round(Math.random() *5);
            }
          }

          if (Math.random() * 500 >= 499) {
            //BREAKOUT PLYER
            // console.log(ply.name);
            // console.log(ply.rating);
            // console.log(ply.teamName);
            ply.awareness += Math.round(Math.random() * 10);
            if(ply.position === POS_QB){
              ply.pass += Math.round(Math.random() * 10);

            }

            if(ply.position >= POS_HB && ply.position <= POS_TE){
              ply.rush += Math.round(Math.random() * 10);
              ply.speed += Math.round(Math.random() * 10);
              ply.catch += Math.round(Math.random() * 10);
              ply.block += Math.round(Math.random() * 10);
            }

            if(ply.position >= POS_LT && ply.position <= POS_RT){
              ply.block += Math.round(Math.random() * 10);
            }

            if(ply.position >= POS_LE && ply.position <= POS_RE){
              ply.breakBlock += Math.round(Math.random() * 10);
              ply.tackle += Math.round(Math.random() * 10);
            }

            if(ply.position >= POS_LOLB && ply.position <= POS_SS){
              ply.breakBlock += Math.round(Math.random() * 10);
              ply.tackle += Math.round(Math.random() * 10);
              ply.catch += Math.round(Math.random() * 10);
              ply.speed += Math.round(Math.random() * 10);
            }

            if(ply.position >= POS_K && ply.position <= POS_P){
              ply.kick += Math.round(Math.random() * 10);
            }
          }
        }

        ply.calculateRating();
      }

    for (let i = 0; i < availableFreeAgents.roster.length; i++) {
      let ply = availableFreeAgents.roster[i];

      //need to double check free agents never aged?
      ply.age++;

      //fix for free agents having no history
      let history = "";
      //SAVE PREVIOUS SEASONS STATS
      history = returnSeasonStatsListView(ply);

      ply.previousSeasonsStats.push({
        team: availableFreeAgents.logoSrc,
        data: history
      });

      ply.awareness -= Math.round(Math.random()  *6);
            if(ply.position === POS_QB){
              ply.pass -= Math.round(Math.random() *6);

            }

            if(ply.position >= POS_HB && ply.position <= POS_TE){
              ply.rush -= Math.round(Math.random() *6);
              ply.speed -= Math.round(Math.random() *6);
              ply.catch -= Math.round(Math.random() *6);
              ply.block -= Math.round(Math.random() *6);
            }

            if(ply.position >= POS_LT && ply.position <= POS_RT){
              ply.block -= Math.round(Math.random() *6);
            }

            if(ply.position >= POS_LE && ply.position <= POS_RE){
              ply.breakBlock -= Math.round(Math.random() *6);
              ply.tackle -= Math.round(Math.random() *6);
            }

            if(ply.position >= POS_LOLB && ply.position <= POS_SS){
              ply.breakBlock -= Math.round(Math.random() *6);
              ply.tackle -= Math.round(Math.random() *6);
              ply.catch -= Math.round(Math.random() *6);
              ply.speed -= Math.round(Math.random() *6);
            }

            if(ply.position >= POS_K && ply.position <= POS_P){
              ply.kick -= Math.round(Math.random() *6);
            }

      ply.calculateRating();
    }
  }

  checkForBustOrStar() {
    for (let i = 0; i < this.currentDraft.drafted.roster.length; i++) {
      let rand = Math.floor(Math.random() * 60);
      let ply = this.currentDraft.drafted.roster[i];
      if (rand === 1) {
        //bust
        let diff = Math.round(scaleBetween(ply.rating, 0, 15, 60, 90));
        if (ply.position === 4) {
          ply.positioning -= diff;
          ply.reflexes -= diff;
        } else {
          ply.off -= diff;
          ply.def -= diff;
        }
        // console.log(ply.name + ' ' + ply.rating + ' ' + diff + ply.teamName + ' bust');
      }
      if (rand === 2) {
        //breakout star
        let diff = Math.round(scaleBetween(ply.rating, 15, 0, 60, 90));
        if (ply.position === 4) {
          ply.positioning += diff;
          ply.reflexes += diff;
        } else {
          ply.off += diff;
          ply.def += diff;
        }
        // console.log(ply.name + ' ' + ply.rating + ' ' + diff + ply.teamName + ' star');
      }

      //randomize player ratings a little bit
      let randomFactor = Math.floor(Math.random() * 7) - 3;

      if (ply.position === 4) {
        ply.positioning += randomFactor;
        ply.reflexes += randomFactor;
      } else {
        ply.off += randomFactor;
        //nba bug found
        ply.def += randomFactor;
        ply.faceOff += randomFactor;
        ply.pass += randomFactor;
      }

      ply.calculateRating();
    }
  }

  signing() {
    for (let i = 0; i < teams.length; i++) {
      teams[i].reorderLineup();

      teams[i].salary = 0;
    }

    teams.sort(function (a, b) {
      if (a.wins < b.wins) {
        return 1;
      }
      if (a.wins > b.wins) {
        return -1;
      }
      return 0;
    });

    availableFreeAgents.roster.sort(function (a, b) {
      if (a.rating < b.rating) {
        return 1;
      }
      if (a.rating > b.rating) {
        return -1;
      }
      return 0;
    });

    for (let i = 0; i < teams.length; i++) {
      if (teams[i] === selectedTeam && !autoSign) {
        console.log("autosign off");
      } else {
        for (let j = 0; j < availableFreeAgents.roster.length; j++) {
          if (
            teams[i].qbs.length < POS_QB_REQUIREMENTS &&
            availableFreeAgents.roster[j].position === POS_QB
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;

              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;
              teams[i].C++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }

          if (
            teams[i].rbs.length < POS_HB_REQUIREMENTS &&
            availableFreeAgents.roster[j].position === POS_HB
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;

              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;
              teams[i].lw++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }

          if (
            teams[i].fbs.length < POS_FB_REQUIREMENTS &&
            availableFreeAgents.roster[j].position === POS_FB
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;

              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;
              teams[i].rw++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }

          if (
            teams[i].wrs.length < POS_WR_REQUIREMENTS &&
            availableFreeAgents.roster[j].position === POS_WR
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;

              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;
              teams[i].d++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }

          if (
            teams[i].tes.length < POS_TE_REQUIREMENTS &&
            availableFreeAgents.roster[j].position === POS_TE
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;
              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;

              teams[i].g++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }

          if (
            teams[i].ol.length < POS_OL_REQUIREMENTS &&
            availableFreeAgents.roster[j].position >= POS_LT && availableFreeAgents.roster[j].position <= POS_RT
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;
              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;

              teams[i].g++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }

          if (
            teams[i].dl.length < POS_DL_REQUIREMENTS &&
            availableFreeAgents.roster[j].position >= POS_LE && availableFreeAgents.roster[j].position <= POS_RE
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;
              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;

              teams[i].g++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }

          if (
            teams[i].dbs.length < POS_DB_REQUIREMENTS &&
            availableFreeAgents.roster[j].position >= POS_CB && availableFreeAgents.roster[j].position <= POS_SS
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;
              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;

              teams[i].g++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }

          if (
            teams[i].ks.length < POS_K_REQUIREMENTS &&
            availableFreeAgents.roster[j].position === POS_K
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;
              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;

              teams[i].g++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }

          if (
            teams[i].ps.length < POS_P_REQUIREMENTS &&
            availableFreeAgents.roster[j].position === POS_P
          ) {
            if (canSign(teams[i], availableFreeAgents.roster[j].salary)) {
              availableFreeAgents.roster[j].teamName = teams[i].name;
              availableFreeAgents.roster[j].teamLogoSrc = teams[i].logoSrc;
              availableFreeAgents.roster[j].years =
                Math.floor(Math.random() * 4) + 1;
              teams[i].roster.push(availableFreeAgents.roster[j]);
              teams[i].salary += availableFreeAgents.roster[j].salary;

              teams[i].g++;
              availableFreeAgents.roster.splice(j, 1);
            }
          }
        }

        while (teams[i].roster.length < 53) {
          if (teams[i] != selectedTeam) {
            let index = Math.floor(Math.random() * 20);
            if (index >= availableFreeAgents.roster.length) {
              index = 0;
            }
            let signing = availableFreeAgents.roster[index];
            signing.salary = VETERANSMINIMUM;
            if (canSign(teams[i], signing.salary)) {
              signing.teamName = teams[i].name;
              signing.teamLogoSrc = teams[i].logoSrc;
              signing.years = 1;
              teams[i].roster.push(signing);
              teams[i].salary += signing.salary;
              availableFreeAgents.roster.splice(index, 1);
            }
          } else {
            let index = Math.floor(
              Math.random() * availableFreeAgents.roster.length
            );
            let signing = availableFreeAgents.roster[index];
            if (canSign(teams[i], signing.salary)) {
              signing.teamName = teams[i].name;
              signing.teamLogoSrc = teams[i].logoSrc;
              signing.years = 1;
              teams[i].roster.push(signing);
              teams[i].salary += signing.salary;
              availableFreeAgents.roster.splice(index, 1);
            }
          }
        }
      }
    }
  }

  freeAgencySetup() {
    if (collegeMode) {
      generateFreeAgents(this.classLength * 3, 12);

      for (let i = 0; i < teams.length; i++) {
        teams[i].salary = Math.round(
          scaleBetween(teams[i].seed, 75000000, 105000000, 0, teams.length)
        );
        if (teams[i] === this.playoffs.champs) {
          teams[i].salary -= 10000000;
        }
      }
    } else {
      for (let i = 0; i < teams.length; i++) {
        teams[i].expiring.roster = [];
        let underContract = [];
        for (let j = 0; j < teams[i].roster.length; j++) {
          teams[i].roster[j].years -= 1;

          if (teams[i].roster[j].years <= 0) {
            teams[i].expiring.roster.push(teams[i].roster[j]);
          } else {
            underContract.push(teams[i].roster[j]);
          }
        }
        teams[i].roster = underContract;
        setSalaryExpectations(teams[i].expiring);
      }
      setTeamSalaries();
    }
  }

  freeAgency() {
    let released = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i] === selectedTeam) {
        //user
        for (let j = 0; j < teams[i].expiring.roster.length; j++) {
          if (
            teams[i].salary + teams[i].expiring.roster[j].salary <= CAPROOM ||
            teams[i].expiring.roster[j].salary <= VETERANSMINIMUM
          ) {
            //CPU RESIGN LOGIC
            if (teams[i].expiring.roster[j].rating > 84) {
              if (Math.random() * 10 < 8) {
                teams[i].expiring.roster[j].years =
                  Math.floor(Math.random() * 4) + 1;
                teams[i].roster.push(teams[i].expiring.roster[j]);
                teams[i].salary += teams[i].expiring.roster[j];
              } else {
                released.push(teams[i].expiring.roster[j]);
              }
            } else if (teams[i].expiring.roster[j].rating > 76) {
              if (Math.random() * 10 < 6) {
                teams[i].expiring.roster[j].years =
                  Math.floor(Math.random() * 4) + 1;
                teams[i].roster.push(teams[i].expiring.roster[j]);
                teams[i].salary += teams[i].expiring.roster[j];
              } else {
                released.push(teams[i].expiring.roster[j]);
              }
            } else if (teams[i].expiring.roster[j].rating > 69) {
              if (Math.random() * 10 < 4) {
                teams[i].expiring.roster[j].years =
                  Math.floor(Math.random() * 4) + 1;
                teams[i].roster.push(teams[i].expiring.roster[j]);
                teams[i].salary += teams[i].expiring.roster[j];
              } else {
                released.push(teams[i].expiring.roster[j]);
              }
            } else {
              released.push(teams[i].expiring.roster[j]);
            }
          } else {
            released.push(teams[i].expiring.roster[j]);
          }
        }
      } else {
        for (let j = 0; j < teams[i].expiring.roster.length; j++) {
          //CPU RESIGN LOGIC
          if (teams[i].expiring.roster[j].rating > 84) {
            if (Math.random() * 10 < 8) {
              teams[i].expiring.roster[j].years =
                Math.floor(Math.random() * 4) + 1;
              teams[i].roster.push(teams[i].expiring.roster[j]);
            } else {
              released.push(teams[i].expiring.roster[j]);
            }
          } else if (teams[i].expiring.roster[j].rating > 76) {
            if (Math.random() * 10 < 6) {
              teams[i].expiring.roster[j].years =
                Math.floor(Math.random() * 4) + 1;
              teams[i].roster.push(teams[i].expiring.roster[j]);
            } else {
              released.push(teams[i].expiring.roster[j]);
            }
          } else if (teams[i].expiring.roster[j].rating > 69) {
            if (Math.random() * 10 < 4) {
              teams[i].expiring.roster[j].years =
                Math.floor(Math.random() * 4) + 1;
              teams[i].roster.push(teams[i].expiring.roster[j]);
            } else {
              released.push(teams[i].expiring.roster[j]);
            }
          } else {
            released.push(teams[i].expiring.roster[j]);
          }
        }
      }
    }
    for (let r = 0; r < released.length; r++) {
      availableFreeAgents.roster.push(released[r]);
    }

    for (let i = 0; i < teams.length; i++) {
      teams[i].expiring.roster = [];
    }

    setTeamSalaries();
  }

  releasePlayers() {
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].roster.length > rosterSize) {
        teams[i].roster.sort(function (a, b) {
          if (a.rating > b.rating) {
            return 1;
          }
          if (a.rating < b.rating) {
            return -1;
          }
          return 0;
        });
        // while (teams[i].roster.length > rosterSize) {

        //     availableFreeAgents.roster.push(teams[i].roster[0]);
        //     teams[i].roster.splice(0, 1);
        // }

        let fws = 0;
        let def = 0;
        let goalies = 0;

        for (let j = 0; j < teams[i].roster.length; j++) {
          let ply = teams[i].roster[j];
          if (ply.position <= 2) {
            fws++;
          } else if (ply.position === 3) {
            def++;
          } else if (ply.position === 4) {
            goalies++;
          }
        }

        let released = [];
        for (let j = 0; j < teams[i].roster.length; j++) {
          if (fws + def + goalies <= rosterSize) {
            break;
          }
          let ply = teams[i].roster[j];
          if (ply.position <= 2) {
            if (fws - 1 >= 12) {
              fws--;
              released.push(ply);
            }
          } else if (ply.position === 3) {
            if (def - 1 >= 6) {
              def--;
              released.push(ply);
            }
          } else if (ply.position === 4) {
            if (goalies - 1 >= 2) {
              goalies--;
              released.push(ply);
            }
          }
        }

        for (let j = 0; j < released.length; j++) {
          let ply = released[j];
          availableFreeAgents.roster.push(ply);
          teams[i].roster.splice(teams[i].roster.indexOf(ply), 1);
        }
      }
    }

    setTeamSalaries();
  }

  advanceToNextYear() {
    for (let i = 0; i < teams.length; i++) {
      teams[i].history.push({
        wins: teams[i].wins,
        losses: teams[i].losses,
        champions: false
      });
      if (teams[i] === this.playoffs.champs) {
        teams[i].history[teams[i].history.length - 1].champions = true;
        this.pastChampions.push({
          history: teams[i].history[teams[i].history.length - 1],
          logoSrc: teams[i].logoSrc,
          name: teams[i].name
        });
      }
      teams[i].reorderLineup();

      teams[i].draftPicks = [
        {
          round: 1,
          originalTeam: teams[i].name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 2,
          originalTeam: teams[i].name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 3,
          originalTeam: teams[i].name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 4,
          originalTeam: teams[i].name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 5,
          originalTeam: teams[i].name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 6,
          originalTeam: teams[i].name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        },
        {
          round: 7,
          originalTeam: teams[i].name,
          value: null,
          salary: 0,
          isPick: true,
          projectedPick: null,
          currentTeam: null
        }
      ];
    }

    //fix for free agents having old team logos
    for (let i = 0; i < availableFreeAgents.roster.length; i++) {
      availableFreeAgents.roster[i].teamLogoSrc = availableFreeAgents.logoSrc;
      availableFreeAgents.roster[i].teamName = availableFreeAgents.name;
    }

    generateDraftClass();

    while (availableFreeAgents.roster.length > 500) {
      availableFreeAgents.roster.pop();
    }

    //randomize rotation size for teams
    // for (let i = 0; i < teams.length; i++) {
    //   teams[i].rotationSize = Math.round(Math.random() * 2) + 9;
    //   teams[i].reorderLineup();
    // }

    this.offSeason = false;
    this.advance = false;
    this.stage = "";
    this.season = new Season();

    //AUTOSAVE THE FRANCHISE ROSTER

    saveFranchise("Franchise_Autosave");
  }

  retirementStage() {
    this.retirements.roster = [];

    if (collegeMode) {
      for (let i = 0; i < teams.length; i++) {
        for (let j = 0; j < teams[i].roster.length; j++) {
          let player = teams[i].roster[j];
          let rand = Math.random() * 100;
          if ((player.rating >= 88 && rand > 35) || player.age >= 22) {
            this.retirements.roster.push(player);
            let index = teams[i].roster.indexOf(player);
            teams[i].roster.splice(index, 1);
          }

          //check for leave for draft early
        }
      }

      this.classLength = this.retirements.roster.length;
    } else {
      for (let i = 0; i < teams.length; i++) {
        for (let j = 0; j < teams[i].roster.length; j++) {
          let player = teams[i].roster[j];
          if (player.age >= 37 && player.rating < 83) {
            let rand = Math.random() * 2;
            if (rand <= 1) {
              this.retirements.roster.push(player);
              let index = teams[i].roster.indexOf(player);
              teams[i].roster.splice(index, 1);
            }
          }
        }
      }
    }

    availableFreeAgents.roster.sort(function (a, b) {
      if (a.rating > b.rating) {
        return -1;
      }

      if (a.rating < b.rating) {
        return 1;
      }
      return 0;
    });

    setTeamSalaries();
  }

  manualDraft() {
    setPowerRankings();
    let draftOrder = [];

    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].draftPicks.length; j++) {
        let pick = teams[i].draftPicks[j];
        pick.currentTeam = teams[i];
        if (teams[i].name === pick.originalTeam) {
          let pickNum = (teams[i].powerRanking - (teams.length + 1)) * -1;
          pick.projectedPick = pickNum;
        } else {
          //  console.log('traded draft pick detected');
          for (let k = 0; k < teams.length; k++) {
            if (teams[k].name === pick.originalTeam) {
              let pickNum = (teams[k].powerRanking - (teams.length + 1)) * -1;
              pick.projectedPick = pickNum;
            }
          }
        }
        //might break
        draftOrder.push(teams[i].draftPicks[j]);
      }
    }
    draftOrder.sort(function (a, b) {
      if (a.projectedPick > b.projectedPick) {
        return 1;
      }
      if (a.projectedPick < b.projectedPick) {
        return -1;
      } else {
        return 0;
      }
    });

    draftOrder.sort(function (a, b) {
      if (a.round > b.round) {
        return 1;
      }
      if (a.round < b.round) {
        return -1;
      } else {
        return 0;
      }
    });

    draftClass.roster.sort(function (a, b) {
      if (a.rating < b.rating) {
        return 1;
      }
      if (a.rating > b.rating) {
        return -1;
      }
      return 0;
    });

    return (draft = {
      drafted: {
        name: "Drafted",
        roster: [],
        logoSrc: "https://i.ibb.co/5h2T9Kq/test.png",
        reorderLineup: function () {
          availableFreeAgents.roster.sort(function (a, b) {
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;
            return 0;
          });
        }
      },
      round: 0,
      pick: 0,
      picks: 0,
      draftOrder: draftOrder,
      completed: false,
      simPick: function () {
        if (this.completed) {
          return;
        }

        this.pick++;
        this.drafted.roster.unshift(draftClass.roster[0]);
        signPlayer(
          draftOrder[this.pick - 1].currentTeam,
          draftClass.roster[0],
          draftClass.roster[0].years,
          draftClass.roster[0].salary,
          draftClass
        );
        draftOrder[this.pick - 1].currentTeam.draftPicks.shift();
        if (this.pick >= draftOrder.length) {
          this.completed = true;
          inDraft = false;
          return;
        }
      },
      simDraft: function () {
        if (this.completed) {
          return;
        }
        for (let i = this.pick; i < draftOrder.length; i++) {
          this.drafted.roster.unshift(draftClass.roster[0]);
          signPlayer(
            draftOrder[i].currentTeam,
            draftClass.roster[0],
            draftClass.roster[0].years,
            draftClass.roster[0].salary,
            draftClass
          );
          draftOrder[i].currentTeam.draftPicks.shift();
        }
        this.completed = true;
        inDraft = false;
      },
      newDraft: function () {
        this.round = 0;
        this.pick = 0;
        this.completed = false;
      },
      userPick: function (player) {
        if (this.completed) {
          return;
        }
        let index = draftClass.roster.indexOf(player);
        this.pick++;

        this.drafted.roster.unshift(draftClass.roster[index]);
        signPlayer(
          draftOrder[this.pick - 1].currentTeam,
          draftClass.roster[index],
          draftClass.roster[index].years,
          draftClass.roster[index].salary,
          draftClass
        );
        draftOrder[this.pick - 1].currentTeam.draftPicks.shift();
        if (this.pick >= draftOrder.length) {
          this.completed = true;
          inDraft = false;
          return;
        }
      },
      simToNextUserPick: function () {
        try {
          while (draftOrder[this.pick].currentTeam != selectedTeam) {
            if (this.completed) {
              return;
            }
            this.simPick();
          }
        } catch (err) {
          this.completed = true;
          this.pick--;
          //BEING LAZY BUT IT FIXES THE GLITCH WHERE the draft crashes if u dont have another user pick
          return;
        }
      }
    });
  }

  draft() {
    teams.sort(function (a, b) {
      if (a.wins > b.wins) {
        return 1;
      }
      if (a.wins < b.wins) {
        return -1;
      }
      return 0;
    });

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < teams.length; i++) {
        signPlayer(
          teams[i],
          draftClass.roster[i],
          draftClass.roster[i].years,
          draftClass.roster[i].salary,
          draftClass
        );
      }
    }

    generateDraftClass();
  }
}

var shuffle = function (array) {
  var currentIndex = array.length;
  var forwardsVsDefensemenraryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    forwardsVsDefensemenraryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = forwardsVsDefensemenraryValue;
  }

  return array;
};

function sortStandings() {
  if (conferencesOn) {
    for (let i = 0; i < conferences.length; i++) {
      conferences[i].teams.sort(function (a, b) {
        if (a.wins > b.wins) return -1;
        if (a.wins < b.wins) return 1;
        return 0;
      });
      for (let j = 0; j < conferences[i].teams.length; j++) {
        conferences[i].teams[j].seed = j + 1;
      }
    }
  } else {
    //rating first then wins
    teams.sort(function (a, b) {
      if (a.rating > b.rating) return -1;
      if (a.rating < b.rating) return 1;
      return 0;
    });
    teams.sort(function (a, b) {
      if (a.wins > b.wins) return -1;
      if (a.wins < b.wins) return 1;
      return 0;
    });

    for (let i = 0; i < teams.length; i++) {
      teams[i].seed = i + 1;
    }
  }
}

export function standings(conferenceId) {
  let sorted = [];
  sorted = teams;

  if (conferenceId != 3) {
    for (let i = 0; i < conferences.length; i++) {
      if (conferenceId === conferences[i].id) {
        sorted = conferences[i].teams;
      }
    }
  }

  sorted.sort(function (a, b) {
    if (a.rating > b.rating) return -1;
    if (a.rating < b.rating) return 1;
    return 0;
  });

  sorted.sort(function (a, b) {
    if (a.wins > b.wins) return -1;
    if (a.wins < b.wins) return 1;
    return 0;
  });
  return sorted;
}

export function sortedTeams() {
  const sortedTeams = teams;

  sortedTeams.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return sortedTeams;
}

export function sortedRoster(team, sortAttribute) {
  const sortedRoster = team.roster;
  team.roster.sort(function (a, b) {
    if (sortAttribute === "position") {
      if (a.position < b.position) {
        return -1;
      }
      if (a.position > b.position) {
        return 1;
      }
      return 0;
    }
    if (sortAttribute === "rating") {
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      }
      return 0;
    }
    //goals
    if (sortAttribute === "ppg") {
      if (a.seasonTouchdowns > b.seasonTouchdowns) {
        return -1;
      }
      if (a.seasonTouchdowns < b.seasonTouchdowns) {
        return 1;
      }
      return 0;
    }
  });

  return sortedRoster;
}

export function leaugeLeaders() {
  const leaugeLeaders = {
    roster: []
  };

  for (let i = 0; i < teams.length; i++) {
    teams[i].roster.sort(function (a, b) {
      if (a.seasonTouchdowns > b.seasonTouchdowns)
        return -1;
      if (a.seasonTouchdowns < b.seasonTouchdowns)
        return 1;
      return 0;
    });
    for (let j = 0; j < 5; j++) {
      leaugeLeaders.roster.push(teams[i].roster[j]);
    }
  }

  leaugeLeaders.roster.sort(function (a, b) {
    if (a.seasonTouchdowns > b.seasonTouchdowns)
      return -1;
    if (a.seasonTouchdowns < b.seasonTouchdowns)
      return 1;
    return 0;
  });

  return leaugeLeaders;
}

export let selectedTeam2 = teams[5];
export function setSelectedTeam2(team) {
  selectedTeam2 = team;
}

export function trade(team1, team2, t1Offers, t2Offers, isForced) {
  if (interest(t1Offers, t2Offers, isForced)) {
    for (let i = 0; i < t1Offers.length; i++) {
      let ply = t1Offers[i];
      if (ply.isPick === true) {
        if (inDraft) {
          ply.currentTeam = team2;
        }
        console.log("pick");
        team1.draftPicks.splice(team1.draftPicks.indexOf(ply), 1);
        team2.draftPicks.push(ply);
      } else {
        team1.roster.splice(team1.roster.indexOf(ply), 1);
        team2.roster.push(ply);
        ply.teamName = team2.name;
        ply.teamLogoSrc = team2.logoSrc;
      }
    }

    for (let i = 0; i < t2Offers.length; i++) {
      let ply = t2Offers[i];
      if (ply.isPick === true) {
        if (inDraft) {
          ply.currentTeam = team1;
        }
        team2.draftPicks.splice(team2.draftPicks.indexOf(ply), 1);
        team1.draftPicks.push(ply);
      } else {
        team2.roster.splice(team2.roster.indexOf(ply), 1);
        team1.roster.push(ply);
        ply.teamName = team1.name;
        ply.teamLogoSrc = team1.logoSrc;
      }
    }
    team1.reorderLineup();
    team2.reorderLineup();
    setTeamSalaries();

    team1.draftPicks.sort(function (a, b) {
      if (a.projectedPick > b.projectedPick) {
        return 1;
      }
      if (a.projectedPick < b.projectedPick) {
        return -1;
      } else {
        return 0;
      }
    });

    team1.draftPicks.sort(function (a, b) {
      if (a.round > b.round) {
        return 1;
      }
      if (a.round < b.round) {
        return -1;
      } else {
        return 0;
      }
    });

    team2.draftPicks.sort(function (a, b) {
      if (a.projectedPick > b.projectedPick) {
        return 1;
      }
      if (a.projectedPick < b.projectedPick) {
        return -1;
      } else {
        return 0;
      }
    });

    team2.draftPicks.sort(function (a, b) {
      if (a.round > b.round) {
        return 1;
      }
      if (a.round < b.round) {
        return -1;
      } else {
        return 0;
      }
    });

    return true;
  } else {
    return false;
  }
}

export function signPlayer(team, player, years, salary, playerpool) {
  let index = playerpool.roster.indexOf(player);

  team.roster.push(player);
  playerpool.roster.splice(index, 1);
  player.salary = salary;
  player.years = years;
  player.teamLogoSrc = team.logoSrc;
  player.teamName = team.name;
  team.salary += player.salary;
  try {
    team.reorderLineup();
  } catch (err) {
    console.log(
      "Error Reordering Lineup, Most likely during offseason when teams are not at full rosters"
    );
  }
}

function setSalaryExpectations(rosterpool) {
  for (let i = 0; i < rosterpool.roster.length; i++) {
    if (collegeMode) {
      if (rosterpool.roster[i].rating >= 65) {
        rosterpool.roster[i].salary = Math.round(
          scaleBetween(
            rosterpool.roster[i].rating,
            VETERANSMINIMUM,
            25000000,
            65,
            99
          )
        );
        //VARIATION
        rosterpool.roster[i].salary -= Math.round(Math.random() * 100000);
      } else {
        rosterpool.roster[i].salary = Math.round(
          scaleBetween(
            rosterpool.roster[i].rating,
            300000,
            VETERANSMINIMUM,
            40,
            64
          )
        );
        rosterpool.roster[i].salary -= Math.round(Math.random() * 100000);
      }
    } else {
      if (rosterpool.roster[i].rating >= 74) {
        rosterpool.roster[i].salary = Math.round(
          scaleBetween(
            rosterpool.roster[i].rating,
            VETERANSMINIMUM,
            25000000,
            74,
            99
          )
        );
        rosterpool.roster[i].salary -= Math.round(Math.random() * 100000);
      } else {
        rosterpool.roster[i].salary = Math.round(
          scaleBetween(
            rosterpool.roster[i].rating,
            300000,
            VETERANSMINIMUM,
            40,
            74
          )
        );
        rosterpool.roster[i].salary -= Math.round(Math.random() * 100000);
      }
    }
  }
}

export function canSign(team, salary) {
  if (calculateCapRoom(team) < salary && salary > VETERANSMINIMUM) {
    return false;
  } else {
    return true;
  }
}

function setTeamSalaries() {
  for (let i = 0; i < teams.length; i++) {
    teams[i].salary = 0;
    for (let j = 0; j < teams[i].roster.length; j++) {
      teams[i].salary += teams[i].roster[j].salary;
    }
  }
}

export function calculateCapRoom(team) {
  return CAPROOM - team.salary;
}

export function displaySalary(salary, player) {
  let sal = Math.round(salary);
  if (salary <= VETERANSMINIMUM && player === true) {
    return "Minimum";
  }
  return sal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function tradeValueCalculation(ply) {
  let isPick = false;
  if (ply.isPick === true) {
    isPick = true;
    // console.log(ply.projectedPick);
    if (ply.round > 1) {
      ply = draftClass.roster[ply.projectedPick + teams.length * ply.round - 2];
    } else {
      ply = draftClass.roster[ply.projectedPick - 1];
    }
  }

  let ageVal = scaleBetween(ply.age, -50, 0, 19, 40);

  let salVal = scaleBetween(ply.salary, 0, 50, 800000, 50000000);
  let skillVal = 0;
  if (ply.rating >= 88) {
    skillVal = scaleBetween(ply.rating, 300, 500, 88, 99);
  } else if (ply.rating >= 83) {
    skillVal = scaleBetween(ply.rating, 120, 300, 83, 88);
  } else if (ply.rating >= 78) {
    skillVal = scaleBetween(ply.rating, 40, 120, 75, 83);
  } else {
    skillVal = scaleBetween(ply.rating, -50, 40, 40, 75);
  }
  let totalVal = skillVal - ageVal - salVal;

  if (isPick) {
    let certainty = (teams[0].wins + teams[0].losses) / gamesPerSeason;
    // console.log(certainty);
    totalVal += totalVal * certainty * 0.7;
  }
  console.log(
    ply.name +
    " Skil: " +
    skillVal +
    " Age: " +
    ageVal +
    " Sal: " +
    salVal +
    " " +
    totalVal
  );
  return totalVal;
}

function interest(t1Offers, t2Offers, forced) {
  if (forced) {
    return true;
  }
  let t1Value = 0;
  let t2Value = 0;
  for (let i = 0; i < t1Offers.length; i++) {
    let ply = t1Offers[i];

    t1Value += tradeValueCalculation(ply);
  }

  // console.log("TOTAL PACKAGE VAL: " + t1Value);
  // console.log("");

  for (let i = 0; i < t2Offers.length; i++) {
    let ply = t2Offers[i];
    t2Value += tradeValueCalculation(ply);
  }

  // console.log("TOTAL PACKAGE VAL: " + t2Value);
  // console.log("");

  //TRADE DIFFICULTY SLIDER
  //Trade Threshold at 20
  // console.log(t1Value);
  // console.log(t2Value + (t2Value* tradeThreshold));
  if (t1Value > t2Value + t2Value * tradeThreshold) {
    return true;
  } else {
    return false;
  }

  // let ageDiff = ply2.age - ply1.age;
  // let ratDiff = ply1.rating - ply2.rating;
  // let salaryDiff = ply2.salary - ply1.salary;
  // salaryDiff = scaleBetween(salaryDiff, 0, 10, 800000, 500000000);

  // let interest = ageDiff + ratDiff + salaryDiff;

  // if (interest >= 0) {
  //     return true;
  // } else {
  //     return false;
  // }
}

class Series {
  constructor() {
    this.game = 1;
    this.team1 = "";
    this.team2 = "";
    this.team1Wins = 0;
    this.team2Wins = 0;
    this.winner = null;
    this.results = [];
    this.manual = false;
  }

  simGame() {
    if (this.manual) {
      this.manual = false;
      return;
    }

    if (this.winner == null) {
      home = this.team1;
      away = this.team2;
      let game = new Game();
      game.playGame();
      this.game++;
      this.results.push({
        team1Score: game.homescore,
        team2Score: game.awayscore
      });
      if (game.homescore > game.awayscore) {
        this.team1Wins++;
      } else {
        if (game.homescore === game.awayscore) {
        }
        this.team2Wins++;
      }
      if (this.team1Wins >= seriesWinCount) {
        this.winner = this.team1;
        return;
      }
      if (this.team2Wins >= seriesWinCount) {
        this.winner = this.team2;
        return;
      }
    }
  }

  manualGame() {
    if (this.winner == null) {
      home = this.team1;
      away = this.team2;
      let game = new Game();
      return game;
    }
  }

  simSeries() {
    while (this.winner == null) {
      this.simGame();
    }
  }
}

class Playoffs {
  constructor() {
    this.round = 1;
    this.eastTeams = [];
    this.westTeams = [];
    this.matchups = [];
    this.completed = false;
    this.champs = "";
    this.advance = false;
  }

  playoffMatchupGen() {
    for (let i = 0; i < this.eastTeams.length / 2; i++) {
      let series = new Series();
      series.team1 = this.eastTeams[i];
      series.team2 = this.eastTeams[this.eastTeams.length - (i + 1)];
      this.matchups.push(series);
    }

    for (let i = 0; i < this.westTeams.length / 2; i++) {
      let series = new Series();
      series.team1 = this.westTeams[i];
      series.team2 = this.westTeams[this.westTeams.length - (i + 1)];
      this.matchups.push(series);
    }

    this.eastTeams = [];
    this.westTeams = [];
  }

  determineRoundNumber() {
    let num = playoffSeeds;
    let count = 1;
    while (num != 1) {
      num /= 2;
      count++;
    }
    if (conferencesOn) {
      return count;
    } else {
      return count - 1;
    }
  }

  simDay() {
    if (!this.completed) {
      for (let i = 0; i < this.matchups.length; i++) {
        this.matchups[i].simGame();
      }

      let completed = 0;
      for (let i = 0; i < this.matchups.length; i++) {
        if (this.matchups[i].winner != null) {
          completed++;
          if (this.round >= this.determineRoundNumber()) {
            this.champs = this.matchups[i].winner;
            this.completed = true;
            this.advance = true;
            return;
          }
        }
      }

      if (!this.advance) {
        if (completed === this.matchups.length) {
          this.advance = true;
          return;
        }
      }
      if (this.advance) {
        this.advance = false;
        this.round++;
        for (let i = 0; i < this.matchups.length; i++) {
          let team = this.matchups[i].winner;
          if (team.conferenceId === 0) {
            this.eastTeams.push(team);
          } else {
            this.westTeams.push(team);
          }
        }
        this.matchups = [];
        if (this.round >= this.determineRoundNumber()) {
          this.matchups.push(new Series());
          this.matchups[0].team1 = this.eastTeams[0];
          this.matchups[0].team2 = this.westTeams[0];
          return;
        }
        this.playoffMatchupGen();
        return;
      }
    }
  }

  simRound() {
    let currRound = this.round;
    while (!this.advance) {
      if (this.completed) {
        return;
      }
      this.simDay();
    }
  }

  simPlayoffs() {
    while (!this.completed) {
      this.simDay();
    }
  }
}

export function resetFranchise() {
  franchise = new Franchise();
}

franchise = new Franchise();

export function saveData(slot) {
  let data = {
    teams: [],
    freeAgents: "",
    draftClass: "",
    sliders: ""
  };

  for (let i = 0; i < teams.length; i++) {
    let teamDat = {
      name: teams[i].name,
      id: teams[i].id,
      conferenceId: teams[i].conferenceId,
      logoSrc: teams[i].logoSrc,
      roster: teams[i].roster
    };
    data.teams.push(teamDat);
  }

  data.freeAgents = availableFreeAgents;
  data.draftClass = draftClass;
  data.sliders = {
    gamesPerSeason: gamesPerSeason,
    playoffSeeds: playoffSeeds,
    seriesWinCount: seriesWinCount,
    conferencesOn: conferencesOn,
    collegeMode: collegeMode,
    difficulty: difficulty,
    tradeThreshold: tradeThreshold,
    offenseSlider: offenseSlider,
    defenseSlider: defenseSlider,
    passSkillFactorSlider: passSkillFactorSlider,
    shotSkillFactorSlider: shotSkillFactorSlider,
    goalieAdjustmentSlider: goalieAdjustmentSlider,
    trainingPointsAvailable: trainingPointsAvailable
  };

  let write = JSON.stringify(data);
  // checkForFile(write, slot);

  fileName = slot;
  if (!slot.includes(".roster")) {
    fileName += ".roster";
  }

  saveToFileSystem(write, fileName, "roster");
}

saveToFileSystem = async (data, saveName, type) => {
  let name = "saves/" + saveName + "." + type;
  if (saveName.includes(".")) {
    name = "saves/" + saveName;
  }
  console.log(name);
  const path = `${FileSystem.documentDirectory}${name}`;
  console.log("downloading to save");
  const saving = await FileSystem.writeAsStringAsync(path, data)
    .then(() => {
      console.log("saved");
    })
    .catch(err => {
      console.log(err);
    });
};

export const loadFromFileSystem = async fileName => {
  const file = fileName;
  if (file.includes(".draftclass")) {
    const load = FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "saves/" + file
    )
      .then(value => {
        let data = JSON.parse(value);
        importDraftClassJson(data);
      })
      .catch(err => {
        console.log(err);
      });
  } else if (file.includes(".franchise")) {
    const load = FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "saves/" + file
    )
      .then(value => {
        loadFranchise(value);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    const load = FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "saves/" + file
    )
      .then(value => {
        loadData(value);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const loadData = data => {
  try {
    let loadedData = JSON.parse(data);

    teams = [];
    for (let i = 0; i < conferences.length; i++) {
      conferences[i].teams = [];
    }
    for (let i = 0; i < loadedData.teams.length; i++) {
      teams.push(new Team(loadedData.teams[i]));
      teams[i].roster = [];
      for (let j = 0; j < loadedData.teams[i].roster.length; j++) {
        ply = new Player(loadedData.teams[i].roster[j]);
        ply.calculateRating();
        teams[i].roster.push(ply);
        ply.teamLogoSrc = teams[i].logoSrc;
        ply.teamName = teams[i].name;
      }

      for (let k = 0; k < conferences.length; k++) {
        if (teams[i].conferenceId === conferences[k].id) {
          conferences[k].teams.push(teams[i]);
        }
      }

      teams[i].reorderLineup();
      teams[i].calculateRating();
    }

    if (teams.length > 7) {
      menuDisplayTeams();
    }

    setTeamSalaries();

    //NO NEEED TO PARSE JSON ITS ALREADY IN OBJECT FORMAT
    // for (let i = 0; i < rosterData.length; i++) {
    //     teams.push(new Team(rosterData[i]));
    // }
    availableFreeAgents.roster = [];
    for (let i = 0; i < loadedData.freeAgents.roster.length; i++) {
      availableFreeAgents.roster.push(
        new Player(loadedData.freeAgents.roster[i])
      );
      availableFreeAgents.roster[i].calculateRating();
      availableFreeAgents.roster[i].teamLogoSrc = availableFreeAgents.logoSrc;
      availableFreeAgents.roster[i].teamName = availableFreeAgents.name;
    }
    availableFreeAgents.reorderLineup();
    setSalaryExpectations(availableFreeAgents);

    if (loadedData.sliders != null) {
      if (loadedData.sliders.tradeThreshold == null) {
        resetSliders();
      } else {
        setSliders(
          loadedData.sliders.defenseSlider,
          loadedData.sliders.offenseSlider,
          loadedData.sliders.passSkillFactorSlider,
          loadedData.sliders.shotSkillFactorSlider,
          loadedData.sliders.goalieAdjustmentSlider,
          loadedData.sliders.difficulty,
          loadedData.sliders.tradeThreshold,
          loadedData.sliders.trainingPointsAvailable
        );
        setFranchiseSliders(
          loadedData.sliders.gamesPerSeason,
          loadedData.sliders.playoffSeeds,
          loadedData.sliders.seriesWinCount,
          loadedData.sliders.conferencesOn,
          loadedData.sliders.collegeMode
        );
      }
    }

    generateDraftClass();

    resetFranchise();

    // if(loadData.draftClass.roster.length > 0){
    //     draftClass.roster = [];
    //     for (let i = 0; i < loadedData.draftClass.roster.length; i++) {
    //         availableFreeAgents.roster.push(new Player(draftClassData[i]));
    //         availableFreeAgents.roster[i].calculateRating();
    //         availableFreeAgents.roster[i].teamLogoSrc = availableFreeAgents.logoSrc;
    //         availableFreeAgents.roster[i].teamName = availableFreeAgents.name;

    //     }
    // }
  } catch (err) {
    console.log(err);
  }
};

export function createTeam(name, rating, logoSrc, conferenceId) {
  let id = teams.length;
  let team = new Team({
    name: name,
    rating: rating,
    logoSrc,
    logoSrc,
    id: id,
    wins: 0,
    losses: 0,
    conferenceId: conferenceId
  });
  teams.push(team);

  generateCustomRoster(team, rating);
  for (let k = 0; k < conferences.length; k++) {
    if (team.conferenceId === conferences[k].id) {
      conferences[k].teams.push(team);
    }
  }
  sortedRoster(team, "rating");
  setSalaryExpectations(team);
  setTeamSalaries();
  franchise = new Franchise();

  return team;
}

export function createPlayer(
  name,
  number,
  position,
  age,
  salary,
  faceSrc,
  height,
  team
) {
  let player = new Player({
    name: name,
    number: number,
    position: position,
    age: age,
    height: height,
    salary: salary,
    pass: 75,
    awareness: 75,
    rush: 75,
    speed: 75,
    catch: 75,
    block: 75,
    breakBlock: 75,
    tackle: 75,
    kick: 75,
    rating: 75,
    faceSrc: faceSrc
  });
  if (team == null) {
    player.years = 0;
    availableFreeAgents.roster.push(player);
    player.teamName = availableFreeAgents.name;
    player.teamLogoSrc = availableFreeAgents.logoSrc;
    return player;
  } else {
    player.years = 1;
    team.roster.push(player);
    player.teamName = team.name;
    player.teamLogoSrc = team.logoSrc;
    team.reorderLineup();
  }
  return player;
}

export function removeTeams() {
  franchise = null;
  teams = [];
  for (let i = 0; i < conferences.length; i++) {
    conferences[i].teams = [];
  }
}

function setCustomPlayoffSeeds() {
  if (conferencesOn) {
    if (conferences[0].teams.length >= conferences[1].teams.length) {
      if (conferences[0].teams.length >= 32) {
        return 32;
      } else if (conferences[0].teams.length >= 16) {
        return 16;
      } else if (conferences[0].teams.length >= 8) {
        return 8;
      } else if (conferences[0].teams.length >= 4) {
        return 4;
      } else if (conferences[0].teams.length >= 2) {
        return 2;
      } else if (conferences[0].teams.length >= 1) {
        return 1;
      }
    } else if (conferences[0].teams.length <= conferences[1].teams.length) {
      if (conferences[1].teams.length >= 32) {
        return 32;
      } else if (conferences[1].teams.length >= 16) {
        return 16;
      } else if (conferences[1].teams.length >= 8) {
        return 8;
      } else if (conferences[1].teams.length >= 4) {
        return 4;
      } else if (conferences[1].teams.length >= 2) {
        return 2;
      } else if (conferences[1].teams.length >= 1) {
        return 1;
      }
    }
  } else {
    if (teams.length >= 32) {
      return 32;
    } else if (teams.length >= 16) {
      return 16;
    } else if (teams.length >= 8) {
      return 8;
    } else if (teams.length >= 4) {
      return 4;
    } else if (teams.length >= 2) {
      return 2;
    } else if (teams.length >= 1) {
      return 1;
    }
  }
}

export function exportRosterJson() {
  let data = {
    teams: [],
    freeAgents: ""
  };

  for (let i = 0; i < teams.length; i++) {
    let ros = [];
    for (let j = 0; j < teams[i].roster.length; j++) {
      ros.push({
        name: teams[i].roster[j].name,
        position: teams[i].roster[j].position,
        faceSrc: teams[i].roster[j].faceSrc,
        number: teams[i].roster[j].number,
        height: teams[i].roster[j].height,
        off: teams[i].roster[j].off,
        def: teams[i].roster[j].def,
        pass: teams[i].roster[j].pass,
        faceOff: teams[i].roster[j].faceOff,
        positioning: teams[i].roster[j].positioning,
        reflexes: teams[i].roster[j].reflexes,
        years: teams[i].roster[j].years,
        salary: teams[i].roster[j].salary,
        age: teams[i].roster[j].age
      });
    }

    let teamDat = {
      name: teams[i].name,
      id: teams[i].id,
      conferenceId: teams[i].conferenceId,
      logoSrc: teams[i].logoSrc,
      roster: ros
    };

    data.teams.push(teamDat);
  }

  ros = [];
  for (let i = 0; i < availableFreeAgents.roster.length; i++) {
    ros.push({
      name: availableFreeAgents.roster[i].name,
      position: availableFreeAgents.roster[i].position,
      faceSrc: availableFreeAgents.roster[i].faceSrc,
      number: availableFreeAgents.roster[i].number,
      height: availableFreeAgents.roster[i].height,
      off: availableFreeAgents.roster[i].off,
      def: availableFreeAgents.roster[i].def,
      pass: availableFreeAgents.roster[i].pass,
      faceOff: availableFreeAgents.roster[i].faceOff,
      positioning: availableFreeAgents.roster[i].positioning,
      reflexes: availableFreeAgents.roster[i].reflexes,
      years: availableFreeAgents.roster[i].years,
      salary: availableFreeAgents.roster[i].salary,
      age: availableFreeAgents.roster[i].age
    });
  }
  data.freeAgents = {
    name: availableFreeAgents.name,
    logoSrc: availableFreeAgents.logoSrc,
    roster: ros
  };

  let write = JSON.stringify(data);
  return write;
}

export async function getDataFromLink(link, type, sliderType) {
  type = type.toLowerCase();
  try {
    let response = await fetch(link);
    let responseJson = await response.json();
    if (type === "roster") {
      loadRosterJson(responseJson);
      if (sliderType === "college") {
        collegeSliderPreset();
        resetFranchise();
      }
    } else if (type === "team") {
      importTeamJson(responseJson);
    } else if (type === "draftclass") {
      importDraftClassJson(responseJson);
    } else if (type === "communityroster") {
      communityRosters = responseJson;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export let communityRosters = [];
communityRosters = getDataFromLink(
  "https://raw.githubusercontent.com/cbanfiel/On-Paper-Sports-Hockey-20-Rosters/master/communityfiles.json",
  "communityroster"
);

export function loadRosterJson(loadedDataIn) {
  try {
    let loadedData = loadedDataIn;

    teams = [];
    for (let i = 0; i < conferences.length; i++) {
      conferences[i].teams = [];
    }
    for (let i = 0; i < loadedData.teams.length; i++) {
      teams.push(new Team(loadedData.teams[i]));
      teams[i].roster = [];
      for (let j = 0; j < loadedData.teams[i].roster.length; j++) {
        ply = new Player(loadedData.teams[i].roster[j]);
        ply.calculateRating();
        teams[i].roster.push(ply);
        ply.teamLogoSrc = teams[i].logoSrc;
        ply.teamName = teams[i].name;
      }

      for (let k = 0; k < conferences.length; k++) {
        if (teams[i].conferenceId === conferences[k].id) {
          conferences[k].teams.push(teams[i]);
        }
      }
      teams[i].reorderLineup();
      teams[i].calculateRating();
    }
    setTeamSalaries();

    //NO NEEED TO PARSE JSON ITS ALREADY IN OBJECT FORMAT
    // for (let i = 0; i < rosterData.length; i++) {
    //     teams.push(new Team(rosterData[i]));
    // }
    availableFreeAgents.roster = [];
    for (let i = 0; i < loadedData.freeAgents.roster.length; i++) {
      availableFreeAgents.roster.push(
        new Player(loadedData.freeAgents.roster[i])
      );
      availableFreeAgents.roster[i].calculateRating();
      availableFreeAgents.roster[i].teamLogoSrc = availableFreeAgents.logoSrc;
      availableFreeAgents.roster[i].teamName = availableFreeAgents.name;
    }
    availableFreeAgents.reorderLineup();
    setSalaryExpectations(availableFreeAgents);

    generateDraftClass();

    if (teams.length > 7) {
      menuDisplayTeams();
    }

    resetSliders();

    resetFranchise();

    // if(loadData.draftClass.roster.length > 0){
    //     draftClass.roster = [];
    //     for (let i = 0; i < loadedData.draftClass.roster.length; i++) {
    //         availableFreeAgents.roster.push(new Player(draftClassData[i]));
    //         availableFreeAgents.roster[i].calculateRating();
    //         availableFreeAgents.roster[i].teamLogoSrc = availableFreeAgents.logoSrc;
    //         availableFreeAgents.roster[i].teamName = availableFreeAgents.name;

    //     }
    // }
  } catch (err) {
    console.log(err);
    console.log("Error Loading JSON");
  }
}

export function teamStats() {
  let statsArr = teams;

  statsArr.sort(function (a, b) {
    if (a.seasonPoints > b.seasonPoints) {
      return -1;
    }
    if (a.seasonPoints < b.seasonPoints) {
      return 1;
    }
    return 0;
  });

  return statsArr;
}

export function deleteTeam(team) {
  for (let k = 0; k < conferences.length; k++) {
    if (team.conferenceId === conferences[k].id) {
      conferences[k].teams.splice(conferences[k].teams.indexOf(team), 1);
    }
  }
  teams.splice(teams.indexOf(team), 1);

  franchise = new Franchise();
}

export function reloadConferences() {
  for (let i = 0; i < conferences.length; i++) {
    conferences[i].teams = [];
  }

  for (let i = 0; i < teams.length; i++) {
    for (let k = 0; k < conferences.length; k++) {
      if (teams[i].conferenceId === conferences[k].id) {
        conferences[k].teams.push(teams[i]);
      }
    }
  }
}

export function exportTeamJSON(team) {
  let ros = [];
  for (let i = 0; i < team.roster.length; i++) {
    ros.push({
      name: team.roster[i].name,
      position: team.roster[i].position,
      faceSrc: team.roster[i].faceSrc,
      number: team.roster[i].number,
      height: team.roster[i].height,
      off: team.roster[i].off,
      def: team.roster[i].def,
      threePoint: team.roster[i].threePoint,
      reb: team.roster[i].reb,
      ft: team.roster[i].ft,
      years: team.roster[i].years,
      salary: team.roster[i].salary,
      age: team.roster[i].age
    });
  }

  let teamDat = {
    name: team.name,
    conferenceId: team.conferenceId,
    logoSrc: team.logoSrc,
    roster: ros
  };

  let write = JSON.stringify(teamDat);
  return write;
}

export function importTeamJson(data) {
  let ply;
  let read = data;

  let team = createTeam(read.name, 75, read.logoSrc, read.conferenceId);

  team.roster = [];

  for (let i = 0; i < read.roster.length; i++) {
    ply = new Player(read.roster[i]);
    ply.calculateRating();
    team.roster.push(ply);
    ply.teamLogoSrc = teams[i].logoSrc;
    ply.teamName = teams[i].name;
  }

  team.reorderLineup();
  team.calculateRating();

  sortedRoster(team, "rating");
  setTeamSalaries();
}

export function exportDraftClassJson() {
  let ros = [];
  for (let i = 0; i < draftClass.roster.length; i++) {
    ros.push({
      name: draftClass.roster[i].name,
      position: draftClass.roster[i].position,
      faceSrc: draftClass.roster[i].faceSrc,
      number: draftClass.roster[i].number,
      height: draftClass.roster[i].height,
      off: draftClass.roster[i].off,
      def: draftClass.roster[i].def,
      pass: draftClass.roster[i].pass,
      faceOff: draftClass.roster[i].faceOff,
      positioning: draftClass.roster[i].positioning,
      reflexes: draftClass.roster[i].reflexes,
      years: draftClass.roster[i].years,
      salary: draftClass.roster[i].salary,
      age: draftClass.roster[i].age
    });
  }

  let teamDat = {
    roster: ros
  };

  let write = JSON.stringify(teamDat);
  return write;
}

export function importDraftClassJson(data) {
  let ply;
  let read = data;
  console.log(read.roster.length);

  draftClass.roster = [];
  for (let i = 0; i < read.roster.length; i++) {
    ply = new Player(read.roster[i]);
    ply.calculateRating();
    draftClass.roster.push(ply);
    ply.teamLogoSrc = draftClass.logoSrc;
    ply.teamName = draftClass.name;
  }

  draftClass.reorderLineup();
}

export function releasePlayer(player) {
  //TODO please for the love of god just change this to pass in a team instead of looping through all the teams
  for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams[i].roster.length; j++) {
      if (teams[i].roster[j] === player) {
        teams[i].roster.splice(teams[i].roster.indexOf(player), 1);
        availableFreeAgents.roster.push(player);
        player.teamLogoSrc = availableFreeAgents.logoSrc;
        player.teamName = availableFreeAgents.name;
        try {
          teams[i].reorderLineup();
        } catch (err) {
          console.log(
            "Error Reordering Lineup, Most likely during offseason when teams are not at full rosters"
          );
        }
        setTeamSalaries();
        break;
      }
    }
  }
}

function sortTeamsByRating() {
  teams.sort(function (a, b) {
    if (a.rating > b.rating) return -1;
    if (a.rating < b.rating) return 1;
    return 0;
  });

  for (let i = 0; i < teams.length; i++) {
    teams[i].ratingRank = i + 1;
  }
}

export function offerContract(team, ply, years, salary, playerpool, isForced) {
  if (isForced) {
    signPlayer(team, ply, years, salary, playerpool);
    return true;
  }

  if (ply.salary <= VETERANSMINIMUM) {
    signPlayer(team, ply, years, salary, playerpool);
    return true;
  }

  if (ply.rating < 78) {
    signPlayer(team, ply, years, salary, playerpool);
    return true;
  }

  sortTeamsByRating();

  let salaryAddition = scaleBetween(
    team.ratingRank,
    -(ply.salary * 0.1),
    ply.salary * 0.3,
    1,
    teams.length
  );
  salaryAddition = salaryAddition - salaryAddition * 0.32 * years;
  // console.log(salaryAddition);

  if (ply.salary + salaryAddition < salary) {
    signPlayer(team, ply, years, salary, playerpool);
    return true;
  } else {
    return false;
  }
}

export function setPowerRankings() {
  let powerranks = [...teams];

  if (powerranks[0].wins + powerranks[0].losses < gamesPerSeason * 0.25) {
    powerranks.sort(function (a, b) {
      if (a.rating < b.rating) {
        return 1;
      }
      if (a.rating > b.rating) {
        return -1;
      } else {
        return 0;
      }
    });

    for (let i = 0; i < powerranks.length; i++) {
      powerranks[i].powerRanking = i + 1;
    }

    return;
  }

  powerranks.sort(function (a, b) {
    if (a.wins < b.wins) {
      return 1;
    }
    if (a.wins > b.wins) {
      return -1;
    } else {
      return 0;
    }
  });

  for (let i = 0; i < powerranks.length; i++) {
    powerranks[i].powerRanking = i + 1;
  }
}

export function getDraftPickProjectedPick(pick) {
  //NEEDS OPTIMIZATION
  setPowerRankings();
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].name === pick.originalTeam) {
      let pickNum = (teams[i].powerRanking - (teams.length + 1)) * -1;
      pick.projectedPick = pickNum;
      return pickNum;
    }
  }
}

export function saveAsDraftClass(ros, name) {
  draftClass.roster = [];

  if (ros.length < 80) {
    generateDraftClass();
    while (ros.length + draftClass.roster.length > 80) {
      draftClass.roster.unshift[0];
    }
  }

  for (let i = 0; i < ros.length; i++) {
    let ply = ros[i];
    let subtraction = Math.round(scaleBetween(ply.rating, 24, 7, 70, 99));
    ply.off -= subtraction;
    ply.def -= subtraction;
    ply.threePoint -= 7;
    ply.reb -= 7;
    ply.years = 2 + 1;
    ply.salary = 1200000;
    ply.calculateRating();
    draftClass.roster.push(ply);
  }

  let data = exportDraftClassJson();

  saveToFileSystem(data, name, "draftclass");
}

export function saveDraftClass(name) {
  let data = exportDraftClassJson();
  saveToFileSystem(data, name, "draftclass");
}

export function manageSaveName(value) {
  let str = value.replace(/\s+/g, "");

  let index = str.indexOf(".");
  if (index > 0) {
    str = str.substring(0, index);
  }

  return str;
}

export function returnStatsView(player) {
    let str ="";
  if (player.position === 0) {
    str = `ATT: ${player.seasonAttempts} CMP: ${player.seasonCompletions} YDS: ${player.seasonYards} TDS: ${player.seasonTouchdowns} INTS: ${player.seasonInterceptions} CMP%: ${Math.round((player.seasonCompletions / player.seasonAttempts) * 100)}`;
  }
  if (player.position === 1) {
    str = `ATT: ${player.seasonRushAttempts} YDS: ${player.seasonRushYards} TDS: ${player.seasonRushTouchdowns} AVG: ${Math.round((player.seasonRushYards / player.seasonRushAttempts))}`;
  }
  if (player.position === 2) {
    str = `ATT: ${player.rushAttempts} YDS: ${player.rushYards} TDS: ${player.touchdowns}`;
  }
  if (player.position === 3) {
    str = `REC: ${player.seasonReceptions} YDS: ${player.seasonYards} TDS: ${player.seasonTouchdowns}`;
  }
  if (player.position === 4) {
    str = `REC: ${player.receptions} YDS: ${player.yards} TDS: ${player.touchdowns}`;
  }
  if (player.position === 4) {
    str = `REC: ${player.receptions} YDS: ${player.yards} TDS: ${player.touchdowns}`;
  }if (player.position >= 10 && player.position <= 18) {
    str = `TCKL: ${player.seasonTackles} INTS: ${player.seasonInterceptions} SACKS: ${player.seasonSacks} FUMBLESREC: ${player.seasonFumblesRecovered}`;
  }if (player.position === 19) {
    str = `KICKATT: ${player.seasonKicksAttempted} KICKMADE: ${player.seasonKicksMade}`;
  }
  return str;
}
export function returnSeasonStatsListView(player) {
  let str ="";
  if(player.attempts > 0){
    str += `PASs: ATT: ${player.attempts} CMP: ${player.completions} YDS: ${player.yards} TDS: ${player.touchdowns} CMP%: ${Math.round((player.completions / player.attempts) * 100)} `;
  }

  if(player.rushAttempts > 0){
    str += `RUSH: ATT: ${player.rushAttempts} YDS: ${player.rushYards} TDS: ${player.rushTouchdowns} AVG: ${Math.round((player.rushYards / player.rushAttempts))} `;
  }

  if(player.catches > 0){
    str += `REC: ${player.receptions} YDS: ${player.yards} TDS: ${player.touchdowns}`;
  }

  if(player.tackles > 0){
    str += `TACKLES: ${player.tackles} INTS: ${player.interceptions}`
  }
  return str;
}

export function returnStatsListView(player) {
  let str = "";
  if (player.position === 0) {
    str = `ATT: ${player.attempts} CMP: ${player.completions} YDS: ${player.yards} TDS: ${player.touchdowns} CMP%: ${Math.round((player.completions / player.attempts) * 100)}`;
  }
  if (player.position === 1) {
    str = `ATT: ${player.rushAttempts} YDS: ${player.rushYards} TDS: ${player.rushTouchdowns} AVG: ${Math.round((player.rushYards / player.rushAttempts))}`;
  }
  if (player.position === 2) {
    str = `ATT: ${player.rushAttempts} YDS: ${player.rushYards} TDS: ${player.touchdowns}`;
  }
  if (player.position === 3) {
    str = `REC: ${player.receptions} YDS: ${player.yards} TDS: ${player.touchdowns}`;
  }
  if (player.position === 4) {
    str = `REC: ${player.receptions} YDS: ${player.yards} TDS: ${player.touchdowns}`;
  }

  return str;
}

export function saveFranchise(slot) {
  let data = {
    teams: [],
    freeAgents: "",
    draftClass: "",
    sliders: "",
    day: franchise.season.day,
    pastChampions: franchise.pastChampions
  };

  for (let i = 0; i < teams.length; i++) {
    scheduleString = [];
    for (let j = 0; j < teams[i].schedule.length; j++) {
      scheduleString.push(teams[i].schedule[j].name);
    }

    let teamDat = {
      name: teams[i].name,
      id: teams[i].id,
      conferenceId: teams[i].conferenceId,
      logoSrc: teams[i].logoSrc,
      roster: teams[i].roster,
      history: teams[i].history,
      offVsDefFocus: teams[i].offVsDefFocus,
      qualityVsQuantity: teams[i].qualityVsQuantity,
      defenseAggresiveVsConservative: teams[i].defenseAggresiveVsConservative,
      forwardsVsDefensemen: teams[i].forwardsVsDefensemen,
      freezeThePuckVsPlayThePuck: teams[i].freezeThePuckVsPlayThePuck,
      scheduleString: scheduleString,
      wins: teams[i].wins,
      losses: teams[i].losses,
      otLosses: teams[i].otLosses,
      played: teams[i].played,
      seasonPoints: teams[i].seasonPoints,
      seasonPointsAllowed: teams[i].seasonPointsAllowed,
      seasonShots: teams[i].seasonShots,
      seasonSaves: teams[i].seasonSaves,
      seasonGoalsAllowed: teams[i].seasonGoalsAllowed
    };

    data.teams.push(teamDat);
  }

  data.freeAgents = availableFreeAgents;
  data.sliders = {
    gamesPerSeason: gamesPerSeason,
    playoffSeeds: playoffSeeds,
    seriesWinCount: seriesWinCount,
    conferencesOn: conferencesOn,
    collegeMode: collegeMode,
    difficulty: difficulty,
    tradeThreshold: tradeThreshold,
    offenseSlider: offenseSlider,
    defenseSlider: defenseSlider,
    passSkillFactorSlider: passSkillFactorSlider,
    shotSkillFactorSlider: shotSkillFactorSlider,
    goalieAdjustmentSlider: goalieAdjustmentSlider,
    trainingPointsAvailable: trainingPointsAvailable
  };

  let dc = [];
  for (let i = 0; i < draftClass.roster.length; i++) {
    dc.push({
      name: draftClass.roster[i].name,
      position: draftClass.roster[i].position,
      faceSrc: draftClass.roster[i].faceSrc,
      number: draftClass.roster[i].number,
      height: draftClass.roster[i].height,
      off: draftClass.roster[i].off,
      def: draftClass.roster[i].def,
      pass: draftClass.roster[i].pass,
      faceOff: draftClass.roster[i].faceOff,
      positioning: draftClass.roster[i].positioning,
      reflexes: draftClass.roster[i].reflexes,
      years: draftClass.roster[i].years,
      salary: draftClass.roster[i].salary,
      age: draftClass.roster[i].age
    });
  }

  data.draftClass = dc;

  let write = JSON.stringify(data);
  // checkForFile(write, slot);

  fileName = slot;
  if (!slot.includes(".franchise")) {
    fileName += ".franchise";
  }
  saveToFileSystem(write, fileName, "franchise");
}

export const loadFranchise = data => {
  try {
    let loadedData = JSON.parse(data);

    teams = [];
    for (let i = 0; i < conferences.length; i++) {
      conferences[i].teams = [];
    }
    for (let i = 0; i < loadedData.teams.length; i++) {
      teams.push(new Team(loadedData.teams[i]));
      teams[i].history = loadedData.teams[i].history;
      teams[i].roster = [];
      //coach sliders
      teams[i].offVsDefFocus = loadedData.teams[i].offVsDefFocus;
      teams[i].qualityVsQuantity = loadedData.teams[i].qualityVsQuantity;
      teams[i].defenseAggresiveVsConservative =
        loadedData.teams[i].defenseAggresiveVsConservative;
      teams[i].forwardsVsDefensemen = loadedData.teams[i].forwardsVsDefensemen;
      teams[i].frontCourtVsBackCourt =
        loadedData.teams[i].frontCourtVsBackCourt;
      teams[i].freezeThePuckVsPlayThePuck =
        loadedData.teams[i].freezeThePuckVsPlayThePuck;
      //stats
      teams[i].seasonPoints = loadedData.teams[i].seasonPoints;
      teams[i].seasonPointsAllowed = loadedData.teams[i].seasonPointsAllowed;
      teams[i].seasonSaves = loadedData.teams[i].seasonSaves;
      teams[i].seasonGoalsAllowed = loadedData.teams[i].seasonGoalsAllowed;
      teams[i].seasonShots = loadedData.teams[i].seasonShots;
      teams[i].seasonAssists = loadedData.teams[i].seasonAssists;

      for (let j = 0; j < loadedData.teams[i].roster.length; j++) {
        ply = new Player(loadedData.teams[i].roster[j]);
        ply.calculateRating();
        teams[i].roster.push(ply);
        ply.teamLogoSrc = teams[i].logoSrc;
        ply.teamName = teams[i].name;
        ply.previousSeasonsStats =
          loadedData.teams[i].roster[j].previousSeasonsStats;
        ply.statsHistory = loadedData.teams[i].roster[j].statsHistory;
        ply.seasonGoals = loadedData.teams[i].roster[j].seasonGoals;
        ply.seasonShots = loadedData.teams[i].roster[j].seasonShots;
        ply.seasonSaves = loadedData.teams[i].roster[j].seasonSaves;
        ply.seasonGoalsAllowed =
          loadedData.teams[i].roster[j].seasonGoalsAllowed;
        ply.seasonAssists = loadedData.teams[i].roster[j].seasonAssists;
      }

      for (let k = 0; k < conferences.length; k++) {
        if (teams[i].conferenceId === conferences[k].id) {
          conferences[k].teams.push(teams[i]);
        }
      }

      teams[i].reorderLineup();
      teams[i].calculateRating();
    }

    if (teams.length > 7) {
      menuDisplayTeams();
    }

    setTeamSalaries();

    //NO NEEED TO PARSE JSON ITS ALREADY IN OBJECT FORMAT
    // for (let i = 0; i < rosterData.length; i++) {
    //     teams.push(new Team(rosterData[i]));
    // }
    availableFreeAgents.roster = [];
    for (let i = 0; i < loadedData.freeAgents.roster.length; i++) {
      availableFreeAgents.roster.push(
        new Player(loadedData.freeAgents.roster[i])
      );
      availableFreeAgents.roster[i].calculateRating();
      availableFreeAgents.roster[i].teamLogoSrc = availableFreeAgents.logoSrc;
      availableFreeAgents.roster[i].teamName = availableFreeAgents.name;
      for (let j = 0; j < loadedData.day; j++)
        availableFreeAgents.roster[i].statsHistory.push({
          goals: 0,
          saves: 0,
          shots: 0,
          goalsAllowed: 0,
          assists: 0
        });
    }

    availableFreeAgents.reorderLineup();
    setSalaryExpectations(availableFreeAgents);

    //this resets franchise
    if (loadedData.sliders != null) {
      setSliders(
        loadedData.sliders.defenseSlider,
        loadedData.sliders.offenseSlider,
        loadedData.sliders.passSkillFactorSlider,
        loadedData.sliders.shotSkillFactorSlider,
        loadedData.sliders.goalieAdjustmentSlider,
        loadedData.sliders.difficulty,
        loadedData.sliders.tradeThreshold,
        loadedData.sliders.trainingPointsAvailable
      );
      setFranchiseSliders(
        loadedData.sliders.gamesPerSeason,
        loadedData.sliders.playoffSeeds,
        loadedData.sliders.seriesWinCount,
        loadedData.sliders.conferencesOn,
        loadedData.sliders.collegeMode,
        true
      );
    }

    // generateDraftClass();

    // resetFranchise();

    //loadschedules
    for (let i = 0; i < teams.length; i++) {
      teams[i].schedule = [];
      let schedule;
      let played;
      for (let n = 0; n < loadedData.teams.length; n++) {
        if (loadedData.teams[n].name === teams[i].name) {
          schedule = loadedData.teams[n].scheduleString;
          played = loadedData.teams[n].played;
          teams[i].wins = loadedData.teams[n].wins;
          teams[i].losses = loadedData.teams[n].losses;
        }
      }

      for (let j = 0; j < schedule.length; j++) {
        for (let k = 0; k < teams.length; k++) {
          if (schedule[j] === teams[k].name) {
            teams[i].schedule.push(teams[k]);
          }
        }
      }

      teams[i].played = played;
    }

    //franchhise filec
    franchise.season.day = loadedData.day;
    franchise.pastChampions = loadedData.pastChampions;
    franchise.season.endOfSeason = false;
    franchise.offSeason = false;
    franchise.advance = false;
    franchise.stage = "";
    franchise.currentDraft = "";
    franchise.playoffs = "";

    //draft class
    draftClass.roster = [];
    for (let i = 0; i < loadedData.draftClass.length; i++) {
      ply = new Player(loadedData.draftClass[i]);
      ply.calculateRating();
      draftClass.roster.push(ply);
      ply.teamLogoSrc = draftClass.logoSrc;
      ply.teamName = draftClass.name;
    }

    draftClass.reorderLineup();

    // if(loadData.draftClass.roster.length > 0){
    //     draftClass.roster = [];
    //     for (let i = 0; i < loadedData.draftClass.roster.length; i++) {
    //         availableFreeAgents.roster.push(new Player(draftClassData[i]));
    //         availableFreeAgents.roster[i].calculateRating();
    //         availableFreeAgents.roster[i].teamLogoSrc = availableFreeAgents.logoSrc;
    //         availableFreeAgents.roster[i].teamName = availableFreeAgents.name;

    //     }
    // }
  } catch (err) {
    console.log(err);
  }
};

// export let fantasyDraft = () => {
//     let fantasyDraftArray = [];
//     for (let i = 0; i < teams.length; i++) {
//         for (let j = 0; j < teams[i].roster.length; j++) {
//             fantasyDraftArray.push(teams[i].roster[j]);
//         }
//     }

//     for (let i = 0; i < availableFreeAgents.roster.length; i++) {
//         fantasyDraftArray.push(availableFreeAgents.roster[i]);
//     }

//     return fantasyDraftArray;
// }

export let checkRequirements = (team) => {
  team.manageFootballLineup();
  let diff = 0;
  if(team.qbs.length < POS_QB_REQUIREMENTS){
    diff = POS_QB_REQUIREMENTS - team.qbs.length;
    return diff + " more QB's"
  }
  if(team.rbs.length < POS_HB_REQUIREMENTS){
    diff = POS_HB_REQUIREMENTS - team.rbs.length;
    return diff + " more hb's"
  }
  if(team.wrs.length < POS_WR_REQUIREMENTS){
    diff = POS_WR_REQUIREMENTS - team.wrs.length;
    return diff + " more wr's"
  }
  if(team.tes.length < POS_TE_REQUIREMENTS){
    diff = POS_te_REQUIREMENTS - team.tes.length;
    return diff + " more te's"
  }
  if(team.ol.length < POS_OL_REQUIREMENTS){
    diff = POS_OL_REQUIREMENTS - team.ol.length;
    return diff + " more O-linemen"
  }
  if(team.dl.length < POS_DL_REQUIREMENTS){
    diff = POS_DL_REQUIREMENTS - team.dl.length;
    return diff + " more D-linemen"
  }
  if(team.dbs.length < POS_DB_REQUIREMENTS){
    diff = POS_DB_REQUIREMENTS - team.dbs.length;
    return diff + " more db's"
  }
  if(team.ks.length < POS_K_REQUIREMENTS){
    diff = POS_K_REQUIREMENTS - team.ks.length;
    return diff + " more k's"
  }
  if(team.ps.length < POS_P_REQUIREMENTS){
    diff = POS_P_REQUIREMENTS - team.ps.length;
    return diff + " more p's"
  }

  return false;
}