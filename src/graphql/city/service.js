const registerCity = async (input, context) => {
  const { id } = input;
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO City (id) VALUES ("${id}");`;
    context.session.mysqlInstance.connection.query(query, function (err) {
      if (err) {
        return resolve({
          status: false,
          message: "Problem occurred during registration"
        });
      }
      resolve({
        status: true,
        message: "Successfully Registered"
      });
    })
  });
};

const getCityDetails = async (id, context) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM City WHERE id = "${id}"`;
    context.session.mysqlInstance.connection.query(query, function (error, result) {
      if (error) {
        return reject(error);
      }
      if(result[0])
        resolve(result[0]);
    })
  });
};

module.exports = {
  registerCity,
  getCityDetails
};
