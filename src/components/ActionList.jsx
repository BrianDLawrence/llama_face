import React, { useState, useEffect } from 'react';
import { getActions, postAction, putAction, deleteAction, sendAction } from '../services/actionService';

const ActionList = () => {
  const [actions, setActions] = useState([]);
  const [newActionName, setNewActionName] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [editStates, setEditStates] = useState({}); // Tracks edits to existing actions

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const fetchedActions = await getActions();
      setActions(fetchedActions);
      // Initialize edit state for each fetched action
      const initialEditStates = fetchedActions.reduce((acc, action) => {
        acc[action.id] = { name: action.name, prompt: action.prompt };
        return acc;
      }, {});
      setEditStates(initialEditStates);
    } catch (error) {
      console.error('Error fetching actions:', error);
    }
  };

  const handleAddAction = async () => {
    try {
      const newAction = { name: newActionName, prompt: newPrompt };
      await postAction(newAction);
      setNewActionName('');
      setNewPrompt('');
      await fetchActions(); // Refresh the list of actions
    } catch (error) {
      console.error('Error adding new action:', error);
    }
  };

  const handleUpdateAction = async (id) => {
    try {
      const actionToUpdate = { name: editStates[id].name, prompt: editStates[id].prompt };
      await putAction(id, actionToUpdate);
      await fetchActions(); // Refresh the list of actions
    } catch (error) {
      console.error(`Error updating action with id ${id}:`, error);
    }
  };

  const handleSendAction = async (id) => {
    try {
      await sendAction(id);
    } catch (error) {
      console.error(`Error sending action with id ${id}:`, error);
    }
  };

  const handleDeleteAction = async (id) => {
    try {
      await deleteAction(id);
      await fetchActions(); // Refresh the list of actions
    } catch (error) {
      console.error(`Error deleting action with id ${id}:`, error);
    }
  };

  const handleFieldChange = (actionId, field, value) => {
    setEditStates(prev => ({
      ...prev,
      [actionId]: {
        ...prev[actionId],
        [field]: value
      }
    }));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Action Name"
          value={newActionName}
          onChange={(e) => setNewActionName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <input
          type="text"
          placeholder="Prompt"
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
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
          <li key={action.id} className="py-4 flex justify-between items-center">
            <div>
              <input
                type="text"
                value={editStates[action.id]?.name || ''}
                onChange={(e) => handleFieldChange(action.id, 'name', e.target.value)}
                className="text-lg font-semibold rounded-md border-gray-300 shadow-sm focus:border-indigo-300 mb-2"
              />
              <input
                type="text"
                value={editStates[action.id]?.prompt || ''}
                onChange={(e) => handleFieldChange(action.id, 'prompt', e.target.value)}
                className="text-lg font-semibold rounded-md border-gray-300 shadow-sm focus:border-indigo-300"
              />
            </div>
            <div className="py-4 flex flex-row">
              <button
                onClick={() => handleSendAction(action.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Send
              </button>
              <button
                onClick={() => handleUpdateAction(action.id)}
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteAction(action.id)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionList;
