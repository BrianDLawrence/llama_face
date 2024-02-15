// src/components/ActionList/ActionList.jsx
import React, { useState, useEffect } from 'react';
import { getActions, postAction } from '../services/actionService';

/*const ActionList = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const fetchedActions = await getActions();
        setActions(fetchedActions);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    };

    fetchActions();
  }, []);*/

const ActionList = ({ initialActions }) => {
  const [actions, setActions] = useState(initialActions);
  const [selectedActionId, setSelectedActionId] = useState(null);
  const [newActionName, setNewActionName] = useState('');

  const togglePrompts = (actionId) => {
    setSelectedActionId(selectedActionId === actionId ? null : actionId);
  };

  const handleActionNameChange = (actionId, newName) => {
    const updatedActions = actions.map(action => {
      if (action.id === actionId) {
        return { ...action, name: newName };
      }
      return action;
    });
    setActions(updatedActions);
  };

  const handleAddAction = () => {
    const newAction = {
      id: actions.length + 1, // Simple id assignment, consider more robust methods for real applications
      name: newActionName,
      prompts: [],
    };
    setActions([...actions, newAction]);
    setNewActionName(''); // Reset input after adding
  };

  const addPromptToAction = (actionId) => {
    const updatedActions = actions.map(action => {
      if (action.id === actionId) {
        return { ...action, prompts: [...action.prompts, ""] };
      }
      return action;
    });
    setActions(updatedActions);
  };

  const updatePrompt = (actionId, index, newValue) => {
    const updatedActions = actions.map(action => {
      if (action.id === actionId) {
        const updatedPrompts = [...action.prompts];
        updatedPrompts[index] = newValue;
        return { ...action, prompts: updatedPrompts };
      }
      return action;
    });
    setActions(updatedActions);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="New Action Name"
          value={newActionName}
          onChange={(e) => setNewActionName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <button
          onClick={handleAddAction}
          className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Action
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {actions.map((action) => (
          <li key={action.id} className="py-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={action.name}
                onChange={(e) => handleActionNameChange(action.id, e.target.value)}
                className="text-lg font-semibold rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
              />
              <button
                onClick={() => togglePrompts(action.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {selectedActionId === action.id ? 'Hide Prompts' : 'Show Prompts'}
              </button>
            </div>
            {selectedActionId === action.id && (
              <>
                <ul className="mt-2">
                  {action.prompts.map((prompt, index) => (
                    <li key={index} className="text-gray-600 mt-1">
                      <input
                        type="text"
                        value={prompt}
                        onChange={(e) => updatePrompt(action.id, index, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => addPromptToAction(action.id)}
                  className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Prompt
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionList;