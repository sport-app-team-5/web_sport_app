export class Dashboard {
  sport_preference: string;
  injuries: any;
  exercise_experience: string;
  time_dedication_sport: string;

  constructor(
    sport_preference: string,
    injuries: any,
    exercise_experience: string,
    time_dedication_sport: string
  ) {
    this.sport_preference = sport_preference;
    this.injuries = injuries;
    this.exercise_experience = exercise_experience;
    this.time_dedication_sport = time_dedication_sport;
  }
}
