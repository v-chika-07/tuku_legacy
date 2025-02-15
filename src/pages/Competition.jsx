import React from 'react';
import { Link } from 'react-router-dom';

// Import any necessary assets
import heroImage from '../assets/images/IMG-20241218-WA0005.jpg';
import childPaintingImage from '../assets/images/IMG-20241218-WA0006.jpg';
import pencilSketchImage from '../assets/images/IMG-20241218-WA0007.jpg';
import sculptureImage from '../assets/images/IMG-20241218-WA0008.jpg';

const Competition = () => {
  return (
    <div className="competition-page bg-gray-100">
      {/* Hero Section */}
      <section 
        className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{backgroundImage: `url(${heroImage})`}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Oliver Mtukudzi International Festival of the Arts Empowering Global Health Art Competition</h2>
            <p className="text-xl">Join us in celebrating art, music, and health for a brighter future</p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">About the Competition</h2>
            <p className="text-black mb-6">
              The Oliver Mtukudzi International Festival of the Arts Art Competition is a celebration 
              of creativity, health awareness, and the enduring legacy of Oliver Mtukudzi. 
              We invite artists of all ages to express their vision of health, community, 
              and inspiration through various artistic mediums.
            </p>
            <Link 
              to="#submission" 
              className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-secondary transition"
            >
              Learn How to Participate
            </Link>
          </div>
          <div>
            <img 
              src={heroImage} 
              alt="Oliver Mtukudzi Performing" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Competition Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Primary School Children (Paint)",
                image: childPaintingImage,
                description: "Open to primary school students. Create a vibrant painting expressing health, community, or musical inspiration.",
                details: [
                  "Age Group: 6-12 years",
                  "Medium: Painting"
                ]
              },
              {
                title: "Secondary School Students (Pencil)",
                image: pencilSketchImage,
                description: "For secondary school students. Create a detailed pencil sketch capturing themes of health and community.",
                details: [
                  "Age Group: 13-18 years",
                  "Medium: Pencil Sketch"
                ]
              },
              {
                title: "Open Category (Multiple Mediums)",
                image: sculptureImage,
                description: "Open to all artists. Submit paintings, pencil works, or sculptures that embody health, music, and community spirit.",
                details: [
                  "Age Group: 18+",
                  "Mediums: Paint, Pencil, Sculpture"
                ]
              }
            ].map((category) => (
              <div 
                key={category.title} 
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105"
              >
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-4">{category.title}</h3>
                  <p className="text-black mb-4">{category.description}</p>
                  <div className="space-y-2">
                    {category.details.map((detail) => (
                      <p key={detail} className="text-black text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section id="guidelines" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-12">Submission Guidelines</h2>
        <div className="max-w-2xl mx-auto bg-primary text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-6">Submission Requirements</h3>
          <ul className="list-disc list-inside space-y-4">
            <li>Original artwork created specifically for this competition</li>
            <li>Artwork must relate to health, community, or musical themes</li>
            <li>High-resolution digital submissions accepted</li>
            <li>Deadline: March 15, 2025</li>
          </ul>
          <Link 
            to="#submission" 
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded hover:bg-gray-100 transition"
          >
            Check Submission Details
          </Link>
        </div>
      </section>

      {/* Submission Process Section */}
      <section id="submission" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">How to Submit Your Artwork</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "1. Prepare Your Artwork", 
                description: "Ensure your artwork meets category guidelines" 
              },
              { 
                title: "2. Digital Submission", 
                description: "Upload high-resolution images through our online portal" 
              },
              { 
                title: "3. Submit Details", 
                description: "Provide artist information and artwork description" 
              }
            ].map((step) => (
              <div 
                key={step.title} 
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-bold text-black mb-4">{step.title}</h3>
                <p className="text-black">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              className="bg-gray-400 text-white px-8 py-3 rounded cursor-not-allowed opacity-75"
              disabled
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Exhibition Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-12">Your Path to the Oliver Mtukudzi International Festival of the Arts</h2>
        <p className="text-black text-center">
          Selected artworks will be displayed at Pakare Paye Arts Centre 
          and featured in the Oliver Mtukudzi International Festival of the Arts exhibition.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 space-x-4">
            <a href="#" className="hover:text-secondary">About Oliver Mtukudzi</a>
            <a href="#" className="hover:text-secondary">Privacy Policy</a>
            <a href="#" className="hover:text-secondary">Terms & Conditions</a>
          </div>
          <p> 2025 Oliver Mtukudzi Memorial Foundation</p>
        </div>
      </footer>
    </div>
  );
};

export default Competition;
