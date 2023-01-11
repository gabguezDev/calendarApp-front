import React, { useEffect, useMemo, useState } from "react";

import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);

import Modal from "react-modal";

import { useDispatch } from "react-redux";

import { useCalendarStore, useUiStore } from "../../hooks";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

const initialFormValues = {
	title: "Fernando",
	notes: "Herrera",
	start: new Date(),
	end: addHours(new Date(), 2),
};

export const CalendarModal = isOpen => {
	const dispatch = useDispatch();

	const { isDateModalOpen, closeDateModal } = useUiStore();
	const { activeEvent, startSavingEvent } = useCalendarStore();

	const [formValues, setFormValues] = useState(initialFormValues);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const onInputChange = ({ target }) => {
		setFormValues({ ...formValues, [target.name]: target.value });
	};

	const onDateChange = (date, changing) => {
		setFormValues({ ...formValues, [changing]: date });
	};

	const onModalClose = () => {
		closeDateModal();
	};

	const onSubmit = async event => {
		event.preventDefault();
		setIsSubmitted(true);

		const diff = differenceInSeconds(formValues.end, formValues.start);

		if (isNaN(diff) || diff <= 0) {
			Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
			return;
		}

		if (formValues.title.length === 0) return;

		await startSavingEvent(formValues);
		onModalClose();
		setIsSubmitted(false);
	};

	const validTitleClass = useMemo(() => {
		if (!isSubmitted) return "";
		return formValues.title.length === 0 && "is-invalid";
	}, [formValues.title, isSubmitted]);

	useEffect(() => {
		if (activeEvent !== null) {
			setFormValues({ ...activeEvent });
		}
	}, [activeEvent]);

	return (
		<Modal
			isOpen={isDateModalOpen}
			onRequestClose={onModalClose}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
		>
			<h1> Nuevo evento </h1>
			<hr />
			<form className="container" onSubmit={onSubmit}>
				<div className="form-group mb-2">
					<label>Fecha y hora inicio</label>
					<DatePicker
						selected={formValues.start}
						onChange={date => onDateChange(date, "start")}
						dateFormat="Pp"
						showTimeSelect
						className="form-control"
						locale="es"
						timeCaption="Hora"
					/>
				</div>

				<div className="form-group mb-2">
					<label>Fecha y hora fin</label>
					<DatePicker
						// minTime={formValues.start.getHours()}
						minDate={formValues.start}
						selected={formValues.end}
						onChange={date => onDateChange(date, "end")}
						showTimeSelect
						dateFormat="Pp"
						className="form-control"
						locale="es"
						timeCaption="Hora"
					/>
				</div>

				<hr />
				<div className="form-group mb-2">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${validTitleClass}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={formValues.title}
						onChange={onInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Una descripción corta
					</small>
				</div>

				<div className="form-group mb-2">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={formValues.notes}
						onChange={onInputChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
