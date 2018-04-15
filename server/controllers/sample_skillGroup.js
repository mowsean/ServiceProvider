const jsonResponseMiddlewareFactory = require("./jsonResponseMiddlewareFactory");
const toJSON = require("./toJSON");

const getAllSkillGroups = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .skillGroup.getAllSkillGroups()
    .then(toJSON)
);

const getAllSkillGroupsWithIdsAndNameOnly = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .skillGroup.getAllSkillGroups(["skl_id", "skl_name"])
    .then(toJSON)
);

const getSkillGroup = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .skillGroup.getSkillGroupByID(req.params.id)
    .then(toJSON)
);

const deleteSkillGroup = jsonResponseMiddlewareFactory(req => {
  if (!req.params.id) throw Error("You must send a skill group ID to delete");

  return req.services
    .get("sql")
    .skillGroup.deleteSkillGroupUserConnections(req.params.id)
    .then(() =>
      req.services
        .get("sql")
        .skillGroup.updateSkillGroupField(
          req.params.id,
          "skl_delete_flag",
          true
        )
        .then(toJSON)
    );
});

/**
 * @function updateSkillGroupField
 * @description
 * Handler for making single-field changes to a skill group.
 */
const updateSkillGroupField = jsonResponseMiddlewareFactory(req => {
  if (!req.params.id) throw Error("You must send a skill group ID to update.");

  return req.services
    .get("sql")
    .skillGroup.updateSkillGroupField(
      req.params.id,
      req.body.field,
      req.body.value,
      req.body.changeUserName
    )
    .then(toJSON);
});

/**
 * @function updateStatuses
 * @description
 * Handler assigning a permission to a user.
 */
const updateStatuses = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .skillGroup.updateStatuses(
      req.params.id,
      req.body.statusIDs,
      req.body.isAdding
    )
    .then(toJSON)
);

/**
 * @function addNewSkillGroup
 * @description
 * Adds new user to the user table
 * @returns {Object} - The newly added Skill Group object
 *
 */
const addNewSkillGroup = jsonResponseMiddlewareFactory(req => {
  // first get all skill groups to ascertain what the next id should be
  return req.services
    .get("sql")
    .skillGroup.getMaxID()
    .then(maxID => {
      // we are currently unable to add the Identity (auto-increment) constraint to this column,
      // so manually ascertain the next id
      const nextIncrementalID = maxID + 1;

      const newSkillGroup = {
        ...req.body,
        skl_id: nextIncrementalID
      };

      return req.services
        .get("sql")
        .skillGroup.addNewSkillGroup(newSkillGroup)
        .then(toJSON);
    });
});

/**
 * @function updateUsers
 * @description Add or remove users from this skill group
 */
const updateUsers = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("sql")
    .skillGroup.updateUsers(req.params.id, req.body.userIDs, req.body.isAdding)
    .then(toJSON)
);

module.exports = {
  getSkillGroup,
  getAllSkillGroups,
  getAllSkillGroupsWithIdsAndNameOnly,
  updateSkillGroupField,
  updateStatuses,
  addNewSkillGroup,
  deleteSkillGroup,
  updateUsers
};
