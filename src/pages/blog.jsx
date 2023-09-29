    import Header from '@/components/Header'
    import { AddSquare, ArrowLeft } from 'iconsax-react'
    import { useRouter } from 'next/router'
    import { useEffect, useState } from 'react';
    import { db } from '../firebase'; // Import your Firebase configuration
    import { collection, getDocs } from 'firebase/firestore';
    import { format } from 'date-fns';

    const Blog = () => {

        const router = useRouter();

        const [blogPosts, setBlogPosts] = useState([]);

        useEffect(() => {
            const fetchAndMapDocuments = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'blogPosts'));

                    const processedItems = querySnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            ...data,
                        };
                    });

                    setBlogPosts(processedItems);
                } catch (error) {
                    console.error('Error fetching documents: ', error);
                }
            };

            fetchAndMapDocuments();
        }, []);



        return (
            <>
                <Header />

                <div className='px-6 mt-20 flex justify-center h-max pb-12'>
                    <div className='w-full sm:w-[60%]'>
                        <div className='w-full justify-between items-center flex'>
                            <h1 className='text-2xl flex items-center gap-x-3 text-[#fff]'><ArrowLeft size={28} color='#fff' variant='Broken' />Blog Page</h1>
                            <button onClick={() => router.push('/create-post')} className='py-3 px-7 rounded-2xl border-2 border-[#C7FB04] text-[#fff] text-lg flex items-center justify-center gap-x-3'><AddSquare size={24} color='#C7FB04' variant='Broken' /> Create Post</button>
                        </div>

                        <div className='mt-10 h-max'>
                            {blogPosts.map((post) => (
                                <div className='border-2 border-[#fff] rounded-2xl flex flex-col' key={post.id}>
                                    <h2>{post.title}</h2>
                                    <p>{post.description}</p>
                                    <p>{post.author.displayName}</p>
                                    <p>{format(post.timestamp.toDate(), ' dd MM yyyy')}</p>
                                    <p>{post.upvotes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </>
        )
    }

    export default Blog