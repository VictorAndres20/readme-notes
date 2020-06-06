# Flutter on Ubuntu 16.04

## Pre-dependencies
1. NEEDED JDK INSTALLED

2. Environment Variables on .bash_profile:
```
export ANDROID_HOME="/home/victorandres/Android/Sdk/"
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/tools"
export PATH="$PATH:$ANDROID_HOME/tools/bin"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
```

----------------------------------------------------------------------------------------------------------


# Install SDK
https://flutter.dev/docs/get-started/install

1. Download SDK

2. Extract .tar package

3. Put your SDK where you want

4. Set environment path on .bash_profile to use 'flutter' command. Maybe you can skip this, but you need always to call fluuter command with
/path/to/sdk/flutter/bin/flutter <action>
```
export PATH="$PATH:/path/to/sdk/flutter/bin"
```

5. OPTIONAL 
```
$ flutter precache
```

6. See if there are any dependencies you need to install to complete the setup, 
like update Android SDK Version with /path/to/android(sdk/tools/bin/sdkmanager "platforms;android-28" "build-tools;28.0.3"
, Accept Licenses, VSCode plugins or AndroidStudio Plugins
```
$ flutter doctor
```

7. OPTIONAL VSCode config
Extensions:
- Flutter
- Dart



----------------------------------------------------------------------------------------------------------

# Create project
```
$ flutter create myapp
```

## Run on android
```
$ flutter devices
$ flutter run
```

## Reload and Restart
On terminal press "r" Reload but when application finish, changes dont save on Devie
On terminal press "R" Restart

## Stop flutter run
On terminal press "d"

## Some usefull things
https://flutter.dev/docs/cookbook



----------------------------------------------------------------------------------------------------------

# External packages
https://pub.dartlang.org/

1. On pubspec.yaml 
```
dependencies:
	package_name: ^version
```

2. Command
```
$ flutter packages get
```

3. Use package
```
import 'package:package_name/class.dart';
```


----------------------------------------------------------------------------------------------------------

# Root Application Widget
In Flutter, as Dart, need main function!!
In Flutter, in main you need to execute runApp(AppWidget) function.
```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

// This widget is the root of your application.
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
	  debugShowCheckedModeBanner: false, //To dismiss debug advice
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text("Ejemplo"),
        ),
        body: Center(
          child: Text("Hola mundo"),
        ),
      )
    );
  }
}
```

**IMPORTANT**
If you change the name of your MyApp Widget, make sure to change it in test class

----------------------------------------------------------------------------------------------------------

# Steps to create StatelessWidget

0. Need `import 'package:flutter/material.dart';` import
1. Create class and extends from StatelessWidget
```
class HomeModule extends StatelessWidget{

}
```

2. Override build method that return `Widget` and has `context` parameter
```
  @override
  Widget build(context){
    return [Widget]
  }
```

StatelessWidget has inmutable attributes

-----------------------------------------------

# Steps to create StatefulWidget

0. Need `import 'package:flutter/material.dart';` import
1. Create private class that will be the state of the Widget ans extends from State<StatefulWidget>, and put all private attributes
This attributes will be all states that can refresh with `setState((){})` function.
```
class _HomeModuleState extends State<StatefulWidget>{
	int _counter = 0;
}
```

2. In state class, override build method that return `Widget` and has `context` parameter
```
// StateFullWidget above

class _HomeModuleState extends State<StatefulWidget>{

  final textStyle = new TextStyle(fontSize: 30);

  int _counter = 0;

  @override
  Widget build(context){
    return Scaffold(
      appBar: AppBar(
        title: Text("Title Home"),
        backgroundColor: Color.fromRGBO(0, 0, 0, 0.1),
      ),
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text("Taps: ",style: textStyle,),
            Text('$_counter', style: textStyle,)
          ],
        ),
      ),
      floatingActionButton: buildButtons(),
    );
  }

  Widget buildButtons(){
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: <Widget>[
        SizedBox(width: 30),
        FloatingActionButton(onPressed: (){setState(() => _counter=0);},backgroundColor: Colors.red,child: Icon(Icons.add),),
        Expanded(child: SizedBox()),
        FloatingActionButton(onPressed: (){setState(() => _counter--);},backgroundColor: Colors.orange,child: Icon(Icons.add),),
        SizedBox(width: 5),
        FloatingActionButton(onPressed: (){setState(() => _counter++);},backgroundColor: Colors.green,child: Icon(Icons.add),),
        SizedBox(width: 5)
      ],
    );
  }
}
```

3. Create class and extends from StatefulWidget
```
class HomeModule extends StatefulWidget{

}
```

4. Override createState method that return the private state class instance
```
class HomeModule extends StatefulWidget{

  @override
  State<StatefulWidget> createState() => _HomeModuleState();
}
```


----------------------------------------------------------------------------------------------------------

# Use structure
**You can delete de initial test folder, create new one when you need**

0. Structure
- lib
- lib/main.dart
- lib/src/app.dart
- lib/src/modules/home_module.dart

----------------------------------------------------------------------------------------------------------

# Columns and Rows layout from 'package:flutter/material.dart'

### Column Widget
```
  @override
  Widget build(context){
    return Scaffold(
      appBar: AppBar(
        title: Text("Title Home"),
        backgroundColor: Color.fromARGB(1, 200, 200, 200),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "Hello World",
              style: TextStyle(
                fontSize: 30
              ),
            ),
            Text("Hello World")
          ],
        ),
      ),
    );
  }
```

### Row Widget
```
  @override
  Widget build(context){
    return Scaffold(
      appBar: AppBar(
        title: Text("Title Home"),
        backgroundColor: Color.fromARGB(1, 200, 200, 200),
      ),
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "Hello World",
              style: TextStyle(
                fontSize: 30
              ),
            ),
            Text("Hello World")
          ],
        ),
      ),
    );
  }
```

----------------------------------------------------------------------------------------------------------

# Icons pre loaded
Material Design
```
Icon(Icons.[name])
```

----------------------------------------------------------------------------------------------------------

# Common Flutter Material Widgets
https://flutter.dev/docs/development/ui/widgets/material

When you `import 'package:flutter/material.dart';`, you can use all Flutter Material Widgets

## Scaffold
Classic Material Structure Screen

----------------------------------------------------------------------------------------------------------

# Fisrt tutorial using Custom Widgets
```
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(MyApp());

// This widget is the root of your application.
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: RandomWords()
    );
  }
}

class RandomWords extends StatefulWidget
{
  @override
  RandomWordsState createState()=> RandomWordsState();
}

class RandomWordsState extends State
{
  final List<WordPair> _suggestions=<WordPair>[];
  final Set<WordPair> _saved = Set<WordPair>();

  Widget _buildList()
  {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemBuilder: (context, i)
      {
        if (i.isOdd) return Divider();
        final index = i ~/ 2;
        if (index >= _suggestions.length) {
          _suggestions.addAll(generateWordPairs().take(10));
        }
        return _buildListRow(_suggestions[index]);
      },
    );
  }

  Widget _buildListRow(WordPair pair)
  {
    final bool alreadySaved = _saved.contains(pair);
    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: const TextStyle(
          fontSize: 12.0
        ),
      ),
      trailing:Icon(
        alreadySaved ? Icons.favorite : Icons.favorite_border,
        color: alreadySaved ? Colors.red : null,
      ),
      onTap: (){
        if(alreadySaved)
        {
          setState(() {
            _saved.remove(pair);
          });          
        }
        else
        {
          setState(() {
            _saved.add(pair); 
          });
        }
      },
    );
  }

  @override
  Widget build(BuildContext context)
  {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Generador"
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.list),
            onPressed: _goToSaved,
          )
        ],
      ),
      body: _buildList(),
    );
  }

  void _goToSaved()
  {
    Navigator.of(context).push(
    MaterialPageRoute<void>(
      builder: (BuildContext context) {
        final Iterable<ListTile> tiles = _saved.map(
          (WordPair pair) {
            return ListTile(
              title: Text(
                pair.asPascalCase,
                style: const TextStyle(
                  fontSize: 12.0
                ),
              ),
            );
          },
        );
        final List<Widget> divided = ListTile
          .divideTiles(
            context: context,
            tiles: tiles,
          )
          .toList();

        return Scaffold(     
          appBar: AppBar(
            title: Text('Saved Suggestions'),
          ),
          body: ListView(children: divided),
        );
      },
    ),
  );
  }
}
```

----------------------------------------------------------------------------------------------------------