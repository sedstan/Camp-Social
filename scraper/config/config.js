var databaseUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/node-webscrapper";

module.exports = {
  database: databaseUrl
}