import React from 'react'

function AddComment() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
         <form className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
        </div>
        <button type="submit" 
        className='w-full px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
           >
            Post comment
        </button>
    </form>
    </div>
  )
}

export default AddComment