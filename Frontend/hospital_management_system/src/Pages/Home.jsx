import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Department from '../components/Department'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <div>
      <Hero title={"Welcome to my medical institute | Your trusted health care provider"} imageUrl={"/hero.png"}/>
      <Biography imageUrl={"/about.png"}/>
      {/* <Department/> */}
      <MessageForm/>
    </div>
  )
}

export default Home
