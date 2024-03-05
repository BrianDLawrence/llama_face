import React, { useState, useEffect } from 'react';
import { getAmountUnansweredMessages } from '../services/actionService';

const UnansweredMessages = () => {
    const [unansweredMessages, setUnansweredMessages] = useState(0);

    useEffect(() => {
        const fetchUnansweredMessages = async () => {
            try {
                const response = await getAmountUnansweredMessages();
                setUnansweredMessages(response.amount);
            } catch (error) {
                console.error('Error fetching unanswered messages:', error);
            }
        };


        fetchUnansweredMessages();
    }, []);

    return (
        <div className="flex justify-center items-center h-32 bg-info rounded-lg shadow-md m-4">
            <div className="text-center">
                <p className="text-2xl font-semibold text-info-content">Unanswered Messages</p>
                <p className="text-6xl font-bold text-primary-content">{unansweredMessages}</p>
                <p className="text-6xl font-bold text-primary-content">{unansweredMessages}</p>
            </div>
        </div>
    );
};

export default UnansweredMessages;
