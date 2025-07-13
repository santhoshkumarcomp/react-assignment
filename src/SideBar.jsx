import React, { useContext } from "react";
import { TogglePanelContext } from "./TogglePanelContext";
import { useDnD } from "./DnDContext";

const SideBar = () => {
  const [_, setType] = useDnD();
  const { toggle } = useContext(TogglePanelContext);
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={`flex-[0.3]  border-s-[0.5px] ${toggle ? "hidden" : "block"}`}>
      <div className="flex items-center justify-center p-4">
        <div >
          <div
            className="w-[80px] h-[50px] border-1 rounded-md  block pl-1"
            onDragStart={(event) => onDragStart(event, "textUpdater")}
            draggable
          >
            Message
            <div className="pl-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
