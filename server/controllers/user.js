const jsonResponseMiddlewareFactory = require("./jsonResponseMiddlewareFactory");
const toJSON = require("./toJSON");

/**
 * @function getAllUsers
 * @description
 * Handler for serving up all users. An optional querystring
 * parameter, 'includeDeleted' (boolean, default: true), can be used to
 * limit the results.
 */
const getAllUsers = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .user.getAllUsers(req.query.includeDeleted)
    .then(toJSON)
);
/**
 * @function getAllUsersForGal
 * @description
 * Handler for serving up all users with their GAL data. An optional
 * parameter, 'includeDeleted' (boolean, default: false), can be used to
 * limit the results.
 */
const getAllUsersForGal = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .user.getAllUsersForGal(req.query.includeDeleted)
    .then(toJSON)
);

/**
 * @function getUser
 * @description
 * Handler for serving up a user by ID.
 */
const getUser = jsonResponseMiddlewareFactory(req =>
  req.models
    .get("sql")
    .users.findById(req.params.id)
    .then(toJSON)
);

/**
 * @function updateUserField
 * @description
 * Handler for making single-field changes to a user??
 */
const updateUserField = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .user.updateUserField(
      req.params.id,
      req.body.field,
      req.body.value,
      req.body.changeUserName
    )
    .then(toJSON)
);

/**
 * @function updateUserPermissionsByID
 * @description
 * Handler for updating role permissions.
 */
const updateUserPermissionsByID = jsonResponseMiddlewareFactory(req => {
  if (!req.params.id) throw Error("You must send a user ID to update.");

  return req.services
    .get("sql")
    .user.updateUserPermissionsByID(req.params.id, req.body)
    .then(toJSON);
});

/**
 * @function updateSkillGroup
 * @description
 * Handler assigning a permission to a user.
 */
const updateSkillGroups = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .user.updateSkillGroups(
      req.params.id,
      req.body.skillGroupIDs,
      req.body.isAdding
    )
    .then(toJSON)
);

/**
 * @function updateGALAgentGroups
 * @description
 * Handler assigning a permission to a user.
 */
const updateGALAgentGroups = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .user.updateGALAgentGroups(
      req.params.id,
      req.body.galAgentGroupIDs,
      req.body.isAdding,
      req.body.changeUsrKey
    )
    .then(toJSON)
);

/**
 * @function addNewUser
 * @description
 * Adds new user to the user table
 */
const addNewUser = jsonResponseMiddlewareFactory(req => {
  return req.services
    .get("sql")
    .user.addNewUser(req.body)
    .then(toJSON);
});

/**
 * @function updateUserRole
 * @description
 * Handler assigning a role to a user.
 */
const updateUserRole = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .role.getRoleByID(req.body.roleId)
    .then(role =>
      req.services.get("sql").user.updateUserRole(req.params.id, role)
    )
    .then(toJSON)
);

module.exports = {
  getUser,
  getAllUsers,
  getAllUsersForGal,
  updateUserField,
  updateUserPermissionsByID,
  updateSkillGroups,
  updateUserRole,
  updateGALAgentGroups,
  addNewUser
};
