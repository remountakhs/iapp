import React, { Component } from 'react';
import { PaginationItem, Pagination, Stack } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const styles = {
    ".MuiPagination-ul": {
        backgroundColor: "#fff",
        boxShadow: "0px 0px 15px 0px #dcdcdc",
        borderTop: "1px solid #ededed",
        height: "56.1px"
    },
    ".MuiPagination-ul li": {
        margin: 0,
        display: "inline-block",
        textAlign: "center",
        height: "56.1px"
    },
    ".MuiPaginationItem-root": {
        color: "#02416d",
        display: "block",
        width: "100%",
        border: "none",
        borderRight: "1px solid #ededed",
        padding: "17px 22px",
        textDecoration: "none",
        height: "100%",
        justifyContent: "center",
        borderRadius: 0
    },
    ".MuiPagination-ul li:hover": {
        backgroundColor: "#f8f8f8"
    },
    ".Mui-selected": {
        color: "#fff",
        borderColor: "#dd9f36",
        backgroundColor: "#dd9f36!important"
    },
    ".Mui-selected:hover": {
        backgroundColor: "#dd9f36"
    },
    ".Mui-disabled": {
        margin: 0,
        fontSsize: "14px",
        display: "inline-block",
        textAlign: "center",
    },
    ".MuiPaginationItem-firstLast": {
        borderRight: "1px solid #ededed",
    },
    ".MuiPaginationItem-icon": {
        fontSize: "1.5rem",
    }
};

/**
 * The CustomPagination, that display each list page with a custom material pagination.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomPagination extends Component {

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            this.props.count > 1 && <Stack spacing={2} >
                <Pagination count={this.props.count}
                    variant="outlined"
                    shape="rounded"
                    size="50px"
                    showFirstButton
                    showLastButton
                    color="standard"
                    sx={{ ...styles }}
                    page={this.props.page + 1}
                    renderItem={(item) => (
                        <PaginationItem
                            components={{ first: KeyboardDoubleArrowLeftIcon, last: KeyboardDoubleArrowRightIcon }}
                            {...item}
                        />
                    )}
                    onChange={(event, value) => this.props.handlePaginationChange(event, value-1)}
                />
            </Stack>
        );
    }
}

CustomPagination.defaultProps = {
    count: 1
}
export default CustomPagination;