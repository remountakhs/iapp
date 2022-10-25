import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControlLabel, Switch } from "@mui/material";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import equipmentApi from "../../api/equipment";
import CustomAddEditBreadcrumbMultiParent from "../../components/Breadcrumb/CustomAddEditBreadcrumbMultiParent";
import CustomDeleteButton from "../../components/Button/CustomDeleteButton";
import LoadingSkeleton from "../../components/Loading/LoadingSkeleton";
import CustomSelectWithChip from "../../components/Select/CustomSelectWithChip";
import CustomSnackbar from "../../components/Snackbar/CustomSnackbar";
import CustomTable from "../../components/Table/CustomTable";
import CustomTitleBoldSubtitle from "../../components/Title/CustomTitleBoldSubtitle";
import { hasRoleAdmin } from "../../utils/auth";
import { formIsValid } from "../../utils/form-validation";
import { getLanguageFromURL } from "../../utils/language";
import { collapsable } from "../../utils/theme";

/**
 * The EquipmentAddEditComponent that triggers the creation of a 
 * new equipment or the modification of an existing one.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class EquipmentAddEditComponent extends Component {
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
         * @property {object} outlet tha outlet basic details (id and name)
         * @property {string} equipmentID tha equipment id to get equipment current information for edit equipment page
         * @property {object} alertBox holds snackbar infromation and style
         * @property {*} icon the legend fa icon
         * @property {object} equipment an empty object if add or the selected equipment to be editted
         * @property {object} userAuth the authenticated user infromation
         * @property {array} typeOptions the different type options
         * @property {array} tagOptions the different tag options
         * @property {array} detailOptions the different detail options
         * @property {boolean} isAdd to define if requested an edit or an add of a equipment
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
            outlet: {
                id: this.props.outletID,
                name: "",
            },
            equipmentID: this.props.equipmentID,
            equipment: null,
            typeOptions: [],
            tagOptions: [],
            detailOptions: [],
            // currencyOptions: [],
            userAuth: null,
            isAdd: this.props.equipmentID === undefined,
            // error messages per field
            isError: {
                label: "",
                type: ""
            }
        };

        // Our event handlers
        this.collapsable = this.collapsable.bind(this);
        this.addDetail = this.addDetail.bind(this);
        this.removeDetailItem = this.removeDetailItem.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.getEquipment = this.getEquipment.bind(this);
        this.addEquipment = this.addEquipment.bind(this);
        this.editEquipment = this.editEquipment.bind(this);
        this.onControlChange = this.onControlChange.bind(this);
    }

    /**
     * Gets called and triggers the componentDidMount to change the browser tab title.
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.title = `Usee | ${this.props.t('outlet.pageTitle')} | ${this.props.t('equipment.pageTitle')} | ${this.state.isAdd ? this.props.t('actions.add') : this.props.t('actions.edit')}`;
        this.getEquipment();
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
     * The rest endpoint to get the equipment default (add) or current (edit) information.
     */
    getEquipment = () => {
        if (this.state.isAdd) {
            equipmentApi.fetchNew().then((r) => {
                this.setState({
                    userAuth: r.data.returnobject.userAuth,
                    equipment: {
                        name: "",
                        outletId: this.state.outlet.id,
                        section: "",
                        floor: "",
                        type: "",
                        label: "",
                        details: [],
                        tags: [],
                        description: {
                            en: "",
                            de: "",
                            fr: "",
                            it: "",
                            ru: "",
                            el: "",
                            uk: "",
                            es: "",
                            nl: "",
                            cs: "",
                            pl: "",
                            bg: "",
                            ar: "",
                            et: "",
                            lt: "",
                            ro: "",
                            tr: "",
                            text: ""
                        },
                        isActive: true
                    },
                    equipmentTypeOptions: r.data.returnobject.equipmentTypeOptions,
                    tagOptions: r.data.returnobject.tagOptions,
                    detailOptions: r.data.returnobject.detailOptions,
                    // currencyOptions: r.data.returnobject.currencyOptions,
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
            equipmentApi.fetchOne(this.state.equipmentID).then((r) => {
                this.setState({
                    userAuth: r.data.returnobject.userAuth,
                    equipment: r.data.returnobject.equipment,
                    equipmentTypeOptions: r.data.returnobject.equipmentTypeOptions,
                    tagOptions: r.data.returnobject.tagOptions,
                    // currencyOptions: r.data.returnobject.currencyOptions,
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
     * Gets called when the equipment clicks on the save button, and triggers 
     * the creation of the new equipment.
     */
    addEquipment = () => {
        if (this.formValidation()) {
            equipmentApi.create(this.state.equipment).then((r) => {
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
     * Gets called when the equipment clicks on the save button, and triggers 
     * the edit of the selected equipment.
     */
    editEquipment = () => {
        if (this.formValidation()) {
            equipmentApi.update(this.state.equipment).then((r) => {
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
            equipment: {
                ...this.state.equipment,
                available: event.target.checked
            }
        });
    }

    /**
     * Function that triggers the removal of a tag.
     * @param {*} tagToDelete 
     */
    removeTag = (event, tagToDelete) => {
        let tags = this.state.equipment.tags;
        const index = tags.indexOf(tagToDelete);
        // only splice array when item is found
        if (index > -1) tags.splice(index, 1); // 2nd parameter means remove one item only
        this.setState({
            equipment: {
                ...this.state.equipment,
                tags: tags
            }
        });
    }


    /**
     * Function that add a details to the plan
     *
     * @param {type} event 
     */
    addDetail = (event) => {
        let detailKey = document.getElementById('detailKey');
        let detailValue = document.getElementById('detailValue');
        if (detailKey.value === "" || detailValue.value === "") {
            this.setState({ alertBox: { isOpen: true, message: this.props.t('actions.error.addFailed'), backgroundColor: "#a71313" } });
        } else {
            let details = this.state.equipment.details;
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
     * Function that removes a detail item.
     *
     * @param {type} event 
     */
    removeDetailItem = (event, rowIndex) => {
        let details = this.state.equipment.details;
        if (rowIndex === 0) {
            details.shift();
        } else {
            details.splice(rowIndex - 1, rowIndex)
        }
        this.setState({
            equipment: {
                ...this.state.equipment,
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
        isError.label = this.state.equipment.label.length < 1 ? this.props.t('table.valueReuired') : "";
        isError.type = this.state.equipment.type.length < 1 ? this.props.t('table.valueReuired') : "";
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
            return <Redirect to={`/${getLanguageFromURL()}/outlet/${this.state.outlet.id}/equipment`} />
        } else if ((!this.state.isLoaded && !this.state.isAdd) || this.state.equipment === null) {
            return (
                <LoadingSkeleton lines={9} />
            );
        } else {
            const { isError } = this.state;
            let defaultTypeSelected = "";
            let defaultTagsSelected = [];
            if (this.state.equipment !== null) {
                defaultTypeSelected = this.state.equipment.type;
                defaultTagsSelected = this.state.equipment.tags;
            }

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
                                this.actionFormatter(null, tableMeta.tableData[tableMeta.rowIndex], tableMeta.rowIndex, { remove: ((event, rowIndex) => this.removeServiceItem(event, rowIndex)), action: "delete" })
                            );
                        },
                        setCellProps: () => ({ className: "click action" })
                    }
                }
            ];


            return (
                <main className="tr" role="main" id={this.state.isAdd ? "add" : "edit"}>
                    <CustomAddEditBreadcrumbMultiParent
                        isAdd={this.state.isAdd}
                        parents={[
                            { name: this.props.t('outlet.pageTitle'), url: `/${getLanguageFromURL()}/outlet` },
                            { name: this.props.t('equipment.title'), url: `/${getLanguageFromURL()}/outlet/${this.state.outlet.id}/equipment` },
                        ]}
                        instanceName={(this.state.equipment !== null) ? this.state.equipment.name.text : ""}
                    />

                    <CustomTitleBoldSubtitle
                        title={`${this.props.t('equipment.pageTitle')} | ${this.state.isAdd ? this.props.t('actions.add') : this.props.t('actions.edit')}`}
                        subtitleBeforeText={this.state.isAdd ? this.props.t('actions.tableCreateNewLink') + this.props.t('equipment.pageTitle') : this.props.t('equipment.pageTitle') + " "}
                        subtitleboldText={!this.state.isAdd && this.state.equipment !== null && this.state.equipment !== undefined && this.state.equipment.name}
                        subtitleAfterText={!this.state.isAdd ? " profile page" : ""}
                    />

                    <div id="main-area">

                        <form id="equipment" className="classic col-6" onSubmit={(e) => { return false; }}>

                            <input type="hidden" name="outlet.id" id="outletID" defaultValue={this.state.outlet.id} />
                            {this.state.isAdd &&
                                <input type="hidden" />
                            }

                            {!this.state.isAdd &&
                                <input type="hidden" name="id" id="id" defaultValue={this.state.equipmentID} />
                            }

                            <div className="form-item required">
                                <label htmlFor="label">{this.props.t('label.label')}</label>
                                <input type="text" name="equipment.label" id="label" placeholder={this.props.t('label.labelPlaceholder')} required="required"
                                    disabled={!this.state.isAdd} defaultValue={!this.state.isAdd ? this.state.equipment.label : ""}
                                    className={isError.label.length > 0 ? "is-invalid form-control" : "form-control"}
                                    onChange={this.formValChange}
                                />
                                {isError.label.length > 0 && (
                                    <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.label}</li></ul>
                                )}
                            </div>

                            <div className="form-item">
                                <label htmlFor="section">{this.props.t('label.section')}</label>
                                <input type="text" name="user.section" id="section" className="form-control"
                                    defaultValue={!this.state.isAdd ? this.state.equipment.section : ""}
                                    onChange={this.formValChange} />
                            </div>

                            <div className="form-item">
                                <label htmlFor="floor">{this.props.t('label.floor')}</label>
                                <input type="text" name="user.floor" id="floor" className="form-control"
                                    defaultValue={!this.state.isAdd ? this.state.equipment.floor : ""}
                                    onChange={this.formValChange} />
                            </div>


                            <div className="form-item required">
                                <label htmlFor="type">{this.props.t('label.type')}</label>
                                <select defaultValue={defaultTypeSelected} id="type" name="equipment.type" className="form-control-select" onChange={this.formValChange}>
                                    <option value="" disabled hidden style={{ "color": "#9ea5aa" }}>{this.props.t('actions.selectOption')}</option>
                                    {this.state.equipmentTypeOptions.map((type) =>
                                        <option value={type} key={type}>{type}</option>
                                    )}
                                </select>
                                {isError.type.length > 0 && (
                                    <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.type}</li></ul>
                                )}
                            </div>

                            <div className="form-item">
                                <label htmlFor="tags">{this.props.t('label.tags')}</label>
                                <CustomSelectWithChip id="tags" name="equipment.tags" required={true}
                                    defaultValue={defaultTagsSelected}
                                    labelID="tags" label={this.props.t('label.tags')}
                                    options={this.state.tagOptions} onChange={this.onSelectChange} onDelete={this.removeTag}
                                />
                            </div>

                            <div className="form-item">
                                <label htmlFor="description">{this.props.t('label.description')}</label>
                                <textarea name="equipment.description.text" id="description" className="form-control" onChange={this.formValChange}
                                    defaultValue={null !== this.state.equipment ? this.state.equipment.description.text : ""} />
                            </div>

                            <FormControlLabel control={<Switch defaultChecked={this.state.equipment.isActive} onChange={this.onControlChange} />} label={this.props.t('label.isActive')} />

                            <fieldset id="details-wrapper" className="fieldset-wrapper collapsable collapsed">
                                <legend onClick={this.collapsable}>&nbsp;<FontAwesomeIcon icon={this.state.icon} aria-hidden="true" />&nbsp;{`${this.props.t('actions.add')} ${this.props.t('label.detail')}`}&nbsp;</legend>

                                <div className="table">
                                    <div className="form-item form-item-2get">
                                        <label htmlFor="detailKey">{this.props.t('label.key')}</label>
                                        <select defaultValue={""} id="detailKey" name="detailKey" className="form-control-select">
                                            <option value="" disabled hidden style={{ "color": "#9ea5aa" }}>{this.props.t('actions.selectOption')}</option>
                                            {this.state.detailOptions.map((type) =>
                                                <option value={type} key={type}>{type}</option>
                                            )}
                                        </select>
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
                                    instances={this.state.equipment.details}
                                    showEmptyMessage={true}
                                    emptyMessage={this.props.t("equipment.detailsEmpty")}
                                    table_columns={table_columns_detail}
                                    keyField="key"
                                />
                            </fieldset>

                            <button type="button" id="btn-new-equipment" className="form-action-button" form="equipment" onClick={this.state.isAdd ? this.addEquipment : this.editEquipment}>{this.props.t('actions.save')}</button>
                        </form>
                    </div>

                    {this.state.alertBox.isOpen && <CustomSnackbar isOpen={this.state.alertBox.isOpen} autoHideDuration={6000} message={this.state.alertBox.message} backgroundColor={this.state.alertBox.backgroundColor} handleSnackbarOpen={this.handleSnackbarState} />}
                </main >
            );
        }
    }
}

EquipmentAddEditComponent.defaultProps = {
    outletId: "",
    equipmentID: undefined,
    isAdd: true,
}

export default withTranslation()(EquipmentAddEditComponent);