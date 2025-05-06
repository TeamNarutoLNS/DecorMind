// import Image from 'next/image'
// import React from 'react'

// function EmptyState() {
//   return (
//     <div className='flex items-center justify-center mt-10 '>
//       <Image src={'/image.png'} alt={'room image'}
//       width={200} height={200}/>
//       <h2 className=' py-10 font-mediun text-lg text-primary'>Create New Interior Design For Your Room</h2>
//     </div>
//   )
// }

// export default EmptyState


import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center mt-10'> {/* Changed to flex column and added justify-center */}
      <Image 
  src={'/placeholder.webp'} 
  alt={'Placeholder for design inspiration'} 
  width={200} 
  height={200} 
  className="mb-6"
/>

      <h2 className='py-2 font-medium text-lg text-primary text-center'> {/* Added text-center and adjusted padding */}
        Create New Interior Design For Your Room
      </h2>
      <p className="text-gray-500 text-center">Get started by designing your dream space.</p> {/* Added a descriptive paragraph */}
      <Link href={'/dashboard/create-new'}>
      <Button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"> {/* Added a call-to-action button */}
        Design Now
      </Button>
      </Link>
    </div>
  );
}

export default EmptyState;