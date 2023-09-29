import { auth } from '@/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Google, SearchNormal1, User } from 'iconsax-react';
import { useRouter } from 'next/router';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const Header = () => {

    const [user, setuser] = useAuthState(auth);
    const router = useRouter();

    const googleAuth = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleAuth);
        router.push('/');
    }

    return (
        <div className='flex container mx-auto justify-between items-center px-28 mt-8 text-[#fff]'>
            <div>
                <h3 className='text-2xl cubano'>The<span className='cubano text-[#C7FB04]'>Dev</span>Blog</h3>
            </div>

            <div className='flex items-center gap-x-4'>
                <p className={router.pathname === '/' ? 'text-lg  text-[#C7FB04] cursor-pointer' : 'text-lg  text-[#FCFFFC] cursor-pointer'} onClick={() => router.push('/')} >Home</p>
                <p className={router.pathname === '/blog' ? 'text-lg  text-[#C7FB04] cursor-pointer' : 'text-lg  text-[#FCFFFC] cursor-pointer'} onClick={() => router.push('/blog')} >Blog</p>
                <p className={router.pathname === '/my-posts' ? 'text-lg  text-[#C7FB04] cursor-pointer' : 'text-lg  text-[#FCFFFC] cursor-pointer'} onClick={() => router.push('/my-posts')} >My Posts</p>
            </div>

            <div className=''>
                {user ?

                    <div className='flex items-center gap-x-3 cursor-pointer' onClick={() => router.push('/profile')}>
                        <SearchNormal1 size="22" className='mr-3' color="#FCFFFC" variant="Broken" />
                        <User size="23" color="#FCFFFC" variant="Broken" />
                        <h3 className='text-lg text-[#FCFFFC]' onClick={() => signOut(auth)}>{user.displayName}</h3>
                    </div>
                    : <button onClick={signInWithGoogle} className='py-2 text-md rounded-xl flex justify-center items-center px-4 bg-[#FCFFFC] text-[#000] gap-x-2'><Google size="20" color="#000" variant="Broken" /> Sign in</button>

                }
            </div>
        </div>
    )
}

export default Header