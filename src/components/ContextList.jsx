import React, { useState, useEffect } from 'react';
import { getAllContext } from '../services/contextService';

const ContextList = () => {
    const [contexts, setContexts] = useState([]);

    useEffect(() => {
        fetchContexts();
    },[]);

    
  const fetchContexts = async () => {
    try {
      const fetchedContexts = await getAllContext();
      setContexts(fetchedContexts)
    } catch (error) {
      console.error('Error fetching contexts:', error);
    }
  };

  const handleDeleteContext = async (id) => {
    try {
        console.log('TODO: This will delete a context with id: '+id);
    } catch (error) {
      console.error(`Error deleting context with id ${id}:`, error);
    }
  };

  const handleUpdateContext = async (id) => {
    try {
        console.log('TODO: This will update a context with id: '+id);
    } catch (error) {
      console.error(`Error updating context with id ${id}:`, error);
    }
  };




  return (
    <div>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-5">
        {contexts.map((context) => (
          <div className="card w-128 bg-base-100 shadow-xl card-bordered" key={context.id}>
            <div className="card-body">
              <h2 className="card-title">{context.name || ''}</h2>
              <div>
                {context.description}
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
    </div>
  );
};

export default ContextList;