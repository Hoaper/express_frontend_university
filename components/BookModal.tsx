import React from 'react';

function BookModal({text, onClose, processOrder}: {text: string, processOrder: () => void, onClose: () => void}) {
    return (
        <div id="authentication-modal"
             className="overflow-y-auto overflow-x-hidden bg-gray-600/50 flex align-center fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-[#76603d] rounded-lg shadow">
                    <button
                        onClick={onClose}
                        type="button"
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-white">
                            {text}
                        </h3>
                        <div className={"flex justify-between"}>
                            <button
                                onClick={processOrder}
                                data-modal-hide="popup-modal" type="button"
                                className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-2 py-2.5 text-center me-2">
                                Вы уверены, что хотите её взять?
                            </button>
                            <button onClick={onClose} data-modal-hide="popup-modal" type="button"
                                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-500 rounded-lg border border-red-600 text-sm font-medium px-2 py-2.5 focus:z-10">
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookModal;