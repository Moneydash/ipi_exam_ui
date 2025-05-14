import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest, getRequest, postRequest, putRequest } from "../store/actions";
import type { InventoryItem } from "../interfaces/interface.inventory";

const emptyItem: InventoryItem = {
  id: 0,
  name: '',
  type: '',
  price: 0,
  stock: 0
};

const FruitInventory = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: { crud: { data: InventoryItem[] } }) => state.crud.data);
  const [currentItem, setCurrentItem] = useState<InventoryItem>(emptyItem);
  const [isEditing, setIsEditing] = useState(false);
  const loading = useSelector((state : { crud: { loading: boolean } }) => state.crud.loading);

  const API_URL = 'http://localhost:5182/api/fruit';

  const fetchItems = async () => {
    dispatch(getRequest(API_URL));
  };

  useEffect(() => {
    fetchItems();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      name: currentItem.name,
      type: currentItem.type,
      price: currentItem.price,
      stock: currentItem.stock
    };
    
    try {
      if (isEditing) {
        await dispatch(putRequest(`${API_URL}/${currentItem.id}`, payload)); // Await the dispatch
      } else {
        await dispatch(postRequest(API_URL, payload)); // Await the dispatch
      }
      
      // Reset form after submission
      setCurrentItem(emptyItem);
      setIsEditing(false);
      
      // Fetch items after the update/add operation
      fetchItems();
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  };

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
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteRequest(`${API_URL}/${id}`));
      fetchItems();
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  const resetForm = () => {
    setCurrentItem(emptyItem);
    setIsEditing(false);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Fruit Inventory Management
        </h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={currentItem.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <input
                  name="type"
                  type="text"
                  value={currentItem.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={currentItem.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={currentItem.stock}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Clear Form
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isEditing ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={fetchItems}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Reload Inventory
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      <div className="flex justify-center items-center">
                        Loading Inventory...
                      </div>
                    </td>
                  </tr>
                ) : items?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No items found. Add your first item!
                    </td>
                  </tr>
                ) : (
                  items.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => editItem(item)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default FruitInventory;