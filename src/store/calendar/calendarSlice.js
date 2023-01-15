import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
	name: "calendar",
	initialState: {
		events: [],
		activeEvent: null,
	},
	reducers: {
		onSetActiveEvent: (state, { payload }) => {
			state.activeEvent = payload;
		},
		onAddNewEvent: (state, { payload }) => {
			state.events.push(payload);
			state.activeEvent = null;
		},
		onUpdateEvent: (state, { payload }) => {
			state.events = state.events.map(event => {
				if (event.id === payload.id) {
					return payload;
				}
				return event;
			});
		},
		onDeleteEvent: state => {
			if (state.activeEvent !== null) {
				state.events = state.events.filter(
					event => event.id !== state.activeEvent.id
				);
				state.activeEvent = null;
			}
		},
		onLoadEvents: (state, { payload = [] }) => {
			payload.forEach(event => {
				const exists = state.events.some(eventDB => eventDB.id === event.id);
				if (!exists) {
					state.events.push(event);
				}
			});
		},
		onLogoutCalendar: state => {
			state.activeEvent = null;
			state.events = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onLoadEvents,
	onLogoutCalendar,
} = calendarSlice.actions;
