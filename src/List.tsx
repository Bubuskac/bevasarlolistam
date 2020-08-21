import React, { Component } from 'react';
import Dialog from './Dialog';

interface listState {
    showDialog: boolean
}

interface listProps {
}

let me:List;

class List extends Component<listProps, listState> {
    
    constructor(props:any) {
        super(props);
        this.state = {
            showDialog: false
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
        me.setState({showDialog: false});
    }
    
    render() {
        return (
            <div className="list">
                <p>
                    <input placeholder="Vennem kell még"/> <button>+</button>
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
            </div>
        );
    }
  }
  
  export default List;