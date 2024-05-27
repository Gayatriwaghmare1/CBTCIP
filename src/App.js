// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    guestList: '',
    budget: '',
    vendors: '',
    schedule: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/events', formData)
      .then(response => setEvents([...events, response.data]))
      .catch(error => console.error(error));
  };


  return (
    <div>
      <h1>EventPlanner360</h1>
      <form onSubmit={handleSubmit}>
       <h3>Event Name:</h3><input name="name" placeholder="Event Name" onChange={handleChange} /><br></br>
        <h3>Date:</h3><input name="date" type="date" onChange={handleChange} /><br></br>
        <h3>Location:</h3><input name="location" placeholder="Location" onChange={handleChange} /><br></br>
        <h3>Description:</h3><textarea name="description" placeholder="Description" onChange={handleChange}></textarea><br></br>
        <h3>Guestlist:</h3><input name="guestList" placeholder="Guest List (comma separated)" onChange={handleChange} /><br></br>
        <h3>Budget:</h3><input name="budget" placeholder="Budget" onChange={handleChange} /><br></br>
        <h3>Vendors:</h3><input name="vendors" placeholder="Vendors (comma separated)" onChange={handleChange} /><br></br>
        <h3>Schedule:</h3><input name="schedule" placeholder="Schedule (time:activity, comma separated)" onChange={handleChange} /><br></br>
        <button type="submit">Create Event</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event._id}>{event.name} - {event.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
