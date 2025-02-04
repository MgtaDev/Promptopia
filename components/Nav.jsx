'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect} from 'react'
import {
signIn, signOut, useSession, getProviders
} from 'next-auth/react'


const Nav = () => {
  const isUserLogedIn = true;
  const [providers, setProviders] = useState(null)
  const [toogleDropdown, setToogleDropdown] = useState(false)
  const { data: session } = useSession()

  useEffect(()=> {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  },[])
   

  return (
      <div className='w-full'>
 <nav className='flex-between mt-4 shadow-xl shadow-gray-400 rounded-full px-6 bg-slate-50 w-full py-1.5 pb-3  mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
        <Image 
        src='/assets/images/logo.svg'
        alt='Promptopia logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
        </Link>


        {/* Mobile navigation */}
        <div className='sm:flex hidden'> 
        {session?.user ? (
            <div className="flex gap-3 md:gap-5">
                {/* Button */}
                <Link href='/create-prompt' className='black_btn'>
                Create Post
                </Link>
                
                {/* Button */}
                <button 
                className='outline_btn'
                type='button'
                onClick={()=> signOut()}
                >
                Sign out
                </button>

                {/* Button */}
                <Link href='/profile'>
                  <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                  />
                </Link>
            </div>
        ): (
          <>
          {providers && 
          Object.values(providers).map((provider)=>(
            <button
            type='button'
            key={provider.name}
            onClick={()=> signIn(provider.id)}
            className='black_btn'
            >
            Sign In
            </button>
          )
          )
          }
          </>
        )}

        </div>


        {/* Mobile navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className='flex'>
               <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                  onClick={()=> setToogleDropdown((prev)=> !prev
                  )}
                  />

                  {toogleDropdown && (
                    <div className="dropdown shadow-xl shadow-gray-400 transition duration-300 ease-in-out">
                      <Link
                      href='/profile'
                      className='dropwdown_link'
                      onClick={()=> setToogleDropdown(false)}
                      >
                        My profile
                      </Link>
                      <Link
                      href='/create/prompt'
                      className='dropwdown_link'
                      onClick={()=> setToogleDropdown(false)}
                      >
                        Create Prompt
                      </Link>
                      <button type='button'
                      onClick={()=> {
                      setToogleDropdown(false);
                      signOut()
                      }}
                      className='black_btn'
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
            </div>
          ):(
            <>
            {providers && 
              Object.values(providers).map((provider)=>(
                <button
                type='button'
                key={provider.name}
                onClick={()=> signIn(provider.id)}
                className='black_btn'
                >
                Sign In
                </button>
              )
              )
              }
                </>
          )}
          
        </div>

      </nav>
      </div>
     
    )
}

export default Nav