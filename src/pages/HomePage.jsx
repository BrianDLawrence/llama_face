// src/pages/Homepage/Homepage.jsx
import React from 'react';
import ActionList from '../components/ActionList';

const initialActions = [
    {
        id: 1,
        name: 'Action 1',
        prompts: ['Prompt 1.1', 'Prompt 1.2'],
    },
    {
        id: 2,
        name: 'Action 2',
        prompts: ['Prompt 2.1', 'Prompt 2.2', 'Prompt 2.3'],
    },
    // Initial actions can be modified here
];

const Homepage = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold underline text-center my-5">
                Action and Prompts Editor
            </h1>
            <ActionList initialActions={initialActions} />
        </div>
    );
};

export default Homepage;
