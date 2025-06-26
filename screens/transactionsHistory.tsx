import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {useGetWalletTransactionsQuery} from '../store/ordersApi';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../util/date';

const TransactionHistoryScreen = () => {
  const navigation = useNavigation();
  const {
    data: transactionsData,
    isLoading,
    isError,
    refetch,
  } = useGetWalletTransactionsQuery({page: 1, limit: 20});

  const transactions_data = transactionsData as TransactionsResponse;

  const transactions = transactions_data?.data?.transactions || [];

  const getTransactionIcon = (purpose: string, type: string) => {
    if (purpose === 'wallet_funding') return 'money-bill-wave';
    if (type === 'credit') return 'arrow-down';
    return 'arrow-up';
  };

  const getTransactionColor = (type: 'debit' | 'credit') => {
    return type === 'credit' ? '#4CAF50' : '#F44336';
  };

  const getTransactionTitle = (purpose: string, type: string) => {
    switch (purpose) {
      case 'wallet_funding':
        return 'Wallet Funding';
      case 'order_payment':
        return type === 'credit' ? 'Delivery Earnings' : 'Order Payment';
      default:
        return type === 'credit' ? 'Credit' : 'Debit';
    }
  };

  const renderItem = ({item}: {item: Transaction}) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionIconContainer}>
          <FontAwesome
            name={getTransactionIcon(item.purpose, item.type)}
            size={18}
            color="white"
            iconStyle="solid"
          />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>
            {getTransactionTitle(item.purpose, item.type)}
          </Text>
          <Text style={styles.transactionSubtitle}>
            {formatDate(item.createdAt)}
          </Text>
          {item.status !== 'successful' && (
            <View style={[styles.statusBadge, {backgroundColor: '#FFC107'}]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          )}
        </View>
        <Text
          style={[
            styles.transactionAmount,
            {color: getTransactionColor(item.type)},
          ]}>
          {item.type === 'credit' ? '+' : '-'}₦
          {parseFloat(item.amount).toFixed(2)}
        </Text>
      </View>
      {item.reference && (
        <View style={styles.transactionFooter}>
          <Text style={styles.referenceText}>Ref: {item.reference}</Text>
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading transactions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load transactions</Text>
          <TouchableOpacity onPress={refetch} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#00796B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={{width: 24}} />
      </View>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome
              name="money-bill-transfer"
              size={48}
              color="#BDBDBD"
              iconStyle="solid"
            />
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor="#00796B"
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  listContent: {
    padding: 16,
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00796B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 12,
    color: '#757575',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  transactionFooter: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 8,
    marginTop: 8,
  },
  referenceText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#F44336',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#00796B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    color: '#9E9E9E',
    fontSize: 16,
  },
});

export default TransactionHistoryScreen;
