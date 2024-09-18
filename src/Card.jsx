import profilePic from './assets/kegsouth.jpg'

function Card() {

    return (
        <div className="card">
            <img className="card-image" src={profilePic} alt="Keg South"></img>
            <h2 className="card-title">Product Name</h2>
            <p className="card-text">Inventory Amount: 10 </p>
        </div>

    );

}

export default Card