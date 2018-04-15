const { Router } = require("express");

/**
 * @function ssRouterFactory
 * @param {object} controllers - A hash of controllers available in the app.
 * @returns {Router}
 * @description
 * Creates the SQL specific routes.
 */
function ssRouterFactory(controllers) {
  const ssRouter = new Router();

  ssRouter.get("/user", controllers.user.getAllUsers);

  ssRouter.get("/user/:id", controllers.user.getUser);

  ssRouter.post("/user/add", controllers.user.addNewUser);

  ssRouter.post("/user/:id", controllers.user.updateUserField);

  ssRouter.post(
    "/user/:id/permissions",
    controllers.user.updateUserPermissionsByID
  );

  ssRouter.post(
    "/user/:id/update-skill-groups",
    controllers.user.updateSkillGroups
  );

  ssRouter.post(
    "/user/:id/update-gal-agent-groups",
    controllers.user.updateGALAgentGroups
  );

  ssRouter.post("/user/:id/role", controllers.user.updateUserRole);

  ssRouter.get("/role", controllers.role.getAllRoles);

  ssRouter.delete("/role/:id", controllers.role.deleteRole);

  ssRouter.post("/role/add", controllers.role.addNewRole);

  ssRouter.post("/role/:id", controllers.role.updateRoleField);

  ssRouter.post(
    "/role/:id/reset-users",
    controllers.role.resetOverriddenUserPermissionsByRoleID
  );

  ssRouter.post(
    "/role/:id/permissions",
    controllers.role.updateRolePermissionsByID
  );

  ssRouter.get("/skill-group", controllers.skillGroup.getAllSkillGroups);

  ssRouter.get("/skill-group/:id", controllers.skillGroup.getSkillGroup);

  ssRouter.post("/skill-group/add", controllers.skillGroup.addNewSkillGroup);

  ssRouter.delete("/skill-group/:id", controllers.skillGroup.deleteSkillGroup);

  ssRouter.post(
    "/skill-group/:id",
    controllers.skillGroup.updateSkillGroupField
  );

  ssRouter.post(
    "/skill-group/:id/update-users",
    controllers.skillGroup.updateUsers
  );

  ssRouter.post(
    "/skill-group/:id/update-statuses",
    controllers.skillGroup.updateStatuses
  );

  ssRouter.get(
    "/skill-group-short",
    controllers.skillGroup.getAllSkillGroupsWithIdsAndNameOnly
  );

  ssRouter.get("/status", controllers.status.getAllStatuses);

  ssRouter.get("/timezone", controllers.support.getAllTimezones);

  ssRouter.get("/user-gal", controllers.user.getAllUsersForGal);

  ssRouter.get(
    "/gal-agentgroup",
    controllers.galAgentGroup.getAllGALAgentGroups
  );

  return ssRouter;
}

module.exports = ssRouterFactory;
