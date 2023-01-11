import { addHours } from "date-fns";
import React from "react";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
	const { startDeletingEvent, hasEventSelected } = useCalendarStore();

	const handleDelete = () => {
		startDeletingEvent();
	};

	return (
		<>
			{hasEventSelected && (
				<button className="btn btn-danger fab-danger" onClick={handleDelete}>
					<i className="fas fa-trash-alt"></i>
				</button>
			)}
		</>
	);
};
