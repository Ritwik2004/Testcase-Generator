
import React, { useEffect, useState } from 'react'
import { API, getHistory } from '../../context/api.js';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

const HistoryComponent = ({ owner }) => {
  const [history, setHistory] = useState([]);
  const [expandedItems, setExpandedItems] = useState({}); 

  const History = async (username)=>{
    try {
      const data = await getHistory(username);
      if(data != undefined){
        setHistory(data)
      }
      else{
        setHistory([])
      }
    } catch (error) {
      toast.error("Error occured while history")
    }
  }

  useEffect(() => {
    History(owner);
  }, [owner]);

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id] 
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">History</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li key={item._id} className="p-2 bg-gray-100 rounded">
            <div className='flex flex-col justify-between'>
              <div className='text-xl font-bold text-gray-800'>
                {item.fileName}
              </div>
              <button
                className='text-sm text-blue-700 underline mt-1 w-fit cursor-pointer hover:text-blue-900'
                onClick={() => toggleItem(item._id)}
              >
                {expandedItems[item._id] ? 'Hide Test Cases' : 'Show Test Cases'}
              </button>

              {expandedItems[item._id] && (
                <div className='text-lg py-1 max-h-40 w-full overflow-auto'>
                  <Markdown>
                    {item.response}
                  </Markdown>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryComponent;
