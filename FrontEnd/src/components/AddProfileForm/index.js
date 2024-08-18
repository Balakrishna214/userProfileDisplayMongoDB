import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../features/userSlice';
import './index.css';

const AddProfileForm = ({ closePopup }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');
    const [profession, setProfession] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && age && location && profession) {
            const newProfile = { name, age, location, profession };
            dispatch(addProfile(newProfile));
            closePopup();
        }
    };

    return (
        <form className="add-profile-form" onSubmit={handleSubmit}>
            <h2>Add New Profile</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <input type="text" placeholder="Profession" value={profession} onChange={(e) => setProfession(e.target.value)} />
            <button type="submit">Add Profile</button>
        </form>
    );
};

export default AddProfileForm;
