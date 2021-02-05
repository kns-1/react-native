1. Create react native app
>yarn global add create-react-native-app
create-react-native-app confusion

2. Run app
>cd confusion
yarn web

******************

Using react native elements:
>yarn add react-native-elements@beta

******************

Installing react navigation version 5:
--follow official documentation

******************

Installing JSON server:

1. Create a folder for json server anywhere in the system

2. react-front-end>mkdir json-server
cd json-server
npm install json-server -g

Start JSON server:
>json-server --host 192.168.1.114 --watch db.json -p 3001 -d 2000

*******************

Install Redux:
>yarn add redux
yarn add react-redux
yarn add redux-thunk
yarn add redux-logger

********************
Debugging:
>yarn global add react-devtools
react-devtools

********************
Adding date-picker (forms):
>yarn add @react-native-community/datetimepicker
npm install -g pod
yarn add @react-native-picker/picker


********************
Swipe-out button:
>yarn add react-native-swipeout@2.3.3

********************
Animatable:
>yarn add react-native-animatable@1.2.4

********************
Redux Persist:
>yarn add redux-persist@5.9.1

********************
Expo secure store:
>expo install expo-secure-store
expo install expo-permissions
expo install expo-notifications

********************
Image picking:
>yarn add @react-navigation/bottom-tabs
expo install expo-image-picker
expo install expo-image-manipulator

********************
Network Info:
>yarn add @react-native-community/netinfo

********************
Calendar:
>expo install expo-calendar

********************
Building Standalone apps:

- Download and install Expo XDE as per the instructions given in https://docs.expo.io/versions/v27.0.0/introduction/installation.

- Start Expo XDE and sign up for an account on Expo. You will need an Expo account in order to do the building of the Android APK or iOS IPA files.

>yarn global add exp@54.0.1

- Then, download the icon.png file given above, and put it in the project's root folder.

Update "app.json" file as follows:

{
  "expo": {
    "sdkVersion": "27.0.0",
    "name": "confusion",
    "icon": "./icon.png",
    "version": "1.0.0",
    "slug": "confusion",
    "ios": {
      "bundleIdentifier": "net.food.confusion.confusion"
    },
    "android": {
      "package": "net.food.confusion.confusion"
    }
  }
}


Building the Android APK:
- https://docs.expo.io/distribution/building-standalone-apps/?redirected

>exp build:android

- For iOS: https://docs.expo.io/distribution/building-standalone-apps/?redirected

- Once the build is completed (after waiting patiently for a long time), then you can download the APK file from the link that will be provided for you by Expo.
- You can then copy the APK file to your Android device and install it. Alternately if you already have Android Developer tools set up and know how to use adb, then you can just run "adb install <your APK File>".

*******************************
Ejecting the Project:
>yarn run eject

- Install Android Studio and do the configuration as per the instructions given under "Building Projects with Native Code" in https://facebook.github.io/react-native/docs/getting-started.html.

>exp start



Running on Android:
-Open the android folder in the project in Android Studio

- Connect your Android device to the computer and deploy the app to the device.



Ejecting for iOS Native Development:

- First, install XCode and do the configuration as per the instructions given under "Building Projects with Native Code" in https://facebook.github.io/react-native/docs/getting-started.html.

>sudo gem install cocoapods

- Then, move to the ios folder of your project in your terminal and type the following at the prompt:
>pod install

- Then, open the iOS project in XCode by clicking on confusion.xcworkspace file in the ios folder.
- Then compile and deploy the app to your iOS device/simulator from XCode.