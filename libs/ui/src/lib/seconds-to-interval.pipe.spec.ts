import { SecondsToIntervalPipe } from './seconds-to-interval.pipe';

describe('SecondsToIntervalPipe', () => {
  const pipe = new SecondsToIntervalPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Displays days only', () => {
    expect(pipe.transform(3600 * 48)).toEqual('48h');
  });

  it('Displays days only', () => {
    expect(pipe.transform(3600 * 26)).toEqual('26h');
  });

  it('Displays hours only', () => {
    expect(pipe.transform(3600 * 6)).toEqual('6h');
  });

  it('Displays hours and minutes only', () => {
    expect(pipe.transform(3600 * 36 + 60 * 18)).toEqual('36h 18m');
  });

  it('Displays hours, minutes and seconds', () => {
    expect(pipe.transform(3600 + 60 * 18 + 1)).toEqual('1h 18m 1s');
  });

  it('Displays minutes only', () => {
    expect(pipe.transform(60 * 18)).toEqual('18m');
  });

  it('Displays minutes and seconds only', () => {
    expect(pipe.transform(60 * 18 + 1)).toEqual('18m 1s');
  });

  it('Displays seconds only', () => {
    expect(pipe.transform(59)).toEqual('59s');
  });

  it('Displays hours and not days even if its > 24h ', () => {
    expect(pipe.transform(3600 * 49 + 60 + 1)).toEqual('49h 1m 1s');
  });

  it('Displays all if 24h and something', () => {
    expect(pipe.transform(3600 * 24 + 60 + 1)).toEqual('24h 1m 1s');
  });

  it('Displays below 24h', () => {
    expect(pipe.transform(3600 * 18 + 60 + 1)).toEqual('18h 1m 1s');
  });
});
