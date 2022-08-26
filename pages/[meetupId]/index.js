import MeetupDetail from '../../components/meetups/MeetupDetail';
import {MongoClient, ObjectID} from 'mongodb';
import {Fragment} from 'react';
import Head from 'next/head';

const MeetupDetails = props => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
};

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://nextjsdbuser:Zaqpol13@cluster0.trzqhqg.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find({}, {_id: 1}).toArray();

    await client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}})),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://nextjsdbuser:Zaqpol13@cluster0.trzqhqg.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const selectedMeetup = await meetupCollection.findOne({_id: ObjectID(meetupId)});

    await client.close();

    return {
        props: {
            meetupData: {...selectedMeetup, _id: selectedMeetup._id.toString()},
        },
    };
}

export default MeetupDetails;
