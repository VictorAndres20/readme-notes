# IMPORTANT!!!!!!
MAY BE ALWAYS USE sudo, like sudo react-native run-android

# Open Android SDK Manager and update Android SDK

$ Open Android Studio and Open SDK Manager

# Get started

# CREATE APP
```
$ sudo yarn global add react-native-cli
```
```
$ sudo react-native init ProjectName 
```
**OR** 
```
$ sudo react-native init newproject --version react-native@0.57.8
```

CODE WITH SERVER STARTED 
```
$ sudo yarn start
```

# adb configure

## Your divice On Developer Options
1. Make sure Depuracion USB 					enabled
2. Make sure Install apps via USB 			enabled
3. Depuracion USB (Ajustes de seguridad) 	enabled

## Make sure your divece is authorized with adb /Android/Sdk/platform-tools/adb
```
$ adb devices
```

if the device is shown as unauthorized, go 
to the developer options on the phone and click 
"Revoke USB debugging authorization"
```
$ adb kill-server
$ adb start-server
```

The device will ask if you are agree to connect the computer id

## Enablibng debugging via USB
RUN JS server first before run-android
https://facebook.github.io/react-native/docs/getting-started
https://facebook.github.io/react-native/docs/running-on-device

## Connecting to the development server
```
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

# Delete app from device
```
$ adb uninstall com.projectname
```

# Reload via Terminal
https://stackoverflow.com/questions/44170991/reload-a-react-native-app-on-an-android-device-manually-via-command-line
```
$ adb shell input text "RR"
```

# Open Developer Menu
https://stackoverflow.com/questions/44170991/reload-a-react-native-app-on-an-android-device-manually-via-command-line

SAMSUNG
```
$ adb shell input keyevent 82
```

XIAOMI
```
$ adb shell input keyevent 82
```

# Error ANDROID_HOME
inside react-project/android create local.properties set path to Android SDK:
```
	sdk.dir = /home/victorandres/Android/Sdk
```


#################################################################################

# If you fotgot to stop server 
```
$ sudo lsof -i -P -n | grep 8081
```

#################################################################################

# react-native-material-ui 
https://github.com/xotahal/react-native-material-ui

# install and configure
```
$ sudo yarn add react-native-material-ui
```

if ./node_modules/react-native-vector-icons NOT EXISTS
{
```
$ sudo yarn add react-native-vector-icons
```
}

```
$ sudo react-native link react-native-vector-icons
```

# list icons
MaterialIcons
https://oblador.github.io/react-native-vector-icons/

# I USE IT AND IS GREAT TO USE HIS Toolbars

###############################################################################

# react-native-elements
https://github.com/react-native-training/react-native-elements
https://react-native-training.github.io/react-native-elements/docs/0.19.1/getting_started.html

# install and configure

$ sudo yarn add react-native-elements

if ./node_modules/react-native-vector-icons NOT EXISTS
{
	$ sudo yarn add react-native-vector-icons
}

$ sudo react-native link react-native-vector-icons

# I USE IT AND IS REALLY GREAT IN ALL SENSE!!!!!! HAS A GOOD EXPLAIN COMPLETE DOC 

###############################################################################

# shoutem UI COMPONENTS
https://shoutem.github.io/docs/ui-toolkit/introduction

# installation
$ sudo yarn add @shoutem/ui

$ sudo react-native link @shoutem/ui

# To use it

import { <COMPONENT> } from '@shoutem/ui';

###############################################################################

# react-native-ui-kitten
https://akveo.github.io/react-native-ui-kitten/#/docs/quick-start/getting-started

# Install

$ sudo yarn add react-native-ui-kitten

# use it

import {RkButton} from 'react-native-ui-kitten';

###############################################################################

# react-native-material-design
http://react-native-material-design.github.io/components/avatar

###############################################################################

# Some more specific components like date picker
https://github.com/xgfe/react-native-ui-xg

$ sudo yarn add react-native-datepicker

###############################################################################
# react navigation 4.X. 

# IMPORTANT TO SEE. VERY IMPORTANT!!!!! MAY be change in new versions
https://reactnavigation.org/docs/en/getting-started.html

# Install

$ sudo yarn add react-navigation
$ sudo yarn add react-native-gesture-handler 
$ sudo yarn add react-native-reanimated 
$ sudo yarn add react-native-screens@^1.0.0-alpha.23
$ sudo yarn add react-navigation-stack

**If React Native 0.6 and newer**{

	To complete the linking on iOS, **make sure you have Cocoapods installed**. Then run:
	$ cd ios
	$ sudo pod install
	$ cd ..

	To finalize installation of react-native-screens for Android, 
	add the following two lines to dependencies section in android/app/build.gradle:
	+implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
	+implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'

} 

**If React Native 0.59 and lower**{

	$ sudo react-native link react-native-reanimated
	$ sudo react-native link react-native-gesture-handler
	$ sudo react-native link react-native-screens

	$ sudo yarn add --dev jetifier

	Then add it to the postinstall script in package.json:
	"scripts": {
	  "postinstall": "jetifier -r"
	}

	$ sudo yarn postinstall

} 


# Android Configure. To finalize installation of react-native-gesture-handler for Android
1. ON MainActivity.java

package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}

2. Then add the following at the top of your entry file, such as index.js
import 'react-native-gesture-handler';

**ERROR NOTE IMPORTANT**

IF YOU GET ERROR 

```
* Where:
Build file '/home/victorandres/ReactNativeprojects/ChefSmartchef/node_modules/react-native-screens/android/build.gradle' line: 106

* What went wrong:
A problem occurred configuring project ':react-native-screens'.
> Could not get unknown property 'javaCompileProvider' for object of type com.android.build.gradle.internal.api.LibraryVariantImpl.
```

You need to change on ./node_modules/react-native-screens/android/build.gradle line 106

```
android.libraryVariants.all { variant ->
        def name = variant.name.capitalize()
        task "jar${name}"(type: Jar, dependsOn: variant.javaCompileProvider.get()) {
            from variant.javaCompileProvider.get().destinationDir
        }
}
```

TO:

```
android.libraryVariants.all { variant ->
        def name = variant.name.capitalize()
        task "jar${name}"(type: Jar, dependsOn: variant.javaCompile) {
            from variant.javaCompile.destinationDir
        }
}
```
**Reference** https://github.com/software-mansion/react-native-reanimated/issues/315#issuecomment-503916860

# Usage Of React Navigation!!

ON App.js

import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/*Components*/
import Welcome from './src/app/Welcome/Welcome.js';
import Principal from './src/app/Principal/Principal.js';

const AppNavigator = createStackNavigator(
  {
    Home: Welcome,
    Principal: Principal,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#083C6A',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}



ALL SCREENS CALLED 

WELCOME

import React from 'react';
import {View,Text,StyleSheet,Image,ScrollView,Alert,ActivityIndicator} from 'react-native';
import {Button} from 'react-native-material-ui';

export default class Welcome extends React.Component
{
    static navigationOptions = {
        title: 'ACM App',
    };

    init=()=>
    {
        this.props.navigation.navigate('Principal'); //Navigate
			this.props.navigation.replace('Principal'); //Replace the current for the next
    }

    render()
    {
        return(            
            <ScrollView>        
                <View style={styles.container}>        
                    <Button 
                        raised
                        accent
                        text="SIGUIENTE"
                        style={{
                            container:
                            {
                                backgroundColor:'steelblue',
                                marginTop:20
                            }
                        }}
                        icon="check"
                        onPress={() => this.init()}
                        />
						  <ActivityIndicator size="large" color="#000" />
                </View>
            </ScrollView>

        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:20
    }
});

PRINCIPAL

import React from 'react';
import {Text,View} from 'react-native';

export default class Principal extends React.Component
{
    static navigationOptions = {
        title: 'ACM App'
    };
    render()
    {
        return(
            <View>
                <Text>Siguiente screen</Text>
            </View>
        );
    }
}

# Hide header bar

const AppNavigator = createStackNavigator(
  {
    Home: Welcome,
    Principal: Principal,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    headerMode: 'none', //----------> THIS
    defaultNavigationOptions: {
      headerVisible: false,//----------> THIS
      headerStyle: {
        backgroundColor: '#083C6A',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

# Passing parameters

ON SCREEN 1
...

this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
...

ON SCREEN 2

...

this.props.navigation.getParam('itemId', 'NO-ID');
this.props.navigation.getParam('otherParam', 'some default value');

...

# Use full methods

1. Navigate

this.props.navigation.navigate('Principal')

2. Replace

this.props.navigation.replace('Principal');

3. Dispath and Reset - Here resetting with index: 0 
	would make the screen passed in routeName }
	as the initial screen, removing all previous
	screens from the stack.
...
import {NavigationActions,StackActions} from 'react-navigation';
...
this.props.navigation.dispatch(
	StackActions.reset({
		index: 0,
		actions: [NavigationActions.navigate({ routeName: "Home" })]
	})
);

4. Go Back

this.props.navigation.goBack();


###############################################################################

# react navigation 3.0.2
https://reactnavigation.org/docs/en/3.x/getting-started.html

# IMPORTANT TO SEE. VERY IMPORTANT!!!!! MAY be change in new versions
https://reactnavigation.org/docs/en/getting-started.html

# Install
$ sudo yarn add react-navigation@3.0.2
$ sudo yarn add react-native-gesture-handler
$ sudo yarn add react-native-reanimated

**IF React Native 0.59 and lower**{

	$ sudo react-native link react-native-gesture-handler
	$ sudo react-native link react-native-reanimated

}

**IF React newer versions 0.6**{

	On newer versions of React Native, linking is automatic.

	On iOS, to complete the linking, make sure you have Cocoapods installed. Then run:
	$ cd ios
	$ pod install
	$ cd ..

}

# Android Configure. To finalize installation of react-native-gesture-handler for Android

1. ON MainActivity.java

package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}

# Usage Of React Navigation!!

ON App.js

import React, {Component} from 'react';
import Welcome from './src/app/Welcome/Welcome.js';
import Principal from './src/app/Principal/Principal.js';
import {createStackNavigator,createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    Home: Welcome,
    Principal: Principal,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#083C6A',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}



ALL SCREENS CALLED 

WELCOME

import React from 'react';
import {View,Text,StyleSheet,Image,ScrollView,Alert} from 'react-native';
import {Button} from 'react-native-material-ui';

export default class Welcome extends React.Component
{
    static navigationOptions = {
        title: 'ACM App',
    };

    init=()=>
    {
        this.props.navigation.navigate('Principal'); //Navigate
			this.props.navigation.replace('Principal'); //Replace the current for the next
    }

    render()
    {
        return(            
            <ScrollView>        
                <View style={styles.container}>        
                    <Button 
                        raised
                        accent
                        text="SIGUIENTE"
                        style={{
                            container:
                            {
                                backgroundColor:'steelblue',
                                marginTop:20
                            }
                        }}
                        icon="check"
                        onPress={() => this.init()}
                        />
                </View>
            </ScrollView>

        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:20
    }
});

PRINCIPAL

import React from 'react';
import {Text,View} from 'react-native';

export default class Principal extends React.Component
{
    static navigationOptions = {
        title: 'ACM App'
    };
    render()
    {
        return(
            <View>
                <Text>Siguiente screen</Text>
            </View>
        );
    }
}

# Hide header bar

const AppNavigator = createStackNavigator(
  {
    Home: Welcome,
    Principal: Principal,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    headerMode: 'none', //----------> THIS
    defaultNavigationOptions: {
      headerVisible: false,//----------> THIS
      headerStyle: {
        backgroundColor: '#083C6A',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

# Passing parameters

ON SCREEN 1
...

this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
...

ON SCREEN 2

...

this.props.navigation.getParam('itemId', 'NO-ID');
this.props.navigation.getParam('otherParam', 'some default value');

...

# Use full methods

1. Navigate

this.props.navigation.navigate('Principal')

2. Replace

this.props.navigation.replace('Principal');

3. Dispath and Reset - Here resetting with index: 0 
	would make the screen passed in routeName }
	as the initial screen, removing all previous
	screens from the stack.
...
import {NavigationActions,StackActions} from 'react-navigation';
...
this.props.navigation.dispatch(
	StackActions.reset({
		index: 0,
		actions: [NavigationActions.navigate({ routeName: "Home" })]
	})
);

4. Go Back

this.props.navigation.goBack();


#######################################################################################

# Using React Context

1. Create contexts

import React from 'react';

const MyContext=React.createContext();
const MyContext2=React.createContext();
export {MyContext,MyContext2};

2. On Main Component, assign values to context

import React from 'react';
import {View,Text,Button,Alert} from 'react-native';
import ScreenFirst1 from './ScreensFisrt/ScreenFirst1.js';
import ScreenFirst2 from './ScreensFisrt/ScreenFirst2.js';
import {MyContext} from './MyContext.js';

export default class ScreenMain extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            text:"Hola",
            text2:"Hola2"
        }
    }

    render()
    {
        return(
            <View>
                <Text>Screen Main {this.state.text}</Text>
                <MyContext.Provider 
                    value={{
                        text:this.state.text,
                        text2:this.state.text2,
                        func:()=>{Alert.alert('Finciona');},
                        funcParam:(text)=>
                        {
                            Alert.alert('Finciona '+text);
                            this.setState({text2:text});
                        }
                    }}                
                >
                    <ScreenFirst1/>
                    <ScreenFirst2/>
                </MyContext.Provider>                               
                <Button
                    title="Cambiar"
                    onPress={()=>{this.setState({text:"Cambio"});}}
                />
            </View>
        );
    }
}

3. Use Context on child components

import React from 'react';
import {View,Text,Button} from 'react-native';
import ScreenSecond1 from './ScreensSecond/ScreenSecond1.js';
import {MyContext} from '../MyContext.js';

export default class ScreenFirst1 extends React.Component
{
    static contextType = MyContext; //-----------> Call Context

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <View>
                <Text>Screen First1 {this.context.text} {this.context.text2}</Text>
                <Button
                    title="Uso de la funcion"
                    onPress={()=>{this.context.func();}}
                />
                <ScreenSecond1/>                
            </View>
        );
    }
}

#######################################################################################

# Adding Custom font
https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e

1. Get .ttf file for example here https://www.fontsquirrel.com/fonts/list/popular

Following this steps
https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e 
https://medium.com/@kswanie21/custom-fonts-in-react-native-tutorial-for-ios-android-76ceeaa0eb78
Now we need to:

# Configure
1. Add Fonts to Assets. On rootPath project

like

porject/
	assets/
		fonts/
			...ALL YOUR FONT FILES fileFont.ttf or fileFontotf
	android/
	ios/
	src/

2. Add this line on Package.json
{
	...

	"rnpm": {
		 "assets": [
		"./assets/fonts/"
		 ]
	},

	...
}

3. Link it

$ sudo react-native link

4. USE THEM on style fontFamily:'fileFont'

#######################################################################################

# Backgorund Linear Gradient
https://github.com/react-native-community/react-native-linear-gradient

1. $ sudo yarn add react-native-linear-gradient

2. Link it

	$ sudo react-native link react-native-linear-gradient

3. Use it

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Welcome extends React.Component
{
    render()
    {
        return(
            <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={Style.container}>
                <Text style={Style.text3}>Welcome Works!</Text>
            </LinearGradient>
        );
    }
}

const Style=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    text3:{
        color:'#fff'
    }
})

#######################################################################################

# react-native-flash-message
https://github.com/lucasferreira/react-native-flash-message

# Install

$ sudo yarn add react-native-flash-message

BE SURE TO PUT IT ON MAIN SCREEN, like App.js

###############################################################################

# Async Storage
https://github.com/react-native-community/async-storage

# install
$ sudo yarn add @react-native-community/async-storage

**if(react-native under 0.60)**{
	react-native link @react-native-community/async-storage	
}

# Import 
import AsyncStorage from '@react-native-community/async-storage';

# Use AsyncStorage with async

	...	
	
	this.storeData('TOKEN',JSON.stringify({id:1,token:'Exampl3Tok3N'}));
	
	...

	storeData=(key,data)=>
    {
        try 
        {
            AsyncStorage.removeItem(key,()=>{
                AsyncStorage.setItem(key, data,()=>{
                    this.getStoreData(key);
                });
            });
        }
        catch(error)
        {
            Alert.alert('Error saving data');
        }
    }

    getStoreData=(key)=>
    {
        try 
        {
            AsyncStorage.getItem(key,(err, result)=> 
            {
                if(result===null)
                {
                    Alert.alert('TOKEN NULO: '+result);
                }
                else
                {
                    var json=JSON.parse(result);
                    Alert.alert('TOKEN: '+json.token);
                    /** Go to client side */
                }
                
            }); 
        }
        catch(error)
        {
            Alert.alert('Error retriving data');
        }
    }

    removeStoreData=(key)=>
    {
        try 
        {
            AsyncStorage.removeItem(key, () => {
                Alert.alert('Data Removed');
            });
        }
        catch(error)
        {
            Alert.alert('Error removing data');
        }        
    }

# Use SyncStorage with sync

1. Create Class for Storage Handler

import AsyncStorage from '@react-native-community/async-storage';

class LocalStorage{
    
    USER_ID = 'ID';
    USER = 'USER';
    TOKEN = 'TOKEN';

    saveData = async (key, value)=>{
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getData = async (key)=>{
        try {
            const data = await AsyncStorage.getItem(key);
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    removeItem = async (key)=>{
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    removeAll = async ()=>{
        try {
            await AsyncStorage.clear();
            return true;
        } catch (error) {
            return false;
        }
    }

}

export default LocalStorage;

2. Use it on method. This methos need to be async

	/**
     * Method to execute when fetch and the response is OK
     */
    success = async (json)=>{
        await this.storage.removeItem(this.storage.USER_ID);
        if(await this.storage.saveData(this.storage.USER_ID,{id:json.user.id})){
            this.launchAlert("Bienvenido " + json.user.full_name);
            console.log((await this.storage.getData(this.storage.USER_ID)).id);
            this.setState({loadingLogin:false});
            this.props.navigation.replace('Home');
        } else {
            this.launchAlert("Hubo un error interno");
            this.setState({loadingLogin:false});
        }
    }

#######################################################################################

# Text Input Example of props: 
1. keyboardType=display a keyboard in specific
2. returnKeyType=display specific bottom for submit
3. onSubmitEditing=function to call when returnKeyType pressed after complete.

					  <TextInput
                    style={StyleBase.form1Input}
                    placeholder="Correo"
                    keyboardType="email-address"
                    returnKeyType ="next"
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    onChangeText={(text) => this.setState({mail:text})}
                />
                <TextInput
                    style={StyleBase.form1Input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    ref={(input) => { this.secondTextInput = input; }}
                    onChangeText={(text) => this.setState({pass:text})}
                />
	
#######################################################################################

# ScrollView inside View working

<View style={{flex:1}}>
    <View>
        <ToolBarMain/>
    </View>
    <ScrollView>
         <ListShop
             shops={this.state.shops}
         />
    </ScrollView>
</View>

#######################################################################################

# react-native-table-component
https://www.npmjs.com/package/react-native-table-component

$ sudo yarn add react-native-table-component

#######################################################################################

# StyleSheet list properties
https://stackoverflow.com/questions/34311756/list-of-react-native-stylesheet-properties-and-options

    alignContent
    alignItems
    alignSelf
    aspectRatio
    borderBottomWidth
    borderEndWidth
    borderLeftWidth
    borderRightWidth
    borderStartWidth
    borderTopWidth
    borderWidth
    bottom
    direction
    display
    end
    flex
    flexBasis
    flexDirection
    flexGrow
    flexShrink
    flexWrap
    height
    justifyContent
    left
    margin
    marginBottom
    marginEnd
    marginHorizontal
    marginLeft
    marginRight
    marginStart
    marginTop
    marginVertical
    maxHeight
    maxWidth
    minHeight
    minWidth
    overflow
    padding
    paddingBottom
    paddingEnd
    paddingHorizontal
    paddingLeft
    paddingRight
    paddingStart
    paddingTop
    paddingVertical
    position
    right
    start
    top
    width
    zIndex

