import { useState } from "react";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useDispatch } from "react-redux";

import { onSetActiveEvent } from "../../store";

import { useCalendarStore, useUiStore } from "../../hooks";

import {
	CalendarEvent,
	Navbar,
	CalendarModal,
	FabAddNew,
	FabDelete,
} from "../components";

import { getMessages, localizer } from "../../helpers";

export const CalendarPage = () => {
	const dispatch = useDispatch();

	const { events } = useCalendarStore();
	const { openDateModal } = useUiStore();

	const [lastView, setLastView] = useState(
		localStorage.getItem("lastView") || "agenda"
	);

	const eventStyleGetter = (event, start, end, isSelected) => {};

	const onDoubleClick = () => {
		openDateModal();
	};
	const onSelect = event => {
		dispatch(onSetActiveEvent(event));
	};
	const onViewChange = event => {
		localStorage.setItem("lastView", event);
		setLastView(event);
	};

	return (
		<div>
			<Navbar />
			<Calendar
				culture="es"
				localizer={localizer}
				events={events}
				defaultView={lastView}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "calc( 100vh - 100px)" }}
				messages={getMessages()}
				eventPropGetter={eventStyleGetter}
				components={{ event: CalendarEvent }}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChange}
			/>
			<CalendarModal />
			<FabAddNew />
			<FabDelete />
		</div>
	);
};
