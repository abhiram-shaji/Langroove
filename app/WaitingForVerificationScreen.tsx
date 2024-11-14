import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { colors } from '../styles/themes';
import { styles } from '../styles/WaitingForVerificationScreenStyles';
import { useLogout } from '../hooks/useLogout';
import { useEmailVerification } from '../hooks/useEmailVerification';

const WaitingForVerificationScreen: React.FC = () => {
  const { handleLogout } = useLogout();
  const { loading, checkVerificationStatus, handleResendVerification } = useEmailVerification();

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      checkVerificationStatus();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [checkVerificationStatus]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waiting for Email Verification</Text>
      <Text style={styles.message}>
        Please check your email and click the verification link to continue.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Resend Verification Email"
          onPress={handleResendVerification}
          color={colors.primary}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Refresh Verification Status"
          onPress={checkVerificationStatus}
          color={colors.accent}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          color={colors.secondary}
        />
      </View>
    </View>
  );
};

export default WaitingForVerificationScreen;
