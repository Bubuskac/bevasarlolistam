import React, { Component } from 'react';
import MainView from '../MainView';

interface ItemListState {
    list: Array<string>
}

interface ItemListProps {
    list: Array<string>,
    interface: (item:string) => Promise<void>,
    parent: MainView;
}

class ItemList extends Component<ItemListProps, ItemListState> {
    interface: (item:string) => Promise<void>;
    parent: MainView;
    
    constructor(props:ItemListProps) {
        super(props);
        this.state = {
            list: props.list
        }
        this.interface = props.interface;
        this.parent = props.parent;
    }

    render() {
        return (
            <div className="list">
                {this.state.list.map((item:string) => {
                    return (<p key={item}>
                        {item} <button onClick={() => this.interface.call(this.parent, item)}>X</button>
                    </p>);
                })}
            </div>
        );
    }
}

export default ItemList;