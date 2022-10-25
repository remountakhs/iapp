import { createTheme, ThemeProvider } from '@mui/material';
import Chip from '@mui/material/Chip';
import React, { Component } from 'react';

/**
 * The Custom Chip, that display customized {@link Chip}.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomChip extends Component {

    getMuiTheme = (sx) => createTheme({
        components: {
            MuiChip: {
                styleOverrides: {
                    root: { ...sx }
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
            <ThemeProvider key={this.props.label + "-theme-" + this.props.rowIndex} theme={this.getMuiTheme(this.props.sx)}>
                <Chip key={this.props.label + "-" + this.props.rowIndex} color={this.props.color} className={this.props.className} label={this.props.label} id={this.props.text} />
            </ThemeProvider>
        );
    }
}

CustomChip.defaultProps = {
    className: "",
    label: "",
    color: "default",
    sx: {
        background: "#dcf1f7",
        color: "#54b1d2",
        margin: "5px"
    },
}
export default CustomChip;