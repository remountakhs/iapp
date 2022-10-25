import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import CustomPagination from '../Pagination/CustomPagination';
import lightTableHeadColor from '../../assets/scss/app.scss';

/**
 * The CustomPageableTable, that display a table if the provided array is not empty. Otherwise it 
 * presents a corresponding empty table message. The table also has pageable functionality.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomPageableTable extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} id The table id
         * @property {string} classAppend extra classes for the table div element
         * @property {object} instances the list of items to be presented on a table if any
         * @property {boolean} showEmptyMessage to specify if the empty list message should be shown
         * @property {string} emptyMessage The message to presented if the @link(instances) is empty
         * @property {string} addPageUrl The url of the add instance page if a reference should be included
         * @property {array} table_columns The datatable columns configuration
         * @property {string} keyField Tells react-bootstrap-table2 which column is unique.
         * @property {object} rowEvents Custom events on row
         * @property {array} defaultSorted accept an object array which allow you to define the default sort columns when first render.
         * @property {string} classes The table classes
         * @property {object} pagination includes all pageable details (page, size, sort, direction)
         * @property {object} options the table options
         */
        this.state = {
            id: this.props.id,
            classAppend: this.props.classAppend,
            instances: this.props.instances,
            showEmptyMessage: this.props.showEmptyMessage,
            emptyMessage: this.props.emptyMessage,
            addPageUrl: this.props.addPageUrl,
            table_columns: this.props.table_columns,
            keyField: this.props.keyField,
            rowEvents: this.props.rowEvents,
            defaultSorted: this.props.defaultSorted,
            classes: this.props.classes,
            pagination: this.props.pagination,
            options: {
                id: this.props.id,
                filterType: 'checkbox',
                confirmFilters: false,
                download: false,
                expandableRows: false,
                expandableRowsHeader: false,
                expandableRowsOnClick: false,
                filter: false,
                filterArrayFullMatch: false,
                fixedHeader: false,
                fixedSelectColumn: false,
                jumpToPage: false,
                resizableColumns: false,
                pagination: false,
                print: false,
                rowHover: false,
                search: false,
                selectableRowsOnClick: false,
                selectableRowsHeader: false,
                selectableRowsHideCheckboxes: this.props.onRowSelectionChange === undefined,
                sort: true,
                sortOrder: this.props.defaultSorted,
                viewColumns: false,
                rowsSelected: [],
                rowsPerPage: this.props.pagination !== undefined ? this.props.pagination.size : 10,
                selectToolbarPlacement: "none",
                // onCellClick: ((colData, cellMeta) => {
                //     if (cellMeta.colIndex === this.props.table_columns.length - 1) { //actions cell
                //         tableActions(cellMeta.event)
                //     }
                // })
            }
        };
    }

    /**
     * Gets called and triggers the componentDidUpdate to update to include the table id.
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        // document.getElementsByTagName('table')[0].id = this.state.id;
    }

    getMuiTheme = () => createTheme({
        components: {
            MUIDataTableSelectCell: {
                styleOverrides: {
                    headerCell: {
                        backgroundColor: "#6d8092!important"
                    }
                }
            },
            MUIDataTableHeadCell: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                        backgroundColor: "#6d8092",
                        fontSize: "14px",
                        verticalAlign: "middle",
                        borderBottom: "2px solid #dee2e6",
                        height: "30px",
                        padding: "0px",
                        paddingLeft: "0px"
                    },
                    ":first-child": {
                        paddingLeft: "20px"
                    },
                    sortActive: {
                        color: "#$",
                        ":hover": {
                            textDecoration: "underline"
                        }
                    },
                    sortAction: {
                        color: lightTableHeadColor
                    }
                }
            },
            MUIDataTableBodyCell: {
                styleOverrides: {
                    root: {
                        height: "58px",
                        bordeBottom: "2px solid #ededed",
                        border: "medium none",
                        verticalAlign: "middle",
                        color: "#6e8192",
                    },
                    "svg.svg-inline--fa.fa-ellipsis-v.fa-w-6": {
                        color: "#6d8092"
                    },
                    "svg:not(:root).svg-inline--fa": {
                        color: "#6d8092"
                    },
                    "stackedCommon": {
                        display: "contents"
                    },
                    "cellHide": {
                        display: "none!important"
                    }
                }
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        color: lightTableHeadColor + "!important"
                    }
                }
            },
            MuiTableCell: {
                backgroundColor: "#f5f5f5",
                verticalAlign: "middle",
                padding: "10px 15px 10px 0"
            },
            MUIDataTable: {
                paper: {
                    boxShadow: "none"
                }
            }
        }
    })

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <>
                {this.state.showEmptyMessage && (this.state.instances === null || this.state.instances.totalElements === 0) &&
                    <div className="body">
                        {this.state.emptyMessage} {this.state.addPageUrl !== "" && <a className="link" href={this.state.addPageUrl}>{this.props.t('actions.clickHere')}</a>}
                    </div>
                }

                {(this.state.instances !== null && this.state.instances.totalElements > 0) &&
                    <div className={`table-wrapper ${this.state.classAppend}`}>
                        <ThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                id={this.state.id}
                                data={this.state.instances.content}
                                columns={this.state.table_columns}
                                options={this.state.options}
                            />
                        </ThemeProvider>

                        {this.state.pagination.count > 1 && <CustomPagination {...this.state.pagination} handlePaginationChange={this.props.handlePaginationChange} />}
                    </div>
                }
            </>
        );
    }
}

CustomPageableTable.defaultProps = {
    id: "",
    classAppend: "",
    showEmptyMessage: true,
    // emptyMessage: this.props.t('table.noData'),
    addPageUrl: "",
    // rowEvents: {//datatable row events for onClick
    //     onClick: (e, row, rowIndex) => {
    //         tableActionsTR(e);
    //     },
    // },
    defaultSorted: {
        name: 'submittedDate',
        direction: 'desc'
    },
    onRowSelectionChange: undefined
}

export default withTranslation()(CustomPageableTable);