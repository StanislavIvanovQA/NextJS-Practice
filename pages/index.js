import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb';
import {Fragment} from 'react';
import Head from 'next/head';

const HomePage = props => {
    return (
        <Fragment>
            <Head>
                <title>NextJS Tutorial Titles Project</title>
                <meta
                    name="description"
                    content="My first NextJS app!"
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    );
};

export async function getServerSideProps(context) { //next generates props on every get request on site in server side
    const req = context.req; //request object
    const res = context.res; //response object

    const client = await MongoClient.connect('mongodb+srv://nextjsdbuser:Zaqpol13@cluster0.trzqhqg.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                description: meetup.description,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        }
    }
}

// export async function getStaticProps() { //nextjs generates props on get request on site in server side by timer
//     const client = await MongoClient.connect('mongodb+srv://nextjsdbuser:Zaqpol13@cluster0.trzqhqg.mongodb.net/?retryWrites=true&w=majority');
//     const db = client.db();
//
//     const meetupCollection = db.collection('meetups');
//
//     const meetups = await meetupCollection.find().toArray();
//
//     client.close();
//
//     return {
//         props: {
//             meetups: meetups.map(meetup => ({
//                 title: meetup.title,
//                 address: meetup.address,
//                 description: meetup.description,
//                 image: meetup.image,
//                 id: meetup._id.toString(),
//             })),
//         },
//         revalidate: 1, //regeneration server side generated html content every hour
//     };
// };

export default HomePage;
