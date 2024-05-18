import { DemographyProfile } from './demography-profile';

describe('DemographyProfile', () => {
  let dashboard: DemographyProfile;

  beforeEach(() => {
    dashboard = new DemographyProfile(
      2000,
      100,
      100
    );
  });

  it('should create a DemographyProfile instance', () => {
    expect(dashboard).toBeTruthy();
  });

  it('should initialize with correct values', () => {
    expect(dashboard.birth_year).toEqual(2000);
    expect(dashboard.height).toEqual(100);
    expect(dashboard.weight).toEqual(100);
  });

  it('should update birth_year correctly', () => {
    dashboard.birth_year = 2000;
    expect(dashboard.birth_year).toEqual(2000);
  });

  it('should update height correctly', () => {
    dashboard.height = 100;
    expect(dashboard.height).toEqual(100);
  });

  it('should update weight correctly', () => {
    dashboard.weight = 100;
    expect(dashboard.weight).toEqual(100);
  });
});
