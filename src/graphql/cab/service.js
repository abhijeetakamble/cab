const registerCab = async (input, context) => {
  const { id, cityId } = input;
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Cab (id, city_id, state, last_trip_time, trip_count) VALUES (${id}, ${cityId}, 'IDLE', NULL, 0);`;
    context.session.mysqlInstance.connection.query(query, function (error) {
      console.log(error);
      if (error) {
        return resolve({
          status: false,
          message: 'Problem occurred during registration'
        });
      }
      resolve({
        status: true,
        message: 'Successfully Registered'
      });
    });
  });
};

const getCabDetails = async (id, context) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Cab WHERE id = "${id}"`;
    context.session.mysqlInstance.connection.query(query, function (error, result) {
      if (error) {
        return reject(error);
      }
      if (result[0]) resolve(result[0]);
    });
  });
};

const setCabCity = async (input, context) => {
  const { id, cityId } = input;
  return new Promise((resolve, reject) => {
    const query = `UPDATE Cab SET city_id = ${cityId} WHERE id = ${id}`;
    context.session.mysqlInstance.connection.query(query, function (error) {
      if (error) {
        return resolve({
          status: false,
          message: 'Problem occurred during changing city'
        });
      }
      resolve({
        status: true,
        message: 'Successfully Changed City'
      });
    });
  });
};

const updateHistory = async (input, context) => {
  const { id, state } = input;
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Cab_History ( cab_id, action, timestamp) VALUES (${id}, '${state}', NOW());`;
    context.session.mysqlInstance.connection.query(query, function (error) {
      console.log(error);
      if (error) {
        return resolve({
          status: false,
          message: 'Problem occurred during registration'
        });
      }
      resolve({
        status: true,
        message: 'Successfully Registered'
      });
    });
  });
};

const updateTrip = async (input, context) => {
  const { id, state, cityId } = input;
  return new Promise((resolve, reject) => {
    let query;
    if (state === 'ON_TRIP')
      query = `INSERT INTO Trip ( cab_id, city_id, start, end) VALUES (${id}, ${cityId} , NOW(), NULL);`;
    else query = `UPDATE Trip SET end = NOW() where cab_id = ${id} and end IS NULL`;
    context.session.mysqlInstance.connection.query(query, function (error, result) {
      console.log(query);
      if (error) {
        return resolve({
          status: false,
          message: 'Problem occurred during registration'
        });
      }
      resolve({
        status: true,
        message: 'Successfully Registered'
      });
    });
  });
};

const setCabState = async (input, context) => {
  const { id, state, cityId } = input;
  return new Promise((resolve, reject) => {
    let query;
    if (state === 'ON_TRIP')
      query = `UPDATE Cab SET state = '${state}', last_trip_time = NOW(), trip_count = trip_count + 1  WHERE id = ${id}`;
    else query = `UPDATE Cab SET state = '${state}' WHERE id = ${id}`;
    context.session.mysqlInstance.connection.query(query, function (error) {
      if (error) {
        return resolve({
          status: false,
          message: 'Problem occurred during changing state'
        });
      }
      updateHistory(input, context);
      updateTrip(input, context);
      resolve({
        status: true,
        message: 'Successfully Changed State'
      });
    });
  });
};

const assignCab = async (input, context) => {
  const { cityId } = input;
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM local_db.Cab where state='IDLE' and city_id = ${cityId} order by trip_count asc,last_trip_time asc limit 1;`;
    context.session.mysqlInstance.connection.query(query, function (error, result) {
      if (error) {
        return resolve({
          status: false,
          message: 'Problem occurred during assigning cab'
        });
      }
      if (result[0]) {
        setCabState(
          {
            id: result[0].id,
            state: 'ON_TRIP',
            cityId: cityId
          },
          context
        ).then((result) => {
          if (result.status === true) {
            return resolve({
              status: true,
              message: 'Cab Assigned'
            });
          } else {
            return resolve({
              status: false,
              message: 'Problem occurred during assigning cab'
            });
          }
        });
      } else {
        return resolve({
          status: false,
          message: 'No Cab available'
        });
      }
    });
  });
};

module.exports = {
  registerCab,
  getCabDetails,
  setCabCity,
  setCabState,
  assignCab
};
