import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function LandingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1248c6" />
      
      <View style={styles.contentContainer}>
        

        {/* Logo and Title Group */}
        <View style={styles.heroHeader}>
          <View style={styles.logoIcon}>
            <Ionicons name="search" size={32} color="#ffffff" />
          </View>
          <Text style={styles.title}>FoundIt</Text>
        </View>

        {/* Subtitle / Description */}
        <Text style={styles.description}>
          A campus utility app that helps students and teachers report, track, and recover lost or found items quickly.
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" />
        </TouchableOpacity>

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2026 FoundIt App</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7bef15', // slate-900
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  logoIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#111112', 
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#111112',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
    marginBottom: 40,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#111112',
    width: '100%',
    maxWidth: 320,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#111112',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#1f2125',
    fontSize: 12,
  },
});