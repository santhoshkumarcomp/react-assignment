import React, { useCallback, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Handle,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 25, y: 50 }, data: { label: "Node 2" } },
  { id: "n3", position: { x: 50, y: 100 }, data: { label: "Node 3" } },
];
const initialEdges = [
  { id: "n1-n2", source: "n1", sourceHandle: "a", target: "n2" },
  { id: "n2-n3", source: "n2", sourceHandle: "b", target: "n3" },
];

const App = () => {
  const [nodeCount, setNodeCount] = useState(3);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nodeData, setNodeData] = useState({
    id: "n4",
    position: { x: 0, y: 29 },
    data: { label: "your node name" },
  });

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const handleClick = () => {
    setNodeCount(nodeCount + 1);
    const tempId = `n${nodeCount}`;
    setNodeData((prev) => ({ ...prev, id: tempId }));
    setNodes((prev) => [...prev, nodeData]);
  };
  return (
    <div className="flex">
      <div className="flex-[0.6] " style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        />
      </div>
      <div className="flex-[0.4]  border-s-2">
        <button className="cursor-pointer" onClick={handleClick}>
          Message
        </button>
      </div>
    </div>
  );
};

export default App;
