import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../firebase';
import Modal from '../components/Modal';

const Post = ({isAuth}) => {

    const { postId } = useParams();
    const [post, setPost] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(()=> {
        const fetchPost = async () => {
            try{
                const postDoc = await getDoc(doc(db, "posts", postId));
                if(postDoc.exists()){
                    console.log('Details:', postDoc.data());
                    setPost(postDoc.data());
                }
                else {
                    console.log("No such document!");
                }
                
            }
            catch(err){
                console.error('Error fetching post:', err);
            }
        };

        fetchPost();

    },[postId])

    if(!post){
        return <p>Loading post...</p>
    }

    const updatePostHandler = async () => {
        try{
            const updateDocRef = doc(db, "posts", postId);
            await updateDoc(updateDocRef, {
            ...post,
            title: title,
            content: postContent,
            updateAt: new Date(),
            });
            alert('Post updated successfully!');
            setPost((prev)=> ({...prev, title, content: postContent}));
        }
        catch (err) {
            console.error('Error updating post:', err);
            alert('Failed to update post. Please try again.');
        }
    }

    return (
        <>
            <div className='w-[50%] mx-auto my-10 p-5 bg-gray-100'>
                <div className='container mx-auto'>
                    <div className='flex flex-col'>
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white pr-3">{post?.title}</h1>
                        <p className='flex justify-start items-center my-2 text-sm text-gray-500'>
                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/><path d="M32,32.86a9.22,9.22,0,1,1,9.21-9.22A9.23,9.23,0,0,1,32,32.86Zm0-15.43a6.22,6.22,0,1,0,6.21,6.21A6.21,6.21,0,0,0,32,17.43Z"/><path d="M32,56.64a24.68,24.68,0,0,1-15.22-5.27,1.52,1.52,0,0,1-.57-1.06c0-.16,0-.31,0-.47a15.8,15.8,0,1,1,31.6,0c0,.16,0,.31,0,.47a1.52,1.52,0,0,1-.57,1.06A24.68,24.68,0,0,1,32,56.64ZM19.21,49.45a21.62,21.62,0,0,0,25.58,0,12.8,12.8,0,0,0-25.58,0Zm27.08.74h0Z"/><path d="M32,56.64a24.65,24.65,0,1,1,15.22-5.27A24.68,24.68,0,0,1,32,56.64Zm0-46.28A21.63,21.63,0,0,0,18.64,49a21.64,21.64,0,0,0,35-17A21.67,21.67,0,0,0,32,10.36Z"/></svg>
                            <span className='ml-2'>{post?.author?.name}</span>
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {post?.content}
                        </p>
                        {isAuth && post?.author?.id === auth?.currentUser?.uid &&
                            <div className='flex justify-center items-center'>
                                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-modal-target="default-modal" data-modal-toggle="default-modal" onClick={() => {
                                     setTitle(post?.title);
                                     setPostContent(post?.content);
                                     setIsModalOpen(true);
                                }}>Update Post</button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    setPostTitle={(event)=> setTitle(event.target.value)}
                    setPostContent={(event)=> setPostContent(event.target.value)}
                    postContentValue={postContent}
                    postTitleValue={title}
                    modalTitle = 'Update Post'
                    postTitle={post?.title}
                    modalId = 'default-modal'
                    className = {`${setIsModalOpen ? 'flex' : 'hidden'}`}
                    closeModalDialog = {() => setIsModalOpen(false)}
                    updatePost={updatePostHandler}
                />
            )}
        </>
    )
}

export default Post