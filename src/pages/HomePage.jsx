import React from 'react';
import ActionList from '../components/ActionList';
import UnansweredMessages from '../components/UnansweredMessages';

const Homepage = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center my-5">
                Action and Prompts Editor
            </h1>
            <ActionList />
            <UnansweredMessages />
        </div>
    );
};

export default Homepage;
