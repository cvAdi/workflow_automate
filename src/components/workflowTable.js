import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const WorkflowTable = ({ nodes, setNodes, setSelectedNode }) => {
  const handleDelete = (nodeId) => {
    setNodes(nodes.filter((node) => node.id !== nodeId));
  };

  return (
    <div className="workflow-summary">
      <h4>📊 Workflow Summary</h4>
      <Table striped bordered hover className="summary-table">
        <thead>
          <tr>
            <th></th>
            <th>Node Type</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {nodes.length > 0 ? (
            nodes.map((node, index) => (
              <tr key={node.id} onClick={() => setSelectedNode(node)} style={{ cursor: "pointer" }}>
                <td>{index + 1}</td>
                <td>{node.type}</td>
                <td>{node.data.name}</td>
                <td style={{ color: node.data.status === "Active" ? "green" : "red" }} >{node.data.status}</td>
                <td>
                  <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(node.id); }}>
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">No nodes available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default WorkflowTable;
