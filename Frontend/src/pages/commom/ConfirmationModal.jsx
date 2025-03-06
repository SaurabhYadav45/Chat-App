import React from 'react'

const ConfirmationModal = ({modalData}) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md">
        <div className="flex flex-col text-gray-100 p-6 rounded-lg shadow-lg bg-gray-900 gap-y-3">
            <p className="text-lg font-semibold">{modalData.text1}</p>
            <p className="text-sm text-gray-400">{modalData.text2}</p>
            <div className="flex justify-between mt-4">
            <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={modalData.btn1Handler} // Close modal
            >
                {modalData.btn1Text}
            </button>
            <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={modalData.btn2Handler} // Function to delete chat
            >
                {modalData.btn2Text}
            </button>
            </div>
        </div>
          </div>
  )
}

export default ConfirmationModal