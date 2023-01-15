import { useDispatch, useSelector } from "react-redux";
import {
	onAddNewEvent,
	onDeleteEvent,
	onSetActiveEvent,
	onLoadEvents,
	onUpdateEvent,
} from "../store";

import { useAuthStore } from "./useAuthStore";

import calendarAPI from "../api/calendarApi";

import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector(state => state.calendar);
	const { user } = useAuthStore();

	const setActiveEvent = calendarEvent => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async calendarEvent => {
		try {
			if (calendarEvent.id) {
				await calendarAPI.put(`/events/update/${calendarEvent.id}`, {
					...calendarEvent,
				});
				dispatch(onUpdateEvent({ ...calendarEvent, user }));
				return;
			}
			const response = await calendarAPI.post("/events/new", {
				...calendarEvent,
			});
			dispatch(
				onAddNewEvent({
					...response.data.event,
					user,
				})
			);
		} catch (error) {
			console.log(error);
			Swal.fire("Error al guardar el evento", error.response.data.msg, "error");
		}
	};

	const startLoadingEvents = async () => {
		try {
			const response = await calendarAPI.get("/events");
			if (!response.data) return;

			dispatch(onLoadEvents(convertEventsToDateEvents(response.data.events)));
		} catch (error) {
			Swal.fire(
				"Error al cargar los eventos",
				error.response.data.msg,
				"error"
			);
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarAPI.delete(`/events/delete/${activeEvent.id}`);
			dispatch(onDeleteEvent());
		} catch (error) {
			Swal.fire(
				"Error al eliminar el evento",
				error.response.data.msg,
				"error"
			);
		}
	};

	return {
		/* Props */
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		/* Methods */
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	};
};
