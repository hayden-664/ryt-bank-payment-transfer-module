import React from 'react'
import { Text, TextProps, TextInputProps, TextInput } from 'react-native'
import { COLORS } from '@/theme'

type AppTextProps = TextProps & {
  weight?: 'regular' | 'medium' | 'bold'
}

export function Heading(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: 'Fraunces_700Bold', fontSize: 24, color: COLORS.primary },
        props.style
      ]}
    />
  )
}

export function AppText({ weight = 'regular', style, ...props }: AppTextProps) {
  const fontFamily =
    weight === 'medium'
      ? 'Poppins_500Medium'
      : weight === 'bold'
        ? 'Poppins_700Bold'
        : 'Poppins_400Regular'

  return <Text {...props} style={[{ fontFamily, fontSize: 16 }, style]} />
}

export function AppInput(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={[{ fontFamily: 'Poppins_400Regular', fontSize: 16 }, props.style]}
    />
  )
}
