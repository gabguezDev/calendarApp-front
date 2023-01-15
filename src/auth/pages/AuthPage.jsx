import React, { useEffect } from "react";
import Swal from "sweetalert2";

import { useAuthStore, useForm } from "../../hooks";

import "./AuthPage.css";

const loginFormFields = {
	loginEmail: "",
	loginPassword: "",
};

const registerFormFields = {
	registerName: "",
	registerEmail: "",
	registerPassword: "",
	registerPassword2: "",
};

export const AuthPage = () => {
	const { startRegister, startLogin, errorMessage } = useAuthStore();

	const {
		loginEmail,
		loginPassword,
		onInputChange: onLoginInputChange,
	} = useForm(registerFormFields);

	const {
		registerName,
		registerEmail,
		registerPassword,
		registerPassword2,
		onInputChange: onRegisterInputChange,
	} = useForm(loginFormFields);

	useEffect(() => {
		if (!!errorMessage) {
			Swal.fire("Error en la autenticación", errorMessage, "error");
		}
	}, [errorMessage]);

	const loginSubmit = event => {
		event.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	const registerSubmit = event => {
		event.preventDefault();
		if (registerPassword !== registerPassword2) {
			Swal.fire(
				"Error en el registro",
				"Las contraseñas no coinciden.",
				"error"
			);
			return;
		}
		startRegister({
			name: registerEmail,
			email: registerEmail,
			password: registerPassword,
		});
	};

	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={loginSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
								name="loginEmail"
								id="loginEmail"
								value={loginEmail || ""}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="loginPassword"
								id="loginPassword"
								value={loginPassword || ""}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<button type="submit" className="btnSubmit">
								Login
							</button>
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={registerSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name="registerName"
								id="registerName"
								value={registerName || ""}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name="registerEmail"
								id="registerEmail"
								value={registerEmail || ""}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="registerPassword"
								id="registerPassword"
								value={registerPassword || ""}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name="registerPassword2"
								id="registerPassword2"
								value={registerPassword2 || ""}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className="form-group mb-2">
							<button type="submit" className="btnSubmit">
								Crear cuenta
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
