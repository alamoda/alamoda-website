import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://simozampa:<3NcsmN6RovpaLRnKpassword>@cluster0.rdkre1n.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client.db('<database>');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
  }
}

export default connectToDatabase;