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
Extensions / Flutter



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
```
import 'package:flutter/material.dart';

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