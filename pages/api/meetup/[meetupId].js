import {MongoClient, ObjectID} from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const {meetupId} = req.query;

        const client = await MongoClient.connect('mongodb+srv://nextjsdbuser:Zaqpol13@cluster0.trzqhqg.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        const meetupCollection = db.collection('meetups');

        await meetupCollection.findOneAndDelete({_id: ObjectID(meetupId)});

        await client.close();

        res.status(200).json({message: `meetup succesfully deleted`});
    }
}
