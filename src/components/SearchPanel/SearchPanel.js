import React, {Component} from 'react';

export default class SearchPanel extends Component {


    onLabelChange = (event) => {
        event.preventDefault();
        this.props.onFind(event.target.value);
    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   onChange={this.onLabelChange}
                   placeholder="type to search"/>
        )
    }


}

