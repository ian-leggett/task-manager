const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
  connectionURL,
  {
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    db.collection('tasks').updateMany({
      completed : false,
      }, {
        $set: {
          completed: true,
        }
      })
      .then((result) => {
        console.log('Success', result)
      })
      .catch((error) => {
        console.log('Something went wrong', error)
      })
  }
)
