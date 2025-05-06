import React, { useState } from 'react';

function DesignType({ selectedDesignType }) {
  const Designs = [
    { name: 'Modern', image: '/modern.webp' },
    { name: 'Industrial', image: '/industrial.webp' },
    { name: 'Bohemian', image: '/bohemian.webp' },
    { name: 'Traditional', image: '/traditional.webp' },
    { name: 'Rustic', image: '/rustic.webp' },
    { name: 'Minimalist', image: '/minimalist.webp' },
  ];

  const [selectedOption, setSelectedOption] = useState(null); // Initialize state

  return (
    <div className="mt-6">
      {/* Label */}
      <label className="text-slate-400 mb-4 block">Select interior design type*</label>

      {/* Grid of Design Types */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Designs.map((design, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer ${
              design.name === selectedOption ? 'border-2 border-blue-500 rounded-md' : ''
            }`}
            onClick={() => {
              setSelectedOption(design.name);
              selectedDesignType(design.name);
            }}
          >
            <img
              src={design.image}
              alt={`${design.name} Design`}
              className="w-32 h-32 object-cover mb-2 rounded-md hover:scale-105 transition-transform"
            />
            <p className="text-sm font-medium text-center">{design.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignType;
