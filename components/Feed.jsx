'use client' 

import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>{
        return(
        <PromptCard
        key={post.id}
        post={post}
        handleTagClick={handleTagClick}
        />
        )

      })}
    </div>
  )
}


const Feed = () => {
  const [searchText, setSsearchText] = useState('')
  const [posts, setPosts] = useState([])
  
  const handleSearchChange = (e) => {

  }

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const postsData = await response.json()
      console.log(postsData)
      setPosts(postsData)
    }
 
    fetchPosts()
  },[])


  return (
    <section className='feed'>
      <form action="" className="relative shadow-md rounded shadow-gray-400 w-ful flex-center">
        <input 
        type='text'
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>

      <PromptCardList
      data={posts}
      handleTagClick={()=>{}}
      />

    </section>
  )
}

export default Feed
