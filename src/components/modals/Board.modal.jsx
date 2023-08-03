import { useForm, useFieldArray } from "react-hook-form";
import TextField from "../TextField";
import Button from "../button";

export const DeleteIcon = ({ ...other }) => (
    <svg {...other} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12.728" width="3" height="18" transform="rotate(45 12.728 0)" fill="#828FA3"/>
        <rect y="2.12109" width="3" height="18" transform="rotate(-45 0 2.12109)" fill="#828FA3"/>
    </svg>

)

function Board({ onSubmit, defaultValues }) {
    const { register, control, handleSubmit, formState: {  errors } } = useForm({
        defaultValues
    });
    const { fields, remove, append } = useFieldArray({ control, name: 'columns' });

    
    return (  
        <form onSubmit={handleSubmit(onSubmit)} className="task-action">
            <h1 className="task-action__title">{ defaultValues ? 'Edit' : 'Add New' } Board</h1>

            <TextField label="Board Name" error={errors.name} {...register('name')} />

            <h6 className="task-action__subtitle">Board Columns</h6>

            <div className="task-action__columns">
                {
                    fields.map((item, index) => (
                        <div className="task-action__field-group" key={item.id}>
                            <input type="text" className="task-action__field-entry" {...register(`columns.${index}.name`)} />
                            <DeleteIcon className="task-action__remove-entry"  onClick={() => remove(index)}/>
                        </div>
                    ))
                }
                

                <div className="task-action__buttons">
                    <Button type="button" secondary onClick={() => append({  name: "" })}> + Add New Column</Button>

                    <Button type="submit" primary>{ defaultValues ? 'Save Changes' : 'Create New Board' }</Button>
                </div>
            </div>
        </form>
    );
}

export default Board;