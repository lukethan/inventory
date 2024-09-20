function Inventory(props) {
    return (
        <div className="card">
            <img className="card-image" src={props.image}></img>
            <h2 className="card-title">{props.item}</h2>
            <p className="card-text">Inventory: {props.amount}</p>
        </div>
    );
}

export default Inventory;
