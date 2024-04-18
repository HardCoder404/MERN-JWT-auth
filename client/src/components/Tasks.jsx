import React, { useState } from 'react';
import SidebarNavbar from './sidebarNavbar';
import { getLocalItems } from './Dashboard'; // Import the getLocalItems function from Dashboard
import { Trash2, SquarePen,Search } from "lucide-react";
import toast from 'react-hot-toast'

const Tasks = () => {
  // Fetch todo items from local storage
  const [items, setItems] = useState(getLocalItems());

  // State variables for editing
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleRemoveAll = () => {
    setShowConfirmation(true);
  };

  const handleConfirmRemoveAll = () => {
    // Logic to remove all items
    setItems([]);
    toast.success("Data cleared!!")
    localStorage.removeItem('Lists');
    // Example: removeAllItems();
    setShowConfirmation(false);
  };

  const handleCancelRemoveAll = () => {
    setShowConfirmation(false);
  };

  // Function to start editing an item
  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  // Function to save edited item
  const saveEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = editValue.trim();
    setItems(updatedItems);
    setEditIndex(-1);
    setEditValue("");

    // Update local storage
    localStorage.setItem('Lists', JSON.stringify(updatedItems));
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setEditIndex(-1);
    setEditValue("");
  };

  // Function to delete an item
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);

    toast.success("Deleted")
     // Update local storage
     localStorage.setItem('Lists', JSON.stringify(updatedItems));
  };

  // Render todo items in table rows
  const renderItems = () => {

    const filteredItems = items.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredItems.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="text-center py-4 text-lg">No result found</td>
        </tr>
      );
    }
    
    return filteredItems.map((item, index) => (
      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-base">
          {index + 1}
        </th>
        <td className="px-20 py-4">
          {editIndex === index ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  saveEdit(index);
                } else if (e.key === 'Escape') {
                  cancelEdit();
                }
              }}
              autoFocus
              className=" focus:outline-none"
            />
          ) : (
            item
          )}
        </td>
        <td className="pr-5 py-4 text-right">
          <div className='flex gap-2 items-center hover:cursor-pointer'>
            <SquarePen
              className='text-gray-500 hover:text-gray-700'
              size={20}
              onClick={() => {
                if (editIndex !== index) {
                  startEdit(index, item);
                }
              }}
            />
            <Trash2
              className='text-red-600 hover:text-red-700'
              size={20}
              onClick={() => setItemToDelete(item)}
            />
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <SidebarNavbar />

      <div className='task flex flex-col justify-center items-center h-screen bg-white'>

<div className='searchR flex relative left-64 gap-3'>

      <div className="pt-2 searchbox relative bottom-2 mx-auto text-gray-600">
        <input className="border-2 border-gray-300 bg-white h-10 px-5 w-72 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <Search className='text-gray-400' size={18}/>
        </button>
      </div>
     
      <button
        type="button"
        className="text-white removeall relative bg-red-700 hover:bg-red-800  focus:outline-none dark:hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center h-10 w-full text-center"
        onClick={handleRemoveAll}
      >
        Remove All
      </button>
</div>


      {/* Confirmation modal */}
      {showConfirmation && (
        <div
          id="popup-modal"
          className="fixed inset-0 flex justify-center items-center z-50 bg-gray-700 bg-opacity-50"
          onClick={() => setShowConfirmation(false)} // Close modal when clicking outside
        >
          <div className="relative pop-up bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M12.121 7.121a.5.5 0 01.707.707L10.707 10l2.121 2.121a.5.5 0 01-.707.707L10 10.707 7.879 12.828a.5.5 0 01-.707-.707L9.293 10 7.172 7.879a.5.5 0 01.707-.707L10 9.293l2.121-2.122z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to remove all items?
              </h3>
              <button
                type="button"
                onClick={handleConfirmRemoveAll}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleCancelRemoveAll}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}


        {/* Render todo items in a table */}
        <div className="tablepart overflow-y-auto max-h-[70vh] table-container w-full sm:w-1/2 ml-40 shadow-md sm:rounded-lg">
          <table className="w-full sticky-header text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm tablehead text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="trow px-6 py-3">
                  ID
                </th>
                <th scope="col" className="trow pl-20 pr-96 py-3">
                  Tasks
                </th>
                <th scope="col" className="trow pr-5 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {items.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-lg ">Nothing to display</td>
                </tr>
              ) : (
                renderItems()
              )}
            </tbody>
          </table>
        </div>

        {itemToDelete && (
        <div
          id="popup-modal"
          className="fixed inset-0 flex justify-center items-center z-50 bg-gray-700 bg-opacity-50"
          onClick={() => setItemToDelete(null)} // Close modal when clicking outside
        >
          <div className="relative pop-up bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M12.121 7.121a.5.5 0 01.707.707L10.707 10l2.121 2.121a.5.5 0 01-.707.707L10 10.707 7.879 12.828a.5.5 0 01-.707-.707L9.293 10 7.172 7.879a.5.5 0 01.707-.707L10 9.293l2.121-2.122z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this item?
              </h3>
              <button
                type="button"
                onClick={() => deleteItem(itemToDelete.id)}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => setItemToDelete(null)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
      </div>
  );
};

export default Tasks;
