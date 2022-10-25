import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControlLabel, Switch } from "@mui/material";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import subscriptionPlanApi from "../../api/subscription-plan";
import CustomDeleteButton from "../../components/Button/CustomDeleteButton";
import LoadingSkeleton from "../../components/Loading/LoadingSkeleton";
import CustomSnackbar from "../../components/Snackbar/CustomSnackbar";
import CustomTable from "../../components/Table/CustomTable";
import CustomTitleBoldSubtitle from "../../components/Title/CustomTitleBoldSubtitle";
import { hasRoleAdmin } from "../../utils/auth";
import { formIsValid } from "../../utils/form-validation";
import { getLanguageFromURL } from "../../utils/language";
import { collapsable } from "../../utils/theme";

/**
 * The SubscriptionPlanAddEditComponent that triggers the creation of a 
 * new subscription plan or the modification of an existing one.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class SubscriptionPlanAddEditComponent extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {boolean} redirect if a redirect should be performed
         * @property {string} error holdes the error message of a failed rest api call
         * @property {boolean} isLoaded to render DOM based on rest api call status, if true the rest api call completed
         * @property {string} subscriptionPlanID tha subscription plan id to get subscription plan current information for edit subscription plan page
         * @property {object} alertBox holds snackbar infromation and style
         * @property {*} icon the legend fa icon
         * @property {object} subscriptionPlan an empty object if add or the selected subscription plan to be editted
         * @property {object} userAuth the authenticated user infromation
         * @property {array} typeOptions the different type options
         * @property {boolean} isAdd to define if requested an edit or an add of a subscription plan
         * @property {object} isError list of indication of empty form required field 
         *                           after submit to present error message to the
         *                           fields/attributes with true value
         */
        this.state = {
            redirect: false,
            error: null,
            isLoaded: false,
            alertBox: {
                isOpen: false,
                message: "",
                backgroundColor: "#177910"
            },
            icon: faPlusSquare,
            subscriptionPlanID: this.props.subscriptionPlanID,
            subscriptionPlan: null,
            typeOptions: [],
            currencyOptions: [],
            userAuth: null,
            isAdd: this.props.subscriptionPlanID === undefined,
            // error messages per field
            isError: {
                name: "",
                type: ""
            }
        };

        // Our event handlers
        this.collapsable = this.collapsable.bind(this);
        this.addPrice = this.addPrice.bind(this);
        this.addDetail = this.addDetail.bind(this);
        this.addService = this.addService.bind(this);
        this.removePriceItem = this.removePriceItem.bind(this);
        this.removeDetailItem = this.removeDetailItem.bind(this);
        this.removeServiceItem = this.removeServiceItem.bind(this);
        this.getSubscriptionPlan = this.getSubscriptionPlan.bind(this);
        this.addSubscriptionPlan = this.addSubscriptionPlan.bind(this);
        this.editSubscriptionPlan = this.editSubscriptionPlan.bind(this);
        this.onControlChange = this.onControlChange.bind(this);
    }

    /**
     * Gets called and triggers the componentDidMount to change the browser tab title.
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.title = `Usee | ${this.props.t('subscriptionPlan.pageTitle')} | ${this.state.isAdd ? this.props.t('actions.add') : this.props.t('actions.edit')}`;
        this.getSubscriptionPlan();
    }

    /**
     * Function to trigger the collapse of the Show more or Show less button.
     *
     * @param {type} event 
     */
    collapsable = (event) => {
        this.setState(collapsable(event));
    }

    /**
     * The rest endpoint to get the subscription plan default (add) or current (edit) information.
     */
    getSubscriptionPlan = () => {
        if (this.state.isAdd) {
            subscriptionPlanApi.fetchNew().then((r) => {
                this.setState({
                    userAuth: r.data.returnobject.userAuth,
                    subscriptionPlan: {
                        name: "",
                        type: "",
                        description: "",
                        services: [],
                        details: [],
                        prices: [{
                            reason: "Normal",
                            currencyString: "EUR",
                            price: 0.0
                        }],
                        available: true
                    },
                    typeOptions: r.data.returnobject.typeOptions,
                    currencyOptions: r.data.returnobject.currencyOptions,
                    isLoaded: true
                });
            }).catch((e) => {
                // console.log(e);
                this.setState({
                    error: e,
                    isLoaded: true
                });
            })
        } else {
            subscriptionPlanApi.fetchOne(this.state.subscriptionPlanID).then((r) => {
                this.setState({
                    userAuth: r.data.returnobject.userAuth,
                    subscriptionPlan: r.data.returnobject.subscriptionPlan,
                    typeOptions: r.data.returnobject.typeOptions,
                    currencyOptions: r.data.returnobject.currencyOptions,
                    isLoaded: true
                });
            }).catch((e) => {
                // console.log(e);
                this.setState({
                    error: e,
                    isLoaded: true
                });
            });
        }
    }

    /**
     * Gets called when the subscription plan clicks on the save button, and triggers 
     * the creation of the new subscription plan.
     */
    addSubscriptionPlan = () => {
        if (this.formValidation()) {
            subscriptionPlanApi.create(this.state.subscriptionPlan).then((r) => {
                this.setState({
                    alertBox: {
                        isOpen: true,
                        message: r.data.message,
                        backgroundColor: (r.data.code === "SUCCESS") ? "#177910" : "#a71313"
                    },
                    redirect: (hasRoleAdmin(this.state.userAuth.roles) && r.data.code === "SUCCESS" ? true : false)
                });
            }).catch((e) => {
                // console.log(e)
            });
        }
    }

    /**
     * Gets called when the subscription plan clicks on the save button, and triggers 
     * the edit of the selected subscription plan.
     */
    editSubscriptionPlan = () => {
        if (this.formValidation()) {
            subscriptionPlanApi.update(this.state.subscriptionPlan).then((r) => {
                this.setState({
                    alertBox: {
                        isOpen: true,
                        message: r.data.message,
                        backgroundColor: (r.data.code === "SUCCESS") ? "#177910" : "#a71313"
                    },
                    redirect: (hasRoleAdmin(this.state.userAuth.roles) && r.data.code === "SUCCESS" ? true : false)
                });
            }).catch((e) => {
                // console.log(e)
            });
        }
    }

    /**
     * Function that triggers the select input value change.
     *
     * @param {array} selectedOptions the selected options after the change takes place.
     * @param {object} selectElement the select element that holds the name and the new option selected/unselected.
     */
    onSelectChange = (selectedOptions, selectElement) => {
        const objectName = selectElement.name.split(".")[0];
        let name = selectElement.name.split(".")[1];
        this.setState({
            [objectName]: {
                ...this.state[objectName],
                [name]: selectedOptions
            }
        });
    }

    /**
     * Function that triggers the control input value change.
     * @param {*} event 
     */
    onControlChange = (event) => {
        this.setState({
            subscriptionPlan: {
                ...this.state.subscriptionPlan,
                available: event.target.checked
            }
        });
    }

    /**
     * Function that enabled an addition of price.
     *
     * @param {type} event 
     */
    addPrice = (event) => {
        let reason = document.getElementById('reason');
        let price = document.getElementById('price');
        let currencyString = document.getElementById('currencyString');
        if (reason.value === "" || price.value === "" || currencyString.value === "") {
            this.setState({ alertBox: { isOpen: true, message: this.props.t('actions.error.addFailed'), backgroundColor: "#a71313" } });
        } else {
            let prices = this.state.subscriptionPlan.prices;
            prices.push({ reason: reason.value, price: price.value, currencyString: currencyString.value });
            reason.value = '';
            price.value = '';
            currencyString.value = '';
            this.setState({
                subscriptionPlan: {
                    ...this.state.subscriptionPlan,
                    prices: prices
                }
            });
        }
    };

    /**
     * Function that add a services to the plan
     *
     * @param {type} event 
     */
    addService = (event) => {
        let serviceKey = document.getElementById('serviceKey');
        let serviceValue = document.getElementById('serviceValue');
        if (serviceKey.value === "" || serviceValue.value === "") {
            this.setState({ alertBox: { isOpen: true, message: this.props.t('actions.error.addFailed'), backgroundColor: "#a71313" } });
        } else {
            let services = this.state.subscriptionPlan.services;
            services.push({ key: serviceKey.value, value: serviceValue.value });
            serviceKey.value = '';
            serviceValue.value = '';
            this.setState({
                subscriptionPlan: {
                    ...this.state.subscriptionPlan,
                    services: services
                }
            });
        }
    };

    /**
     * Function that add a detail to the plan
     *
     * @param {type} event 
     */
    addDetail = (event) => {
        let detailKey = document.getElementById('detailKey');
        let detailValue = document.getElementById('detailValue');
        if (detailKey.value === "" || detailValue.value === "") {
            this.setState({ alertBox: { isOpen: true, message: this.props.t('actions.error.addFailed'), backgroundColor: "#a71313" } });
        } else {
            let details = this.state.subscriptionPlan.details;
            details.push({ key: detailKey.value, value: detailValue.value });
            detailKey.value = '';
            detailValue.value = '';
            this.setState({
                subscriptionPlan: {
                    ...this.state.subscriptionPlan,
                    details: details
                }
            });
        }
    };

    /**
     * Function that removes an price item.
     *
     * @param {type} event 
     */
    removePriceItem = (event, rowIndex) => {
        let prices = this.state.subscriptionPlan.prices;
        if (rowIndex === 0) {
            prices.shift();
        } else {
            prices.splice(rowIndex - 1, rowIndex)
        }
        this.setState({
            subscriptionPlan: {
                ...this.state.subscriptionPlan,
                prices: prices
            }
        });
    };

    /**
     * Function that removes a servicce item.
     *
     * @param {type} event 
     */
    removeServiceItem = (event, rowIndex) => {
        let services = this.state.subscriptionPlan.services;
        if (rowIndex === 0) {
            services.shift();
        } else {
            services.splice(rowIndex - 1, rowIndex)
        }
        this.setState({
            subscriptionPlan: {
                ...this.state.subscriptionPlan,
                services: services
            }
        });
    };

    /**
     * Function that removes a detail item.
     *
     * @param {type} event 
     */
    removeDetailItem = (event, rowIndex) => {
        let details = this.state.subscriptionPlan.details;
        if (rowIndex === 0) {
            details.shift();
        } else {
            details.splice(rowIndex - 1, rowIndex)
        }
        this.setState({
            subscriptionPlan: {
                ...this.state.subscriptionPlan,
                details: details
            }
        });
    };

    /**
     * This function will format the actions.
     * 
     * @param {*} cell the cell of the table of the row that being formatted
     * @param {*} row the row of the table to be formatted
     * @param {*} rowIndex  the row index of the table to be formatted
     * @param {*} formatExtraData the role of the user
     */
    actionFormatter(cell, row, rowIndex, formatExtraData) {
        return (
            [
                <CustomDeleteButton onClick={(event) => formatExtraData.remove(event, rowIndex)} label={this.props.t(`actions.${formatExtraData.action}`)} />
            ]
        );
    }

    /**
     * Function that triggers form validation and print out if the form is valid or not.
     * @returns true if form is Valid
     */
    formValidation() {
        let isError = this.createErrorMessages();
        if (formIsValid(isError)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Function that create error messages for each required field that are not filled out.
     * @returns object containing the error messages for each form field
     */
    createErrorMessages() {
        let isError = { ...this.state.isError };
        isError.name = this.state.subscriptionPlan.name.length < 1 ? this.props.t('table.valueReuired') : "";
        isError.type = this.state.subscriptionPlan.type.length < 1 ? this.props.t('table.valueReuired') : "";
        this.setState({
            isError
        });
        return isError;
    }

    /**
     * Function that triggers the form value change.
     *
     * @param {type} event 
     */
    formValChange = (event) => {
        event.preventDefault();
        // get input tag name and value
        let { name, value } = event.target;
        let isError = { ...this.state.isError };
        const objectName = name.split(".")[0];
        const fieldNested = name.split(".")[2] !== undefined ? name.split(".")[2] : "";
        name = name.split(".")[1];

        if (name in isError) {
            isError[name] = value.length < 1 ? this.props.t('table.valueReuired') : "";
        }
        if (fieldNested === "") {
            this.setState({
                [objectName]: {
                    ...this.state[objectName],
                    [name]: value
                },
                isError,
            })
        } else {
            this.setState({
                [objectName]: {
                    ...this.state[objectName],
                    [name]: {
                        ...this.state[objectName][name],
                        [fieldNested]: value
                    }
                },
                isError,
            })
        }
    };

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
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        if (this.state.redirect) {
            return <Redirect to={`/${getLanguageFromURL()}/subscriptionplan`} />
        } else if ((!this.state.isLoaded && !this.state.isAdd) || this.state.subscriptionPlan === null) {
            return (
                <LoadingSkeleton lines={9} />
            );
        } else {
            const { isError } = this.state;
            let defaultTypeSelected = "";
            if (this.state.subscriptionPlan !== null) defaultTypeSelected = this.state.subscriptionPlan.type;
            let defaultCurrencySelected = "";
            if (this.state.subscriptionPlan !== null) defaultCurrencySelected = this.state.currencyOptions[0];

            /**
             * datatable columns for prices.
             */
            const table_columns_price = [
                {
                    name: "reason",
                    label: this.props.t('label.reason'),
                    options: {
                        filter: false,
                        sort: false,
                        empty: false
                    }
                },
                {
                    name: "price",
                    label: this.props.t('label.price'),
                    options: {
                        filter: false,
                        sort: false,
                    }
                },
                {
                    name: "currencyString",
                    label: this.props.t('label.currency'),
                    options: {
                        filter: false,
                        sort: false,
                    }
                },
                {
                    name: "",
                    label: "",
                    options: {
                        filter: false,
                        sort: false,
                        empty: true,
                        classes: "click action",
                        customBodyRender: (value, tableMeta, rowIndex) => {
                            return (
                                this.actionFormatter(null, tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex, { remove: ((event, rowIndex) => this.removePriceItem(event, rowIndex)), action: "delete" })
                            );
                        },
                        setCellProps: () => ({ className: "click action" })
                    }
                }
            ];

            /**
             * datatable columns for services.
             */
            const table_columns_service = [
                {
                    name: "key",
                    label: this.props.t('label.key'),
                    options: {
                        filter: false,
                        sort: false,
                        empty: false
                    }
                },
                {
                    name: "value",
                    label: this.props.t('label.value'),
                    options: {
                        filter: false,
                        sort: false,
                        empty: false
                    }
                },
                {
                    name: "",
                    label: "",
                    options: {
                        filter: false,
                        sort: false,
                        empty: true,
                        classes: "click action",
                        customBodyRender: (value, tableMeta, rowIndex) => {
                            return (
                                this.actionFormatter(null, tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex, { remove: ((event, rowIndex) => this.removeServiceItem(event, rowIndex)), action: "delete" })
                            );
                        },
                        setCellProps: () => ({ className: "click action" })
                    }
                }
            ];


            /**
             * datatable columns for details.
             */
            const table_columns_detail = [
                {
                    name: "key",
                    label: this.props.t('label.key'),
                    options: {
                        filter: false,
                        sort: false,
                        empty: false
                    }
                },
                {
                    name: "value",
                    label: this.props.t('label.value'),
                    options: {
                        filter: false,
                        sort: false,
                        empty: false
                    }
                },
                {
                    name: "",
                    label: "",
                    options: {
                        filter: false,
                        sort: false,
                        empty: true,
                        classes: "click action",
                        customBodyRender: (value, tableMeta, rowIndex) => {
                            return (
                                this.actionFormatter(null, tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex, { remove: ((event, rowIndex) => this.removeDetailItem(event, rowIndex)), action: "delete" })
                            );
                        },
                        setCellProps: () => ({ className: "click action" })
                    }
                }
            ];

            return (
                <main className="tr" role="main" id={this.state.isAdd ? "add" : "edit"}>
                    <CustomTitleBoldSubtitle
                        title={`${this.props.t('subscriptionPlan.pageTitle')} | ${this.state.isAdd ? this.props.t('actions.add') : this.props.t('actions.edit')}`}
                        subtitleBeforeText={this.state.isAdd ? this.props.t('actions.tableCreateNewLink') + this.props.t('subscriptionPlan.pageTitle') : this.props.t('subscriptionPlan.pageTitle') + " "}
                        subtitleboldText={!this.state.isAdd && this.state.subscriptionPlan !== null && this.state.subscriptionPlan !== undefined && this.state.subscriptionPlan.name}
                        subtitleAfterText={!this.state.isAdd ? " profile page" : ""}
                    />

                    <div id="main-area">

                        <form id="subscriptionPlan" className="classic col-6" onSubmit={(e) => { return false; }}>

                            {this.state.isAdd &&
                                <input type="hidden" />
                            }

                            {!this.state.isAdd &&
                                <input type="hidden" name="id" id="id" defaultValue={this.state.subscriptionPlanID} />
                            }

                            <div className="form-item required">
                                <label htmlFor="name">{this.props.t('label.name')}</label>
                                <input type="text" name="subscriptionPlan.name" id="name" placeholder={this.props.t('label.namePlaceholder')} required="required"
                                    disabled={!this.state.isAdd} defaultValue={!this.state.isAdd ? this.state.subscriptionPlan.name : ""}
                                    className={isError.name.length > 0 ? "is-invalid form-control" : "form-control"}
                                    onChange={this.formValChange}
                                />
                                {isError.name.length > 0 && (
                                    <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.name}</li></ul>
                                )}
                            </div>

                            <div className="form-item">
                                <label htmlFor="description">{this.props.t('label.description')}</label>
                                <textarea name="subscriptionPlan.description" id="description" className="form-control" placeholder="Description"
                                    onChange={this.formValChange}
                                    defaultValue={null !== this.state.subscriptionPlan ? this.state.subscriptionPlan.description : ""} ></textarea>
                            </div>

                            <div className="form-item required">
                                <label htmlFor="type">{this.props.t('label.type')}</label>
                                <select defaultValue={defaultTypeSelected} id="type" name="subscriptionPlan.type" className="form-control-select" onChange={this.formValChange}>
                                    <option value="" disabled hidden style={{ "color": "#9ea5aa" }}>{this.props.t('actions.selectOption')}</option>
                                    {this.state.typeOptions.map((type) =>
                                        <option value={type} key={type}>{type}</option>
                                    )}
                                </select>
                            </div>

                            <FormControlLabel control={<Switch defaultChecked={this.state.subscriptionPlan.available} onChange={this.onControlChange} />} label={this.props.t('label.isAvailable')} />

                            <fieldset id="prices-wrapper" className="fieldset-wrapper collapsable collapsed">
                                <legend onClick={this.collapsable}>&nbsp;<FontAwesomeIcon icon={this.state.icon} aria-hidden="true" />&nbsp;{`${this.props.t('actions.add')} ${this.props.t('label.price')}`}&nbsp;</legend>

                                <div className="table">
                                    <div className="form-item form-item-2get">
                                        <label htmlFor="reason">{this.props.t('label.reason')}</label>
                                        <input type="text" name="reason" id="reason" className="form-control" />
                                    </div>

                                    <div className="form-item form-item-2get">
                                        <label htmlFor="price">{this.props.t('label.price')}</label>
                                        <input type="number" name="price" step="0.01" id="price" className="form-control" />
                                    </div>

                                    <div className="form-item form-item-2get">
                                        <label htmlFor="currencyString">{this.props.t('label.currency')}</label>
                                        <select defaultValue={defaultCurrencySelected} id="currencyString" name="currencyString" className="form-control-select">
                                            <option value="" disabled hidden style={{ "color": "#9ea5aa" }}>{this.props.t('actions.selectOption')}</option>
                                            {this.state.currencyOptions.map((currencyString) =>
                                                <option value={currencyString} key={currencyString}>{currencyString}</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-item">
                                        <button id="btn-addprice" type="button" className="form-action-button" onClick={this.addPrice}>{this.props.t('actions.add')}</button>
                                    </div>
                                </div>

                                <CustomTable
                                    instances={this.state.subscriptionPlan.prices}
                                    showEmptyMessage={true}
                                    emptyMessage={this.props.t("subscriptionPlan.planPricesEmpty")}
                                    table_columns={table_columns_price}
                                    keyField="reason"
                                />
                            </fieldset>


                            <fieldset id="services-wrapper" className="fieldset-wrapper collapsable collapsed">
                                <legend onClick={this.collapsable}>&nbsp;<FontAwesomeIcon icon={this.state.icon} aria-hidden="true" />&nbsp;{`${this.props.t('actions.add')} ${this.props.t('label.service')}`}&nbsp;</legend>

                                <div className="table">
                                    <div className="form-item form-item-2get">
                                        <label htmlFor="serviceKey">{this.props.t('label.key')}</label>
                                        <input type="text" name="serviceKey" id="serviceKey" className="form-control" />
                                    </div>

                                    <div className="form-item form-item-2get">
                                        <label htmlFor="serviceValue">{this.props.t('label.value')}</label>
                                        <input type="text" name="serviceValue" id="serviceValue" className="form-control" />
                                    </div>

                                    <div className="form-item">
                                        <button id="btn-addservice" type="button" className="form-action-button" onClick={this.addService}>{this.props.t('actions.add')}</button>
                                    </div>
                                </div>

                                <CustomTable
                                    instances={this.state.subscriptionPlan.services}
                                    showEmptyMessage={true}
                                    emptyMessage={this.props.t("subscriptionPlan.planServicesEmpty")}
                                    table_columns={table_columns_service}
                                    keyField="serviceKey"
                                />
                            </fieldset>

                            <fieldset id="details-wrapper" className="fieldset-wrapper collapsable collapsed">
                                <legend onClick={this.collapsable}>&nbsp;<FontAwesomeIcon icon={this.state.icon} aria-hidden="true" />&nbsp;{`${this.props.t('actions.add')} ${this.props.t('label.detail')}`}&nbsp;</legend>

                                <div className="table">
                                    <div className="form-item form-item-2get">
                                        <label htmlFor="detailKey">{this.props.t('label.key')}</label>
                                        <input type="text" name="detailKey" id="detailKey" className="form-control" />
                                    </div>

                                    <div className="form-item form-item-2get">
                                        <label htmlFor="detailValue">{this.props.t('label.value')}</label>
                                        <input type="text" name="detailValue" id="detailValue" className="form-control" />
                                    </div>

                                    <div className="form-item">
                                        <button id="btn-adddetail" type="button" className="form-action-button" onClick={this.addDetail}>{this.props.t('actions.add')}</button>
                                    </div>
                                </div>

                                <CustomTable
                                    instances={this.state.subscriptionPlan.details}
                                    showEmptyMessage={true}
                                    emptyMessage={this.props.t("subscriptionPlan.planDetailsEmpty")}
                                    table_columns={table_columns_detail}
                                    keyField="key"
                                />
                            </fieldset>

                            <button type="button" id="btn-new-subscription-plan" className="form-action-button" form="subscriptionPlan" onClick={this.state.isAdd ? this.addSubscriptionPlan : this.editSubscriptionPlan}>{this.props.t('actions.save')}</button>
                        </form>
                    </div>

                    {this.state.alertBox.isOpen && <CustomSnackbar isOpen={this.state.alertBox.isOpen} autoHideDuration={6000} message={this.state.alertBox.message} backgroundColor={this.state.alertBox.backgroundColor} handleSnackbarOpen={this.handleSnackbarState} />}
                </main >
            );
        }
    }
}

SubscriptionPlanAddEditComponent.defaultProps = {
    subscriptionPlanID: undefined,
    isAdd: true,
}

export default withTranslation()(SubscriptionPlanAddEditComponent);