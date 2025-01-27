import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-indigo-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
          <div className='bg-indigo-600 p-4 rounded-xl shadow-lg'>
            <h1 className='text-4xl font-bold text-white'>
              📚 Book Inventory
            </h1>
          </div>
          
          <div className='flex items-center gap-4'>
            <div className='flex bg-indigo-100 p-1 rounded-lg border border-indigo-200'>
              <button
                className={`px-4 py-2 rounded-md transition-all ${
                  showType === 'table' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-indigo-700 hover:bg-indigo-50'
                }`}
                onClick={() => setShowType('table')}
              >
                Table View
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-all ${
                  showType === 'card' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-indigo-700 hover:bg-indigo-50'
                }`}
                onClick={() => setShowType('card')}
              >
                Grid View
              </button>
            </div>

            <Link
              to='/books/create'
              className='flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg'
            >
              <MdOutlineAddBox className='text-xl' />
              <span className='hidden md:inline'>Add New Book</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className='flex justify-center items-center min-h-[400px] bg-white rounded-xl shadow-sm'>
            <Spinner />
          </div>
        ) : (
          <>
            {books.length > 0 ? (
              showType === 'table' ? (
                <BooksTable books={books} />
              ) : (
                <BooksCard books={books} />
              )
            ) : (
              <div className='text-center py-12 bg-white rounded-xl shadow-sm border-2 border-dashed border-indigo-200'>
                <p className='text-indigo-500 text-lg font-medium'>
                  No books found. Let's add your first book! 📖
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;