import React, { useState } from "react";
import WorkflowCanvas from "./components/workflowCanvas";
import NodeConfigPanel from "./components/nodeConfigPanel";
import WorkflowTable from "./components/workflowTable";
import UndoRedoManager from "./components/undoRedoManager";
import { exportJSON, importJSON } from "./utils/exportImport";
import useUndoRedo from "./hooks/useUndoRedo";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Custom CSS

const initialNodes = [
  { id: "1", type: "Task", position: { x: 100, y: 100 }, data: { name: "Task 1", status: "Active" } },
  { id: "2", type: "Condition", position: { x: 300, y: 200 }, data: { name: "Condition 1", status: "Inactive" } },
];

const initialEdges = [];

const App = () => {
  const [nodes, setNodes, undo, redo, canUndo, canRedo] = useUndoRedo(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  // Adds a new node with default values
  const handleAddNode = () => {
    const newNode = {
      id: Date.now().toString(),
      type: "Task", // default type
      position: { x: 200, y: 200 }, // default position; adjust as needed
      data: { name: "New Node", status: "Active" },
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <Container fluid className="app-container">
      <h1 className="header-title">🚀 Workflow Automation Builder</h1>

      {/* Toolbar Section */}
      <div className="toolbar">
        <UndoRedoManager undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo} />
        <div className="button-group">
          <Button variant="outline-light" className="custom-button btn-sm" onClick={handleAddNode}>
            Add Node
          </Button>
          <Button variant="outline-light" className="custom-button btn-sm" onClick={() => exportJSON(nodes)}>
            <FaFileExport /> Export JSON
          </Button>
          <input
            type="file"
            accept="application/json"
            onChange={(e) => {
              importJSON(e, setNodes);
              e.target.value = ""; // Reset input for re-upload
            }}
            className="d-none"
            id="importFile"
          />
          <label htmlFor="importFile">
            <Button variant="outline-light" className="custom-button btn-sm">
              <FaFileImport /> Import JSON
            </Button>
          </label>
        </div>
      </div>

      {/* Main Layout */}
      <Row>
        {/* Left Panel: Workflow Table */}
        <Col md={8}>
          <Card className="custom-card">
            <WorkflowTable nodes={nodes} setNodes={setNodes} setSelectedNode={setSelectedNode} />
          </Card>
        </Col>

        {/* Right Panel: Node Configuration */}
        <Col md={4}>
          <Card className="custom-card">
            <NodeConfigPanel selectedNode={selectedNode} nodes={nodes} setNodes={setNodes} />
          </Card>
        </Col>
      </Row>

      {/* Canvas Row */}
      <Row className="mt-4">
        <Col>
          <Card className="custom-card">
            <WorkflowCanvas
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              selectedNode={selectedNode}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
