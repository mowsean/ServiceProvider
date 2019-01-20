const lifeAdminPermissionsToCheck = [
  "usp_admin_users",
  "usp_admin_roles",
  "usp_admin_skills",
  "usp_admin_gal",
  "usp_admin_campaigns"
];

export const isLifeUser = user => !!user.sql;

export const isSeniorUser = user => !!user.sqs;

export const isSqahUser = user => !!user.sqah;

export const hasLifeAdminAccess = user_permission =>
  lifeAdminPermissionsToCheck.some(permission => user_permission[permission]);
