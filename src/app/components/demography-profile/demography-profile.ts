export class DemographyProfile {
  birth_year: number;
  height: number;
  weight: number;

  constructor(
    birth_year: number,
    height: number,
    weight: number
  ) {
    this.birth_year = birth_year;
    this.height = height;
    this.weight = weight;
  }
}
