import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who we are?</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id magnam deserunt soluta ducimus saepe, ut provident iste quo sed aperiam ullam accusantium, odit distinctio quos, cupiditate expedita maiores doloribus rem.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, perferendis!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi iure eligendi nisi dicta aliquid ullam cum corporis provident illo ipsa. Nemo molestiae quaerat veniam magnam, non placeat suscipit ducimus totam porro amet voluptatem odio quo facere, quam neque iste vero.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, quibusdam.</p>
        Lorem ipsum dolor sit amet.
      </div>
    </div>
  )
}

export default Biography
