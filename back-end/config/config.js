var databaseUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/camping";

module.exports = {
  database: databaseUrl,
  'secret':  process.env.PROJECT4_SECRET
}