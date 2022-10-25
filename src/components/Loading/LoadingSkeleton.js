import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import React, { Component } from 'react';

/**
 * The LoadingSkeleton, that display a box with animated skeletons untils a page is ready to render.
 *
 * @version 1.0.1
 * @author [Gina Chatzimarkaki]
 */
class LoadingSkeleton extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {int} lines the number of skeleton rows to be shown
         */
        this.state = {
            lines: this.props.lines !== undefined ? this.props.lines : 3
        };

        // Our event handlers
        this.createSkeletons = this.createSkeletons.bind(this);
    }

    /**
     * Function that trigers the creation of the loading skeleton rows
     */
    createSkeletons = () => {
        let skeletonRows = [];
        for (let i = 0; i < Math.floor(this.state.lines / 2); i++) {
            skeletonRows.push(
                [
                    <Skeleton key={"s" + i + "a"} />
                    ,
                    <Skeleton animation="wave" key={"s" + i + "b"} />
                ]
            )
        }
        return skeletonRows;
    }

    /**
     * Gets called to render the document html
     *
     * @return {ReactElement} markup
     * @author [Gina Chatzimarkaki]
     */
    render() {
        return (
            <Box>
                {this.createSkeletons()}
                {this.state.lines % 2 === 1 &&
                    <Skeleton key={"s" + this.state.lines} />
                }
            </Box>
        );
    }
}

export default LoadingSkeleton;