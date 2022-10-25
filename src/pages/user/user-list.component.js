import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
import userApi from "../../api/user";
import CustomControlButton from "../../components/Button/CustomControlButton";
import CustomDeleteButton from "../../components/Button/CustomDeleteButton";
import CustomEditButton from '../../components/Button/CustomEditButton';
import CustomChip from "../../components/Chip/CustomChip";
import CustomDialog from "../../components/Dialogs/CustomDialog";
import LoadingSkeleton from "../../components/Loading/LoadingSkeleton";
import CustomSnackbar from "../../components/Snackbar/CustomSnackbar";
import CustomPageableTable from "../../components/Table/CustomPageableTable";
import CustomTitle from '../../components/Title/CustomTitle';
import { hasRoleAdmin } from '../../utils/auth';
import DateTimeFormatter from "../../utils/date-time-formatter";
import { getLanguageFromURL } from '../../utils/language';

/**
 * The UserListComponent, that allow the user to view the users list into a table.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class UserListComponent extends Component {
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
         * @property {array} users the users list
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
            users: [],
            userAuth: null,
            pagination: {
                count: -1,
                size: 15,
                page: 0
            },
            dialog: {
                isOpen: false,
                userID: "",
            },
        };

        // Our event handlers
        this.getUsers = this.getUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.handleDialogState = this.handleDialogState.bind(this);
        this.delete = this.delete.bind(this);
        this.enableUser = this.enableUser.bind(this);
        this.disableUser = this.disableUser.bind(this);
    }

    /**
     * Gets called and triggers the componentDidMount to change the browser tab title .
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.title = `Usee | ${this.props.t('page.users')}`;
        this.getUsers();
    }

    /**
     * The rest endpoint to get the users list.
     * @property {number} page the list page number
     */
    getUsers = (page) => {
        this.setState({
            isLoaded: false
        });
        userApi.fetchAll((this.state.pagination.count !== -1 ? { page: page, size: this.state.pagination.size } : undefined)).then((r) => {
            this.setState({
                users: r.data.returnobject.users,
                userAuth: r.data.returnobject.userAuth,
                isLoaded: true,
                pagination: {
                    count: r.data.returnobject.users.totalPages,
                    size: r.data.returnobject.users.size,
                    page: page !== undefined ? page : r.data.returnobject.users.number
                }
            });
        }).catch((e) => {
            // console.log(e);
        })
    }

    /**
     * 
     * Function that triggers the removal of the selected user.
     * @property {*} event
     * @property {string} userID The id of the selected user to be removed.
     */
    deleteUser = (event, userID) => {
        this.handleDialogState(true, userID);
    }

    /**
     * Function that handles the delete modal open or close state.
     * @property {boolean} isOpen The state of the dialog open status.
     * @property {string} userID The id of the selected user to be removed.
     */
    handleDialogState = (isOpen, userID = "") => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                isOpen: isOpen,
                userID: userID
            }
        });
    }

    /**
     * Gets called to remove the selected user
     */
    delete = () => {
        userApi.deleteById(this.state.dialog.id).then((r) => {
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
    enableUser = (event, id) => {
        userApi.enable(id).then((r) => {
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
    disableUser = (event, id) => {
        userApi.disable(id).then((r) => {
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
        name: 'username',
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
                <CustomEditButton key="user-edit" link={`/${getLanguageFromURL()}/user/${row.id}`} label={this.props.t('actions.edit')} />
                ,
                <CustomDeleteButton key="user-delete" onClick={(event) => formatExtraData.deleteUser(event, row.id)} label={this.props.t('actions.delete')} />
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
     * This function will format username to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     */
    usernameFormatter(cell, row) {
        if (row.username) {
            return <a className="link" href={`/${getLanguageFromURL()}/user/${row.id}`}>{row.username}</a>
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
    rolesFormatter(cell, row) {
        if (row.roles !== null) {
            if (row.roles.length === 0) {
                return <span>N/A</span>
            } else if (row.roles.length > 0) {
                let object = [];
                for (let i = 0; i < row.roles.length; i++) {
                    object.push(<CustomChip label={row.roles[i]} />);
                }
                return object;
            }
        }

        return (
            <span>N/A</span>
        );
    }

    /**
     * This function will format the `enabled` field to the required format.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     * @param {*} rowIndex  the row index of the table to be formatted
     * @param {*} formatExtraData parse onclick functions for enable/disable user
     */
    iconFormatter(cell, row, rowIndex, formatExtraData) {
        return <CustomControlButton shownLabel={false} onClick={(event) => row.available ? formatExtraData.disableUser(event, row.id) : formatExtraData.enableUser(event, row.id)} isEnabled={row.available} />;
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
        this.getUsers(page)
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
                name: "username",
                label: this.props.t('label.username'),
                options: {
                    filter: false,
                    sort: true,
                    empty: false,
                    customBodyRender: (value, tableMeta) => {
                        return this.usernameFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                    }
                }
            },
            {
                name: "firstName",
                label: this.props.t('label.firstName'),
                options: {
                    filter: false,
                    sort: true,
                    empty: false,
                    customBodyRender: (value, tableMeta) => {
                        return this.nanFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
                    }
                }
            },
            // {
            //     name: "fatherName",
            //     label: this.props.t('label.fatherName'),
            //     options: {
            //         filter: false,
            //         sort: true,
            //         empty: false,
            //         customBodyRender: (value, tableMeta) => {
            //             return this.nanFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
            //         }
            //     }
            // },
            {
                name: "lastName",
                label: this.props.t('label.lastName'),
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
                name: "phone",
                label: this.props.t('label.phone'),
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
                name: "email",
                label: this.props.t('label.email'),
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
                name: "roles",
                label: this.props.t('label.roles'),
                options: {
                    filter: false,
                    sort: true,
                    empty: false,
                    customBodyRender: (value, tableMeta) => {
                        return this.rolesFormatter(value, tableMeta.tableData[tableMeta.rowIndex]);
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
                        return this.actionFormatter(value, tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex, { role: this.state.userAuth !== null ? this.state.userAuth.role : "", deleteUser: (event, rowIndex) => this.deleteUser(event, rowIndex) });
                    },
                    setCellProps: () => ({ className: "click action" })
                }
            },
            {
                name: "enabled",
                label: this.props.t('label.isEnabled'),
                options: {
                    filter: false,
                    sort: false,
                    empty: false,
                    customBodyRender: (value, tableMeta) => {
                        return this.iconFormatter(value, tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex, { enableUser: (event, rowIndex) => this.enableUser(event, rowIndex), disableUser: (event, rowIndex) => this.disableUser(event, rowIndex) });
                    }
                }
            }
        ];

        if (this.state.redirect) {
            window.location.href = `/${getLanguageFromURL()}/user`;
            return (
                <LoadingSkeleton lines={9} />
            );
        } else if (!this.state.isLoaded) {
            return (
                <LoadingSkeleton lines={9} />
            );
        } else {
            return (
                <main className="tr" role="main" id="list">
                    <CustomTitle
                        title={this.props.t('user.title')}
                        subtitle={this.props.t('user.subtitle')}
                    />

                    <div id="main-area" style={{ marginTop: "50px" }}>

                        {(this.state.userAuth !== null && hasRoleAdmin(this.state.userAuth.roles)) &&
                            <div id="actions" >
                                <a href={`/${getLanguageFromURL()}/user/add`} className="icon-wrapper tr link">{this.props.t('actions.add') + " " + this.props.t('user.pageTitle')}</a>
                            </div>
                        }

                        <CustomPageableTable
                            instances={this.state.users}
                            emptyMessage={this.props.t('table.noData') + this.props.t('actions.tableCreateNewLink') + this.props.t('user.pageTitle')}
                            table_columns={table_columns}
                            addPageUrl={`/${getLanguageFromURL()}/user/add`}
                            keyField="username"
                            defaultSorted={this.defaultSorted}
                            pagination={this.state.pagination}
                            handlePaginationChange={this.handlePaginationChange}
                        />
                    </div>

                    {this.state.dialog.isOpen && <CustomDialog isOpen={this.state.dialog.isOpen} id="delete" title={this.props.t('actions.deleteModal.title')} actionLabel={this.props.t("actions.deleteModal.message")} cancelLabel={this.props.t("actions.cancel")} message={`${this.props.t('actions.deleteModal.notice')} ${this.props.t('actions.deleteModal.confirm')}`} action={this.delete} handleOpen={this.handleDialogState} />}

                    {this.state.alertBox.isOpen && <CustomSnackbar isOpen={this.state.alertBox.isOpen} autoHideDuration={6000} message={this.state.alertBox.message} backgroundColor={this.state.alertBox.backgroundColor} handleSnackbarOpen={this.handleSnackbarState} />}
                </main>
            );
        }
    }
}

export default withTranslation()(UserListComponent);