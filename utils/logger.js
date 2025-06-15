
// to check the date and time of the log
const log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

module.exports = { log };