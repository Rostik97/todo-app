import React, {Component} from 'react';

import './TodoListItem.css';

export default class TodoListItem extends Component {

    render() {
        const {
            label, onDeleted,
            onToggleDone, onToggleImportant,
            important, done
        } = this.props;

        const style = {
            color: important ? 'steelblue' : 'black',
            fontWeight: important ? 'bold' : 'normal'
        };

        let classNames = 'TodoListItem'

        if (done) {
            classNames += ' done'
        }
        if (important) {
            classNames += ' important'
        }

        return (
            <span className={classNames}>
                <span className="TodoListItemLabel"
                      style={style}
                      onClick={onToggleDone}>
                    {label}
                </span>
                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={onDeleted}>
                <i className="fa fa-trash-o"/>
              </button>
                <button type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={onToggleDone}>
                  <i className="fa fa-check"/>
              </button>
              <button type="button"
                      className="btn btn-sm btn-outline-warning float-right"
                      onClick={onToggleImportant}>
                  <i className="fa fa-exclamation"/>
              </button>
            </span>
        );
    }
};
