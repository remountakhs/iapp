import { Chip, createTheme, ListItem, Paper, ThemeProvider } from '@mui/material';
import React, { Component } from 'react';

/**
 * The PaperChips, that display customized {@link Paper} with a {@link ListItem} of {@link Chip}.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class PaperChips extends Component {

    getMuiTheme = (sx) => createTheme({
        components: {
            MuiChip: {
                styleOverrides: {
                    root: { ...sx }
                }
            },

            MuiListItem: {
                styleOverrides: {
                    root: {
                        width: "auto",
                        padding: "0px"
                    }
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
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                        border: "2px solid #cfcfcf",
                        borderRadius: "3px"
                    }}
                    component="ul"
                >
                    {this.props.chipsData.map((data) => {
                        return (
                            <ListItem key={data.key}>
                                <Chip color={this.props.color} className={this.props.className} label={data.name} onClick={(event) => this.props.handleClick(event, data)} />
                            </ListItem>
                        );
                    })}
                </Paper>
            </ThemeProvider>
        );
    }
}

PaperChips.defaultProps = {
    className: "",
    label: "",
    color: "default",
    sx: {
        background: "#dcf1f7",
        color: "#54b1d2",
        margin: "5px",
        width: "auto"
    },
    chipsData: []
}
export default PaperChips;