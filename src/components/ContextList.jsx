import React, { useState, useEffect } from "react";
import {
  getAllContext,
  createContext,
  updateContext,
  deleteContext,
} from "../services/contextService";

const ContextList = () => {
  const [contexts, setContexts] = useState([]);
  const [newContextName, setNewContextName] = useState("");
  const [newContextDescription, setNewContextDescription] = useState("");
  const [editStates, setEditStates] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchContexts();
  }, []);

  const fetchContexts = async () => {
    try {
      const fetchedContexts = await getAllContext();
      setContexts(fetchedContexts);
      const initialEditStates = fetchedContexts.reduce((acc, context) => {
        acc[context.id] = {
          name: context.name,
          description: context.description,
        };
        return acc;
      }, {});
      setEditStates(initialEditStates);
    } catch (error) {
      console.error("Error fetching contexts:", error);
    }
  };

  const handleAddContext = async () => {
    try {
      const newContext = {
        name: newContextName,
        description: newContextDescription,
      };
      await createContext(newContext);
      setNewContextName("");
      setNewContextDescription("");
      await fetchContexts();
    } catch (error) {
      console.error("Error adding new context:", error);
    }
  };

  const handleUpdateContext = async (id) => {
    try {
      const contextToUpdate = {
        name: editStates[id].name,
        description: editStates[id].description,
      };
      await updateContext(id, contextToUpdate);
      await fetchContexts();
    } catch (error) {
      console.error(`Error updating context with id ${id}:`, error);
    }
  };

  const handleDeleteContext = async (id) => {
    try {
      await deleteContext(id);
      await fetchContexts();
    } catch (error) {
      console.error(`Error deleting context with id ${id}:`, error);
    }
  };

  const handleFieldChange = (contextId, field, value) => {
    setEditStates((prev) => ({
      ...prev,
      [contextId]: {
        ...prev[contextId],
        [field]: value,
      },
    }));
  };

  return (
    <div>
      <div className="container mx-auto px-2 py-2">
        <input
          type="text"
          placeholder="Context Name"
          value={newContextName}
          onChange={(e) => setNewContextName(e.target.value)}
          className="mt-1 block w-full rounded-md border-base-300 shadow-sm"
          id="contextName"
        />
        <input
          type="text"
          placeholder="Context Description"
          value={newContextDescription}
          onChange={(e) => setNewContextDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-base-300 shadow-sm"
          id="contextDescription"
        />
        <button
          onClick={handleAddContext}
          className="mt-2 bg-primary hover:brightness-110 text-primary-content font-bold py-2 px-4 rounded"
        >
          Add New Context
        </button>
      </div>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5">
        {contexts.map((context) => (
          <div
            className="card w-128 bg-base-100 shadow-xl card-bordered"
            key={context.id}
          >
            <div className="card-body">
              <h2 className="card-title">
                {editStates[context.id]?.name || ""}
              </h2>
              <div>
                <input
                  type="text"
                  value={editStates[context.id]?.name || ""}
                  onChange={(e) =>
                    handleFieldChange(context.id, "name", e.target.value)
                  }
                  className="text-lg font-semibold rounded-md border-base-300 shadow-sm focus:border-indigo-300 mb-2"
                  id={"contextNameWithId" + context.id}
                />
                <input
                  type="text"
                  value={editStates[context.id]?.description || ""}
                  onChange={(e) =>
                    handleFieldChange(context.id, "description", e.target.value)
                  }
                  className="text-lg font-semibold rounded-md border-base-300 shadow-sm focus:border-indigo-300"
                  id={"contextDescriptionWithId" + context.id}
                />
              </div>
              <div className="card-actions justify-end text-xs">
                <div className="py-4 flex flex-row">
                  <button
                    onClick={() => handleUpdateContext(context.id)}
                    className="ml-2 bg-secondary hover:brightness-125 text-secondary-content font-bold py-1 px-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteContext(context.id)}
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
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Message Sent!</span>
        </div>
      )}
    </div>
  );
};

export default ContextList;
