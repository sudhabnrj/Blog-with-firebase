import React, { useState, useEffect } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import TinyEditor from '../components/TinyEditor';

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth') === 'true';
    // console.log('check', authStatus);
    if(!authStatus){
      navigate('/login');
    }
    
  }, []);
  

  const handleCreatePost = async () => {
    try{
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        content: postContent,
        author: {
          id: auth?.currentUser?.uid || "anonymous", 
          name: auth?.currentUser?.displayName || "anonymous",
        },
        createdAt: new Date(),
      });
      
      // console.log("Document written with ID: ", docRef.id);
      setTitle('');
      setPostContent('');
      
    }
    catch(error){
      console.log("Error adding document: ", error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className=" text-xl font-bold text-gray-900 dark:text-white mb-8">Add a new Post</h2>
          <div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post title</label>
                      <input value={title} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" onChange={(event)=> setTitle(event.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Content</label>
                      <textarea rows='10' value={postContent} id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"  onChange={(event)=> setPostContent(event.target.value)}></textarea>
                  </div>
              </div>
              <button onClick={handleCreatePost} type="button" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                  Create Post
              </button>
          </div>
      </div>
    </section>
  )
}

export default CreatePost