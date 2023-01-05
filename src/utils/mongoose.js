const { connect, connection, mongoose } = require('mongoose')


const conn = {
  isConnected: false
}
export async function dbConect() {

  if (conn.isConnected) return;

  mongoose.set('strictQuery', false);
  const db = await connect(process.env.DB_URI);
  conn.isConnected = db.connections[0].readyState;
  console.log(db.connection.db.databaseName);
}

connection.on("connected", () => {
  console.log('*** SUCCESSFUL CONNECTION ***');
})

connection.on("error", (err) => {
  console.log(err, '*** CONNECTION ERROR ***');
})
