import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFundWalletMutation, useLazyVerifyFundingQuery } from '../store/ordersApi'; // Adjust path
import Icon from '@react-native-vector-icons/ant-design';

const FundWalletScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [showWebView, setShowWebView] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');
    const [transactionRef, setTransactionRef] = useState('');

    const [fundWallet, { isLoading: isInitializing }] = useFundWalletMutation();
    const [triggerVerification, { isLoading: isVerifying }] = useLazyVerifyFundingQuery();

    const handleFundingInitiation = async () => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            return Alert.alert('Invalid Amount', 'Please enter a valid amount to fund.');
        }

        try {
            const response = await fundWallet({ amount: numericAmount }).unwrap();
            
            if (response.success && response.data.authorizationUrl) {
                setPaymentUrl(response.data.authorizationUrl);
                setTransactionRef(response.data.reference); // Store the reference
                setShowWebView(true); // Open the WebView
            } else {
                Alert.alert('Error', 'Could not retrieve payment link.');
            }
        } catch (err) {
            Alert.alert('Error', 'Could not initialize funding. Please try again.');
        }
    };

    // This function is called whenever the URL in the WebView changes
    const handleNavigationStateChange = (navState) => {
        const { url } = navState;
        
        // IMPORTANT: The backend team must configure a callback URL on Paystack.
        // When payment is successful, Paystack redirects to that URL.
        // The backend should then redirect to a "success" page you can detect here.
        // Example: https://your-app-domain.com/payment-success
        
        if (url.includes('payment-success')) { // Replace with your actual success URL keyword
            setShowWebView(false);
            Alert.alert('Processing', 'Payment successful! Verifying transaction...');
            
            // Now, verify the transaction with the stored reference
            triggerVerification(transactionRef)
                .unwrap()
                .then(() => {
                    Alert.alert('Success!', 'Your wallet has been funded.');
                    navigation.goBack();
                })
                .catch(() => {
                    Alert.alert('Verification Error', 'Could not confirm transaction. Please contact support if your wallet is not updated.');
                });
        }
        
        // You can also detect cancellation or failure
        if (url.includes('payment-cancelled')) { // Replace with your actual failure/cancel URL keyword
            setShowWebView(false);
            Alert.alert('Cancelled', 'The payment process was cancelled.');
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                visible={showWebView}
                onRequestClose={() => setShowWebView(false)}
                animationType="slide"
            >
                <View style={styles.webViewHeader}>
                    <TouchableOpacity onPress={() => setShowWebView(false)}>
                        <Icon name="close" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.webViewTitle}>Complete Payment</Text>
                    <View style={{width: 24}}/>
                </View>
                <WebView
                    source={{ uri: paymentUrl }}
                    style={{ flex: 1 }}
                    onNavigationStateChange={handleNavigationStateChange}
                    startInLoadingState={true}
                    renderLoading={() => <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />}
                />
            </Modal>

            <Text style={styles.title}>Fund Your Wallet</Text>
            <Text style={styles.label}>Enter Amount (₦)</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g., 5000"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <TouchableOpacity
                style={[styles.button, isInitializing && styles.buttonDisabled]}
                onPress={handleFundingInitiation}
                disabled={isInitializing}
            >
                {isInitializing ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Proceed to Pay</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5, color: '#555' },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc',
    padding: 15, borderRadius: 8, fontSize: 18, marginBottom: 30
  },
  button: { backgroundColor: 'teal', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#a8a8a8' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  webViewHeader: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  webViewTitle: { fontSize: 16, fontWeight: 'bold' },
});

export default FundWalletScreen;