import React from 'react'
import { Text, TextProps, TextInputProps, TextInput } from 'react-native'

type HeadingProps = TextProps & {
  weight?: 'regular' | 'bold'
}

type AppTextProps = TextProps & {
  weight?: 'regular' | 'medium' | 'bold'
}

export function Heading({ weight = 'bold', style, ...props }: HeadingProps) {
  const fontFamily =
    weight === 'bold' ? 'Fraunces_700Bold' : 'Fraunces_400Regular'

  return <Text {...props} style={[{ fontFamily, fontSize: 34 }, style]} />
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
