import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let dashboard: Dashboard;

  beforeEach(() => {
    dashboard = new Dashboard(
      'Running',
      ['Knee pain', 'Ankle sprain'],
      'Intermediate',
      '5 hours per week'
    );
  });

  it('should create a Dashboard instance', () => {
    expect(dashboard).toBeTruthy();
  });

  it('should initialize with correct values', () => {
    expect(dashboard.sport_preference).toEqual('Running');
    expect(dashboard.injuries).toEqual(['Knee pain', 'Ankle sprain']);
    expect(dashboard.exercise_experience).toEqual('Intermediate');
    expect(dashboard.time_dedication_sport).toEqual('5 hours per week');
  });

  it('should update sport_preference correctly', () => {
    dashboard.sport_preference = 'Cycling';
    expect(dashboard.sport_preference).toEqual('Cycling');
  });

  it('should update injuries correctly', () => {
    dashboard.injuries.push('Shoulder injury');
    expect(dashboard.injuries).toEqual(['Knee pain', 'Ankle sprain', 'Shoulder injury']);
  });

  it('should update exercise_experience correctly', () => {
    dashboard.exercise_experience = 'Advanced';
    expect(dashboard.exercise_experience).toEqual('Advanced');
  });

  it('should update time_dedication_sport correctly', () => {
    dashboard.time_dedication_sport = '7 hours per week';
    expect(dashboard.time_dedication_sport).toEqual('7 hours per week');
  });
});
