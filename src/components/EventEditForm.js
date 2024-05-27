import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventEditForm = ({ editEvent, setEditEvent, updateEvent }) => {
    const [name, setName] = useState(editEvent.name);
    const [date, setDate] = useState(editEvent.date);
    const [location, setLocation] = useState(editEvent.location);

    useEffect(() => {
        if (editEvent) {
            setName(editEvent.name);
            setDate(editEvent.date);
            setLocation(editEvent.location);
        }
    }, [editEvent]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/events/${editEvent.id}`, { name, date, location })
            .then(response => {
                updateEvent(response.data);
                setEditEvent(null);
            })
            .catch(error => {
                console.error('There was an error updating the event!', error);
            });
    };

    return (
        <div>
            <h2>Edit Event</h2>
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
                <button type="submit">Update Event</button>
                <button type="button" onClick={() => setEditEvent(null)}>Cancel</button>
            </form>
        </div>
    );
};

export default EventEditForm;
