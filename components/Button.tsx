import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator
} from 'react-native'
import { COLORS, RADIUS } from '@/constants/theme'
import { AppText } from './Typography'

type ButtonProps = {
  title: string
  variant?: 'primary' | 'secondary'
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle
}) => {
  const isPrimary = variant === 'primary'

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? 'white' : COLORS.primary} />
      ) : (
        <AppText
          style={[
            styles.buttonText,
            isPrimary ? styles.primaryText : styles.secondaryText,
            textStyle
          ]}
        >
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: RADIUS.default,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: 'white',
    width: '100%'
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: '100%'
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  primaryText: {
    color: 'white'
  },
  secondaryText: {
    color: COLORS.primary
  }
})

export default Button
