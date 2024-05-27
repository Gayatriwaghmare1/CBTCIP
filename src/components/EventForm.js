import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ addEvent }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/events', { name, date, location })
            .then(response => {
                addEvent(response.data);
                setName('');
                setDate('');
                setLocation('');
            })
            .catch(error => {
                console.error('There was an error creating the event!', error);
            });
    };

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
