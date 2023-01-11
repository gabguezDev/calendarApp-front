import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
	const authStatus = "AUTHENTICATED";

	return (
		<Routes>
			{authStatus === "AUTHENTICATED" ? (
				<Route path="/*" element={<CalendarPage />} />
			) : (
				<Route path="/auth/*" element={<AuthPage />} />
			)}
			<Route path="/*" element={<Navigate to="/auth" />} />
		</Routes>
	);
};
