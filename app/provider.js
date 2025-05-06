// "use client";

// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { UserDetailContext } from "./_context/UserDetailContext";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// function Provider({ children }) {
//   const { user } = useUser();
//   const [userDetail, setUserDetail] = useState(null);

//   useEffect(() => {
//     if (user) {
//       verifyUser();
//     }
//   }, [user]);

//   const verifyUser = async () => {
//     try {
//       const response = await axios.post("/api/verify-user", { user });
//       setUserDetail(response.data.result);
//     } catch (error) {
//       console.error("Error verifying user:", error);
//     }
//   };

//   console.log("PayPal Client ID:", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID); // Debugging

//   return (
//     <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
//       <PayPalScriptProvider
//         options={{
//           clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "your-sandbox-client-id",
//           currency: "INR", // Change to USD if needed
//           intent: "capture",
//         }}
//       >
//         {children}
//       </PayPalScriptProvider>
//     </UserDetailContext.Provider>
//   );
// }

// export default Provider;
 "use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserDetailContext } from "./_context/UserDetailContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (user) {
      verifyUser();
    }
  }, [user]);

  const verifyUser = async () => {
    try {
      const response = await axios.post("/api/verify-user", { user });
      setUserDetail(response.data.result);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "your-sandbox-client-id",
          currency: "USD",
          intent: "capture",
        }}
      >
        {children}
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
