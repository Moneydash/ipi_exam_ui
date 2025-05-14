import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequest, postRequest, putRequest } from "../store/actions";
import axios from "axios";

interface InventoryItem {
  id: number,
  name: string,
  type: string,
  price: number,
  stock: number
};

const emptyItem: InventoryItem = {
  id: 0,
  name: '',
  type: '',
  price: 0,
  stock: 0
};

const FruitInventory = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [currentItem, setCurrentItem] = useState<InventoryItem>(emptyItem);
  const [isEditing, setIsEditing] = useState(false);
  const loading = useSelector((state: { crud: { loading: boolean } }) => state.crud.loading);

  const API_URL = 'http://localhost:5182/api/fruit';

  const fetchItems = async() => {
    axios.get(API_URL)
    .then(res => {
      setItems(res?.data);
    }).catch(error => { console.error('Error: ', error); });
  };

  useEffect(() => {
    fetchItems();
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    const payload = {
      name: currentItem.name,
      type: currentItem.type,
      price: currentItem.price,
      stock: currentItem.stock
    };
    if (isEditing) {
      dispatch(putRequest(`${API_URL}/${currentItem.id}`, payload));
    } else {
      dispatch(postRequest(API_URL, payload));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCurrentItem({
      ...currentItem,
      [name]: name === 'price' || name === 'stock' ? Number.isNaN(parseFloat(value)) ? 0 : parseFloat(value) : value
    });
  };

  const editItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsEditing(true);
  }

  return (
    <>
      <h3>Fruit Inventory Management</h3>
      <label>Name</label>
      <input name="name" type="text" value={currentItem.name} onChange={handleChange} />
      <br />
      <label>Type</label>
      <input name="type" type="text" value={currentItem.type} onChange={handleChange} />
      <br />
      
      <label>Price</label>
      <input name="price" type="number" value={currentItem.price} onChange={handleChange} />
      
      <br />
      <label>Stock</label>
      <input name="stock" type="number" value={currentItem.stock} onChange={handleChange} />
      <br />

      <button onClick={handleSubmit}>Submit</button>

      <table style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td rowSpan={4}>Loading Inventory...</td>
            </tr>
          ) : (
            items?.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.stock}</td>
                <td><button onClick={() => editItem(item)}>Edit</button><button>Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default FruitInventory;