import React from 'react'

const Modal = ({
        modalId, 
        className, 
        closeModalDialog, 
        modalTitle, 
        postTitle,
        postTitleValue,
        setPostTitle,
        postContentValue,
        setPostContent,
        updatePost
    }) => {
  return (

    <div id={modalId} tabIndex="-1" aria-hidden="true" className={` ${className} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full`}>
        <div class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-1"></div>
        <div className="relative p-4 w-full max-w-2xl max-h-full h-[calc(100%-1rem)] z-20">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {modalTitle}
                    </h3>
                    <button onClick={closeModalDialog} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white pr-3">
                        {postTitle}
                    </h5>
                    <div className="sm:col-span-2">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post title</label>
                      <input value={postTitleValue} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" onChange={setPostTitle} />
                  </div>
                  <div className="sm:col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Content</label>
                      <textarea rows='10' value={postContentValue} id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"  onChange={setPostContent}></textarea>
                  </div>
                </div>

                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={updatePost} data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update post</button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Modal