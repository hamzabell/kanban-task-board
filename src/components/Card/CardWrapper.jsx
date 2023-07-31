function CardWrapper({ title, children }) {
    return (
        <div className="card-wrapper">
            <div className="card-wrapper__title">{title}</div>
            <div className="card-wrapper__body">
                {children}
            </div>

        </div>
    );
}

export default CardWrapper;


export const CardTitle = ({ color, title, count }) => {
    return (
        <div className="card-title">
            <div className="card-title__color" style={{ 'backgroundColor': color}} />

            <h1 className="card-title__text">
                {title} ({count})
            </h1>
        </div>
    )
}