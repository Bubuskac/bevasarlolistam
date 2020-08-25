import React, { Component, FormEvent, createRef } from 'react';
import Dialog from './mainview/Dialog';
import ItemList from './mainview/ItemList';

interface MainViewState {
    showDialog: boolean,
    list: Array<string>,
    newElement: string,
    message: string
}

interface MainViewProps {
    token:string
}

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
    }

    componentDidMount() {
        this.loadList();
    }

    async send(data:object) {
        let response = await fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async loadList() {
        let data = await this.send({
            method: 'load',
            token: this.token
        }); 
        if (data.success) {
            this.setState({
                list: data.list,
                message: ''
            });
            const list = this.list.current;
            if (list) {
                list.setState({list: data.list});
            }
        } else {
            this.setState({message: data.message});
        }
    }
    
    empty() {
        this.setState({showDialog: true});
    }

    cancel() {
        this.setState({showDialog: false});
    }

    async removeList() {
        let data = await this.send({
            method: 'emptyList',
            token: this.token
        });
        if (data.success) {
            this.setState({
                showDialog: false,
                list: [],
                message: ''
            });
            const list = this.list.current;
            if (list) {
                list.setState({list: []});
            }
        } else {
            this.setState({message: data.message});
        }
    }

    async addElement() {
        if (this.state.newElement === '') {
            return;
        }
        if (this.state.list.includes(this.state.newElement)) {
            this.setState({
                message: `"${this.state.newElement}" már a listában van`
            });
            return;
        }
        let data = await this.send({
            method: 'add',
            newElement: this.state.newElement,
            token: this.token
        });
        if (data.success) {
            this.setState({
                newElement: '',
                list: this.state.list.concat([this.state.newElement]),
                message: ''
            });
            const list = this.list.current;
            if (list) {
                list.setState({list: this.state.list});
            }
        } else {
            this.setState({message: data.message});
        }
    }

    async deleteElement(item:string) {
        let data = await this.send({
            method: 'delete',
            deleteElement: item,
            token: this.token
        });
        if (data.success) {
            this.setState({
                list: this.state.list.filter((listElement:string) => listElement !== item),
                message: ''
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
                        onCancel={this.cancel}
                        parent={this}/>}
                <ItemList list={this.state.list} ref={this.list} interface={this.deleteElement} parent={this}/>
            </div>
        );
    }
  }
  
  export default MainView;