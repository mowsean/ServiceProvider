// /**
//  * @function authenticateSequelize
//  * @param {StartupContext} ctx - A startup context.
//  * @returns {Promise.<StartupContext>}
//  * @description
//  * Performs authentication for sequelize instances in configuration.
//  */
// function authenticateSequelize(ctx) {
//     ctx.logger.info('Starting sequelize authentication process.');

//     const authSequelize = tuple => {
//         ctx.logger.info(`Attempting authentication for database [${tuple.key}].`);
//         return tuple.instance.authenticate().then(() => {
//             ctx.logger.info(`Authentication successful for database [${tuple.key}].`);
//             return tuple;
//         });
//     };

//     const authPromises = Object.keys(ctx.config.databases)
//         .map(dbKey => ({
//             key: dbKey,
//             instance: ctx.config.databases[dbKey]
//         }))
//         .map(authSequelize);

//     return Promise.all(authPromises).then(() => {
//         ctx.logger.info('Sequelize authentication process complete.');
//         return ctx;
//     });
// }

// module.exports = authenticateSequelize;
