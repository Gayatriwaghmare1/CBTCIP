import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = ({ setEditEvent }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
    }, []);

    const deleteEvent = (id) => {
        axios.delete(`http://localhost:8080/api/events/${id}`)
            .then(() => {
                setEvents(events.filter(event => event.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the event!', error);
            });
    };

    return (
        <div>
            <h2>Event List</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        {event.name} - {event.date} - {event.location}
                        <button onClick={() => setEditEvent(event)}>Edit</button>
                        <button onClick={() => deleteEvent(event.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
