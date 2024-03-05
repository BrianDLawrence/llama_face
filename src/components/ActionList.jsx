import React, { useState, useEffect } from 'react';
import { getActions, postAction, putAction, deleteAction, sendAction } from '../services/actionService';

const ActionList = () => {
  const [actions, setActions] = useState([]);
  const [newActionName, setNewActionName] = useState('');
  const [newSuccessCriteria, setNewSuccessCriteria] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [editStates, setEditStates] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const fetchedActions = await getActions();
      setActions(fetchedActions);
      // Initialize edit state for each fetched action
      const initialEditStates = fetchedActions.reduce((acc, action) => {
        acc[action.id] = { name: action.name, success_criteria: action.success_criteria, prompt: action.prompt };
        return acc;
      }, {});
      setEditStates(initialEditStates);
    } catch (error) {
      console.error('Error fetching actions:', error);
    }
  };

  const handleAddAction = async () => {
    try {
      const newAction = { name: newActionName, success_criteria: newSuccessCriteria, prompt: newPrompt };
      await postAction(newAction);
      setNewActionName('');
      setNewSuccessCriteria('');
      setNewPrompt('');
      await fetchActions(); // Refresh the list of actions
    } catch (error) {
      console.error('Error adding new action:', error);
    }
  };

  const handleUpdateAction = async (id) => {
    try {
      const actionToUpdate = { name: editStates[id].name, success_criteria: editStates[id].success_criteria, prompt: editStates[id].prompt };
      await putAction(id, actionToUpdate);
      await fetchActions(); // Refresh the list of actions
    } catch (error) {
      console.error(`Error updating action with id ${id}:`, error);
    }
  };

  const handleSendAction = async (id) => {
    try {
      await sendAction(id);
      setIsDialogOpen(true); // Show the dialog
      setTimeout(() => {
        setIsDialogOpen(false); // Hide the dialog
        window.location.reload(); // Refresh the page after the dialog is hidden
      }, 3000);
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
    <div>
      <div className="container mx-auto px-2 py-2">
        <input
          type="text"
          placeholder="Action Name"
          value={newActionName}
          onChange={(e) => setNewActionName(e.target.value)}
          className="mt-1 block w-full rounded-md border-base-300 shadow-sm"
        />
        <input
          type="text"
          placeholder="Success Criteria"
          value={newSuccessCriteria}
          onChange={(e) => setNewSuccessCriteria(e.target.value)}
          className="mt-1 block w-full rounded-md border-base-300 shadow-sm"
        />
        <input
          type="text"
          placeholder="Prompt"
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          className="mt-1 block w-full rounded-md border-base-300 shadow-sm"
        />
        <button
          onClick={handleAddAction}
          className="mt-2 bg-primary hover:brightness-110 text-primary-content font-bold py-2 px-4 rounded"
        >

          Add New Action
        </button>
      </div>
      <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5">
        {actions.map((action) => (
          <div class="card w-128 bg-base-100 shadow-xl card-bordered">
            <div class="card-body">
              <h2 class="card-title">{editStates[action.id]?.name || ''}</h2>
              <div>
                <input
                  type="text"
                  value={editStates[action.id]?.name || ''}
                  onChange={(e) => handleFieldChange(action.id, 'name', e.target.value)}
                  className="text-lg font-semibold rounded-md border-base-300 shadow-sm focus:border-indigo-300 mb-2"
                />
                <input
                  type="text"
                  value={editStates[action.id]?.success_criteria || ''}
                  onChange={(e) => handleFieldChange(action.id, 'success_criteria', e.target.value)}
                  className="text-lg font-semibold rounded-md border-base-300 shadow-sm focus:border-indigo-300 mb-2"
                />
                <input
                  type="text"
                  value={editStates[action.id]?.prompt || ''}
                  onChange={(e) => handleFieldChange(action.id, 'prompt', e.target.value)}
                  className="text-lg font-semibold rounded-md border-base-300 shadow-sm focus:border-indigo-300"
                />
              </div>
              <div class="card-actions justify-end text-xs">
                <div className="py-4 flex flex-row">
                  <button
                    onClick={() => handleSendAction(action.id)}
                    className="bg-secondary hover:brightness-125 text-secondary-content font-bold py-1 px-2 rounded"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => handleUpdateAction(action.id)}
                    className="ml-2 bg-secondary hover:brightness-125 text-secondary-content font-bold py-1 px-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteAction(action.id)}
                    className="ml-2 bg-accent hover:brightness-110 text-accent-content font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
      {isDialogOpen && (
        <div role="alert" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Message Sent!</span>
        </div>
      )}
    </div>
  );
};

export default ActionList;
