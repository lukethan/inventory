import Card from './Card'
import Inventory from './Inventory'
import CardTest from './CardTest'
import kegPic from './assets/kegsouth.jpg'
import FetchKeg from './FetchKeg'

function App() {

  const productData = [
    {image: "https://placehold.co/400?text=Placeholder+Image", item: "Coors", amount: 5},
    {image: "https://placehold.co/400?text=Placeholder+Image", item: "Heineken", amount: 1},
    {image: "https://placehold.co/400?text=Placeholder+Image", item: "Budweiser", amount: 10},
    {image: "https://placehold.co/400?text=Placeholder+Image", item: "Corona", amount: 3},
    {image: "https://placehold.co/400?text=Placeholder+Image", item: "Space Dust", amount: 2},

  ];


  return (
    <>
      <FetchKeg />
    </>
  );
}

export default App
