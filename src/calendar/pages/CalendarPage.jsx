import { useEffect, useState } from "react";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useDispatch } from "react-redux";

import { onSetActiveEvent } from "../../store";

import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

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

	const { events, startLoadingEvents } = useCalendarStore();
	const { user } = useAuthStore();
	const { openDateModal } = useUiStore();

	const [lastView, setLastView] = useState(
		localStorage.getItem("lastView") || "agenda"
	);

	useEffect(() => {
		startLoadingEvents();
	}, []);

	const eventStyleGetter = event => {
		const isMyEvent = user.uid === event.user._id;

		const style = {
			backgroundColor: isMyEvent ? "#347CF7" : "#465660",
			borderRadius: "14px",
			opacity: 0.8,
			color: "white",
		};

		return { style };
	};

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
