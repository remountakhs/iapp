import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import userApi from "../../api/user";
import { getRoleOptions } from '../../constants/roleOptions';
import LoadingSkeleton from "../../components/Loading/LoadingSkeleton";
import CustomSnackbar from "../../components/Snackbar/CustomSnackbar";
import CustomTitleBoldSubtitle from "../../components/Title/CustomTitleBoldSubtitle";
import { formIsValid } from "../../utils/form-validation";
import { equalsIgnoreCase } from "../../utils/functions";
import UserGenericErrorComponent from "./user-generic-error.component";
import { hasRoleAdmin } from "../../utils/auth";
import { withTranslation } from "react-i18next";
import { FormControlLabel, Switch } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collapsable } from "../../utils/theme";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import CustomSelectWithChip from "../../components/Select/CustomSelectWithChip";
import { getLanguageFromURL } from "../../utils/language";

/**
 * The UserAddEditComponent that triggers the creation of a 
 * new user or the modification of an existing one.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class UserAddEditComponent extends Component {
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
         * @property {string} userID tha user id to get user current information for edit user page
         * @property {object} alertBox holds snackbar infromation and style
         * @property {object} user an empty object if add or the selected user to be editted
         * @property {object} userAuth the authenticated user infromation
         * @property {array} countries a list of the different countries
         * @property {array} roles the different roles a user can have
         * @property {*} icon the legend fa icon
         * @property {boolean} isAdd to define if requested an edit or an add of a user
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
            userID: this.props.userID,
            user: null,
            countries: [],
            roles: getRoleOptions(),
            userAuth: null,
            isAdd: this.props.userID === undefined,
            icon: faPlusSquare,
            // error messages per field
            isError: {
                username: "",
                fatherName: "",
                lastName: "",
                email: "",
                phone: "",
                roles: "",
                newPassword: "",
                verifyPassword: ""
            }
        };

        // Our event handlers
        this.collapsable = this.collapsable.bind(this);
        this.getUser = this.getUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.removeRole = this.removeRole.bind(this);
        this.onControlChange = this.onControlChange.bind(this);
    }

    /**
     * Gets called and triggers the componentDidMount to change the browser tab title.
     *
     * @author [Gina Chatzimarkaki]
     */
    componentDidMount() {
        document.title = `Usee | ${this.props.t('user.pageTitle')} | ${this.state.isAdd ? this.props.t('actions.add') : this.props.t('actions.edit')}`;
        this.getUser();
    }

    /**
     * The rest endpoint to get the user default (add) or current (edit) information.
     */
    getUser = () => {
        if (this.state.isAdd) {
            userApi.fetchNew().then((r) => {
                this.setState({
                    countries: r.data.returnobject.countryList,
                    userAuth: r.data.returnobject.userAuth,
                    user: {
                        username: "",
                        firstName: "",
                        fatherName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        address: {
                            country: {
                                id: ""
                            },
                            address: "",
                            city: "",
                            postalCode: ""
                        },
                        invocationAddress: "",
                        jobDescription: "",
                        roles: [],
                        newPassword: "",
                        verifyPassword: "",
                        enabled: true
                    },
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
            userApi.fetchOne(this.state.userID).then((r) => {
                this.setState({
                    countries: r.data.returnobject.countryList,
                    userAuth: r.data.returnobject.userAuth,
                    user: r.data.returnobject.userRequested,
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
     * Gets called when the user clicks on the save button, and triggers 
     * the creation of the new user.
     */
    addUser = () => {
        if (this.formValidation()) {
            let user = this.state.user;
            user.password = undefined;
            userApi.create(user).then((r) => {
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
     * Gets called when the user clicks on the save button, and triggers 
     * the edit of the selected user.
     */
    editUser = () => {
        if (this.formValidation()) {
            let user = this.state.user;
            user.password = undefined;
            if (user.currentPassword === "")
                user.currentPassword = undefined;
            if (user.newPassword === "")
                user.newPassword = undefined;
            if (user.verifyPassword === "")
                user.verifyPassword = undefined;
            userApi.update(user).then((r) => {
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
     * Function that triggers the control input value change.
     * @param {*} event 
     */
    onControlChange = (event, field) => {
        this.setState({
            user: {
                ...this.state.user,
                [field]: event.target.checked
            }
        });
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
     * Function that triggers the phone value change.
     * @param {*} event 
     */
    onPhoneChange = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                "phone": event
            }
        });
    }

    /**
     * Function that triggers the removal of a role.
     * @param {*} chipToDelete 
     */
    removeRole = (event, roleToDelete) => {
        let roles = this.state.user.roles;
        const index = roles.indexOf(roleToDelete);
         // only splice array when item is found
        if(index > -1) roles.splice(index, 1); // 2nd parameter means remove one item only
        this.setState({
            user: {
                ...this.state.user,
                roles: roles
            }
        });
    }

    /**
     * Function that triggers the multi select input value change.
     * @param {*} event 
     */
    onSelectChange = (event) => {
        const objectName = event.target.name.split(".")[0];
        let name = event.target.name.split(".")[1];
        this.setState({
            [objectName]: {
                ...this.state[objectName],
                [name]: event.target.value
            }
        });
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
        isError.username = this.state.user.username.length < 1 ? this.props.t('table.valueReuired') : "";
        isError.username = this.state.user.fatherName.length < 1 ? this.props.t('table.valueReuired') : "";
        isError.lastName = this.state.user.lastName.length < 1 ? this.props.t('table.valueReuired') : "";
        isError.email = this.state.user.email.length < 1 ? this.props.t('table.valueReuired') : "";
        isError.phone = this.state.user.phone.length < 1 ? this.props.t('table.valueReuired') : "";
        isError.roles = this.state.user.roles.length < 1 ? this.props.t('table.valueReuired') : "";
        if (this.state.isAdd) {
            isError.newPassword = this.state.user.newPassword.length < 1 ? this.props.t('table.valueReuired') : "";
            isError.verifyPassword = this.state.user.verifyPassword.length < 1 ? this.props.t('table.valueReuired') : "";
        }
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
        console.log(fieldNested)
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
            return <Redirect to={`/${getLanguageFromURL()}/user`} />
        } else if (this.state.error && !this.state.isAdd) {
            return <UserGenericErrorComponent />;
        } else if ((!this.state.isLoaded && !this.state.isAdd) || this.state.user == null) {
            return (
                <LoadingSkeleton lines={9} />
            );
        } else {
            let defaultCountrySelected = "";
            if (!this.state.isAdd && this.state.user !== null && this.state.countries.length > 0) {
                if (this.state.user !== undefined && this.state.user.country !== undefined)
                    defaultCountrySelected = this.state.countries.find(country => equalsIgnoreCase(country.id, this.state.user.country.id));
            }
            let defaultRolesSelected = [];
            if (this.state.roles !== null && this.state.user !== null && this.state.user !== undefined && this.state.user.roles.length > 0 && !this.state.isAdd) {
                defaultRolesSelected = this.state.user.roles;
            }
            const { isError } = this.state;

            return (
                <main className="tr" role="main" id={this.state.isAdd ? "add" : "edit"}>
                    <CustomTitleBoldSubtitle
                        title={`${this.props.t('user.pageTitle')} | ${this.state.isAdd ? this.props.t('actions.add') : this.props.t('actions.edit')}`}
                        subtitleBeforeText={this.state.isAdd ? this.props.t('actions.tableCreateNewLink') + this.props.t('user.pageTitle') : this.props.t('user.pageTitle') + " "}
                        subtitleboldText={!this.state.isAdd && this.state.user !== null && this.state.user !== undefined && this.state.user.username}
                        subtitleAfterText={!this.state.isAdd ? " profile page" : ""}
                    />

                    <div id="main-area">

                        <form id="user" className="classic col-6" onSubmit={(e) => { return false; }}>

                            {this.state.isAdd &&
                                <input type="hidden" />
                            }

                            {!this.state.isAdd &&
                                <input type="hidden" name="id" id="id" defaultValue={this.state.userID} />
                            }

                            <div className="form-item required">
                                <label htmlFor="username">{this.props.t('label.username')}</label>
                                <input type="text" name="user.username" id="username" placeholder="Add at least 4 characters" required="required"
                                    disabled={!this.state.isAdd} defaultValue={!this.state.isAdd ? this.state.user.username : ""}
                                    className={isError.username.length > 0 ? "is-invalid form-control" : "form-control"}
                                    onChange={this.formValChange}
                                />
                                {isError.username.length > 0 && (
                                    <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.username}</li></ul>
                                )}
                            </div>

                            <div className="form-item">
                                <label htmlFor="firstName">{this.props.t('label.firstName')}</label>
                                <input type="text" name="user.firstName" id="firstName" className="form-control"
                                    defaultValue={!this.state.isAdd ? this.state.user.firstName : ""}
                                    onChange={this.formValChange} />
                            </div>

                            <div className="form-item required">
                                <label htmlFor="lastName">{this.props.t('label.lastName')}</label>
                                <input type="text" name="user.lastName" id="lastName" required="required"
                                    defaultValue={!this.state.isAdd ? this.state.user.lastName : ""}
                                    className={isError.lastName.length > 0 ? "is-invalid form-control" : "form-control"}
                                    onChange={this.formValChange}
                                />
                                {isError.lastName.length > 0 && (
                                    <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.lastName}</li></ul>
                                )}
                            </div>

                            <div className="form-item required">
                                <label htmlFor="fatherName">{this.props.t('label.fatherName')}</label>
                                <input type="text" name="user.fatherName" id="fatherName" required="required"
                                    defaultValue={!this.state.isAdd ? this.state.user.fatherName : ""}
                                    className={isError.fatherName.length > 0 ? "is-invalid form-control" : "form-control"}
                                    onChange={this.formValChange}
                                />
                                {isError.fatherName.length > 0 && (
                                    <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.fatherName}</li></ul>
                                )}
                            </div>

                            <div className="form-item">
                                <label htmlFor="invocationAddress">{this.props.t('label.invocationAddress')}</label>
                                <input type="text" name="user.invocationAddress" id="invocationAddress"
                                    defaultValue={!this.state.isAdd ? this.state.user.invocationAddress : ""}
                                    className="form-control"
                                    onChange={this.formValChange}
                                />
                            </div>

                            <div className="form-item">
                                <label htmlFor="jobDescription">{this.props.t('label.jobDescription')}</label>
                                <input type="text" name="user.jobDescription" id="jobDescription"
                                    defaultValue={!this.state.isAdd ? this.state.user.jobDescription : ""}
                                    className="form-control"
                                    onChange={this.formValChange}
                                />
                            </div>

                            <div className="form-item required">
                                <label htmlFor="email">{this.props.t('label.email')}</label>
                                <input type="email" name="user.email" id="email" placeholder="name@company.com" required="required"
                                    defaultValue={!this.state.isAdd ? this.state.user.email : ""}
                                    className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"}
                                    onChange={this.formValChange}
                                />
                                {isError.email.length > 0 && (
                                    <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.email}</li></ul>
                                )}
                            </div>

                            <div className="form-item required">
                                <label htmlFor="phone">{this.props.t('label.phone')}</label>

                                <PhoneInput defaultValue={!this.state.isAdd ? this.state.user.phone : ""} name="user.phone" id="phone"
                                    placeholder="Add your phone number" required="required" className={isError.phone.length > 0 ? "is-invalid form-control-multiselect" : "form-control-multiselect"}
                                    onChange={this.onPhoneChange}
                                />
                                {isError.phone.length > 0 && (
                                    <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.phone}</li></ul>
                                )}
                            </div>

                            <div className="form-item">
                                <FormControlLabel control={<Switch defaultChecked={this.state.user.enabled} onChange={(event) => this.onControlChange(event, "enabled")} />} label={this.props.t('label.isEnabled')} />
                                <FormControlLabel control={<Switch defaultChecked={this.state.user.notificationWebEnabled} onChange={(event) => this.onControlChange(event, "notificationWebEnabled")} />} label={this.props.t('label.notificationWebEnabled')} />
                                <FormControlLabel control={<Switch defaultChecked={this.state.user.notificationEmailEnabled} onChange={(event) => this.onControlChange(event, "notificationEmailEnabled")} />} label={this.props.t('label.notificationEmailEnabled')} />
                            </div>

                            {this.state.userAuth !== null && hasRoleAdmin(this.state.userAuth.roles) &&
                                <div className="form-item required">
                                    <label htmlFor="roles">{this.props.t('label.roles')}</label>

                                    <CustomSelectWithChip id="roles" name="user.roles" required={true}
                                        defaultValue={defaultRolesSelected}
                                        labelID="roles" label={this.props.t('label.roles')}
                                        className={isError.roles.length > 0 ? "is-invalid form-control-select" : "form-control-select"}
                                        options={this.state.roles} onChange={this.onSelectChange} onDelete={this.removeRole}
                                    />
                                    {isError.roles.length > 0 && (
                                        <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.roles}</li></ul>
                                    )}
                                </div>
                            }

                            <fieldset style={{ marginTop: "50px" }} className="fieldset-wrapper collapsable collapsed">
                                <legend onClick={this.collapsable}>&nbsp;<FontAwesomeIcon icon={this.state.icon} aria-hidden="true" />&nbsp;{`${this.props.t('label.address')}`}&nbsp;</legend>

                                <div className="table">
                                    <div className="form-item">
                                        <label htmlFor="address">{this.props.t('label.address')}</label>
                                        <input type="text" name="user.address.address" id="address" className="form-control"
                                            defaultValue={!this.state.isAdd ? this.state.user.address.address : ""}
                                            onChange={this.formValChange} />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="city">{this.props.t('label.city')}</label>
                                        <input type="text" name="user.address.city" id="city" className="form-control"
                                            defaultValue={!this.state.isAdd ? this.state.user.address.city : ""}
                                            onChange={this.formValChange} />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="postalCode">{this.props.t('label.postalCode')}</label>
                                        <input type="text" name="user.address.postalCode" id="postalCode" className="form-control"
                                            defaultValue={!this.state.isAdd ? this.state.user.address.postalCode : ""}
                                            onChange={this.formValChange} />
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor="country">{this.props.t('label.country')}</label>
                                        <select defaultValue={defaultCountrySelected} id="country" name="user.address.country.id" className="form-control-select" onChange={this.formValChange}>
                                            <option value="" disabled hidden style={{ "color": "#9ea5aa" }}>{this.props.t('actions.selectOption')}</option>
                                            {this.state.countries.map((country) =>
                                                <option value={country.id} key={country.id}>{country.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset className="fieldset-wrapper" style={{ marginTop: "50px" }}>
                                <legend>{this.state.isAdd ? this.props.t('label.createPassword') : this.props.t('label.changePassword')}</legend> {/* Add class "optional" if the fieldset's fields are optional */}

                                <div className="table">
                                    {(!this.state.isAdd && this.state.userAuth !== null && (equalsIgnoreCase(this.state.userAuth.roles, 'ADMIN') || this.state.userID === this.state.userAuth.id)) &&
                                        <div className="form-item">
                                            <label htmlFor="currentPassword">{this.props.t('label.currentPassword')}</label>
                                            <input type="password" name="user.currentPassword" id="currentPassword" className="form-control"
                                                placeholder="Type your current password"
                                                autoComplete="off"
                                                onChange={this.formValChange}
                                            />
                                        </div>
                                    }

                                    <div className={this.state.isAdd ? 'form-item required' : "form-item"}>
                                        <label htmlFor="newPassword">{this.props.t('label.newPassword')}</label>
                                        <input type="password" name="user.newPassword" id="newPassword" placeholder="Type your new password" autoComplete="new-password"
                                            required={this.state.isAdd}
                                            className={isError.newPassword.length > 0 ? "is-invalid form-control" : "form-control"}
                                            onChange={this.formValChange}
                                        />
                                        {isError.newPassword.length > 0 && (
                                            <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.newPassword}</li></ul>
                                        )}
                                    </div>

                                    <div className={this.state.isAdd ? 'form-item required' : "form-item"}>
                                        <label htmlFor="verifyPassword">{this.props.t('label.verifyPassword')}</label>
                                        <input type="password" name="user.verifyPassword" id="verifyPassword" placeholder="Retype your new password" autoComplete="new-password"
                                            required={this.state.isAdd} data-parsley-equalto="#newPassword"
                                            className={isError.verifyPassword.length > 0 ? "is-invalid form-control" : "form-control"}
                                            onChange={this.formValChange}
                                        />
                                        {isError.verifyPassword.length > 0 && (
                                            <ul className="parsley-errors-list filled" id="parsley-id-33" aria-hidden="false" ><li className="parsley-required">{isError.verifyPassword}</li></ul>
                                        )}
                                    </div>
                                </div>
                            </fieldset>

                            <button type="button" id="btn-newuser" className="form-action-button" form="user" onClick={this.state.isAdd ? this.addUser : this.editUser}>{this.props.t('actions.save')}</button>
                        </form>
                    </div>

                    {this.state.alertBox.isOpen && <CustomSnackbar isOpen={this.state.alertBox.isOpen} autoHideDuration={6000} message={this.state.alertBox.message} backgroundColor={this.state.alertBox.backgroundColor} handleSnackbarOpen={this.handleSnackbarState} />}
                </main>
            );
        }
    }
}

UserAddEditComponent.defaultProps = {
    userID: undefined,
    isAdd: true,
}

export default withTranslation()(UserAddEditComponent);