import {MongoClient} from 'mongodb';


//? this function is used to handle incoming requests to the /api/new-meetup endpoint. It checks if the request method is POST, and if so, it extracts the data from the request body and logs it to the console. In a real application, you would typically store this data in a database. Finally, it sends a response back to the client with a status code of 201 (Created) and a JSON message indicating that the meetup was inserted successfully.
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // store the data in a database

    //? we are using the MongoClient class from the mongodb package to connect to a MongoDB database. The connect method takes a connection string as an argument, which specifies the location of the database and any authentication credentials needed to access it. Once connected, we can use the db method to get a reference to the database, and then use the collection method to get a reference to a specific collection within that database. Finally, we can use the insertOne method to insert a new document into that collection.
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const meetupCollection = await db.collection('meetups').insertOne(data);
    console.log(meetupCollection);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;  
