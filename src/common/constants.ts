/**
 * System user UUID constant
 * This UUID represents the "SYSTEM" user for audit trails when no real user is available.
 * A corresponding employee record with this ID should exist in the database.
 */
export const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';

/**
 * System user details for seeding/migration
 */
export const SYSTEM_USER = {
  id: SYSTEM_USER_ID,
  email: 'system@internal.local',
  fullName: 'System User',
  employeeCode: 'SYSTEM',
  // This user should be created in the first migration
};
