/**
 * Takes a list of Events and returns a score based on how engaged the events are.
 */

export default function computeScore(events: unknown) {
  console.log(events);
  return 0;
}

export function scoreToWordFrequency(score: number) {
  if (score < 30) {
    return "once every few months";
  } else if (score < 50) {
    return "once every few weeks";
  } else if (score < 70) {
    return "once a week";
  } else if (score < 90) {
    return "several times a week";
  } else {
    return "almost every day";
  }
}
