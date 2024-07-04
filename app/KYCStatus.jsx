import { View, Text } from 'react-native'
import { React, useState } from 'react'
import { auth } from '../FirebaseConfig';
import { getFirestore, collection, query, where, getDocs, doc } from 'firebase/firestore';


const KYCStatus = () => {
  const user = auth.currentUser;
  const db = getFirestore();
  const KycRef = collection(db, 'kyc');
  const KycStatRef = collection(db, 'kycStatus');
  let frontImageUri
  let backImageUri
  const [Status, setStatus] = useState(null);
  const [DocStatus, setDocStatus] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [docId, setDocId] = useState(null);


  const fetchDocs = async() => {
    if (user) {
      const q = query(KycRef, where("userid", "==", user.uid))
  
      const querySnapshot = await getDocs(q);
      if(querySnapshot){
        querySnapshot.forEach((doc) => {
          frontImageUri = doc.data().frontImageUrl;
          backImageUri = doc.data().bonusbalance;
          //console.log(frontImageUri);
        })
      }
      else{
        console.log("HI")
      }
      
    }
  };
  console.log(user.uid);
  const FetchStatus = async() => {
    if (user) {
      const q = query(KycStatRef, where('userId', '==', user.uid));

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setDocId(doc.id);
        console.log(docId)
      } else {
        console.log('No matching document found');
        console.log(querySnapshot.empty)
      }
      

    }
  };FetchStatus();
    return (
    <View>
      <Text>
        {UserId}
        {Status}
      </Text>
      <Text>
      {DocStatus}
      </Text>
    </View>
  )
}

export default KYCStatus