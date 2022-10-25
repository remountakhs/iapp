import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';

/**
 * The CustomTable, that display a table if the provided array is not empty. Otherwise it 
 * presents a corresponding empty table message.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomTable extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} divID the id of the outer div of the table tag
         * @property {string} classAppend extra classes for the table div element
         * @property {object} instances the list of items to be presented on a table if any
         * @property {boolean} showEmptyMessage to specify if the empty list message should be shown
         * @property {string} emptyMessage The message to presented if the @link(instances) is empty
         * @property {string} addPageUrl The url of the add instance page if a reference should be included
         * @property {array} table_columns The datatable columns configuration
         * @property {string} keyField Tells react-bootstrap-table2 which column is unique.
         * @property {array} defaultSorted accept an object array which allow you to define the default sort columns when first render.
         * @property {object} options the table options
         */
        this.state = {
            divID: this.props.divID !== undefined ? this.props.divID : "",
            classAppend: this.props.classAppend !== undefined ? this.props.classAppend : "",
            instances: this.props.instances,
            showEmptyMessage: this.props.showEmptyMessage !== undefined ? this.props.showEmptyMessage : true,
            emptyMessage: this.props.emptyMessage !== undefined ? this.props.emptyMessage : "No data available.",
            table_columns: this.props.table_columns,
            keyField: this.props.keyField,
            defaultSorted: this.props.defaultSorted !== undefined ? this.props.defaultSorted : [{
                dataField: 'key',
                order: 'desc'
            }],
            options: {
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
                selectableRowsHideCheckboxes: true,
                viewColumns: false,
            }
        };
    }

    getMuiTheme = () => createTheme({
        components: {
            MUIDataTableHeadCell: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                        backgroundColor: "#6d8092",
                        fontSize: "14px",
                        verticalAlign: "middle",
                        borderBottom: "2px solid #dee2e6",
                        paddingLeft: "0px"
                    },
                    ":first-child": {
                        paddingLeft: "20px"
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
                        color: "#6e8192"
                    },
                    "svg.svg-inline--fa.fa-ellipsis-v.fa-w-6": {
                        color: "#6d8092"
                    },
                    "svg:not(:root).svg-inline--fa": {
                        color: "#6d8092"
                    }
                }
            },
            MuiTableCell: {
                backgroundColor: "#f5f5f5",
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
                {(this.state.showEmptyMessage && (this.state.instances === null || this.state.instances.length === 0)) &&
                    <div className="body small">
                        {this.state.emptyMessage}
                    </div>
                }

                {(this.state.instances !== null && this.state.instances.length > 0) &&
                    <div id={this.state.divID} className={`table-wrapper ${this.state.classAppend}`}>
                        <ThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                data={this.state.instances}
                                columns={this.state.table_columns}
                                options={this.state.options}
                            />
                        </ThemeProvider>
                    </div>
                }
            </>
        );
    }
}

export default CustomTable;