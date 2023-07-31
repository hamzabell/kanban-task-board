function Card({ title, completed, total, ...other }) {
    return (  
        <div className="task-card" {...other}>
            <h1 className="task-card__title">{title}</h1>
            <p className="task-card__subtitle">{completed} of {total} subtasks</p>
        </div>
    );
}

export default Card;