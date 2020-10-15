import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useBlockLayout, useSortBy, useTable, useResizeColumns, useGroupBy, useExpanded, useColumnOrder } from 'react-table';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FixedSizeList } from 'react-window';
import * as actions from '../../store/actions/index';
// import AutoSizer from 'react-virtualized-auto-sizer';
import DropDown from '../DropDown/DropDown';
import classes from './ReactTable.module.css';
import icon from '../../assets/svg/all.svg';
let allData;
const ReactTable = (props) => {
	let Id=-1;
	const currentColOrder = React.useRef();
	// array of object each object is a row
	const [data, setData] = useState([]);
	useEffect(() => {
		allData = []
		props.clients.map((ob) => {
			return allData.push({
				colCode: ob.code,
				colLable: ob.label,
				colValidForm: ob.validFrom,
				colValidTo: ob.validTo,
				colAirport: ob.airportCode,
				colRemarks: ob.remarks,
				id: ob.id,
			});
		});
		setData(allData)
	}, [props.clients, props.columnsToHide])

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

	// const test = () => {
	// 	return (
	// 		<div style={{
	// 			position:'relative',
	// 			width: '5rem',
	// 			height: '5rem',
	// 			backgroundColor: 'red',
	// 			marginTop:'5rem',
	// 			zIndex:'4'
	// 		}}>test</div>
	// 		// <DropDown
	// 		// 	length={column.length}
	// 		// 	columns={columns[Id]}
	// 		// 	allColumns={columns}
	// 		// 	data={dataFiltration(data, columns[Id])}
	// 		// 	ID={Id}
	// 		// 	hiddenCol={props.columnsToHide}
	// 		// 	resetsizing={resetResizing}
	// 		// 	groupBy={toggleGroupBy}
	// 		// 	localSearchIds={localSearchIds}
	// 		// />
	// 	)
	// }
	//the headers of the table
	let columns = React.useMemo(
		() => [
			{
				id: 'code',
				//Header: <div>{'code'} {test()}</div>,
				Header: 'code',
				accessor: 'colCode', // accessor is the "key" in the data
			},
			{
				id: 'label',
				Header: 'label',
				accessor: 'colLable', //use the to put data in this colomn like in the data const
			},
			{
				id: 'valid form',
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

	const defaultColumn = React.useMemo(
		() => ({
			minWidth: 100,
			width: 150,
			maxWidth: 300,
		}),
		[]
	);

	//ids of input fileds for local column search


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

	const searchColumn = (inputId, value, select) => {
		let input;
		let id = inputId;
		let selectVal = 'contains';
		if (value === undefined)
			input = document.getElementById(`${inputId}search`).value;
		else {
			input = value;
			id = localSearchIds[inputId];
			selectVal = select;
		}

		let arrOfInputs = input.split(' ');
		if (arrOfInputs[0] === '') {
			setData(allData);
		}
		else {
			let access = null;
			columns.map((el) => {
				if (el.id === id)
					access = el.accessor
			})

			let matchedData = [];
			switch (selectVal) {
				case 'contains':
					allData.map((el) => {
						arrOfInputs.map((inp) => {
							if (inp !== '' && el.[access].toUpperCase().includes(inp.toUpperCase()))
								matchedData.push(el);
						})
					})
					break;
				case 'notContains':
					allData.map((el) => {
						arrOfInputs.map((inp) => {
							if (inp !== '' && !el.[access].toUpperCase().includes(inp.toUpperCase()))
								matchedData.push(el);
						})
					})
					break;
				case 'startWith':
					allData.map((el) => {
						arrOfInputs.map((inp) => {
							if (inp !== '' && el.[access].toUpperCase().startsWith(inp.toUpperCase()))
								matchedData.push(el);
						})
					})
					break;
				case 'endsWith':
					allData.map((el) => {
						arrOfInputs.map((inp) => {
							if (inp !== '' && el.[access].toUpperCase().endsWith(inp.toUpperCase()))
								matchedData.push(el);
						})
					})
					break;
				case 'notEqual':
					allData.map((el) => {
						arrOfInputs.map((inp) => {
							if (inp !== '' && el.[access].toUpperCase() !== (inp.toUpperCase()))
								matchedData.push(el);
						})
					})
					break;
				case 'equal':
					allData.map((el) => {
						arrOfInputs.map((inp) => {
							if (inp !== '' && el.[access].toUpperCase() === (inp.toUpperCase()))
								matchedData.push(el);
						})
					})
					break;
				default:
					alert('You were trying to search How on earth did i get here')
			}
			setData(matchedData);
		}

	};
	// testing
	const dropDownHandler = (event) => {
		const val = event.target.value;
		props.onCLientInit(val);
	};



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
		setColumnOrder,
		allColumns,
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useColumnOrder,
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
									<label {...column.getHeaderProps()}>
										{column.render('Header')}{' '}
									</label>
								)
							})
						},
						Cell: ({ row }) => {
							if (row.canExpand) {
								const groupedCell = row.allCells.find(d => d.isGrouped)

								return (
									<label
										{...row.getToggleRowExpandedProps({
											style: {
												// We can even use the row.depth property
												// and paddingLeft to indicate the depth
												// of the row
												paddingLeft: `${row.depth * 2}rem`,

											},
										})}
										style={{
											display: 'flex'
										}}
									>
										<svg style={{
											width: '1.5rem',
											height: '1.5rem',
											marginRight: '1rem',
											fill: '#39648f'
										}}>
											{row.isExpanded ? <use xlinkHref={`${icon}#icon-minus`} /> : <use xlinkHref={`${icon}#icon-add`} />}

										</svg>

										{groupedCell.render('Cell')}{' '}
                    					({row.subRows.length})
									</label>
								)
							}

							return null
						},
					},
					...columns,
				]
			})
		});

	let localSearchIds = [];
	allColumns.map((el) => {
		localSearchIds.push(el.id)
	})
	useEffect(() => {
		if (props.columnsToHide !== null) {
			props.columnsToHide.map((el) => {
				toggleHideColumn(el.id, el.val);
				let input = document.getElementById(el.id + 'search');
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
				<tr {...row.getRowProps()}
					style={{
						...row.getRowProps().style,
						style
					}}
				>
					{row.cells.map((cell) => {
						return (
							<td
								onClick={displayData}
								{...cell.getCellProps()}
								style={{
									...cell.getCellProps().style,
									position: 'relative',
									cursor: 'pointer',
									padding: '1rem 2.9rem',
									textAlign: 'center',
									fontSize: '1rem',
									fontWeight: '600',
									lineHeight: '1rem',
								}}
							// className={classes.Test}
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
			searchColumn(localSearchIds[props.searchID]);
		}
	}, [props.searchVal]);

	const dataFiltration = (data, id) => {
		let unique = [];
		let index = 0;
	
		if (id % 1 === 0) {
			//console.log(headerGroups[0].headers[id])

			columns.map((el, i) => {
				if (el.id === headerGroups[0].headers[id].id) {
					index = i;
				}
			})

			data.map((el) => {
				if (!unique.includes(el[columns[index].accessor])) {
					unique.push(el[columns[index].accessor]);
				}
			})
		}
		return unique;
	};
	const incrementId = () => {
		if (Id === 5)
			Id = -1;
		Id = Id + 0.5;
		return Id
	}
	const setSearchBoxSize = (code) => {
		let w;
			headerGroups[0].headers.map((el, i) => {
				if (el.id === code) {
					//geting the width of the header
					w = headerGroups[0].headers[i].getHeaderProps().style.width;
					//getting the searchBox to the correct size
					w = w.split('p');
					w[0] = w[0] - 1;
					w = w.join('p')
				}
			})
		return { width: w };
	}

	const clear = () => {

	}
	return (

		<div className={classes.Table}>
			<select onChange={dropDownHandler}>
				<option>select an option</option>
				<option value="1000">1,000</option>
				<option value="10000">10,000</option>
				<option value="50000">50,000</option>
				<option value="1000000">1,000,000</option>
			</select>
			<button onClick={clear}>dcd</button>

			<table {...getTableProps()} className={classes.table}>
				<thead>
				

					{headerGroups.map((headerGroup) => (
						<DragDropContext
							onDragStart={() => {

								currentColOrder.current = allColumns.map(o => o.id);
							}}

							onDragUpdate={(dragUpdateObj, b) => {
								// console.log("onDragUpdate", dragUpdateObj, b);

								const colOrder = [...currentColOrder.current];
								const sIndex = dragUpdateObj.source.index;
								const dIndex =
									dragUpdateObj.destination && dragUpdateObj.destination.index;

								if (typeof sIndex === "number" && typeof dIndex === "number") {
									colOrder.splice(sIndex, 1);
									colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
									setColumnOrder(colOrder);
								}
							}}
						>
							<Droppable droppableId="droppable" direction="horizontal">

								{(droppableProvided, snapshot) => (
									<tr {...headerGroup.getHeaderGroupProps()}
										ref={droppableProvided.innerRef}
									>

										{headerGroup.headers.map((column, index) => (
											//the headers
											<Draggable
												key={column.id}
												draggableId={column.id}
												index={index}
												isDragDisabled={!column.accessor}
											>

												{(provided, snapshot) => {
													return (

														<th
															{...column.getHeaderProps(column.getSortByToggleProps())}
															className={classes.table__menu__item}
														>
															<div
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																ref={provided.innerRef}
															>
																<div className={classes.table__header}>
																	<div style={{ width: 'max-content' }}>
																		{column.render('Header')}
																	</div>

																	{
																		
																		(<DropDown

																			ID={incrementId()}
																			length={column.length}
																			columns={columns[Id]}
																			allColumns={columns}
																			data={dataFiltration(data, Id)}
																			hiddenCol={props.columnsToHide}
																			resetsizing={resetResizing}
																			groupBy={toggleGroupBy}
																			localSearchIds={localSearchIds}
																			searchColumn={searchColumn}
																		/>)
																	}
																	<div
																		{...column.getResizerProps()}
																		className={classes.resizer}
																	/>
																</div>
															</div>
														</th>
													);
												}}

											</Draggable>
										))}
									</tr>
								)}

							</Droppable>
						</DragDropContext>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					<tr className={classes.Search__row}>
						{localSearchIds.map((element) => (
							<th key={element}>
								<input
									type="text"
									id={element + 'search'}
									className={classes.table__searchInput}
									style={setSearchBoxSize(element)}
									onChange={() => {
										searchColumn(element);
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
		onCLientInit: (num) => dispatch(actions.fetchClients(num)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactTable);
