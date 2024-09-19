import React, { useEffect, useState } from "react";
import { db } from "../../Firebase";
import "firebase/firestore";
import {collection, getDocs } from "firebase/firestore";
const FirebaseUser = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const collectionsRef = await getDocs(collection(db, "ahmad"));
      const userData = collectionsRef.docs.map((userDoc) => userDoc.data());
    //   collectionsRef.docs.forEach((user) => {
    //     console.log(user.id);
    //   });
      setUser(userData);
      console.log("User Fetch successfully", userData);
      console.log("User length:", collectionsRef.docs.length);
    };
    fetchData();
  }, []);

  return (
    <div>
      {user && user.length > 0 ? (
        user.map((user, index) => (
          <li key={index}>
            {user.name}
            {user.email}
            {user.password}
          </li>
        ))
      ) : (
        <h1>No User Found</h1>
      )}
    </div>
  );
};

export default FirebaseUser;
