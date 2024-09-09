import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const transactions = [
  { date: '22 Jul, 12:03 PM', type: 'win', amount: '₹15' },
  { date: '22 Jul, 12:01 PM', type: 'entry', amount: '₹10' },
  { date: '23 Jul, 12:20 PM', type: 'win', amount: '₹15' },
  { date: '23 Jul, 12:15 PM', type: 'entry', amount: '₹10' },
];

const TransactionList = () => {
  return (
    <View style={styles.container}>
      {transactions.map((transaction, index) => (
        <View key={index} style={styles.transactionItem}>
          <Text style={styles.date}>{transaction.date}</Text>
          <Text style={styles.type}>{transaction.type}</Text>
          <Text style={[styles.amount, transaction.type === 'win' && styles.winAmount]}>
            {transaction.amount}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
  },
  winAmount: {
    color: 'green',
  },
});

export default TransactionList;