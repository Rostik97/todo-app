import React, {Component} from 'react';
import './ItemAddForm.css'

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAddItem(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form className="ItemAddForm d-flex"
                onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control search-input"
                       placeholder="type to add"
                       onChange={this.onLabelChange}
                       value={this.state.label}/>
                <button
                    className="btn btn-outline-secondary">
                    Add item
                </button>
            </form>
        )
    }
};