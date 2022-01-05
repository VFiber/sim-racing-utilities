import { SecondsToIntervalPipe } from './seconds-to-interval.pipe';

describe('SecondsToIntervalPipe', () => {
  it('create an instance', () => {
    const pipe = new SecondsToIntervalPipe();
    expect(pipe).toBeTruthy();
  });
});
