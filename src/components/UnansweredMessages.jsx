import React, { useState, useEffect } from 'react';
import { getAmountUnansweredMessages } from '../services/actionService';

const UnansweredMessages = () => {
    const [unansweredMessages, setUnansweredMessages] = useState(0);

    useEffect(() => {
        const fetchUnansweredMessages = async () => {
            try {
                const response = await getAmountUnansweredMessages();
                // Assuming the API response structure is { amount: <number> }
                setUnansweredMessages(response.amount); // Extract and use the `amount` value
            } catch (error) {
                console.error('Error fetching unanswered messages:', error);
            }
        };


        fetchUnansweredMessages();
    }, []);

    return (
        <div className="flex justify-center items-center h-32 bg-blue-100 rounded-lg shadow-md m-4">
            <div className="text-center">
                <p className="text-2xl font-semibold text-blue-800">Unanswered Messages</p>
                <p className="text-6xl font-bold text-blue-600">{unansweredMessages}</p>
            </div>
        </div>
    );
};

export default UnansweredMessages;
