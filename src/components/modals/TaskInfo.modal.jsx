import { OptionsIcon } from '../Header';
import Dropdown from '../Dropdown';
import CheckBoxGroup from '../Checkbox/CheckboxGroup';
import Checkbox from '../Checkbox';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';


function TaskInfo({ id, statuses, handlerCheck, subtasks, optionClicked, onStatusChange  }) {

    const tasks = useSelector(state => state.tasks.tasks);
    const selectedTask = useMemo(() => tasks.filter(x => x.id == id)[0], [tasks, id]);
    const [showOptions, setShowOptions] = React.useState(false);

    const onClick = (option) => {
        optionClicked(option);
        setShowOptions(false);
    }
    
    return ( 
        <div className="task-info">
            <div className="task-info__title-wrapper">
                <h1 className="task-info__title">{selectedTask.title}</h1>
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
                    {selectedTask.description}
                </p>


                <div className="task-info__subtasks-wrapper">
                    <h1 className="task-info__subtask-label">Subtasks ({selectedTask.completed.length} of {selectedTask.subtasks.length})</h1>

                    <div className="task-info__subtasks">
                        <CheckBoxGroup>
                            {
                                subtasks.map((x, idx) => (
                                    <Checkbox id={x.id} title={x.value} onCheck={() => handlerCheck(idx)}  status={selectedTask.completed.includes(idx)}/>
                                ))
                            }
                        </CheckBoxGroup>
                    </div>
                </div>

                <div className="task-info__status-wrapper">                    
                    <Dropdown label="Current Status" value={selectedTask.status} otherClasses="task-info__status-dropdown" onChange={e => onStatusChange(e.target.value)}>
                        {statuses.map(x => <option value={x.id}>{x.name}</option>)}
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


