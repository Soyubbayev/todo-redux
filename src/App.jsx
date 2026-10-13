
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  editTodo,
  toggleTodo,
} from "./TodoSlicer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const todo = useSelector((state) => state.todos.todo);

  function addInput() {
    if (input.trim() === "") {
      toast.warning("Maydonni to'ldiring!");
      return;
    }

    if (editId !== null) {
      dispatch(editTodo({ id: editId, title: input.trim() }));
      toast.success("Todo tahrirlandi!");
      setEditId(null);
    } else {
      dispatch(addTodo(input.trim()));
      toast.success("Todo qo'shildi!");
    }

    setInput("");
  }

  function deleteTodo(id) {
    dispatch(removeTodo(id));
    toast.info("Todo o'chirildi!");
  }

  function startEdit(item) {
    setInput(item.title);
    setEditId(item.id);
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <section className="w-full min-h-screen bg-emerald-400 flex items-center justify-center p-5">
        <div className="w-full max-w-[600px] bg-amber-50 rounded-3xl p-8 sm:p-10 shadow-xl">

          <h1 className="text-5xl font-bold text-blue-400 mb-3">
            To-Do List
          </h1>

          <p className="text-gray-500 mb-6">
            Today's session
          </p>

          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addInput();
              }}
              className="flex-1 min-w-0 h-[50px] px-4 rounded-2xl border outline-none focus:border-blue-400"
              type="text"
              placeholder="Enter todo title..."
            />

            <button
              onClick={addInput}
              className="px-6 bg-blue-400 text-white rounded-2xl"
            >
              {editId !== null ? "Save" : "Add"}
            </button>
          </div>

          <div className="mt-8 space-y-3">
            {todo.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                Hozircha vazifalar yo'q
              </p>
            ) : (
              todo.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-4 bg-white rounded-2xl shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => dispatch(toggleTodo(item.id))}
                      className={`w-7 h-7 shrink-0 rounded-full border-2 border-green-500 ${
                        item.completed
                          ? "bg-green-500 text-white"
                          : "bg-white"
                      }`}
                    >
                      {item.completed ? "✓" : ""}
                    </button>

                    <p
                      className={`break-words ${
                        item.completed
                          ? "line-through text-gray-400"
                          : "text-blue-400"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(item)}
                      className="px-3 py-2 bg-amber-400 text-white rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTodo(item.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default App;
