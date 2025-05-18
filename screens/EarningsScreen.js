import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Provider as PaperProvider, Card, Title, Paragraph, Button } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import RecentActivity from './activity';
import { Box, HStack, VStack } from 'native-base';

const EarningsScreen = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 40, 60, 80, 100, 40, 20],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green bars
      },
    ],
  };

  return (
    // <PaperProvider>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}> 
      <Title style={styles.title}>Earnings</Title>
        <Card style={styles.card}>
          <Card.Content style={{alignItems:'center',alignContent:'center'}}>
            <HStack space={3} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <VStack style={styles.boxContainer} space={10} alignItems={'flex-start'}>
            <Text style={styles.orderText}> Total Income</Text>
         <Box>
            <Text style={styles.totalIncome}>${634.99}</Text>
            <Text style={styles.subText}>↑ 0.5% than last month</Text>
            </Box>
            </VStack>
            <VStack space={4} alignItems={'flex-start'}>
              <Box style={styles.boxContainer}>
            <Text style={styles.orderText}>Total Order</Text>
            <Text style={styles.orderText}> 380</Text>
            </Box>
            <Box style={styles.boxContainer}>
            <Text style={styles.deliveryText}>Online Delivery </Text>
            <Text style={styles.deliveryText}> 89%</Text>
            </Box></VStack>
            </HStack>
          </Card.Content>
        </Card>
        <Box justifyContent={'center'} >
<HStack flexDirection={'row'} justifyContent={'space-between'} alignContent={'center'} alignItems={'center'} >
        <Text style={styles.trendIncomeTitle}>Trend Income</Text>
        <Button buttonColor='teal' mode="contained" onPress={() => {}} style={styles.button}>Week</Button></HStack></Box>
        <BarChart
          data={data}
          width={400} // specify the width
          height={220}
          fromZero={true}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />
       

        <RecentActivity/>
        <Box h={100}/>
      </ScrollView>
    // </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  boxContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,width:170
  },
  card: {
    marginTop:20,
    padding: 16,
    marginBottom: 20,backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalIncome: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  subText: {
    fontSize: 12,
    color: '#888',
  },
  orderText: {
    marginTop: 5,
    color: '#000',
  },
  deliveryText: {
    color: '#000',
  },
  trendIncomeTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  chart: {
    borderRadius: 16,
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,justifyContent: 'center',alignItems:'center',backgroundColor:'teal',borderRadius: 10,marginTop: 10
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  activityContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});

export default EarningsScreen;