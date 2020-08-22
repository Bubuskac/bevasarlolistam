import React, { Component, FormEvent, createRef } from 'react';
import Dialog from './Dialog';
import ItemList from './ItemList';

interface MainViewState {
    showDialog: boolean,
    list: Array<string>,
    newElement: string,
    message: string
}

interface MainViewProps {
    token:string
}

let me:MainView;

class MainView extends Component<MainViewProps, MainViewState> {
    token:string = '';
    list = createRef<ItemList>();

    constructor(props:MainViewProps) {
        super(props);
        this.token = props.token;
        this.state = {
            showDialog: false,
            list: [],
            newElement: '',
            message: ''
        }
        me = this;
    }
    
    empty() {
        this.setState({showDialog: true});
    }

    cancel() {
        me.setState({showDialog: false});
    }

    removeList() {
        me.setState({
            showDialog: false,
            list: []
        });
        const list = me.list.current;
        if (list) {
            list.setState({list: []});
        }
    }

    async addElement() {
        let response = await fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                method: 'add',
                newElement: this.state.newElement,
                token: this.token
            })
        });
        let data = await response.json();
        if (data.success) {
            this.setState({
                newElement: '',
                list: this.state.list.concat([this.state.newElement])
            });
            const list = this.list.current;
            if (list) {
                list.setState({list: this.state.list});
            }
        } else {
            this.setState({message: data.message});
        }
    }
    
    render() {
        return (
            <div className="main-view">
                {this.state.message !== '' && <p>{this.state.message}</p>}
                <p>
                    <input placeholder="Vennem kell még" 
                        value={this.state.newElement}
                        onChange={(e: FormEvent<HTMLInputElement>) => 
                            {this.setState({newElement: e.currentTarget.value})}}/>&nbsp;
                    <button onClick={() => this.addElement()}>+</button>
                </p>
                <p>
                    <button className="list-emptier"
                        onClick={() => {this.empty()}}>
                        lista ürítése
                    </button>
                </p>
                {this.state.showDialog && 
                    <Dialog message="Valóban törölni akarod az összes elemet?" 
                        onOk={this.removeList}
                        onCancel={this.cancel}/>}
                <ItemList list={this.state.list} ref={this.list}/>
            </div>
        );
    }
  }
  
  export default MainView;