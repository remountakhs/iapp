import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import equipmentApi from "../../api/equipment";
import CustomChip from "../../components/Chip/CustomChip";
import LoadingSkeleton from "../../components/Loading/LoadingSkeleton";
import CustomPageableTable from "../../components/Table/CustomPageableTable";
import CustomTitleBoldSubtitle from "../../components/Title/CustomTitleBoldSubtitle";
import CustomBreadcrumb from "../../components/Breadcrumb/CustomBreadcrumb";
import DateTimeFormatter from "../../utils/date-time-formatter";
import { getLanguageFromURL } from "../../utils/language";
import { hasRoleAdminOrDirector } from "../../utils/auth";

/**
 * The Equipment List component to view the equipments of the outlet.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class EquipmentListComponent extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {boolean} isLoaded to render DOM based on rest api call status, if true the rest api call completed
         * @property {object} userAuth the authenticated user infromation
         * @property {object} equipments the equipments (pageable)
         * @property {object} outlet tha outlet basic details (id and name)
         * @property {object} pagination includes all pageable details (page, size, sort, direction)
         */
        this.state = {
            isLoaded: false,
            userAuth: null,
            equipments: null,
            organizationID: this.props.organizationID,
            outlet: {
                id: this.props.outletID,
                name: "",
            },
            pagination: {
                count: -1,
                size: 10,
                page: 0
            }
        };

        // Our event handlers
        this.getEquipments = this.getEquipments.bind(this);
    }

    /**
     * Gets called and triggers the componentDidMount to change the browser tab title .
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.title = `Usee | ${this.props.t('outlet.pageTitle')} | ${this.props.t('equipment.title')}`;
        this.getEquipments();
    }

    /**
     * The rest endpoint to get the equipments list.
     * @property {number} page the list page number
     */
    getEquipments = (page) => {
        this.setState({
            isLoaded: false
        });
        equipmentApi.fetchAll(this.state.outlet.id, (this.state.pagination.count !== -1 ? { page: page, size: this.state.pagination.size } : undefined)).then((r) => {
            this.setState({
                equipments: r.data.returnobject.page,
                equipmentTypeOptions: r.data.returnobject.equipmentTypeOptions,
                userAuth: r.data.returnobject.userAuth,
                isLoaded: true,
                pagination: {
                    count: r.data.returnobject.page.totalPages,
                    size: r.data.returnobject.page.size,
                    page: page !== undefined ? page : r.data.returnobject.page.number
                }
            });
        }).catch((e) => {
            this.setState({
                isLoaded: true
            });
            // console.log(e);
        })
    }

    /**
     * datatable columns default sorted.
     */
    defaultSorted = {
        name: 'dateCreated',
        direction: 'desc'
    };

    /**
     * This function will format the identifier (id) to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     */
    idFormatter(cell, row) {
        if (row.id) {
            return <a className="link" href={'/' + row.id}>{row.id}</a>
        } else {
            return ""
        }
    }

    /**
     * This function will format the user roles to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     */
    fieldFormatter(cell, row) {
        return <CustomChip label={row.type} />;
    }

    /**
     * This function will format the date to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     */
    dateFormatter(cell, row) {
        if (row.dateCreated) {
            return <DateTimeFormatter text={row.dateCreated} />;
        }

        return (
            { cell }
        );
    }

    /**
     * Function that handles the pagination information.
     * @property {*} event
     * @property {int} page the page to be redirected
     */
    handlePaginationChange = (event, page) => {
        this.getEquipments(page)
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        if (!this.state.isLoaded) {
            return (
                <LoadingSkeleton lines={9} />
            );
        } else {
            /**
             * datatable columns.
             */
            const table_columns = [
                {
                    name: "id",
                    label: this.props.t('label.id'),
                    options: {
                        filter: false,
                        sort: false,
                        empty: false,
                        customBodyRender: (value, tableMeta) => {
                            return this.idFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                        }
                    }
                },
                // {
                //     name: "outletId",
                //     label: this.props.t('label.outletId'),
                //     options: {
                //         filter: false,
                //         sort: false,
                //         empty: false,
                //         customBodyRender: (value, tableMeta) => {
                //             return this.idFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                //         }
                //     }
                // },
                {
                    name: "section",
                    label: this.props.t('label.section'),
                    options: {
                        filter: false,
                        sort: true,
                        empty: false,
                        customBodyRender: (value, tableMeta) => {
                            return this.fieldFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                        }
                    }
                },
                {
                    name: "description",
                    label: this.props.t('label.description'),
                    options: {
                        filter: false,
                        sort: true,
                        empty: false,
                        customBodyRender: (value, tableMeta) => {
                            return value;
                        }
                    }
                },
                {
                    name: "type",
                    label: this.props.t('label.type'),
                    options: {
                        filter: false,
                        sort: true,
                        empty: false,
                        customBodyRender: (value, tableMeta) => {
                            return this.fieldFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                        }
                    }
                },
                {
                    name: "label",
                    label: this.props.t('label.label'),
                    options: {
                        filter: false,
                        sort: true,
                        empty: false,
                        customBodyRender: (value, tableMeta) => {
                            return this.fieldFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                        }
                    }
                },
                {
                    name: "dateCreated",
                    label: this.props.t('label.dateCreated'),
                    options: {
                        filter: false,
                        sort: false,
                        empty: false,
                        customBodyRender: (value, tableMeta) => {
                            return this.dateFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                        }
                    }
                }
            ];

            return (
                <main className="tr" role="main" id="equipments-list">
                    {this.props.userAuth !== null && this.props.userAuth.roles !== null && hasRoleAdminOrDirector(this.props.userAuth.roles) &&
                        <CustomBreadcrumb
                            parentName={this.props.t('outlet.pageTitle')}
                            parentUrl={`/${getLanguageFromURL()}/outlet}`}
                            instanceName={this.props.t('equipment.title')}
                        />
                    }

                    <CustomTitleBoldSubtitle
                        title={`${this.props.t('outlet.pageTitle')} |  ${this.props.t('equipment.title')}`}
                        subtitleBeforeText={this.props.t('equipment.subtitle')}
                        subtitleAfterText={this.state.outlet.name !== null ? this.state.outlet.name : ""}
                    />

                    <div id="actions" style={{ "top": "13px" }}>
                        <a href={`/${getLanguageFromURL()}/outlet/${this.state.outletID}/equipment/add`} className="icon-wrapper tr link">{this.props.t('equipment.addLabel')}</a>
                    </div>

                    <div id="main-area">
                        <CustomPageableTable
                            instances={this.state.equipments}
                            emptyMessage={this.props.t('equipment.detailsEmpty')}
                            table_columns={table_columns}
                            keyField="id"
                            defaultSorted={this.defaultSorted}
                            pagination={this.state.pagination}
                            handlePaginationChange={this.handlePaginationChange}
                        />
                    </div>
                </main>
            );
        }
    }
}

export default withTranslation()(EquipmentListComponent);