import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Department = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/department/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/department/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/department/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/department/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/department/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/department/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/department/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/department/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/department/ent.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="container department">
      <h2>Departments</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {departmentsArray.map((depart, index) => (
          <div key={index} className="card">
            <div className="depart-name">{depart.name}</div>
            <img src={depart.imageUrl} alt={depart.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Department;
