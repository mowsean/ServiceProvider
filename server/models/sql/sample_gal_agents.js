// const Sequelize = require('sequelize');

// module.exports = sequelize => {
//     const options = {
//         timestamps: true,
//         createdAt: 'agent_add_date',
//         updatedAt: 'agent_modify_date',
//         tableName: 'gal_agents',
//     };

//     const definition = {
//         ['agent_id']: {
//             allowNull: false,
//             type: Sequelize.UUIDV4,
//             primaryKey: true,
//         },
//         ['agent_max_daily_leads']: {
//             allowNull: true,
//             type: Sequelize.INTEGER,
//         },
//         ['agent_inactive']: {
//             allowNull: false,
//             type: Sequelize.BOOLEAN,
//         },
//         ['agent_add_date']: {
//             allowNull: false,
//             type: Sequelize.DATE,
//         },
//         ['agent_modify_date']: {
//             allowNull: true,
//             type: Sequelize.DATE,
//         },
//         ['agent_delete_flag']: {
//             allowNull: true,
//             type: Sequelize.BOOLEAN,
//         },
//         ['agent_agent_group_id']: {
//             allowNull: true,
//             type: Sequelize.UUIDV4,
//         },
//         ['agent_call_flag']: {
//             allowNull: true,
//             type: Sequelize.BOOLEAN,
//         },
//         ['agent_call_start']: {
//             allowNull: true,
//             type: Sequelize.DATE,
//         },
//         ['agent_call_campaign']: {
//             allowNull: true,
//             type: Sequelize.STRING(10),
//         },
//         ['agent_call_type']: {
//             allowNull: true,
//             type: Sequelize.STRING(50),
//         },
//         ['agent_first_call']: {
//             allowNull: true,
//             type: Sequelize.DATE,
//         },
//         ['agent_override_pv_schedule']: {
//             allowNull: true,
//             type: Sequelize.BOOLEAN,
//         },
//         ['agent_max_daily_acd_leads']: {
//             allowNull: true,
//             type: Sequelize.INTEGER,
//         },
//         ['agent_acd_call_taken']: {
//             allowNull: true,
//             type: Sequelize.INTEGER,
//         },
//         ['agent_default_agent_group_id']: {
//             allowNull: true,
//             type: Sequelize.UUIDV4,
//         },
//         ['agent_default_agent_group_id_acd']: {
//             allowNull: true,
//             type: Sequelize.UUIDV4,
//         },
//     };

//     return sequelize.define('gal_agents', definition, options);
// };
