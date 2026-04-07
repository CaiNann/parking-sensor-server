import { Text, View } from "react-native";
import React, { useEffect, useState } from 'react'

//export default 

const fetchDistance = async () => {
  try {
    const response = await fetch('http://10.0.0.77:3000/distance');
    const json = await response.json();
    console.log(json);
    return json['distance'];
  } catch (error) {
    console.error('Fetch Failed: ', error);
    return null;
  }
};

export default function Index() {
  const [distance, setDistance] = useState(1000);
  const [isSpotOpen, setSpotOpen] = useState(false); 

  useEffect(() => {
    const updateDistance = async () => {
      const newDistance = await fetchDistance();
      if (newDistance !== null) {
        setDistance(newDistance);
        if (newDistance > 180) {
          setSpotOpen(true); 
        } else {
          setSpotOpen(false);
        }
      }
    };

    const intervalId = setInterval(updateDistance, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor: isSpotOpen ? "green" : "red"}}>
      <Text style={{ fontSize: 48 }}>{isSpotOpen ? "Spot Open" : "Spot Taken"}</Text>
</View>  
  );
}