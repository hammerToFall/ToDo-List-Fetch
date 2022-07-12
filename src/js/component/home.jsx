import React from "react";
import ToDoList from "./todolist.jsx";

//create your first component
const Home = () => {
	return (
		<div className="containeer">
			<div className="row justify-content-center">
				<h1 className="text-center my-4">ToDo List</h1>
				<ToDoList />
			</div>
		</div>
	);
};

export default Home;