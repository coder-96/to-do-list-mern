import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import trashcan from "../trashcan.svg";

export default function App() {
    const [newTodo, setNewTodo] = useState("");

    function handleChange(event) {
        const { value } = event.target;
        setNewTodo(value);
    }

    const [todos, setTodos] = useState([]);

    const [change, setChange] = useState(false);

    useEffect(() => {
        console.log("useEffect has ran");

        axios
            .get("http://localhost:5000/get")
            .then((res) => {
                console.log("Received data", res.data);
                setTodos(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [change]);

    function handleSub() {
        if (newTodo.length < 1) {
            alert("Field cannot be empty!");
            return;
        } else {
            console.log("added");
        }

        axios
            .post("http://localhost:5000/create", {
                todo: newTodo,
            })
            .then((res) => {
                console.log("saved");
            })
            .catch((error) => {
                console.log(error);
            });

        setNewTodo("");
        setChange(!change);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleSub();
            console.log("data sent with enter");
        }
    }

    function updateItem(id) {
        axios
            .put("http://localhost:5000/update/" + id)
            .then((res) => {
                console.log("update");
            })
            .catch((error) => {
                console.log(error);
            });
        setChange(!change);
    }

    function deleteItem(id) {
        axios
            .delete("http://localhost:5000/delete/" + id)
            .then((res) => {
                console.log("Deleted");
            })
            .catch((error) => {
                console.log(error);
            });
        setChange(!change);
    }

    return (
        <div className="bg-c3 rounded-lg mx-auto my-20 py-12 w-1/2 h-1/2 text-center">
            <hr className=""></hr>
            <h1 className="text-white pl-5 pt-5 h-20 text-3xl rounded-lg">
                To Do List
            </h1>
            <section>
                <input
                    className="bg-c3 placeholder:text-white text-center text-lg rounded-lg border-2 m-5 p-5 text-c4 sm:m-0 sm:p-2 sm:text-base sm:w-32 md:p-4 md:w-40"
                    placeholder="Title..."
                    type="text"
                    name="title"
                    value={newTodo}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="bg-c1 text-center text-lg rounded-lg m-5 py-5 px-32 text-white hover:bg-c2 active:border-2 sm:px-12 sm:py-4 sm:text-base md:px-16 "
                    type="submit"
                    onClick={handleSub}
                >
                    Add
                </button>
                <div>
                    <ol className="text-2xl text-c4 sm:text-base">
                        {todos.map((item, id) => {
                            return (
                                <div key={id} className="px-5 grid grid-cols-8">
                                    <li
                                        className={
                                            item.done
                                                ? "line-through decoration-c3 col-span-7"
                                                : "col-span-7"
                                        }
                                        onClick={() => updateItem(item._id)}
                                    >
                                        {item.todo}
                                    </li>
                                    <button
                                        onClick={() => deleteItem(item._id)}
                                        className="text-white text-base w-10 sm:w-8 bg-c1 m-1 p-3 rounded-lg hover:bg-c2"
                                    >
                                        <img
                                            src={trashcan}
                                            alt="trashcan svg file"
                                            className="object-cover"
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </ol>
                </div>
            </section>
        </div>
    );
}
