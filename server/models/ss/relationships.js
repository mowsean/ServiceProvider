function relationships(models) {
  // models.prioritization_rules.hasMany(models.lead_rule_details, {
  //     foreignKey: 'rul_key',
  // });

  // models.gal_campaigngroup2agentgroup.belongsTo(models.gal_agentgroups, {
  //     foreignKey: 'cmpgrp2agtgrp_agent_id',
  //     targetKey: 'agent_group_id',
  // });

  // models.company.belongsTo(models.companyType, {
  //   foreignKey: 'company_type_id',
  // });

  // models.accounts.hasMany(models.individuals, {
  //   foreignKey: 'indv_account_id',
  // });

  return models;
}

module.exports = relationships;