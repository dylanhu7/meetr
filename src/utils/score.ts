/**
 * Takes a list of Events and returns a score based on how engaged the events are.
 */

import type { Event } from "@prisma/client";

const GROWTH_FACTOR = 1.05;
const FACTOR = 100 / 18;

/**
 * Computes the score for a list of events. Score is the sum over all event
 * of GROWTH_FACTOR^(-daysSinceEvent) where daysSinceEvent is the number of days
 * since the event.
 * @param events The list of events to compute the score for
 * @returns The score for the list of events
 */
export default function computeScore(events: Event[]) {
  let score = 0;
  for (const event of events) {
    const daysSinceEvent = Math.floor(
      (new Date().getTime() - new Date(event.date).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
    score += Math.pow(GROWTH_FACTOR, -daysSinceEvent);
  }
  return Math.min(Math.floor(score * FACTOR), 100);
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

export function timeSinceDateToVerbose(pastDate: Date): string {
  const now = new Date();
  // If today, return "today"
  if (pastDate.toDateString() === now.toDateString()) {
    return "today";
  }
  // If yesterday, return "yesterday"
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (pastDate.toDateString() === yesterday.toDateString()) {
    return "yesterday";
  }
  // If within the last week, return "X days ago"
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  if (pastDate > lastWeek) {
    const daysAgo = Math.floor(
      (now.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  }
  // If within the last month, return "X weeks ago"
  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);
  if (pastDate > lastMonth) {
    const weeksAgo = Math.floor(
      (now.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
  }
  // If within the last year, return "X months ago"
  const lastYear = new Date();
  lastYear.setDate(lastYear.getDate() - 365);
  if (pastDate > lastYear) {
    const monthsAgo = Math.floor(
      (now.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  }
  // If more than a year ago, return "X years ago"
  const yearsAgo = Math.floor(
    (now.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
  return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
}
