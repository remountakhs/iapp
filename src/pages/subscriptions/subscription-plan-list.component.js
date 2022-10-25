import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import subscriptionPlanApi from "../../api/subscription-plan";
import CustomControlButton from "../../components/Button/CustomControlButton";
import CustomDeleteButton from "../../components/Button/CustomDeleteButton";
import CustomEditButton from '../../components/Button/CustomEditButton';
import CustomChip from "../../components/Chip/CustomChip";
import LoadingSkeleton from "../../components/Loading/LoadingSkeleton";
import CustomSnackbar from "../../components/Snackbar/CustomSnackbar";
import CustomPageableTable from "../../components/Table/CustomPageableTable";
import CustomTitle from '../../components/Title/CustomTitle';
import { hasRoleAdmin } from '../../utils/auth';
import DateTimeFormatter from "../../utils/date-time-formatter";
import { getLanguageFromURL } from '../../utils/language';

/**
 * The SubscriptionPlanListComponent, that allow the user to view the subscription plans list into a table.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class SubscriptionPlanListComponent extends Component {
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
         * @property {array} subscriptionPlans the subscription plans list
         * @property {object} userAuth the authenticated user infromation
         * @property {object} pagination includes all pageable details (page, size, sort, direction)
         * @property {object} dialog holds dialog for delete action
         */
        this.state = {
            isLoaded: false,
            redirect: false,
            alertBox: {
                isOpen: false,
                message: "",
                backgroundColor: "#177910"
            },
            subscriptionPlans: [],
            userAuth: null,
            pagination: {
                count: -1,
                size: 10,
                page: 0
            },
            dialog: {
                isOpen: false,
                subscriptionPlanID: "",
            },
        };

        // Our event handlers
        this.getSubscriptionPlans = this.getSubscriptionPlans.bind(this);
        this.deleteSubscriptionPlan = this.deleteSubscriptionPlan.bind(this);
        this.handleDialogState = this.handleDialogState.bind(this);
        this.delete = this.delete.bind(this);
        this.activateSubscriptionPlan = this.activateSubscriptionPlan.bind(this);
        this.disableSubscriptionPlan = this.disableSubscriptionPlan.bind(this);
        this.handleSnackbarState = this.handleSnackbarState.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }

    /**
     * Gets called and triggers the componentDidMount to change the browser tab title .
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.title = `Usee | ${this.props.t('subscriptionPlan.title')}`;
        this.getSubscriptionPlans();
    }

    /**
     * The rest endpoint to get the subscriptions list.
     * @property {number} page the list page number
     */
    getSubscriptionPlans = (page) => {
        this.setState({
            isLoaded: false
        });
        subscriptionPlanApi.fetchAll((this.state.pagination.count !== -1 ? { page: page, size: this.state.pagination.size } : undefined)).then((r) => {
            this.setState({
                subscriptionPlans: r.data.returnobject.page,
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
     * 
     * Function that triggers the removal of the selected subscription plan.
     * @property {*} event
     * @property {string} subscriptionPlanID The id of the selected subscription plan to be removed.
     */
    deleteSubscriptionPlan = (event, subscriptionPlanID) => {
        this.handleDialogState(true, subscriptionPlanID);
    }

    /**
     * Function that handles the delete modal open or close state.
     * @property {boolean} isOpen The state of the dialog open status.
     * @property {string} subscriptionPlanID The id of the selected subscription plan to be removed.
     */
    handleDialogState = (isOpen, subscriptionPlanID = "") => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                isOpen: isOpen,
                subscriptionPlanID: subscriptionPlanID
            }
        });
    }

    /**
     * Gets called to remove the selected subscription plan
     */
    delete = () => {
        subscriptionPlanApi.deleteById(this.state.dialog.id).then((r) => {
            this.handleDialogState(false);
            this.setState({
                alertBox: {
                    isAOpen: true,
                    message: "message" in r.data ? r.data.message : this.props.t("errorPages.somethingWentWrong"),
                    backgroundColor: (r.data.code === "SUCCESS") ? "#177910" : "#a71313"
                },
                redirect: (r.data.code === "SUCCESS" ? true : false)
            });
        }).catch((e) => {
            // console.log(e);
        })
    }

    /**
     * Gets called to activate the selected subscription plan
     * @param {*} event
     * @param {string} id the id of the subscription plan
     */
    activateSubscriptionPlan = (event, id) => {
        subscriptionPlanApi.activate(id).then((r) => {
            this.setState({
                alertBox: {
                    isAOpen: true,
                    message: "message" in r.data ? r.data.message : this.props.t("errorPages.somethingWentWrong"),
                    backgroundColor: (r.data.code === "SUCCESS") ? "#177910" : "#a71313"
                },
                redirect: (r.data.code === "SUCCESS" ? true : false)
            });
        }).catch((e) => {
            // console.log(e);
        })
    }

    /**
     * Gets called to activate the selected subscription plan
     * @param {*} event
     * @param {string} id the id of the subscription plan 
     */
    disableSubscriptionPlan = (event, id) => {
        subscriptionPlanApi.disable(id).then((r) => {
            this.setState({
                alertBox: {
                    isAOpen: true,
                    message: "message" in r.data ? r.data.message : this.props.t("errorPages.somethingWentWrong"),
                    backgroundColor: (r.data.code === "SUCCESS") ? "#177910" : "#a71313"
                },
                redirect: (r.data.code === "SUCCESS" ? true : false)
            });
        }).catch((e) => {
            // console.log(e);
        })
    }

    /**
     * datatable columns default sorted.
     */
    defaultSorted = {
        name: 'name',
        direction: 'asc'
    };

    /**
     * This function will format the identifier (id) to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     */
    idFormatter(cell, row) {
        if (row.id) {
            return <a className="link" href={`/${getLanguageFromURL()}/subscriptionplan/${row.id}`}>{row.id}</a>
        } else {
            return ""
        }
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
            cell
        );
    }

    /**
     * This function will format the date to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     * @param {*} rowIndex  the row index of the table to be formatted
     * @param {*} formatExtraData the role of the subscription plan
     */
    actionFormatter(cell, row, rowIndex, formatExtraData) {
        return (
            [
                <CustomEditButton key="sp-edit" link={`/${getLanguageFromURL()}/subscriptionplan/${row.id}`} label={this.props.t('actions.edit')} />
                ,
                <CustomDeleteButton key="sp-delete" onClick={(event) => formatExtraData.deleteUser(event, row.id)} label={this.props.t('actions.delete')} />
            ]
        );
    }

    /**
     * This function will format the user roles to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     */
    typeFormatter(cell, row) {
        if (row.type !== null) {
            return <CustomChip label={row.type} />;
        }

        return (
            <span>N/A</span>
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
     * This function will format the availability to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     * @param {*} rowIndex  the row index of the table to be formatted
     * @param {*} formatExtraData the role of the subscription plan
     */
    iconFormatter(cell, row, rowIndex, formatExtraData) {
        return <CustomControlButton shownLabel={false} onClick={(event) => row.available ? formatExtraData.disableSubscriptionPlan(event, row.id) : formatExtraData.activateSubscriptionPlan(event, row.id)} isEnabled={row.available} />;
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
        this.getSubscriptionPlans(page)
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
                        return this.idFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                    }
                }
            },
            {
                name: "name",
                label: this.props.t('label.name'),
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
                name: "description",
                label: this.props.t('label.description'),
                options: {
                    filter: false,
                    sort: true,
                    empty: false,
                    customBodyRender: (value, tableMeta) => {
                        return this.nanFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
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
                        return this.typeFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
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
                        return this.actionFormatter(value, tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex, { role: this.state.userAuth !== null ? this.state.userAuth.role : "", deleteSubscriptionPlan: (event, rowIndex) => this.deleteSubscriptionPlan(event, rowIndex) });
                    },
                    setCellProps: () => ({ className: "click action" })
                }
            },
            {
                name: "available",
                label: this.props.t('label.isAvailable'),
                options: {
                    filter: false,
                    sort: false,
                    empty: false,
                    customBodyRender: (value, tableMeta) => {
                        return this.iconFormatter(value, tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex, { activateSubscriptionPlan: (event, rowIndex) => this.activateSubscriptionPlan(event, rowIndex), disableSubscriptionPlan: (event, rowIndex) => this.disableSubscriptionPlan(event, rowIndex) });
                    }
                }
            }
        ];

        if (this.state.redirect) {
            window.location.href = `/${getLanguageFromURL()}/subscriptionplan`;
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
                            title={this.props.t('subscriptionPlan.pageTitle')}
                            subtitle={this.props.t('subscriptionPlan.subtitle')}
                        />

                        <div id="main-area" style={{ marginTop: "50px" }}>

                            {(this.state.userAuth !== null && hasRoleAdmin(this.state.userAuth.roles)) &&
                                <div id="actions" >
                                    <a href={`/${getLanguageFromURL()}/subscriptionplan/add`} className="icon-wrapper tr link">{this.props.t('actions.add') + " " + this.props.t('subscriptionPlan.title')}</a>
                                </div>
                            }

                            <CustomPageableTable
                                instances={this.state.subscriptionPlans}
                                emptyMessage={this.props.t('table.noData') + this.props.t('actions.tableCreateNewLink') + this.props.t('subscriptionPlan.title')}
                                table_columns={table_columns}
                                addPageUrl={`/${getLanguageFromURL()}/subscriptionplan/add`}
                                keyField="name"
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

export default withTranslation()(SubscriptionPlanListComponent);