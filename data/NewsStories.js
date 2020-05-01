export class News {
  constructor() {
    this.newsStories = [];
  }

  addPreseasonTopPlayerStory(player) {
    let titles = [
      `Can ${player.name} lead the ${player.teamName} to greatness?`,
      `Looking at ${player.name}'s upcoming season`,
    ];
    let stories = [
      `Fans around the league are expecting a lot from ${player.name} this upcoming season`,
    ];
    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: player.faceSrc,
      image2: player.teamLogoSrc,
    };
    this.newsStories.unshift(story);
  }

  addPreseasonTopTeamStory(team) {
    let titles = [
      `The ${team.name} are favored to come out on top this year`,
      `Why the ${team.name} are leading the pack out of the gates`,
      `What to expect from the ${team.name} this year`,
      `The ${team.name} are championship favorites`,
      `Why the ${team.name} are championship favorites`,
    ];
    let stories = [
      `Why our expert makers our picking the ${team.name} to come out on top this year`,
    ];
    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: team.logoSrc,
    };
    this.newsStories.unshift(story);
  }

  addPreseasonRandomPlayerStory(player) {
    let titles = [
      `After his arrest in the offseason ${player.positionString} ${player.name} is looking to make a change`,
      `Struggling through the loss of his mother ${player.positionString} ${player.name} is looking to honor her this upcoming season`,
    ];
    let stories = [
      `${player.name} has spoken with reporters on what fans should expect from him this season`,
    ];
    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: player.faceSrc,
      image2: player.teamLogoSrc,
    };

    this.newsStories.unshift(story);
  }

  addTopFreeAgentStory(player) {
    let titles = [
      `Where will ${player.name} land?`,
      `The hunt to sign ${player.name}`,
      `Who will sign ${player.name}?`,
      `The chase for ${player.name}`,
    ];
    let stories = [
      [
        `The ${player.teamName} star ${player.positionString} is expected to land a big salary this offseason.`,
      ],
    ];
    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: player.faceSrc,
      image2: player.teamLogoSrc,
    };
    this.newsStories.unshift(story);
  }

  addGameOfTheWeekStory(game) {
    let titles = [`OPS Game of the week`];

    let stories = [
      `The ${game.team1.name} face off against the ${game.team2.name}`,
    ];

    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: game.team1.logoSrc,
      image2: game.team2.logoSrc,
    };

    this.newsStories.unshift(story);
  }

  addSignPlayerStory(team, player) {
    let titles = [`${player.name} signs with ${team.name}`];

    let stories = [
      `The ${team.name} feel confident in there signing of ${player.positionString} ${player.name}`,
    ];

    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: team.logoSrc,
      image2: player.faceSrc,
    };

    this.newsStories.unshift(story);
  }

  addTradeStory(p1, p2, t1, t2, best) {

    let p1str = `${p1.positionString} ${p1.name}`
    let p2str = `${p2.positionString} ${p2.name}`

    if(p1.isPick){
        
    }

    let titles = [`Trade Alert: The ${t1.name} and the ${t2.name} make deal`];

    let stories = [
      `This trade sends ${p1.positionString} ${p1.name} to the ${t2.name} and ${p2.positionString} ${p2.name} to the ${t1.name}`,
    ];

    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: best.faceSrc,
      image2: best.teamLogoSrc
    };

    this.newsStories.unshift(story);
  }
}
