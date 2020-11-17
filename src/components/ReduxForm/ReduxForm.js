import React, {useEffect, useState } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import classes from './ReduxForm.module.css';
import icon from '../../assets/svg/all.svg';

const validate = (values) => {
	const errors = {};
	if (!values.code) {
		errors.code = 'Required';
	}
	if (!values.label) {
		errors.label = 'Required';
	}
	if (!values.airportCode) {
		errors.airportCode = 'Required';
	}
	if (!values.validFrom) {
		errors.validFrom = 'Required';
	}
	if (!values.validTo) {
		errors.validTo = 'Required';
	}
	return errors;
};
const button = ({ click, btnClasses, svgClasses, svgIcon, text, type }) => (
	<button type={type} onClick={click} className={btnClasses.join(' ')}>
		<svg className={svgClasses}>
			<use xlinkHref={`${icon}#${svgIcon}`} />
		</svg>
		{text}
	</button>
);

const filed = ({ input, label, mode, readOnly, meta: { touched, error } }) => (
	<div className={classes.description__item}>
		<h4 className={classes.description__item__header}>{label}</h4>
		<input
			{...input}
			type="text"
			className={classes[[mode, 'description__item__textbox'].join('')]}
			readOnly={readOnly}
		/>
		{touched && error && <span>{error}</span>}
	</div>
);

const bigFiled = ({ input, label, rows, mode, readOnly }) => (
	<div className={classes.description__item}>
		<h4 className={classes.description__item__header}>{label}</h4>
		<textarea
			{...input}
			type="text"
			className={[
				classes[[mode, 'description__item__textbox'].join('')],
				classes.remarks,
			].join(' ')}
			readOnly={false}
			rows={rows}
			disabled={readOnly}
		/>
	</div>
);

const FieldDatePicker = ({
	input,
	placeholder,
	minDate,
	maxDate,
	mode,
	readOnly,
	meta: { touched, error },
}) => (
		// <React.Fragment>
		<DatePicker
			className={classes[[mode, 'react-datepicker-wrapper'].join('')]}
			dateFormat="dd/MM/yyyy"
			selected={input.value || null}
			onChange={input.onChange}
			minDate={minDate}
			maxDate={maxDate}
			disabledKeyboardNavigation
			placeholderText={placeholder}
			disabled={readOnly}
		/>
		//      {touched && ((error && <span>{error}</span>))}
		// </React.Fragment>
	);
let ReduxForm = (props) => {
	const [classSwitcher, setClassSwitcher] = useState('');
	const [rOnly, setROnly] = useState(true);

	const setEditableModeOn =(type) => {
		setClassSwitcher('add__');
		setROnly(false);
		props.initialValues.type = type;
	};
	const setEditableModeOff =() => {

		if (props.initialValues.type === 'edit') {
			setClassSwitcher('');
			setROnly(true);
			props.reset();
		} else if (props.initialValues.type === 'add') {
			props.onFormDisplay(false);
		} else {
			setClassSwitcher('');
			setROnly(true);
		}
	};
	useEffect(() => {
		if (props.initialValues.code === undefined) {
			setEditableModeOn('add');
		} else {
			setEditableModeOff('');
		}
	}, [props.initialValues]);// eslint-disable-line react-hooks/exhaustive-deps

	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit} className={classes.ReduxForm}>
			<div className={classes.details__menu}>
				<div className={classes.details__menu__icon}>
					<svg className={classes.details__menu__icon1}>
						<use xlinkHref={`${icon}#icon-cog`} />
					</svg>
					<svg className={classes.details__menu__icon2}>
						<use xlinkHref={`${icon}#icon-code`} />
					</svg>
				</div>
				<Field
					name="Audit"
					text="Audit"
					component={button}
					btnClasses={[
						classes[[classSwitcher, 'details__menu__btn'].join('')],
						classes[[classSwitcher, 'details__menu__btnAudit'].join('')],
					]}
					svgClasses={classes.details__menu__btnAuditIcon}
					click={() => { }}
					svgIcon={'icon-search'}
					type={'button'}
				/>
				<Field
					name="Delete"
					component={button}
					btnClasses={[
						classes[[classSwitcher, 'details__menu__btn'].join('')],
						classes[[classSwitcher, 'details__menu__btnDelete'].join('')],
					]}
					svgClasses={classes.details__menu__btnDeleteIcon}
					click={() => {
						props.initialValues.type = 'delete';
					}}
					svgIcon={'icon-trash'}
					text="Delete"
					type={'submit'}
				/>
				<Field
					name="Copy"
					component={button}
					btnClasses={[
						classes[[classSwitcher, 'details__menu__btn'].join('')],
						classes[[classSwitcher, 'details__menu__btnCopy'].join('')],
					]}
					svgClasses={classes.details__menu__btnCopyIcon}
					click={() => setEditableModeOn('copy')}
					svgIcon={'icon-users'}
					text="Copy"
					type={'button'}
				/>
				<Field
					name="Edit"
					component={button}
					btnClasses={[
						classes[[classSwitcher, 'details__menu__btn'].join('')],
						classes[[classSwitcher, 'details__menu__btnEdit'].join('')],
					]}
					svgClasses={classes.details__menu__btnEditIcon}
					click={() => {
						setEditableModeOn('edit');
					}}
					svgIcon={'icon-edit'}
					text="Edit"
					type={'button'}
				/>
				<Field
					name="Cancle"
					component={button}
					btnClasses={[
						classes[[classSwitcher, 'details__menu__btn'].join('')],
						classes[[classSwitcher, 'details__menu__btnCancle'].join('')],
					]}
					svgClasses={classes.details__menu__btnCancleIcon}
					click={() => {
						setEditableModeOff();
					}}
					svgIcon={'icon-x-circle'}
					text="Cancle"
					type={'button'}
				/>
				<Field
					name="Save"
					component={button}
					btnClasses={[
						classes[[classSwitcher, 'details__menu__btn'].join('')],
						classes[[classSwitcher, 'details__menu__btnSave'].join('')],
					]}
					svgClasses={classes.details__menu__btnSaveIcon}
					click={() => { }}
					svgIcon={'icon-floppy-o'}
					text="Save"
					type={'submit'}
				/>
			</div>
			<div className={classes.description}>
				<Field
					name="code"
					component={filed}
					label="code"
					mode={classSwitcher}
					readOnly={rOnly}
				/>
				<Field
					name="label"
					component={filed}
					label="label"
					mode={classSwitcher}
					readOnly={rOnly}
				/>
				<div className={classes.description__item}>
					<h4 className={classes.description__item__header}>
						aireport iata code
					</h4>
					<Field
						name="airportCode"
						component="select"
						className={
							classes[[classSwitcher, 'description__item__select'].join('')]
						}
						disabled={rOnly}
					>
						<option value=""></option>
						<option value="Aireport 1">Aireport 1</option>
						<option value="Aireport 2">Aireport 2</option>
						<option value="Aireport 3">Aireport 3</option>
						<option value="Aireport 4">Aireport 4</option>
						<option value="Aireport 5">Aireport 5</option>
					</Field>
				</div>

				<div className={classes.description__item__datepickerArea}>
					<h4 className={classes.description__item__header}>valid from / to</h4>
					<div className={classes.description__item__datepickerConatiner}>
						<Field
							name="validFrom"
							component={FieldDatePicker}
							mode={classSwitcher}
							readOnly={rOnly}
						></Field>
						<Field
							name="validTo"
							component={FieldDatePicker}
							mode={classSwitcher}
							readOnly={rOnly}
						></Field>
					</div>
				</div>
				<Field
					name="remarks"
					component={bigFiled}
					label="remarks"
					rows={7}
					mode={classSwitcher}
					readOnly={rOnly}
				/>
			</div>
		</form>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		// expected to get a boolean value
		onFormDisplay: (isDisplayed) => dispatch(actions.displayForm(isDisplayed)),
		reset: () => dispatch(reset('contact'))
	};
};
ReduxForm = reduxForm({
	// a unique name for the form
	form: 'contact',
	enableReinitialize: true,
	validate,
})(ReduxForm);

export default connect(null, mapDispatchToProps)(ReduxForm);
