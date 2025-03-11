import React, { useCallback } from "react";
import ReactFlow, { addEdge, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import '../index.css';

const WorkflowCanvas = ({ nodes, setNodes, edges, setEdges, selectedNode }) => {
  // Handle edge connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Function to update node data inline
  const onNodeChange = (event, nodeId, field) => {
    const newValue = event.target.value;
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [field]: newValue } }
          : node
      )
    );
  };

  // Custom node for inline editing
  const nodeTypes = {
    customNode: ({ data, id }) => (
      <div className="node-container">
        <input
          className="node-input"
          type="text"
          value={data.name || ""}
          onChange={(e) => onNodeChange(e, id, "name")}
          placeholder="Enter node name"
        />
        <select
          className="node-select"
          value={data.status || "active"}
          onChange={(e) => onNodeChange(e, id, "status")}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    ),
  };

  return (
    <div className="workflow-canvas">
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          type: "customNode",
          selected: selectedNode?.id === node.id, // Highlight the selected node
        }))}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
