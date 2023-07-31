import { useForm, useFieldArray } from 'react-hook-form';
import { DeleteIcon } from './Board.modal';
import TextField from '../TextField';
import Dropdown from '../Dropdown';
import Button from '../button';


function Task({ onSubmit, defaultValues, statusOptions }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues
    });
    const { fields, remove, append } = useFieldArray({ control, name: 'subtasks' });
    console.log(statusOptions);

    return ( 
        <form className="board-action" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="board-action__title">{ defaultValues ? 'Edit' : 'Add New' } Task</h1>


            <TextField label="Title" error={errors.title} {...register('title')} />
            
            <label htmlFor="description" className='board-action__description-label'>
                Description
                <textarea id="description" className='board-action__description' {...register('description')}></textarea>
            </label>

            <h6 className="board-action__subtitle">Subtasks</h6>

            <div className="board-action__columns">
                {
                    fields.map((item, index) => (
                        <div className="board-action__field-group" key={item.id}>
                            <input type="text" className="task-action__field-entry" {...register(`subtasks.${index}.value`)} />
                            <DeleteIcon className="task-action__remove-entry"  onClick={() => remove(index)}/>
                        </div>
                    ))
                }

                <Button type="button" otherClasses="board-action__button" secondary onClick={() => append("")}> + Add New Subtask</Button>
            </div>

            <Dropdown defaultMessage="Select Task Status" label="Status" otherClasses="board-action__status-dropdown" {...register('status')}>
                {statusOptions.map(x => <option value={x}>{x}</option>)}
            </Dropdown>


            <Button type="submit" otherClasses="board-action__button--submit" primary>{ defaultValues ? 'Save Changes' : 'Create Task' }</Button>
            
        </form>
     );
}

export default Task;