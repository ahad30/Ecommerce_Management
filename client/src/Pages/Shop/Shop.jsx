import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hook/Hook';
import { setIsHomeCategorySidebarOpen } from '../../redux/Modal/ModalSlice';
import { MdClose } from 'react-icons/md';
import HomeLeftSidebar from './LeftSidebar/LeftSidebar';
import { CiFilter } from 'react-icons/ci';

const Shop = () => {
    const dispatch = useAppDispatch();
    const { isHomeCategorySidebarOpen } = useAppSelector(
      (state) => state.modal
    );
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5'>
       <div className="lg:hidden text-black mb-2 flex justify-center">
          <button
            onClick={() => dispatch(setIsHomeCategorySidebarOpen())}
            className="text-2xl py-1 transition duration-500 ease-in-out transform hover:scale-70"
            title={isHomeCategorySidebarOpen ? 'Close Menu' : 'Open Menu'}
         >
            <span className="cursor-pointer">
              {isHomeCategorySidebarOpen ? (
                <div className='bg-black px-7 text-white rounded-full py-1'>
                <MdClose className="inline-block w-6 h-6" />
                <span className="text-base">Filters & Sort</span>
                </div>
              ) : (
               <div className='bg-black px-7 text-white rounded-full py-1'>
                <CiFilter className="inline-block w-6 h-6" />
                <span className="text-base">Filters & Sort</span>
               </div>
              )}
            </span>
          </button>
        </div>
      <div className='flex justify-between items-center'>
        <HomeLeftSidebar />
      </div>
    </section>
  )
}

export default Shop