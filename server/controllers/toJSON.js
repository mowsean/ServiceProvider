module.exports = record => (record && record.toJSON ? record.toJSON() : record);
