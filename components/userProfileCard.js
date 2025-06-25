import {Image,StyleSheet, Text, View} from 'react-native';
import { useSelector} from 'react-redux';
import AvailabilityToggle from './availabiltyToggle';

const UserProfileCard = () => {

  const profile = useSelector(state => state.auth.user);
  const {isAvailable} = useSelector(state => state.availability);
  return (
    <View style={styles.profileContainer}>
      <Image
        source={require('../assests/avatar.jpg')} // Placeholder for user image
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {profile?.firstName + ' ' + profile?.lastName}
        </Text>
        <Text style={styles.userPhone}>{profile?.phone}</Text>
      </View>

      <View style={{...styles.headertop, flexDirection: 'column'}}>
        <Text style={{...styles.headerText, marginRight: 15}}>
          {isAvailable ? 'Online' : "You're Offline"}
        </Text>
        <AvailabilityToggle />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    padding: 16,
    position: 'absolute',
    top: 10,
    width: '95%',
    alignSelf: 'center',
    // left: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: 'teal',
    borderWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  onlineText: {
    marginLeft: 5,
    color: 'white',
  },
  headertop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default UserProfileCard;
