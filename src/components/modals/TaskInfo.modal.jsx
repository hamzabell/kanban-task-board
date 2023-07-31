import { OptionsIcon } from '../Header';
import Dropdown from '../Dropdown';
import CheckBoxGroup from '../Checkbox/CheckboxGroup';
import Checkbox from '../Checkbox';
import PropTypes from 'prop-types';
import React from 'react';


function TaskInfo({ title, description, completed, total, currentStatus, statuses, handlerCheck, subtasks, optionClicked, onStatusChange  }) {

    const [showOptions, setShowOptions] = React.useState(false);

    const onClick = (option) => {
        optionClicked(option);
        setShowOptions(false);
    }
    
    return ( 
        <div className="task-info">
            <div className="task-info__title-wrapper">
                <h1 className="task-info__title">{title}</h1>
                <OptionsIcon  className="task-info__title-icon" onClick={() => setShowOptions(prev=> !prev)} />

                {
                    showOptions && (
                        <div className="task-info__options-dropdown">
                            <a className="task-info__option" onClick={() => onClick('edit')}>Edit Task</a>
                            <a className="task-info__option task-info__option--is-destructive" onClick={() => onClick('delete')}>Delete Task</a>
                        </div>
                    )
                }


            </div>


            <div className="task-info__body">
                <p className="task-info__description">
                    {description}
                </p>


                <div className="task-info__subtasks-wrapper">
                    <h1 className="task-info__subtask-label">Subtasks ({completed} of {total})</h1>

                    <div className="task-info__subtasks">
                        <CheckBoxGroup>
                            {
                                subtasks.map(x => (
                                    <Checkbox id={x.id} title={x.title} onCheck={handlerCheck}  status={x.status}/>
                                ))
                            }
                        </CheckBoxGroup>
                    </div>
                </div>

                <div className="task-info__status-wrapper">                    
                    <Dropdown label="Current Status" value={currentStatus} otherClasses="task-info__status-dropdown" onChange={e => onStatusChange(e.target.value)}>
                        {statuses.map(x => <option value={x}>{x}</option>)}
                    </Dropdown>
                </div>
            </div>
        </div>
     );
}

TaskInfo.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    statuses: PropTypes.arrayOf(PropTypes.string),
    handlerCheck: PropTypes.func.isRequired,
    subtasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        status: PropTypes.bool
    })).isRequired
}

export default TaskInfo;


