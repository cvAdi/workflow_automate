import { useState } from "react";

const useUndoRedo = (initialState) => {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initialState);
  const [future, setFuture] = useState([]);

  const setState = (newState) => {
    setPast([...past, present]);
    setPresent(newState);
    setFuture([]);
  };

  const undo = () => {
    if (past.length === 0) return;
    setFuture([present, ...future]);
    setPresent(past[past.length - 1]);
    setPast(past.slice(0, -1));
  };

  const redo = () => {
    if (future.length === 0) return;
    setPast([...past, present]);
    setPresent(future[0]);
    setFuture(future.slice(1));
  };

  return [present, setState, undo, redo, past.length > 0, future.length > 0];
};

export default useUndoRedo;
