import React from 'react';

const detailsDescriptionInput = props => {
    let toReturn = null
    if (props.type === 'text') {
        toReturn = (
            <div className={props.divClasses}>
                <h4 className={props.hClasses}>
                    {props.text}
                </h4>
                <input {...props.input} value={props.value} id={props.id} type="text" className={props.inputClasses} readOnly={props.read} onChange={props.onChange} />
            </div>);
    } else if (props.type === 'select') {
        toReturn = (<div className={props.divClasses}>
            <h4 className={props.hClasses}>
                {props.text}
            </h4>
            <select value={props.value} id={props.id} name="type" className={props.inputClasses} disabled>
                <option value="Aireport IATA Code">Aireport IATA Code</option>
                <option value="Aireport 1">Aireport 1</option>
                <option value="Aireport 2">Aireport 2</option>
                <option value="Aireport 3">Aireport 3</option>
                <option value="Aireport 4">Aireport 4</option>
                <option value="Aireport 5">Aireport 5</option>
            </select>
        </div>);
    }
    return (
        <React.Fragment>
            {toReturn}
        </React.Fragment>

    );
}
export default detailsDescriptionInput;
