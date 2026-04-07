import { Text, View } from "react-native";
import React, { useEffect, useState } from 'react'

//export default 

const fetchDistance = async () => {
  try {
    const response = await fetch('http://192.168.1.215:3000/distance');
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

  useEffect(() => {
    const updateDistance = async () => {
      const newDistance = await fetchDistance();
      if (newDistance !== null) {
        setDistance(newDistance);
      }
    };

    const intervalId = setInterval(updateDistance, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 96 }}>Distance: {distance}</Text>
    </View>
  );
}