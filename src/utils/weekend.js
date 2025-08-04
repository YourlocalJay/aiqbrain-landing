/**
 * Weekend event utilities with timezone support and enhanced calculations
 */

// Configuration constants
const WEEKEND_START = {
  day: 5, // Friday
  hour: 18 // 6:00 PM
};
const WEEKEND_END = {
  day: 0, // Sunday
  hour: 23,
  minute: 59,
  second: 59
};

/**
 * Check if weekend access is currently active with timezone awareness
 * @param {string} [timezone='UTC'] - Timezone to check against
 * @returns {boolean} Whether weekend access is active
 */
export function isWeekendActive(timezone = 'UTC') {
  try {
    const now = new Date();
    const options = { timeZone: timezone, weekday: 'long', hour: 'numeric' };
    const localDay = now.toLocaleDateString('en-US', { ...options, weekday: 'numeric' });
    const localHour = now.toLocaleTimeString('en-US', { ...options, hour: 'numeric' });

    const day = parseInt(localDay);
    const hour = parseInt(localHour);

    // Weekend is from Friday 6pm to Sunday midnight
    const isFridayEvening = day === WEEKEND_START.day && hour >= WEEKEND_START.hour;
    const isSaturday = day === 6;
    const isSundayBeforeMidnight = day === WEEKEND_END.day &&
                                 (hour < WEEKEND_END.hour ||
                                 (hour === WEEKEND_END.hour && now.getMinutes() <= WEEKEND_END.minute));

    return isFridayEvening || isSaturday || isSundayBeforeMidnight;
  } catch (error) {
    console.error('Error checking weekend status:', error);
    // Fallback to UTC calculation if timezone is invalid
    const now = new Date();
    const day = now.getUTCDay();
    const hour = now.getUTCHours();
    return (day === WEEKEND_START.day && hour >= WEEKEND_START.hour) ||
           day === 6 ||
           (day === WEEKEND_END.day && hour <= WEEKEND_END.hour);
  }
}

/**
 * Get detailed time until next weekend event with timezone support
 * @param {string} [timezone='UTC'] - Timezone for calculation
 * @returns {{
 *   days: number,
 *   hours: number,
 *   minutes: number,
 *   seconds: number,
 *   totalHours: number,
 *   totalMinutes: number,
 *   nextStartDate: Date
 * }} Time remaining until next weekend event
 */
export function getTimeUntilNextWeekend(timezone = 'UTC') {
  try {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'numeric'
    });
    const currentHour = now.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: 'numeric'
    });

    const day = parseInt(currentDay);
    const hour = parseInt(currentHour);

    // Create target date for next Friday 6pm in specified timezone
    const nextFriday = new Date(now);
    let daysToAdd = (WEEKEND_START.day + 7 - day) % 7;

    // If it's Friday after 6pm, calculate for next week
    if (day === WEEKEND_START.day && hour >= WEEKEND_START.hour) {
      daysToAdd = 7;
    }

    nextFriday.setDate(nextFriday.getDate() + daysToAdd);
    nextFriday.setHours(WEEKEND_START.hour, 0, 0, 0);

    // Convert to local time for calculation
    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
    const targetTime = new Date(nextFriday.getTime() - timezoneOffset);
    const diffMs = targetTime - now;

    if (diffMs <= 0) {
      // Shouldn't happen due to previous checks, but handle just in case
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalHours: 0,
        totalMinutes: 0,
        nextStartDate: targetTime
      };
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    return {
      days: Math.floor(totalHours / 24),
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60,
      totalHours,
      totalMinutes,
      nextStartDate: targetTime
    };
  } catch (error) {
    console.error('Error calculating time until weekend:', error);
    // Fallback to UTC calculation
    return getTimeUntilNextWeekendUTC();
  }
}

/**
 * Fallback UTC calculation for time until next weekend
 * @returns {Object} Time remaining until next weekend
 */
function getTimeUntilNextWeekendUTC() {
  const now = new Date();
  const day = now.getUTCDay();
  const hour = now.getUTCHours();

  let daysUntilFriday = (WEEKEND_START.day + 7 - day) % 7;
  if (day === WEEKEND_START.day && hour >= WEEKEND_START.hour) {
    daysUntilFriday = 7;
  }

  const targetTime = new Date(now);
  targetTime.setUTCDate(targetTime.getUTCDate() + daysUntilFriday);
  targetTime.setUTCHours(WEEKEND_START.hour, 0, 0, 0);

  const diffMs = targetTime - now;
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  return {
    days: Math.floor(totalHours / 24),
    hours: totalHours % 24,
    minutes: totalMinutes % 60,
    seconds: totalSeconds % 60,
    totalHours,
    totalMinutes,
    nextStartDate: targetTime
  };
}

/**
 * Check if current time is during extended weekend hours
 * @param {string} [timezone='UTC'] - Timezone to check
 * @returns {boolean} Whether in extended weekend hours
 */
export function isExtendedWeekendHours(timezone = 'UTC') {
  if (!isWeekendActive(timezone)) return false;

  try {
    const now = new Date();
    const localHour = now.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: 'numeric'
    });
    const hour = parseInt(localHour);

    // Extended hours are between 8pm and 2am during weekend
    return hour >= 20 || hour < 2;
  } catch (error) {
    console.error('Error checking extended hours:', error);
    const hour = new Date().getUTCHours();
    return hour >= 20 || hour < 2;
  }
}


/**
 * Get dynamic weekend content, used for strategy pages.
 * @returns {string}
 */
export function getWeekendContent() {
  return "🚀 AIQBrain Weekend Monetization Unlocked: Special high-ROI tactics, priority CPA drops, and vault bonuses are active every Friday 6pm–Sunday midnight. Take action during this window for fastest gains. Operators only!";
}

/**
 * Get time remaining until next weekend as human-readable string.
 * @param {string} [timezone='UTC']
 * @returns {string}
 */
export function getTimeUntilNext(timezone = 'UTC') {
  const t = getTimeUntilNextWeekend(timezone);
  if (!t || (t.days === 0 && t.hours === 0 && t.minutes === 0)) return "Now";
  let s = "";
  if (t.days) s += `${t.days}d `;
  if (t.hours) s += `${t.hours}h `;
  if (t.minutes) s += `${t.minutes}m`;
  return s.trim();
}

export default {
  isWeekendActive,
  getTimeUntilNextWeekend,
  isExtendedWeekendHours,
  getWeekendContent,
  getTimeUntilNext
};
