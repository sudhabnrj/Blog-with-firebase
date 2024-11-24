import React, {useState, useEffect} from 'react'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';
import DeleteIcon from '../components/DeleteIcon';
import { Link } from 'react-router-dom';

const Home = ({isAuth}) => {

  const [postList, setPostList] = useState([]);

  useEffect(()=> {

    const getPost = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setPostList(querySnapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data()
      })))
    };

    getPost();

  }, []);

  const handleDeletePost = async(id) => {
    try{
      await deleteDoc(doc(db, "posts", id));
      setPostList((prevList)=> prevList.filter((post)=> post.id !== id));     
      console.log('Post deleted successfully');
    }
    catch(error){
      console.log("Error deleting document: ", error);
    }
  }

  // console.log(auth?.currentUser);
  // console.log(auth?.currentUser?.uid);

  console.log(postList);
  
  
  

  return (
    <div className='w-full'>
      <div className='container mx-auto'>
        <div className='flex justify-center items-stretch my-10 flex-wrap gap-8'>
          {postList && postList.map((post)=> (
            <div key={post.id} className="max-w-sm w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link to={`/post/${post.id}`} className='flex justify-between items-center'>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white pr-3">
                    {post?.title}
                  </h5>
                  {isAuth && post?.author?.id === auth?.currentUser?.uid &&
                    <button onClick={()=> handleDeletePost(post.id)}><DeleteIcon/></button>
                  }
              </Link>
              <p className='flex justify-start items-center my-2 text-sm text-gray-500'>
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/><path d="M32,32.86a9.22,9.22,0,1,1,9.21-9.22A9.23,9.23,0,0,1,32,32.86Zm0-15.43a6.22,6.22,0,1,0,6.21,6.21A6.21,6.21,0,0,0,32,17.43Z"/><path d="M32,56.64a24.68,24.68,0,0,1-15.22-5.27,1.52,1.52,0,0,1-.57-1.06c0-.16,0-.31,0-.47a15.8,15.8,0,1,1,31.6,0c0,.16,0,.31,0,.47a1.52,1.52,0,0,1-.57,1.06A24.68,24.68,0,0,1,32,56.64ZM19.21,49.45a21.62,21.62,0,0,0,25.58,0,12.8,12.8,0,0,0-25.58,0Zm27.08.74h0Z"/><path d="M32,56.64a24.65,24.65,0,1,1,15.22-5.27A24.68,24.68,0,0,1,32,56.64Zm0-46.28A21.63,21.63,0,0,0,18.64,49a21.64,21.64,0,0,0,35-17A21.67,21.67,0,0,0,32,10.36Z"/></svg>
                <span className='ml-2'>{post?.author?.name}</span>
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {post?.content.substring(0, 100) + "..."}
              </p>
              <Link to={`/post/${post.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </Link>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home