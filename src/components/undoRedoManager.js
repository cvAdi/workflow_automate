import React from "react";

const UndoRedoManager = ({ undo, redo, canUndo, canRedo }) => {
  return (
    <div className="flex space-x-4">
      <button 
        onClick={undo} 
        disabled={!canUndo} 
        className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        Undo
      </button>
      <button 
        onClick={redo} 
        disabled={!canRedo} 
        className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        Redo
      </button>
    </div>
  );
};

export default UndoRedoManager;
