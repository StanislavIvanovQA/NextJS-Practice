import classes from './MeetupDetail.module.css';
import {useRouter} from 'next/router';

const MeetupDetail = props => {
    const route = useRouter();

    const deleteHandler = async () => {
        const url = `/api/meetup/${props._id}`;

        await fetch(url, {method: 'DELETE'});

        await route.replace('/');
    };

    return (
        <section className={classes.detail}>
            <img
                src={props.image}
                alt={props.title}
            />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
            <button onClick={deleteHandler}>Delete meetup</button>
        </section>
    );
};

export default MeetupDetail;
