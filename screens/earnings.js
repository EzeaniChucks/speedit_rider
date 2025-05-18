// Updated EarningsScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Modal, TextInput} from 'react-native';
import { sampleEarnings } from './sample';
import CustomTabBar from './custombar';
import { Box, VStack } from 'native-base';
import Icons from '@react-native-vector-icons/ant-design';
import WithdrawalBottomSheet from './WithdrawalBottomSheet';
const Earnings = () => {
    const [activeTab, setActiveTab] = useState('Daily');
    const tabs = [{ label: 'Daily' }, { label: 'Monthly' }, { label: 'Yearly' }];
    const [modalVisible, setModalVisible] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const openBottomSheet = () => {
        setIsVisible(true);
    };

    const closeBottomSheet = () => {
        setIsVisible(false);
    };

    const handleWithdraw = () => {
      // handle withdrawal logic here
      setModalVisible(false);
    };
  
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
           <Icons name="alert" size={30} color='teal' />
            <VStack space={1} alignItems={'flex-start'}>
            <Text>{item.date}</Text>
            <Text>{item.status}</Text></VStack>
            <Text>${item.amount}</Text>
        </View>
    );

    return (
        <View style={styles.container}>

            <Box safeArea padding={4}>
            <Text style={styles.totalBalance}>Total Balance:</Text>
            <Text style={styles.totalBalance}> $215.00</Text></Box>
            <CustomTabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <FlatList
                data={sampleEarnings}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Button title="Open Withdrawal" onPress={openBottomSheet} />
            <WithdrawalBottomSheet visible={isVisible} onClose={closeBottomSheet} />
        
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <Text>Withdraw</Text>
          <TextInput placeholder="Bank Name" />
          <TextInput
            placeholder="Amount to Withdraw"
            value={withdrawAmount}
            onChangeText={setWithdrawAmount}
          />
          <Button title="Submit" onPress={handleWithdraw} />
        </View>
      </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    totalBalance: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Earnings;