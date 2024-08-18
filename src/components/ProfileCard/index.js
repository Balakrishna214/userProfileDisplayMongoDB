import React from 'react';
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import './index.css';

const ProfileCard = ({ profile }) => {
    return (
        <div className="profile-card">
            <div className="profile-card-body">
                 <div className='user-icon-container'>
                 <FaUser className="user-icon" />
                 </div>
                 
                <h2>{profile.name}</h2>
                <div className='sub-container'>
                <FaCalendarAlt className="icon" />
                <p>{profile.age} years</p>
                </div>
                <div className='sub-container'>
                <FaMapMarkerAlt className="icon" style={{ color: 'red' }} />
                <p>{profile.location}</p>
                </div>
                <div className='sub-container profession'>
                <FaBriefcase className="icon" />
                <p>{profile.profession}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
