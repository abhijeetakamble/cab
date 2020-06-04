const getIdleCabDetails = async (input, context) => {
  const { id, from, to } = input;
  return new Promise((resolve, reject) => {
    const query = `SELECT count(*) as count FROM Cab_History WHERE timestamp BETWEEN UNIX_TIMESTAMP('${from}') AND UNIX_TIMESTAMP('${to}') and cab_id = ${id}`;
    context.session.mysqlInstance.connection.query(query, function (error, result) {
      console.log(result);
      if (error) {
        return reject(error);
      }
      if (result[0]) resolve({ count: result[0].count });
      else resolve({ count: 0 });
    });
  });
};
module.exports = {
  getIdleCabDetails
};
