import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import subscriptionApi from "../../api/subscription";
import LoadingSkeleton from "../../components/Loading/LoadingSkeleton";
import CustomSnackbar from "../../components/Snackbar/CustomSnackbar";
import CustomPageableTable from "../../components/Table/CustomPageableTable";
import CustomTitle from '../../components/Title/CustomTitle';
import { hasRoleAdmin } from '../../utils/auth';
import DateTimeFormatter from "../../utils/date-time-formatter";
import { getLanguageFromURL } from '../../utils/language';

/**
 * The SubscriptionListComponent, that allow the user to view the subscriptions list into a table.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class SubscriptionListComponent extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {boolean} redirect if a redirect should be performed
         * @property {boolean} isLoaded to render DOM based on rest api call status, if true the rest api call completed
         * @property {object} alertBox holds snackbar infromation and style
         * @property {array} subscriptions the subscriptions list
         * @property {object} userAuth the authenticated user infromation
         * @property {object} pagination includes all pageable details (page, size, sort, direction)
         */
        this.state = {
            isLoaded: false,
            redirect: false,
            alertBox: {
                isOpen: false,
                message: "",
                backgroundColor: "#177910"
            },
            subscriptions: [],
            userAuth: null,
            pagination: {
                count: -1,
                size: 15,
                page: 0
            }
        };

        // Our event handlers
        this.getSubscriptions = this.getSubscriptions.bind(this);
    }

    /**
     * Gets called and triggers the componentDidMount to change the browser tab title .
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.title = `Usee | ${this.props.t('subscription.title')}`;
        this.getSubscriptions();
    }

    /**
     * The rest endpoint to get the subscriptions list.
     * @property {number} page the list page number
     */
    getSubscriptions = (page) => {
        this.setState({
            isLoaded: false
        });
        subscriptionApi.fetchAll((this.state.pagination.count !== -1 ? { page: page, size: this.state.pagination.size } : undefined)).then((r) => {
            this.setState({
                subscriptions: r.data.returnobject.page,
                userAuth: r.data.returnobject.userAuth,
                isLoaded: true,
                pagination: {
                    count: r.data.returnobject.page.totalPages,
                    size: r.data.returnobject.page.size,
                    page: page !== undefined ? page : r.data.returnobject.page.number
                }
            });
        }).catch((e) => {
            // console.log(e);
        })
    }

    /**
     * datatable columns default sorted.
     */
    defaultSorted = {
        name: 'id',
        direction: 'asc'
    };

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
            cell
        );
    }

    /**
     * This function will format the date to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     * @param {*} rowIndex  the row index of the table to be formatted
     * @param {*} formatExtraData the role of the user
     */
    actionFormatter(cell, row, rowIndex, formatExtraData) {
        return (
            [
                <FontAwesomeIcon icon={faEllipsisV} className="click" key="icon" aria-hidden="true" />
                ,
                <div className="button-wrapper" key="button-wrapper">
                    <a className="btn blue link" href={`/${getLanguageFromURL()}/${formatExtraData.urlRoot}/${row.id}`}>{this.props.t('actions.edit')}</a>
                </div>
            ]
        );
    }

    /**
     * This function will format the date to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     */
    nanFormatter(cell, row) {
        if (cell === null || cell === "") {
            return 'N/A';
        } else {
            return (
                cell
            );
        }
    }

    /**
     * Function that handles the snackbar open or close state.
     * @property {boolean} isOpen If the values is `true`, the modal should be open and visible.
     */
    handleSnackbarState = (isOpen) => {
        this.setState({
            alertBox: {
                ...this.state.alertBox,
                isOpen: isOpen
            }
        });
    }

    /**
     * Function that handles the pagination information.
     * @property {*} event
     * @property {int} page the page to be redirected
     */
    handlePaginationChange = (event, page) => {
        this.getSubscriptions(page)
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
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
                        return this.idFormatter(value, tableMeta.tableData[tableMeta.rowIndex], {urlRoot: "subscription"});
                    }
                }
            },
            {
                name: "organizationID",
                label: this.props.t('label.organizationID'),
                options: {
                    filter: false,
                    sort: false,
                    empty: false,
                    customBodyRender: (value, tableMeta) => {
                        return this.idFormatter(value, tableMeta.tableData[tableMeta.rowIndex], {urlRoot: "organization"});
                    }
                }
            },
            {
                name: "planID",
                label: this.props.t('label.planID'),
                options: {
                    filter: false,
                    sort: false,
                    empty: false,
                    customBodyRender: (value, tableMeta) => {
                        return this.idFormatter(value, tableMeta.tableData[tableMeta.rowIndex], {urlRoot: "subscriptionplan"});
                    }
                }
            },
            {
                name: "dueDate",
                label: this.props.t('label.dueDate'),
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
                name: "status",
                label: this.props.t('label.status'),
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
                name: "dateCreated",
                label: this.props.t('label.dateCreated'),
                options: {
                    filter: false,
                    sort: true,
                    empty: false,
                    customBodyRender: (value, tableMeta) => {
                        return this.dateFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                    }
                }
            },
            {
                name: "",
                label: "",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta) => {
                        return this.actionFormatter(value, tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex, { role: this.state.userAuth !== null ? this.state.userAuth.role : "", generateAPIKey: ((event, rowIndex) => this.generateAPIKey(event, rowIndex)) });
                    },
                    setCellProps: () => ({ className: "click action" })
                }
            }
        ];

        if (this.state.redirect) {
            window.location.href = `/${getLanguageFromURL()}/subscription`;
            return (
                <LoadingSkeleton lines={9} />
            );
        } else {
            if (!this.state.isLoaded) {
                return (
                    <LoadingSkeleton lines={9} />
                );
            } else {
                return (
                    <main className="tr" role="main" id="list">
                        <CustomTitle
                            title={this.props.t('subscription.title')}
                            subtitle={this.props.t('subscription.subtitle')}
                        />

                        <div id="main-area" style={{ paddingTop: "50px" }}>

                            {(this.state.userAuth !== null && hasRoleAdmin(this.state.userAuth.roles)) &&
                                <div id="actions" >
                                    <a href={`/${getLanguageFromURL()}/subscription/add`} className="icon-wrapper tr link">{this.props.t('actions.add') + " " + this.props.t('subscription.pageTitle')}</a>
                                </div>
                            }

                            <CustomPageableTable
                                instances={this.state.subscriptions}
                                emptyMessage={this.props.t('table.noData') + this.props.t('actions.tableCreateNewLink') + this.props.t('subscription.pageTitle')}
                                table_columns={table_columns}
                                addPageUrl={`/${getLanguageFromURL()}/subscription/add`}
                                keyField="id"
                                defaultSorted={this.defaultSorted}
                                pagination={this.state.pagination}
                                handlePaginationChange={this.handlePaginationChange}
                            />
                        </div>
                        {this.state.alertBox.isOpen && <CustomSnackbar isOpen={this.state.alertBox.isOpen} autoHideDuration={6000} message={this.state.alertBox.message} backgroundColor={this.state.alertBox.backgroundColor} handleSnackbarOpen={this.handleSnackbarState} />}
                    </main>
                );
            }
        }
    }
}

export default withTranslation()(SubscriptionListComponent);