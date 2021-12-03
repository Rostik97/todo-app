import AppHeader from "../AppHeader/AppHeader";
import SearchPannel from "../SearchPanel/SearchPanel";
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";
import TodoList from "../TodoList/TodoList";
import './App.css'
import {Component} from "react";
import ItemAddForm from "../ItemAddForm/ItemAddForm";

export default class App extends Component {

    maxId = 100;
    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
            this.createTodoItem('Visit the fridge')
        ],
        filteredData: [],
        filterValue: 'all'
    }


    updateFilteredData() {
        this.setState(({filterValue}) => {
            const filteredArray = this.filter(filterValue)
            return {
                filteredData: filteredArray
            }
        })
    }

    componentDidMount() {
        this.updateFilteredData()
    }

    componentDidUpdate(prevProps, state) {
        if (state.todoData !== this.state.todoData) {
            console.log("Call component did update")
            this.updateFilteredData()
        }
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArray
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProps(todoData, id, 'important')
                    .sort((a, b) => b.important - a.important)
            }
        });
    }

    toggleProps(arr, id, propName) {
        const index = arr.findIndex((el) => el.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProps(todoData, id, 'done')
                    .sort((a, b) => a.done - b.done)
            }
        });
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1)
            ];

            return {
                todoData: newArray
            }
        })
    };

    createTodoItem(label) {
        console.log("Create item")
        return {
            label,
            important: false,
            id: this.maxId++,
            done: false
        }
    }

    filter = (items) => {
        const {todoData} = this.state;
        switch (items) {
            case 'all':
                console.log('Filter by', items)
                return todoData;
            case 'active':
                console.log('Filter by', items)
                return todoData.filter(el => !el.done)
            case 'done':
                console.log('Filter by', items)
                return todoData.filter(el => el.done)
            default:
                return todoData;
        }
    }

    filterItems = (items) => {
        console.log("Start filtering array", items)
        const array = this.filter(items);
        if (array !== this.state.filteredData) {
            this.setState(() => {
                return {
                    filteredData: array,
                    filterValue: items
                }
            })
        }
    }

    findItem = (text) => {
        this.setState(({todoData}) => {
            const newArray = todoData.filter((el) => el.label.toLowerCase().includes(text.toLowerCase()))
            return {
                filteredData: newArray
            }
        })
    }

    render() {
        const {todoData, filteredData, filterValue} = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todoApp">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="topPanel d-flex">
                    <SearchPannel onFind={this.findItem}/>
                    <ItemStatusFilter onClick={this.filterItems} filter={filterValue}/>
                </div>
                <TodoList
                    todos={filteredData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm
                    onAddItem={this.addItem}
                />
            </div>
        );
    }

}