import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

const NodeConfigPanel = ({ selectedNode, nodes, setNodes }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Update form values whenever the selected node changes
  useEffect(() => {
    reset(selectedNode?.data || {});
  }, [selectedNode, reset]);

  const onSubmit = (data) => {
    setNodes((prevNodes) =>
      prevNodes.map(node =>
        node.id === selectedNode.id ? { ...node, data } : node
      )
    );
  };

  if (!selectedNode) {
    return <p className="text-muted text-center">⚡ Select a node to edit</p>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="node-config-form">
      <Form.Group>
        <Form.Label>Node Name</Form.Label>
        <Form.Control 
          {...register("name", { required: "Name is required" })}
          placeholder="Enter node name"
        />
        {errors.name && <small className="text-danger">{errors.name.message}</small>}
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Status</Form.Label>
        <Form.Select {...register("status")}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100 mt-3">
        Save
      </Button>
    </Form>
  );
};

export default NodeConfigPanel;
