import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

/**
 * The CustomTooltip, that display a customized tooltip.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomTooltip extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} message the message that is being displayed
         * @property {string} tooltip the message to be presented inside the tooltip box
         * @property {string} tooltipID the tooltip id
         * @property {object} style the tooltip box extra style
         * @property {string} classAppend the classes to be appended to the tooltip box
         * 
         */
        this.state = {
            message: this.props.message,
            tooltip: this.props.tooltip,
            tooltipID: this.props.tooltipID,
            style: this.props.style,
            classAppend: this.props.classAppend
        };
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <div data-tip data-for={this.state.tooltipID} key={"t-div-" + this.state.tooltipID}>
                {this.state.message}
                <ReactTooltip key={"t-" + this.state.tooltipID} id={this.state.tooltipID} place="bottom" effect="solid" className={"tooltip-box" + this.state.classAppend} style={{ ...this.state.style, textAlign: "center" }} arrowColor="transparent">
                    {this.state.tooltip}
                </ReactTooltip>
            </div>
        );
    }
}

CustomTooltip.defaultProps = {
    tooltipID: "tooltip",
    style: { minWidth: "500px" },
    classAppend: ""
}

export default CustomTooltip;