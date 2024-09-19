import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import {db} from "../../Firebase"
import {getDocs, collection} from "firebase/firestore"
function FirebaseUsers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const collectionRef =await getDocs(collection(db,'users'));
      const usersData = collectionRef.docs.map(userDoc => userDoc.data());
//       collectionRef.docs.forEach((user)=>{
// // console.log(user.id())
// console.log(user.data())
    //   })
    //   const snapshot = await collectionRef.get();
    //   const fetchedData = snapshot.docs.map(doc => ({
    //     id: doc.id,
    //     ...doc.data()
    //   }));
     setData(usersData);
     console.log("sds",usersData)
    console.log("sds",collectionRef.docs.length)
     };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Data from Firestore</h2>
      <ul>
        {data && data.length>0 && data.map(item => (
          <li key={item.id}>{item.email}
          <h1>{item.password}</h1>
           </li>
        ))}
      </ul>
    </div>
  );
}

export default FirebaseUsers;
