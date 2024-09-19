import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground,FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';

const AddCashComponent = () => {
  const [amount, setAmount] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [totalCashback, setTotalCashback] = useState(0);

  const offer = [
    { id: 1, amount: 100, cashback: 10 },
    { id: 2, amount: 200, cashback: 25 },
    { id: 3, amount: 500, cashback: 70 },
    { id: 4, amount: 1000, cashback: 150 },
  ];

  const handleAddAmount = () => {
    // Implement your logic to add the entered amount
    // ...
    if (amount) {
      // Implement your logic to add the entered amount
     // console.log(Amount: ₹${amount}, Cashback: ₹${totalCashback});
      // Reset the amount and offer after adding
      setAmount('');
      setSelectedOffer(null);
      setTotalCashback(0);
    } else {
      // Handle case where no amount is entered
      alert('Please enter an amount');
    }
  };

  const handleOfferSelection = (offer) => {
    setSelectedOffer(offer);
    setTotalCashback(offer.cashback);
  };

  return (
    <SafeAreaView className="h-full w-full justify-center items-center">
       <ImageBackground source={require("../assets/bg.png")}
                  resizeMode='cover'
                  className="h-full w-full "
                  >
                    <FlatList 
      ListHeaderComponent={() => (
        <TopBar/>
      )}
      renderItem={null}
      ListFooterComponent={() => (
        <>
      <Text className="text-white text-xl font-psemibold">Add Cash</Text>
      <Text className="text-white text-sm">Total Balance: ₹{13.5}</Text>

      <TextInput className="border-2 border-slate-400 rounded-sm px-5 mt-14 w-4/5"
        
        placeholder="Enter Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text className="text-white text-xl mt-10">Add amount & get Cashback</Text>

      <View className="mt-4">
        <Text className="text-white text-xl">Offers:</Text>
        <View className="flex-row justify-between mt-2">
          <TouchableOpacity
            style={[styles.offerButton, selectedOffer && selectedOffer.id === offer.id ? styles.selectedOffer : null]}
            onPress={() => handleOfferSelection(offer)}
          >
            <Text className="text-white text-xs">₹{offer.amount}</Text>
            <Text className="text-white text-xs">Get ₹{offer.cashback} Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.offerButton, selectedOffer && selectedOffer.id === offer.id ? styles.selectedOffer : null]}
            onPress={() => handleOfferSelection(offer)}
          >
            <Text className="text-white text-xs">₹{offer.amount}</Text>
            <Text className="text-white text-xs">Get ₹{offer.cashback} Extra</Text>
          </TouchableOpacity>
        </View>
        <View className=" flex-row justify-between mt-4">
          <TouchableOpacity
            style={[styles.offerButton, selectedOffer && selectedOffer.id === offer.id ? styles.selectedOffer : null]}
            onPress={() => handleOfferSelection(offer)}
          >
            <Text className="text-white text-xs">₹{offer.amount}</Text>
            <Text className="text-white text-xs">Get ₹{offer.cashback} Extra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.offerButton, selectedOffer && selectedOffer.id === offer.id ? styles.selectedOffer : null]}
            onPress={() => handleOfferSelection(offer)}
          >
            <Text className="text-white text-xs">₹{offer.amount}</Text>
            <Text className="text-white text-xs">Get ₹{offer.cashback} Extra</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="bg-black rounded-sm p-5 mt-16 w-4/5" onPress={handleAddAmount}>
        <Text className="text-white tetx-xl font-psemibold">Add Cash</Text>
      </TouchableOpacity>
       </>
        )}
      />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  offerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    marginRight:5,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedOffer: {
    backgroundColor: '#808080',
  },
  
});

export default AddCashComponent;