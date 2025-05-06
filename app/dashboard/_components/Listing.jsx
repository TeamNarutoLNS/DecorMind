"use client";
 import { Button } from '@/components/ui/button';
// import { useUser } from '@clerk/clerk-react'
// import React, { useEffect, useState } from 'react'
// import EmptyState from './EmptyState';
// import Link from 'next/link';
// import {db} from "@/config/db"
// import { AiGeneratedImage } from '@/config/schema';
// import { eq } from 'drizzle-orm';
// import RoomDesignCard from './RoomDesignCard';

// function Listing() {
//   const { user } = useUser();
//   const [userRoomList, setUserRoomList] = useState([]);

//   const beigeBrownPalette = {
//     background: "#F5F5DC", // Beige background
//     primaryText: "#A0522D", // Sienna brown for main text
//     secondaryText: "#8B4513", // Saddle brown for secondary text/details
//     accent: "#CD853F", // Peru brown for accents (buttons, etc.)
//     cardBackground: "#FFF8DC", // Cornsilk for card backgrounds (if used)
//   };

//   useEffect(() => {
//     if(user){
//       GetUserRoomList()
//     }
//   }, [user])

//   const GetUserRoomList = async () => {
//     console.log("Here")
//     const primaryAddress = user?.primaryEmailAddress?.emailAddress
//     const result = await db.select().from(AiGeneratedImage)
//       .where(eq(AiGeneratedImage.userEmail, primaryAddress));
//     setUserRoomList(result);
//     console.log(result);
//   }



//     // const handleSearchProducts = async (query) => {
//     //     try {
//     //       const response = await fetch('/api/search-products', {
//     //         method: 'POST',
//     //         headers: { 'Content-Type': 'application/json' },
//     //         body: JSON.stringify({ query }),
//     //       });
      
//     //       const data = await response.json();
//     //       if (!response.ok) {
//     //         console.error(data.error || 'Failed to fetch products.');
//     //         alert(data.error || 'An error occurred.');
//     //         return;
//     //       }
      
//     //       console.log('Search results:', data.results);
//     //       // Handle the fetched results (e.g., display in a modal or a new section)
//     //     } catch (error) {
//     //       console.error('Unexpected error:', error);
//     //       alert('An unexpected error occurred.');
//     //     }
//     //   };
  

//   return (
//     <div className="min-h-screen font-sans" style={{ backgroundColor: beigeBrownPalette.background }}>
//       <div className="container mx-auto px-8 py-12">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-3xl font-bold" style={{ color: beigeBrownPalette.primaryText }}>
//               Hello, {user?.fullName}
//             </h2>
//           </div>
//           <div>
//             <Link href={'/dashboard/create-new'}>
//               <Button
//                 className="py-2 px-4 rounded-md font-medium transition duration-300"
//                 style={{
//                   backgroundColor: beigeBrownPalette.accent,
//                   color: "white",
//                   // hover: { backgroundColor: "#BC6223" }, // Darker brown on hover
//                 }}
//               >
//                 +Redesign Room
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {userRoomList?.length === 0 ?
//           <EmptyState />
//           :
//           <div className='mt-10'>
//             <h2 className='font-medium text-primary text-xl mb-10'> AI Room Studio</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10'>
//               {userRoomList.map((room, index) => {
//                 return <RoomDesignCard key={index} room={room}  />
                
//               })}
             
//             </div>
            
//           </div>
          
//         }
//       </div>
//     </div>
//   );
// }

// export default Listing;


import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react'
import Link from 'next/link';
import { db } from "@/config/db"
import { AiGeneratedImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
import RoomDesignCard from './RoomDesignCard';
import { useRouter } from 'next/navigation';
import EmptyState from './EmptyState';

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetImageUrl, setTargetImageUrl] = useState(''); // State to hold the image URL
  const router = useRouter();

  const beigeBrownPalette = {
    background: "#F5F5DC",
    primaryText: "#A0522D",
    secondaryText: "#8B4513",
    accent: "#CD853F",
    cardBackground: "#FFF8DC",
  };

  useEffect(() => {
    if (user) {
      GetUserRoomList();
    }
  }, [user]);

  const GetUserRoomList = async () => {
    setLoading(true);
    try {
      const primaryAddress = user?.primaryEmailAddress?.emailAddress;
      if (!primaryAddress) {
        setUserRoomList([]);
        return;
      }
      const result = await db.select().from(AiGeneratedImage)
        .where(eq(AiGeneratedImage.userEmail, primaryAddress));
      setUserRoomList(result);
    } catch (error) {
      console.error("Error fetching user room list:", error);
      setUserRoomList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeImage = (imageUrl) => {
    sessionStorage.setItem('targetImageUrl', imageUrl); // Store the image URL
    // router.push(`/dashboard/detect-furniture`); // Navigate
  };

  useEffect(() => {
    if (targetImageUrl) {
      router.push(`/DetectFurniture`);
    }
  }, [targetImageUrl, router]);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: beigeBrownPalette.background }}>
      <div className="container mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold" style={{ color: beigeBrownPalette.primaryText }}>
              Hello, {user?.fullName}
            </h2>
          </div>
          <div>
            <Link href={'/dashboard/create-new'}>
              <Button
                className="py-2 px-4 rounded-md font-medium transition duration-300"
                style={{
                  backgroundColor: beigeBrownPalette.accent,
                  color: "white",
                }}
              >
                +Redesign Room
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading your rooms...</div>
        ) : userRoomList?.length === 0 ? (
          <div className='mt-10'>
            <EmptyState />
          </div>
        ) : (
          <div className='mt-10'>
            <h2 className='font-medium text-primary text-xl mb-10'> AI Room Studio</h2>
            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10'>
              {userRoomList.map((room, index) => (
                <RoomDesignCard
                  key={index}
                  room={room}
                  onAnalyze={handleAnalyzeImage} // Pass the callback
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Listing;


