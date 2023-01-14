import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
	const { checkAuthToken, status } = useAuthStore();
	// const authStatus = "CHECKING";

	useEffect(() => {
		checkAuthToken();
	}, []);

	if (status === "CHECKING") {
		return <h3>Cargando...</h3>;
	}

	return (
		<Routes>
			{status === "AUTHENTICATED" ? (
				<>
					<Route path="/" element={<CalendarPage />} />
					<Route path="/*" element={<Navigate to="/" />} />
				</>
			) : (
				<>
					<Route path="/auth/*" element={<AuthPage />} />
					<Route path="/*" element={<Navigate to="/auth" />} />
				</>
			)}
			{/* <Route path="/*" element={<Navigate to="/auth" />} /> */}
		</Routes>
	);
};
