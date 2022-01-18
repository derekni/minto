import React, { useContext, useState } from "react";
import PopupContext from "../contexts/PopupContext";
import { Todo } from "../types";
import EditableListItem from "./EditableListItem";
import Modal from "./Modal";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

type PopupState = null | { type: "confirmation"; todo: Todo };

const TodoTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [popupState, setPopupState] = useState<PopupState>(null);
  const { todos, updateTodos, mints, updateMints } = useContext(PopupContext);

  const addTodo = () => {
    chrome.storage.sync.get({ nextTodoId: 0 }, ({ nextTodoId }) => {
      updateTodos([...todos, { id: nextTodoId, name: "New todo", value: 25 }]);
      chrome.storage.sync.set({ nextTodoId: nextTodoId + 1 });
    });
  };

  const deleteTodo = (todoId: number) => {
    updateTodos(todos.filter((_todo) => _todo.id !== todoId));
  };

  const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newTodos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    updateTodos(newTodos);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col flex-1 bg-gray-50 p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <ul>
                    {todos.map((todo, index) => {
                      return (
                        <EditableListItem
                          key={todo.id}
                          type={"todo"}
                          item={todo}
                          index={index}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
        <button
          className="border-gray-500 border-dashed border-2 p-1 rounded mb-2"
          onClick={addTodo}
        >
          Add new todo
        </button>
        <button
          className="bg-green-500 font-semibold text-white p-1 rounded shadow hover:shadow-lg transition-all duration-200"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50 p-4">
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <button
                className="flex justify-between mb-2 py-1 px-2 rounded w-full bg-white shadow hover:shadow-lg transition-all duration-200"
                onClick={() => {
                  setPopupState({ type: "confirmation", todo });
                }}
              >
                <div className="flex-1 truncate mr-2 text-left">
                  {todo.name}
                </div>
                {/* <div>{todo.value}</div> */}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className="bg-gray-500 font-semibold text-white p-1 rounded shadow hover:shadow-lg transition-all duration-200"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Edit todos
      </button>
      {popupState?.type === "confirmation" && (
        <Modal>
          <div>
            <div className="mb-4">
              Do you want to complete {popupState.todo.name} for{" "}
              {popupState.todo.value} mints?
            </div>
            <div className="flex">
              <button
                className="bg-gray-500 text-white p-1 rounded flex-1 mr-1"
                onClick={() => setPopupState(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white p-1 rounded flex-1 ml-1"
                onClick={() => {
                  deleteTodo(popupState.todo.id);
                  setPopupState(null);
                  updateMints(mints + popupState.todo.value);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TodoTab;
