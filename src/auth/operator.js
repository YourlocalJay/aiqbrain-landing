/**
 * Operator authentication and access control module with enhanced security
 */

// Define valid operator levels and their permissions
const OPERATOR_LEVELS = {
  basic: ['view', 'basic_operations'],
  standard: ['view', 'basic_operations', 'data_export'],
  premium: ['view', 'basic_operations', 'data_export', 'system_config'],
  admin: ['all']
};

/**
 * Check if a user has operator access with validation and permission hierarchy
 * @param {Object} user - User information object
 * @param {string} user.id - User identifier
 * @param {string} [user.operatorLevel] - User's operator level
 * @param {Array<string>} [user.permissions] - Additional permissions array
 * @param {string} [accessLevel='basic'] - Required access level or permission
 * @returns {boolean} Whether user has required access
 * @throws {Error} If invalid access level is requested
 */
export function checkOperatorAccess(user, accessLevel = 'basic') {
  if (!user || !user.id) {
    console.warn('Invalid user object provided to checkOperatorAccess');
    return false;
  }

  // Get the user's operator level (default to basic if not specified)
  const userLevel = user.operatorLevel || 'basic';

  // Validate the requested access level
  if (!Object.keys(OPERATOR_LEVELS).includes(accessLevel)) {
    // Check if it's a specific permission request
    const allPermissions = Object.values(OPERATOR_LEVELS).flat();
    if (!allPermissions.includes(accessLevel)) {
      throw new Error(`Invalid access level or permission requested: ${accessLevel}`);
    }
  }

  // Check for admin access
  if (userLevel === 'admin') return true;

  // Check direct level access
  if (OPERATOR_LEVELS[userLevel]?.includes('all')) return true;

  // Check if the user's level includes the requested level
  const levelHierarchy = Object.keys(OPERATOR_LEVELS);
  if (levelHierarchy.indexOf(userLevel) >= levelHierarchy.indexOf(accessLevel)) {
    return true;
  }

  // Check specific permissions
  if (user.permissions?.includes(accessLevel)) return true;
  if (OPERATOR_LEVELS[userLevel]?.includes(accessLevel)) return true;

  return false;
}

/**
 * Get the operator level for a user with validation
 * @param {Object} user - User information object
 * @param {string} [user.operatorLevel] - User's operator level
 * @returns {string} Valid operator level (basic, standard, premium, admin)
 * @throws {Error} If user object is invalid
 */
export function getOperatorLevel(user) {
  if (!user || typeof user !== 'object') {
    throw new Error('Invalid user object provided');
  }

  // Default to basic if no level specified
  const level = user.operatorLevel || 'basic';

  // Validate the stored level
  if (!Object.keys(OPERATOR_LEVELS).includes(level)) {
    console.warn(`Invalid operator level '${level}' found, defaulting to basic`);
    return 'basic';
  }

  return level;
}

/**
 * Get all available operator levels
 * @returns {Array<string>} Array of valid operator levels
 */
export function getAvailableOperatorLevels() {
  return Object.keys(OPERATOR_LEVELS);
}

/**
 * Get permissions for a specific operator level
 * @param {string} level - Operator level to check
 * @returns {Array<string>} Array of permissions for the level
 * @throws {Error} If invalid level is requested
 */
export function getPermissionsForLevel(level) {
  if (!OPERATOR_LEVELS[level]) {
    throw new Error(`Invalid operator level: ${level}`);
  }
  return [...OPERATOR_LEVELS[level]]; // Return a copy to prevent modification
}

export default {
  checkOperatorAccess,
  getOperatorLevel,
  getAvailableOperatorLevels,
  getPermissionsForLevel
};
