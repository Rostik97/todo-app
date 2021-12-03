import React, {Component} from "react";

import './ItemStatusFilter.css'

export default class ItemStatusFilter extends Component {

    buttons = [
        {name: 'All', label: 'all'},
        {name: 'Active', label: 'active'},
        {name: 'Done', label: 'done'}
    ]

    render() {
        const {onClick, filter} = this.props;

        let buttons = this.buttons.map(({name, label}) => {
            const classNames = filter === label ? "btn-info" : "btn-outline-secondary"
            return (
                <button type="button"
                        className={`btn ${classNames}`}
                        key={name}
                        onClick={() => onClick(label)}>
                    {name}
                </button>
            );
        })
        return (
            <div className="btn-group" role="group">
                {buttons}
            </div>
        );
    }
}

