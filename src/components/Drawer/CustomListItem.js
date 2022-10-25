import React, { Component } from 'react';

import { Collapse, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { withTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { hasAnyOfRoles } from '../../utils/auth';

/**
 * The CustomListItem, that display each drawer list items.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class CustomListItem extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} sidenav the drawer details
         * @property {*} icon the drawer list item icon
         * @property {string} label the drawer list item label
         * @property {string} link the drawer list item reference link
         * @property {boolean} open the custom list item collapsable menu state
         * @property {boolean} redirect if true the menu item is clicked and a redirect to page should perform
         */
        this.state = {
            sidenav: this.props.sidenav,
            icon: this.props.icon,
            label: this.props.label,
            link: this.props.link,
            open: this.props.open,
            redirect: false
        };

        // Our event handlers
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Fucntion that handles the collapsable menu click.
     */
    handleClick() {
        // console.log("Handle Clicked....", this.state.open);
        this.props.children !== undefined ?
            this.setState(prevState => ({
                open: !prevState.open
            }))
            :

            this.setState({
                redirect: true
            })
    }

    /**
     * Gets called to render the document html.
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.link} />
        } else {
            return (
                <>
                    <Divider />
                    <ListItem key={this.state.label} disablePadding sx={{ display: 'block' }} onClick={this.props.onClick === undefined ? this.handleClick : this.props.onClick}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: this.state.sidenav.expanded ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: this.state.sidenav.expanded ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {this.state.icon}
                            </ListItemIcon>
                            <ListItemText primary={this.state.label} sx={{ opacity: this.state.sidenav.expanded ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    {this.props.children !== undefined &&
                        <Collapse key={"collapse-" + this.props.key} in={this.state.open} timeout='auto' unmountOnExit orientation="vertical" collapsedSize="50px" style={{ paddingLeft: "25px" }}>
                            {this.props.children.map((menuItem) =>
                                hasAnyOfRoles(this.props.roles, menuItem.roles) &&
                                <CustomListItem key={"collapse-" + menuItem.label} sidenav={this.props.sidenav} label={this.props.t(`menu.${menuItem.label}`)} icon={menuItem.icon} link={menuItem.link} children={menuItem.children} />
                            )}
                        </Collapse>
                    }
                </>
            );
        }
    }
}

CustomListItem.defaultProps = {
    label: "",
    link: null,
    open: false,
    children: undefined
}
export default withTranslation()(CustomListItem);