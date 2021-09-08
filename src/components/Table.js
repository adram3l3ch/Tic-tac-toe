import React from "react";
import { useGlobalContext } from "../context";
import Cell from "./Cell";
import Result from "./Result";

const Table = () => {
	const { values, winner } = useGlobalContext();
	return (
		<div className="table">
			{values.map((value, index) => (
				<Cell key={index} value={value} index={index} />
			))}
			{winner && <Result />}
		</div>
	);
};

export default Table;
