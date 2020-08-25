import React, { FunctionComponent } from 'react';
import MainView from '../MainView';

interface dialogProps {
    message: string,
    onOk: () => void,
    onCancel: () => void,
    parent: MainView
}

const Dialog: FunctionComponent<{
    message: string;
    onOk: () => void;
    onCancel: () => void;
    parent: MainView;
}> = (props:dialogProps) => {
    return (
        <div className="dialog">
            <div className="inner-dialog">
                <p>{props.message}</p>
                <p>
                    <button onClick={() => props.onOk.call(props.parent)}>Igen</button>
                    <button onClick={() => props.onCancel.call(props.parent)}>Mégse</button>
                </p>
            </div>
        </div>
    );
}

export default Dialog;