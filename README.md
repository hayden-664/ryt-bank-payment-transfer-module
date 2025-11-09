# Payment Transfer Module
React Native + Expo + Typescript + Zustand

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```


## Testing on Expo go

1. Start the app

   ```bash
   npx expo start
   ```

2. Scan the QR code on your phone or press `i` to run ios
   * Note: must have Expo Go installed


## To test with biometrics - build IOS app on iPhone with Xcode

1. Prebuild

   ```bash
   npx expo prebuild
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Plug in iPhone

4. Open the ios/example.xcworkspace with Xcode

5. Click on paymenttransfermodule in the workspace and select Signing & Capabilities

6. Under Signing, Add/Select an account for Team (your apple id)

7. Click on run on the top left (play button)


## Design decisions
1. I followed the style (font, color, border radius) of Ryt Bank by referring to the app and website.
2. Created primary button (primary bg color) and secondary buttons (white bg color with primary border color) based on Ryt Bank's design.
3. Heading to follow the same font size as Ryt Bank's app


## Challenges faced

1. When testing on mobile device, there is a visible rounded corners when navigating between different screens. It looks fine my XCode simulator.


## Demo video
[Demo video on Google Drive](https://drive.google.com/drive/folders/1w_b_-SrtE3zuVacLvKJrepMp1XREuj6X?usp=sharing)