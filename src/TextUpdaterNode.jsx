import { Position, ReactFlow, useNodeId } from "@xyflow/react";
import { useContext, useRef } from "react";
import "./TextUpdaterNode.css";
// import "@xyflow/react/dist/style.css";
import { TogglePanelContext } from "./TogglePanelContext";
import CustomHandle from "./CustomHandle";
export function TextUpdaterNode({ data }) {
  const { toggle, setToggle, setId } = useContext(TogglePanelContext);
 
  const id = useNodeId();
  const nodeRef = useRef(null);

 

  const nodeIdUpdate = () => {
    setId(id);
    setToggle(!toggle);
  };

  return (
    <div className="text-updater-node bg-white" ref={nodeRef}>
      <CustomHandle
        type="source"
        position={Position.Right}
        connectionCount={1}
      />
      <CustomHandle
        type="target"
        position={Position.Left}
        connectionCount={100}
      />
      <div className="border-y-[0.5px] border-pink-200">
        <p className="title text-[5px]  ">send Message</p>
        {/* <p className="title text-[5px]  "> ***</p> */}
      </div>

      
      <p className=" label text-[5px] p-2 mt-2 rounded-sm  bg-rose-200">
        {data.label || "add msg"}
      </p>
      <button className="cursor-pointer inline " onClick={nodeIdUpdate}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="7px"
          viewBox="0 -960 960 960"
          width="6px"
          fill="#f425b2"
          className="inline"
        >
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </svg>
      </button>
    </div>
  );
}
