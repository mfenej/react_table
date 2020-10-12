import React from 'react';
import DropDownItem from '../../DropDownItem/DropDownItem';
const Main = props => {
    const gropby = () => {
        props.resetsizing();
        props.groupBy(props.localSearchIds[props.index])
    }
   return <div style={{ height: '100%', backgroundColor: '#354f69' }}>
        <DropDownItem text='Pin Column' icon='icon-pin-outline' />
        <DropDownItem text='Autosize Column' />
        <DropDownItem text='Autosize All Column' act={props.resetsizing} />
       <DropDownItem text='Group By Column' icon='icon-group_work' act={gropby} />
        <DropDownItem text='Reset Column' icon='icon-refresh' />
    </div>
}
export default Main;