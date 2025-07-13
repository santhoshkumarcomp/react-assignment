import React, { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  addEdge,
  Controls,
  useReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "@xyflow/react";
import "./App.css";
import "@xyflow/react/dist/style.css";
import "./xy-theme.css";
import { TextUpdaterNode } from "./TextUpdaterNode";
import { TogglePanelContext } from "./TogglePanelContext";
import SideBar from "./SideBar";
import { useDnD } from "./DnDContext";
import { ToastContainer, toast } from "react-toastify";

const initialNodes = [
  {
    id: "0",
    type: "textUpdater",
    position: { x: 0, y: 29 },
    data: { label: "your node name" },
  },
];

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};
const App = () => {
  const storedNodes = JSON.parse(localStorage.getItem("nodes")) || initialNodes;
  const storedEdges = JSON.parse(localStorage.getItem("edges")) || [];
  const reactFlow = useReactFlow();
  const [nodes, setNodes] = useState(storedNodes);
  const [edges, setEdges] = useState(storedEdges);
  let i = Number(storedNodes.length || 0);
  const getId = () => `${i++}`;
  var notifySuccess = () => {
    toast("Successfully saved !!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notify = () => toast.error("cannot save");
  const totalIncomingEdges = (id) => {
    const incomingEdges = edges.filter((edge) => edge.target == id);
    console.log(incomingEdges.length);
    return Number(incomingEdges.length || 0);
  };

  const saveChanges = useCallback(() => {
    console.log(reactFlow.getNodes());
    console.log(reactFlow.getEdges());
    console.log(nodes.length);
    var count = 0;
    if (reactFlow.getNodes().length > 1) {
      var canSave = nodes.every(function (node) {
        let id = Number(node.id);

        if (totalIncomingEdges(id) <= 0) {
          count++;
          if (count > 1) {
            console.log("cant save");
            return false;
          } else {
            return true;
          }
        }
        return true;
      });
      if (canSave) {
        localStorage.setItem("nodes", JSON.stringify(nodes));
        localStorage.setItem("edges", JSON.stringify(edges));
        notifySuccess();
      } else {
        notify();
      }
    } else {
      localStorage.setItem("nodes", JSON.stringify(nodes));
      localStorage.setItem("edges", JSON.stringify(edges));
      notifySuccess();
      return;
    }
  }, [reactFlow, nodes, edges]);

  const [toggle, setToggle] = useState(false);

  const msgRef = useRef();

  const [id, setId] = useState(1);

  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();
  const [nodeData, setNodeData] = useState({
    id,
    type: "textUpdater",
    position: { x: 0, y: 29 },
    data: { label: "your node name" },
  });

  const onConnect = useCallback((params) => {
    console.log({
      ...params,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    });
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        eds
      )
    );
  }, []);
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

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `edit your msg` },
      };

      const uniqueNode = nodes.every((node) =>
        node.id === newNode.id ? false : true
      );
      if (uniqueNode) {
        setNodes((nodes) => nodes.concat(newNode));
      }
    },
    [screenToFlowPosition, type]
  );
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move;";
  };

  const { updateNode } = useReactFlow();
  const updateNodeLabel = (evt) => {
    console.log(id);

    updateNode(id, (node) => ({
      selected: true,
      data: { ...node.data, label: evt.target.value },
    }));
  };
  const handlePanelClose = () => {
    setToggle(!toggle);
    msgRef.current.value = "";
  };

  return (
    <>
      <TogglePanelContext.Provider
        value={{ toggle, setToggle, id, setId, nodeData, setNodeData }}
      >
        <div className="flex flex-col">
          <div className="block border-b-[0.5px] bg-pink-200 p-2">
            <button
              className="save-button cursor-pointer ml-[85%] "
              onClick={saveChanges}
            >
              Save Changes
            </button>
          </div>
          <div className="flex">
            <div
              className="flex-[0.7] "
              style={{ width: "100vw", height: "100vh" }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onConnect={onConnect}
                onDragStart={onDragStart}
                onPaneClick={() => {
                  setToggle(false);
                  msgRef.current.value = "";
                }}
                fitView
              />
            </div>
            <SideBar />
            <div
              className={`flex-[0.3]   ${
                toggle ? "block" : "hidden"
              } z-10 border-s-[0.5px]`}
            >
              <div className="flex flex-col items-center justify-center ">
                <div className=" p-8 ">
                  <span className="cursor-pointer pr-17 inline">
                    Settings Panel
                  </span>
                  <button
                    className=" inline flex flex-col items-center justify-center pb-[0.8px] mr-[30px] w-4 h-6 cursor-pointer border-[0.5px]"
                    onClick={handlePanelClose}
                  >
                    x
                  </button>
                </div>
                <div>
                  <textarea
                    onChange={updateNodeLabel}
                    type="text"
                    className="border-1"
                    ref={msgRef}
                    placeholder="enter msg here"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TogglePanelContext.Provider>
      <ToastContainer />
    </>
  );
};

export default App;
