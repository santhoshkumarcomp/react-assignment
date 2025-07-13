# 🧠 React Chatbot flow builder

A visual node-based editor built using **React Flow**, allowing users to create, connect, and edit nodes with support for:

- 📝 Editable custom nodes
- 🧭 Toggleable side panel for editing with a edit button to edit text
- 💾 Save/load flow state with localStorage
- ❌ Prevent saving if invalid node structure
- 🔔 Feedback with `react-toastify`
- 📦 Built with `@xyflow/react`

---

## ✨ Features

- **Custom Node Types** – Editable `textUpdater` nodes with interactive UI
- **Side Panel** – Toggleable panel to edit selected node’s content
- **Validation** – Disallow saving if more than one node lacks incoming edges
- **Persistence** – Save and load graph state from `localStorage`
- **Click Outside Detection** – Automatically closes editing on outside click
- **React Flow Integration** – Powered by `@xyflow/react` with edge/node updates

---

## 🛠 Tech Stack

- React (18+)
- [React Flow (XYFlow)](https://reactflow.dev)
- Tailwind CSS
- react-toastify

---

src/
│
├── App.jsx # Main component with ReactFlow and panel
├── TextUpdaterNode.jsx # Custom editable node
├── TogglePanelContext.jsx # Global context for panel state
├── index.js # Entry point with <ReactFlowProvider>
└── styles.css # Tailwind + Toastify CSS
🧪 Node Save Validation Rules
Saving is allowed only if:

At most one node has no incoming edges (start node)

If more than one node lacks incoming connections:

Save is blocked

Error toast is shown

💾 Save/Load Logic
Nodes and edges are stored in localStorage

On load, the graph is restored from saved state

On save, the current state is validated before persisting

🧠 Click Outside Handling
Editing mode closes when the user clicks outside the active node or panel

Uses ref and document.addEventListener('mousedown') for detection

📦 Toast Notifications
Uses react-toastify to show:

✅ Success messages

❌ Error validation feedback

Toast container is placed in App.jsx
