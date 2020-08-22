import React, { FunctionComponent } from 'react';

interface dialogProps {
    message: string,
    onOk: () => void,
    onCancel: () => void
}

const Dialog: FunctionComponent<{
    message: string;
    onOk: () => void;
    onCancel: () => void;
}> = (props:dialogProps) => {
    return (
        <div className="dialog">
            <div className="inner-dialog">
                <p>{props.message}</p>
                <p>
                    <button onClick={() => props.onOk()}>Igen</button>
                    <button onClick={() => props.onCancel()}>Mégse</button>
                </p>
            </div>
        </div>
    );
}

export default Dialog;