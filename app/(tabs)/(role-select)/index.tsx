import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RoleSelectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

     
      <View style={styles.contentContainer}>
        
       
        <View style={styles.logoIcon}>
          <Ionicons name="people-outline" size={32} color="#ffffff" />
        </View>

        <Text style={styles.heading}>Choose Your Role</Text>
  

     
        <View style={styles.buttonsContainer}>
          
         
          <TouchableOpacity 
            style={styles.roleButton}
            onPress={() => router.push('/(student-login)')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonLeft}>
              <Text style={styles.roleButtonText}>Student</Text>
            </View>
          </TouchableOpacity>

          
          <TouchableOpacity 
            style={styles.roleButton}
            onPress={() => router.push('/(teacher-login)')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonLeft}>
              <Text style={styles.roleButtonText}>Teacher</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7bef15',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#111112',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#111112',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  logoIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#111112',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#111112',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  heading: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 14,
    // textAlign:"center"
  },
  roleButton: {
    flexDirection: 'row',
    backgroundColor: '#111112',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#111112',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});