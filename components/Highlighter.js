import React, { Component } from 'react';
import hljs from "highlight.js";
import markdownStyles from "./markdown-styles.module.css";

class Highlight extends Component {
    constructor(props) {
        super(props);
        this.nodeRef = React.createRef();
    }

    componentDidMount() {
        this.highlight();
    }

    componentDidUpdate() {
        this.highlight();
    }

    highlight = () => {
        if (this.nodeRef) {
            const nodes = this.nodeRef.current.querySelectorAll('pre');
            nodes.forEach((node) => {
                hljs.highlightBlock(node);
            });
        }
    }

    render() {
        const { content } = this.props;
        return (
            <div className={markdownStyles["markdown"]} ref={this.nodeRef} dangerouslySetInnerHTML={{ __html: content }} />
        );
    }
}


export default Highlight;