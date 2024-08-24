import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className='hero container'>
      <div className='banner'>
<h1>{title}</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facilis earum, ad consequuntur necessitatibus soluta eveniet facere, explicabo odit in vel dolorem sapiente, exercitationem quia aliquid assumenda ex placeat? Quibusdam fugit voluptate deserunt eaque accusantium, distinctio perferendis doloremque saepe ab et rem ex expedita dolore, iste maiores at libero incidunt.</p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="" className='animated-image'/>
        <span>
            <img src="/vector.png" alt="" />
        </span>
      </div>
    </div>

  )
}

export default Hero
