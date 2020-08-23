import React, { Component } from 'react';

interface ItemListState {
    list: Array<string>
}

interface ItemListProps {
    list: Array<string>
}

class ItemList extends Component<ItemListProps, ItemListState> {
    
    constructor(props:ItemListProps) {
        super(props);
        this.state = {
            list: props.list
        }
    }

    render() {
        return (
            <div className="list">
                {this.state.list.map((item:string) => {
                    return (<p key={item}>{item}</p>)
                })}
            </div>
        );
    }
}

export default ItemList;