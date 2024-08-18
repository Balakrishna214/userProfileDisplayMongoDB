import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, setCurrentPage, sortProfiles } from '../../features/userSlice';
import ProfileCard from '../ProfileCard';
import Popup from 'reactjs-popup';
import { FaPlus, FaFilter, FaTimes } from 'react-icons/fa';
import AddProfileForm from '../AddProfileForm';
import { Puff } from 'react-loader-spinner';

import './index.css';

const Home = () => {
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.users.profiles) || [];
    const status = useSelector((state) => state.users.status);
    const currentPage = useSelector((state) => state.users.currentPage);
    const itemsPerPage = 4;

    useEffect(() => {
        dispatch(fetchProfiles());
    }, [dispatch]);

    if (status === 'loading') {
        return <div className='loader'>
        <Puff
            visible={true}
            height="80"
            width="80"
            color="#ffff"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
    }

    if (status === 'failed') {
        return <div>Error loading profiles</div>;
    }

    // Handle page change
    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };
    console.log(profiles);
    

    // Calculate the profiles to display
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProfiles = profiles.slice(startIndex, startIndex + itemsPerPage);

    // Calculate total pages
    const totalPages = Math.ceil(profiles.length / itemsPerPage);

    return (
        <div className="home-container">
            <div className="header">
                 
                <h1>GoforMeet</h1>
                <button className="sort-button" onClick={() => dispatch(sortProfiles())}>
                    <FaFilter className="icon" />
                    Sort by Location
                </button>
            </div>
            <div className="profiles-grid">
                {displayedProfiles.length > 0 ? (
                    displayedProfiles.map((profile) => (
                        <ProfileCard key={profile._id} profile={profile} />
                    ))
                ) : (
                    <div>No profiles available</div>
                )}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className='create-new-user-button-container'>
            <Popup
                    trigger={<div className='plus-container'><FaPlus className="icon" /></div>}
                    modal
                    nested
                    contentStyle={{ padding: '0', borderRadius: '10px', background: '#fff' }}
                >
                    {(close) => (
                        <div className="popup-card">
                            <div className="popup-header">
                                <h3>Create New User</h3>
                                <button className="close-button" onClick={close}>
                                    <FaTimes />
                                </button>
                            </div>
                            <AddProfileForm closePopup={close} />
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    );
};

export default Home;
