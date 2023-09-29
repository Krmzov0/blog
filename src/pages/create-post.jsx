import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Import your Firestore configuration
import { useAuthState } from 'react-firebase-hooks/auth';

function BlogPostForm() {
    const [user, setuser] = useAuthState(auth);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
  
    const handleCreateBlogPost = async () => {
        try {
          if (!user) {
            throw new Error('User is not signed in.');
          }
    
          // Define the document data
          const documentData = {
            title: title,
            description: description,
            author: {
              uid: user.uid || '', // Provide a default value for uid
              displayName: user.displayName || '', // Provide default values for displayName and email
              email: user.email || '',
              // Add any other user information you want to store
            },
            timestamp: new Date(), // Add a timestamp field
            upvotes: 0, 
            // You can add other fields specific to your blog posts here
            // For example: content, dateCreated, etc.
          };
    
          // Add the document to the "blogPosts" Firestore collection
          const docRef = await addDoc(collection(db, 'blogPosts'), documentData);
    
          console.log('Blog post written with ID: ', docRef.id);
    
          // Clear the form after creating the blog post
          setTitle('');
          setDescription('');
          
        } catch (error) {
          console.error('Error adding blog post: ', error);
        }
      };

  return (
    <div>
      <h2>Create a Blog Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateBlogPost}>Create Blog Post</button>
    </div>
  );
}

export default BlogPostForm;
