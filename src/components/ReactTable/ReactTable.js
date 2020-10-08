import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useBlockLayout, useSortBy, useTable, useResizeColumns, useGroupBy, useExpanded } from 'react-table';
import { FixedSizeList } from 'react-window';
import * as actions from '../../store/actions/index';
// import AutoSizer from 'react-virtualized-auto-sizer';
import DropDown from '../DropDown/DropDown';
import classes from './ReactTable.module.css';

const ReactTable = (props) => {
	// array of object each object is a row
	const data = React.useMemo(() => [], [props.clients, props.columnsToHide]);

	props.clients.map((ob) => {
		return data.push({
			colCode: ob.code,
			colLable: ob.label,
			colValidForm: ob.validFrom,
			colValidTo: ob.validTo,
			colAirport: ob.airportCode,
			colRemarks: ob.remarks,
			id: ob.id,
		});
	});

	const formatDate = (date) => {
		let day = date.getDate();
		let month = date.getMonth() + 1;
		const year = date.getFullYear();

		if (month.toString().length < 2) {
			month = '0' + month;
		}
		if (day.toString().length < 2) {
			day = '0' + day;
		}

		return [day, month, year].join('-');
	};

	//the headers of the table
	let columns = React.useMemo(
		() => [
			{
				id:'code',
				Header: 'code',
				accessor: 'colCode', // accessor is the "key" in the data
			},
			{
				id: 'label',
				Header: 'label',
				accessor: 'colLable', //use the to put data in this colomn like in the data const
			},
			{
				id:'valid form',
				Header: 'valid form',
				accessor: 'colValidForm',
				Cell: (props) => {
					const d = props.value;
					const date = new Date(d);

					const formattedDate = formatDate(date);

					return formattedDate;
				},
			},
			{
				id: 'valid to',
				Header: 'valid to',
				accessor: 'colValidTo',
				Cell: (props) => {
					const d = props.value;
					const date = new Date(d);

					// calling the fuction to format the date as "DD-MM-YYYY"
					const formattedDate = formatDate(date);

					return formattedDate;
				},
			},
			{
				id: 'airport iata',
				Header: 'airport iata',
				accessor: 'colAirport',
			},
			{
				id: 'remarks',
				Header: 'remarks',
				accessor: 'colRemarks',
			},
		],
		[]
	);

	//ids of input fileds for local column search
	const localSearchIds = [
		'code',
		'label',
		'valid form',
		'valid to',
		'airport iata',
		'remarks',
	];

	const displayData = useCallback(
		(el) => {
			let ojectFromArray;
			data.map((ell) => {
				if (ell.colCode === el.target.parentNode.children[0].innerHTML) {
					ojectFromArray = ell;
				}
			});
			if (ojectFromArray !== undefined) {
				const ob = {
					code: ojectFromArray.colCode,
					label: ojectFromArray.colLable,
					validFrom: ojectFromArray.colValidForm,
					validTo: ojectFromArray.colValidTo,
					airportCode: ojectFromArray.colAirport,
					remarks: ojectFromArray.colRemarks,
					id: ojectFromArray.id,
				};

				props.onExtractClient(ob);
				props.onFormDisplay(true);

				const selectedRow = el.target.parentNode.childNodes;

				const unselectedRows = Array.from(document.getElementsByTagName('tr'));

				unhighlightUnselectedRows(unselectedRows);
				highlightSelectedRow(selectedRow);
			}
		},
		[data, props]
	);

	const unhighlightUnselectedRows = (notSelectedRows) => {
		notSelectedRows.forEach((row) => {
			row.childNodes.forEach((td) => {
				td.style.backgroundColor = '';
				td.style.color = ' #39648f';
			});
		});
	};

	const highlightSelectedRow = (row) => {
		row.forEach((td) => {
			td.style.backgroundColor = '#47729c';
			td.style.color = 'white';
		});
	};

	const searchColumn = (inputId, idx) => {
		const input = document.getElementById(`${inputId}search`);
		const filter = input.value.toUpperCase();
		const table = document.querySelector('table');
		const tr = table.getElementsByTagName('tr');

		let txtValue, td;

		// const dataArr = [];
		// const inputArr = filter.split(' ');
		// console.log(inputArr);

		for (let i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName('td')[idx];

			if (td) {
				txtValue = td.textContent || td.innerText;

				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = '';
				} else {
					tr[i].style.display = 'none';
				}

				// dataArr.push(txtValue);
				// console.log(dataArr);

				// const found = dataArr.some((txt) => inputArr.indexOf(txt) >= 0);
				// console.log(found);
				// if (txtValue.includes(txtValue)) {
				// 	tr[i].style.display = '';
				// } else {
				// 	tr[i].style.display = 'none';
				// }
			}
		}
	};
	// testing
	// const dropDownHandler = (event) => {
	// 	const val = event.target.value;
	// 	props.onCLientInit(val);
	// };
	let Id = -1;

	const defaultColumn = React.useMemo(
		() => ({
			minWidth: 100,
			width: 150,
			maxWidth: 300,
		}),
		[]
	);
	function useControlledState(state, { instance }) {
		return React.useMemo(() => {
			if (state.groupBy.length) {
				return {
					...state,
					hiddenColumns: [...state.hiddenColumns, ...state.groupBy].filter(
						(d, i, all) => all.indexOf(d) === i
					),
				}
			}
			return state
		}, [state])
	}

	// separating the headers of the table and the data into variables
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		totalColumnsWidth,
		toggleHideColumn,
		toggleGroupBy,
		resetResizing,
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useBlockLayout,
		useResizeColumns,
		useGroupBy,
		useSortBy,
		useExpanded,
		// Our custom plugin to add the expander column
		hooks => {
			hooks.useControlledState.push(useControlledState)
			hooks.visibleColumns.push((columns, { instance }) => {
				if (!instance.state.groupBy.length) {
					return columns
				}

				return [
					{
						id: 'expander', // Make sure it has an ID
						// Build our expander column
						Header: ({ allColumns, state: { groupBy } }) => {
							return groupBy.map(columnId => {
								const column = allColumns.find(d => d.id === columnId)

								return (
									<span {...column.getHeaderProps()}>
										{column.canGroupBy ? (
											// If the column can be grouped, let's add a toggle
											<span {...column.getGroupByToggleProps()}>
												{column.isGrouped ? '🛑 ' : '👊 '}
											</span>
										) : null}
										{column.render('Header')}{' '}
									</span>
								)
							})
						},
						Cell: ({ row }) => {
							if (row.canExpand) {
								const groupedCell = row.allCells.find(d => d.isGrouped)

								return (
									<span
										{...row.getToggleRowExpandedProps({
											style: {
												// We can even use the row.depth property
												// and paddingLeft to indicate the depth
												// of the row
												paddingLeft: `${row.depth * 2}rem`,
											},
										})}
									>
										{row.isExpanded ? '👇' : '👉'} {groupedCell.render('Cell')}{' '}
                    ({row.subRows.length})
									</span>
								)
							}

							return null
						},
					},
					...columns,
				]
			})
		});

	useEffect(() => {
		if (props.columnsToHide !== null) {
			props.columnsToHide.map((el) => {
				toggleHideColumn(el.accessor, el.val);
				let input = document.getElementById(el.Header + 'search');
				if (input !== null)
					if (el.val) {
						input.style.display = 'none';
					} else {
						input.style.display = "";
					}
			});
		}
	}, [props.columnsToHide[props.columnsToHide.length - 1]]);

	const RenderRow = React.useCallback(
		({ index, style }) => {
			const row = rows[index];
			prepareRow(row);
			return (
				<tr {...row.getRowProps()} style={style}>
					{row.cells.map((cell) => {
						return (
							<td
								onClick={displayData}
								{...cell.getCellProps()}
								style={{
									position: 'relative',
									cursor: 'pointer',
									width: '9rem',
									padding: '1rem 3rem',
									textAlign: 'center',
									fontSize: '1rem',
									fontWeight: '600',
									lineHeight: '1rem',
								}}
							>
								{cell.render('Cell')}
							</td>
						);
					})}
				</tr>
			);
		},
		[prepareRow, rows, displayData]
	);

	useEffect(() => {
		if (props.searchID !== null) {
			let field = document.getElementById(localSearchIds[props.searchID] + 'search');
			field.value = props.searchVal;
			searchColumn(localSearchIds[props.searchID], props.searchID);
		}
	}, [props.searchVal]);

	const dataFiltration = (data, column) => {
		let unique = [];
		data.map((el) => {
			if (column !== undefined && !unique.includes(el[column.accessor])) {
				unique.push(el[column.accessor]);
			}
		});
		return unique;
	};
	const doResetResizing = () => {
		resetResizing();
	}
	const clear = () => {
		resetResizing();
		toggleGroupBy('code', true);
		// setTimeout(() => {
		// 	localSearchIds.map(el => {
		// 		toggleGroupBy(el, false);
		// 	})
		// },1000)

	}
	return (
		<div className={classes.Table}>
			{/* <select onChange={dropDownHandler}>
				<option>select an option</option>
				<option value="1000">1,000</option>
				<option value="10000">10,000</option>
				<option value="50000">50,000</option>
				<option value="1000000">1,000,000</option>
			</select> */}
			<button onClick={clear} >clear</button>
			<table {...getTableProps()} className={classes.table}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								//the headers

								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className={classes.table__menu__item}
								>
									{
										column.canGroupBy ? (
											// If the column can be grouped, let's add a toggle
											<span {...column.getGroupByToggleProps()}>
												{column.isGrouped ? '🛑 ' : '👊 '}
											</span>
										) : null
									}
									<div className={classes.table__header}>
										<div style={{ width: 'max-content' }}>
											{column.render('Header')}
										</div>
										{
											(Id++,
												(
													<DropDown
														length={column.length}
														columns={columns[Id]}
														allColumns={columns}
														data={dataFiltration(data, columns[Id])}
														ID={Id}
														hiddenCol={props.columnsToHide}
														resetsizing={resetResizing}
													/>
												))
										}
										<div
											{...column.getResizerProps()}
											className={classes.resizer}
										/>
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					<tr className={classes.Search__row}>
						{localSearchIds.map((element, idx) => (
							<th key={element}>
								<input
									type="text"
									id={element + 'search'}
									className={classes.table__searchInput}
									onChange={() => {
										searchColumn(element, idx);
									}}
								/>
							</th>
						))}
					</tr>

					<FixedSizeList
						height={800}
						itemCount={rows.length}
						itemSize={30}
						width={totalColumnsWidth}
						className={classes.List}
					>
						{RenderRow}
					</FixedSizeList>

				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isDisplayed: state.form.isDisplayed,
		searchVal: state.dropDownSearch.data,
		searchID: state.dropDownSearch.id,
		columnsToHide: state.columnsSelect.columns,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// expecting to get client data as an object
		onExtractClient: (clientData) =>
			dispatch(actions.extractClient(clientData)),

		// expected to get a boolean value
		onFormDisplay: (isDisplayed) => dispatch(actions.displayForm(isDisplayed)),

		// testing
		// onCLientInit: (num) => dispatch(actions.fetchClients(num)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactTable);
