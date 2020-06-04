const getIdleCabDetails = async (input, context) => {
  const {from, to} = input;
  return new Promise((resolve, reject) => {
    const query = `SELECT count(*) FROM Cab WHERE timestamp >=  ${from} and timestamp <= ${to}`;
    context.session.mysqlInstance.connection.query(query, function (error, result) {
      if (error) {
        return reject(error);
      }
      if(result[0])
        resolve(result[0].count);
    })
  });
};
module.exports = {
  getCabDetails
};