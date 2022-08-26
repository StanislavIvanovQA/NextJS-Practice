import {MongoClient} from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://nextjsdbuser:Zaqpol13@cluster0.trzqhqg.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        const meetupCollection = db.collection('meetups');

        const result = await meetupCollection.insertOne(data);

        console.log(result);

        await client.close();

        res.status(201).json(result);
    }
}

export default handler;
