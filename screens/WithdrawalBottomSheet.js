import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const WithdrawalBottomSheet = ({ visible, onClose }) => {
    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.sheet}>
                    <Text style={styles.title}>Withdraw Funds</Text>
                    <TextInput style={styles.input} placeholder="Bank Name" />
                    <TextInput style={styles.input} placeholder="Account Number" secureTextEntry />
                    <TextInput style={styles.input} placeholder="Amount to Withdraw" keyboardType="numeric" />
                    <TextInput style={styles.textArea} placeholder="Add Note" multiline />
                    <View style={styles.buttonContainer}>
                        <Button title="Withdraw" color="#FF5C5C" onPress={() => {/* Withdraw action */}} />
                        <Button title="Cancel" onPress={onClose} color="#AAAAAA" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    textArea: {
        height: 60,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default WithdrawalBottomSheet;