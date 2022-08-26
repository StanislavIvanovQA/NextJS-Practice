import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import {useRouter} from 'next/router';
import {Fragment} from 'react';
import Head from 'next/head';

const NewMeetupPage = props => {
    const router = useRouter();

    const newMeetupHandler = async enteredMeetupData => {
        const response = await fetch('api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    };

    return (
        <Fragment>
            <Head>
                <title>Create new meetup</title>
            </Head>
            <NewMeetupForm onAddMeetup={newMeetupHandler}/>
        </Fragment>
    );
};

export default NewMeetupPage;
