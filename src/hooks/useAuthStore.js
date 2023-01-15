import { useDispatch, useSelector } from "react-redux";
import { calendarAPI } from "../api";
import {
	onChecking,
	onLogin,
	clearErrorMessage,
	onLogout,
	onLogoutCalendar,
} from "../store";

export const useAuthStore = () => {
	const dispatch = useDispatch();
	const { status, user, errorMessage } = useSelector(state => state.auth);

	const startLogin = async ({ email, password }) => {
		dispatch(onChecking());
		try {
			const { data } = await calendarAPI.post("/auth", { email, password });
			localStorage.setItem("token", data.token);
			localStorage.setItem("token-init-date", new Date().getTime()); // Para comprobar cuanto falta para que expire el token
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogout("Credenciales incorrectas."));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 100);
		}
	};

	const startRegister = async ({ name, email, password }) => {
		dispatch(onChecking());
		try {
			const { data } = await calendarAPI.post("/auth/new", {
				name,
				email,
				password,
			});
			localStorage.setItem("token", data.token);
			localStorage.setItem("token-init-date", new Date().getTime());
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogout(error.response.data.msg));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 100);
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem("token");
		if (!token) return dispatch(onLogout());

		try {
			const { data } = await calendarAPI.get("/auth/renew");
			localStorage.setItem("token", data.token);
			localStorage.setItem("token-init-date", new Date().getTime());
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			localStorage.clear();
			dispatch(onLogout());
		}
	};

	const startLogout = () => {
		localStorage.clear();
		dispatch(onLogoutCalendar());
		dispatch(onLogout());
	};

	return {
		/* Props */
		status,
		user,
		errorMessage,

		/* Methods */
		startLogin,
		startRegister,
		checkAuthToken,
		startLogout,
	};
};
