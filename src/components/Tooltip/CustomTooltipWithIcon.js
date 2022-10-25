import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

/**
 * The CustomTooltipWithIcon, that display a customized tooltip with a font awesome icon.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomTooltipWithIcon extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} id the instance id to be included in the div key
         * @property {string} tooltip the message to be presented inside the tooltip box instead of {@link classAppend}
         * @property {*} icon the icon to be presented in the table cells
         * @property {string} classAppend the classes to be appended to the icon-button and the tooltip 
         *                           box, and also will be presentes inside the tooltip box  after the {@link tooltipMessage}
         * @property {string} tooltipID the tooltip id
         * @property {string} tooltipMessage the tooltip message
         * @property {object} iconStyle the tooltip icon extra style
         * 
         */
        this.state = {
            id: this.props.id,
            tooltip: this.props.tooltip,
            icon: this.props.icon,
            classAppend: this.props.classAppend,
            tooltipID: this.props.tooltipID,
            tooltipMessage: this.props.tooltipMessage,
            iconStyle: this.props.iconStyle
        }
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <div key={this.state.tooltipID + "-div-" + this.state.id} data-tip data-for={this.state.tooltipID}>
                <Button key={this.state.tooltipID + "-btn-" + this.state.id} className="tooltip-fa"><FontAwesomeIcon key={this.state.tooltipID + "-icon-" + this.state.id} icon={this.state.icon} className={"click " + this.state.classAppend + (this.state.tooltip === undefined ? " cancelled" : "")} style={this.state.iconStyle} aria-hidden="true" /></Button>
                <ReactTooltip key={this.state.tooltipID + "-" + this.state.id} id={this.state.tooltipID} place="bottom" effect="solid" classes={{ tooltip: "tooltip-box " + this.state.classAppend }} style={{ "maxWidth": "800px", "textAlign": "center" }} arrowColor="transparent">
                    {this.state.tooltipMessage + (this.state.tooltip === undefined ? this.state.classAppend.replace('_', ' ') : this.state.tooltip)}
                </ReactTooltip>
            </div>
        );
    }
}

CustomTooltipWithIcon.defaultProps = {
    tooltipID: "tooltip",
    classAppend: "",
    iconStyle: {}
}

export default CustomTooltipWithIcon;