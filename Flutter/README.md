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
1. Create private class that will be the state of the Widget ans extends from State<YourStatefulWidget>, and put all private attributes
This attributes will be all states that can refresh with `setState((){})` function.
```
class _HomeModuleState extends State<StatefulWidget>{
	int _counter = 0;
}
```

2. In state class, override build method that return `Widget` and has `context` parameter
```
class HomeModule extends StatefulWidget{

}

class _HomeModuleState extends State<HomeModule>{

  final textStyle = new TextStyle(fontSize: 30);

  int _counter = 0;
  
  //If you need to initialize a state value
  @override
  void initState(){
    super.initState();
	
  }
  
  //When Widget disposed. Exit screen. Go away mobile
  @override
  void dispose(){
    super.dispose();

  }

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
  _HomeModuleState createState() => _HomeModuleState();
}
```

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

### Icon helper by name
```
import 'package:flutter/material.dart';

final iconsData = <String, IconData>{
  'add_alert': Icons.add_alert,
  'accessibility': Icons.accessibility,
  'folder_open' : Icons.folder_open
};

Icon getIconFromStr(String iconKey) => Icon(iconsData[iconKey], color: Colors.blue,);
```

----------------------------------------------------------------------------------------------------------

# Simple Navigation

1. Create Modules Widgets in lib/src/modules
In this examples, created 3 modules. Home, Alerts, Avatars. As StatelessWidgets.

2. Create lib/src/routes/app_routes.dart
```
import 'package:flutter/material.dart';

import 'package:componentsTemplateFlutter/src/modules/HomeModule.dart';
import 'package:componentsTemplateFlutter/src/modules/AlertsModule.dart';
import 'package:componentsTemplateFlutter/src/modules/AvatarsModule.dart';

// Route '/' is the initial route
Map<String, WidgetBuilder> getApplicationRoutes() {
  return <String, WidgetBuilder>{
    "/": (context) => HomeModule(),
    "alert": (context) => ALertsModule(),
    "avatar": (context) => AvatarsModule(),
  };
}

MaterialPageRoute getNotFoundModule(BuildContext context) {
  return MaterialPageRoute(
      builder: (BuildContext context) => Center(child: Text("Ruta no existe"))
  );
}

```

3. Create lib/src/App.dart
```
import 'package:flutter/material.dart';

import 'package:componentsTemplateFlutter/src/routes/app_routes.dart';

class App extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Components Template App',
      debugShowCheckedModeBanner: false,
      initialRoute: "/",
      routes: getApplicationRoutes(),
      onGenerateRoute: ( RouteSettings settings ) => getNotFoundModule(context)
    );
  }
}
```

4. Main
```
import 'package:flutter/material.dart';

import 'package:componentsTemplateFlutter/src/app.dart';

void main() {
  runApp(App());
}
```

5. Navigate like this in HomeModule
```
import 'package:componentsTemplateFlutter/src/containers/AppBars/TransparentAppBar.dart';
import 'package:componentsTemplateFlutter/src/containers/ListViews/MapListView.dart';
import 'package:componentsTemplateFlutter/src/providers/menu_provider.dart';
import 'package:flutter/material.dart';

class HomeModule extends StatelessWidget{

  final _titleScreen = "HomeScreen";

  @override
  Widget build( context ){
    print(menuProvider.options);
    return Scaffold(
      appBar: TransparentAppBar(titleAppBar: _titleScreen,).build(context),
      body: buildList()
    );
  }

  Widget buildList(){
    return FutureBuilder(
      future: menuProvider.loadOptions(), // function that return the data as Future
      initialData: [], // Initial data
      builder: (context , AsyncSnapshot<List<dynamic>> snapshot) {
        print(snapshot.data);

        return MapListView(items: snapshot.data);
      },
    );
  }
}
```

6. Custom StatelessWidget MapListView is tha widget that use `Navigator.pushNamed(context, item['route']);`.
```
import 'package:componentsTemplateFlutter/src/_helpers/icon_string_helper.dart';
import 'package:flutter/material.dart';

class MapListView extends StatelessWidget{
  final List<dynamic> items;

  MapListView({this.items});

  @override
  Widget build( context ){
    return ListView(
      children: this.buildItems( context )
    );
  }

  List<Widget> buildItems(BuildContext context){
    return this.items.map(( item ){
      return Column(
        children: <Widget>[
          ListTile(
            title: Text(item["text"]),
            leading: getIconFromStr(item['icon']), //Left icon,
            trailing: Icon(Icons.arrow_forward_ios), //Rigth icon
            onTap: (){Navigator.pushNamed(context, item['route']);},
          ),
          Divider()
        ],
      );
    }).toList();
  }
}
```

### Navigator methods

#### Navigate with route name
```
Navigator.pushNamed(context, item['route_name'])
```

#### Go back
```
Navigator.of(context).pop()
```

----------------------------------------------------------------------------------------------------------

# Notch problem
If your device has notch and you dont use AppBar, use `SafeArea(child: Widget)`

----------------------------------------------------------------------------------------------------------

# Image and FadeInImage Widgets
**NOTE**
Dont forget to register your assets in `pubspec.yaml`

### Image. Util with local images
```
Image(
  image: AssetImage('resources/images/logo.png'),
)
```

### FadeInImage. Util with NetWork image
```
FadeInImage(
  placeholder: AssetImage('resources/images/loading.gif'), 
  image: NetworkImage('https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg'),
  fadeInDuration: Duration(milliseconds: 300),
)
```

----------------------------------------------------------------------------------------------------------

# Flutter Widgets Catalog
https://flutter.dev/docs/development/ui/widgets

## Style Classes
- Padding()
- padding: EdgeInsets.
- margin: EdgeInsets.
- color: Colors.
- decoration: BoxDecoration({borderRadius, color, boxShadow: <BoxShadow>[BoxShadow({color, blurRadius, spredRadius, offset(Offset(20,10))})]})
- elevation: double
- shape: RoundedRectangleBorder(borderRadius: BorderRadius. )
- mainAxisAligment: MainAxisAlignment.
- crossAxisAlignment: CrossAxisAlignment.
- mainAxisSize: 

## Common Layout Widgets

- Center
- SizedBox
- Transform
- Container
- Column
- Row
- GridView
- ListView -> This has scroll by default
```
import 'package:flutter/material.dart';

//To use in other as Widget, use SimpleListView(items: [Map<String,dynamic>,...]).build(context)
class SimpleListView extends StatelessWidget{
  final List<dynamic> items;

  SimpleListView({this.items});

  @override
  Widget build( context ){
    return ListView(
      children: this.buildItems()
    );
  }

  List<Widget> buildItems(){
    return this.items.map(( item ){
      return Column(
        children: <Widget>[
          ListTile(
            title: Text(item['text']),
			leading: Icon(Icons.arrow_forward_ios), //Left Widget example icon,
            trailing: Icon(Icons.arrow_forward_ios), //Rigth Widget example icon
            onTap: (){print("Tapped");},
          ),
		  Divider()
        ],
      );
    }).toList();
  }
}
```

- And MORE...

## Common Widgets Scroll

Example
- ScrollView

## Common Flutter Material Widgets
https://flutter.dev/docs/development/ui/widgets/material

When you `import 'package:flutter/material.dart';`, you can use all Flutter Material Widgets

- Scaffold
Classic Material Structure Screen


----------------------------------------------------------------------------------------------------------

# Use static resources like files.json or Images

1. Create you folder resources in root package project

2. Add your structure
- resources/images
- resources/files

3. Uncomment assets section in pubspec.yaml and register your files with absolute path
```
  assets:
    - resources/image/img.png
    - resources/files/menu.json
```

4. Save, detach and execute again `flutter run`

**To use this files like JSON**
1. Create folder `lib/src/providers`

2. Here, create your class that get the data.
JSON file menu.json
```
{"routes":[
        {"route":"alert","icon":"add_alert","text":"Alertas"},
        {"route":"avatar","icon":"accessibility","text":"Avatars"},
        {"route":"card","icon":"folder_open","text":"Cards - Tarjetas"}]}
```
Provider PRIVATE class. To get instance one
```
import 'package:flutter/services.dart' show rootBundle;
import 'dart:convert';

class _MenuProvider{

  final String pathFile = "resources/files/";
  final String fileName = "menu.json";
  List<dynamic> options = [];

  Future<List<dynamic>> loadOptions() async{
    String data = await rootBundle.loadString("${pathFile + fileName}");
    Map dataMap = json.decode(data);
    options = dataMap['routes'];
    print(options);
    return options;
  }
}

final menuProvider = new _MenuProvider();
```

3. Now, you can use menuProvider.loadOptions() with FutureBuilder inside Widget



----------------------------------------------------------------------------------------------------------

# Animated Container
```
import 'dart:math';

import 'package:componentsTemplateFlutter/src/_helpers/color_random.dart';
import 'package:componentsTemplateFlutter/src/containers/AppBars/avatar_appbar.dart';
import 'package:flutter/material.dart';

class AnimatedModule extends StatefulWidget{

  @override
  _AnimatedModuleState createState() => _AnimatedModuleState();
  
}

class _AnimatedModuleState extends State<AnimatedModule>{

  final String title = "Animated";

  double _width = 50.0;
  double _heigth = 50.0;
  Color _color = Colors.pink;
  BorderRadiusGeometry _borderRadius = BorderRadius.circular(8.0);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAvatarAppBar(title: title),
      body: Center(
        child: AnimatedContainer(
		  //curve: 
          duration: Duration(milliseconds: 300),
          width: _width,
          height: _heigth,
          decoration: BoxDecoration(
            borderRadius: _borderRadius,
            color: _color
          ),
        )
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => this._changeShape(),
        backgroundColor: Colors.red,
        child: Icon(Icons.play_arrow),
      ),
    );
  }
  void _changeShape(){
    final random = Random();

    setState(() {
      _width = random.nextInt(200).toDouble();
      _heigth = random.nextInt(200).toDouble();
      _color = getRandomColor();
    });
  }
}
```

## Look to Animation curves

----------------------------------------------------------------------------------------------------------

# Flutter Swipper
https://pub.dev/packages/flutter_swiper

1. Install it in pubspec.yaml under dependencies:
```
dependencies:
  ...
  flutter_swiper : ^1.1.6
```

2. Run
```
$ flutter packages get
```

3. Usages
```
import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

Widget buildSwiper(){
  return Container(
    width: double.infinity,
    height: 300.0,
    child: Swiper(
      itemBuilder: (BuildContext context,int index){
        return new Image.network(
          "http://via.placeholder.com/350x150",
          fit: BoxFit.fill,
        );
      },
      itemCount: 3,
      //pagination: new SwiperPagination(), // This, render Dots pagination under
      //control: new SwiperControl(), // This, render < > controller in right and left sides
    ),
  );
}
```


----------------------------------------------------------------------------------------------------------

# Http requests
https://pub.dev/packages/http

1. Install it in pubspec.yaml under dependencies:
```
dependencies:
  ...
  http: ^0.12.1
```

2. Run
```
$ flutter packages get
```

3. Import
```
import 'package:http/http.dart' as http;
```

4. Usages GET
```
import 'package:componentsTemplateFlutter/src/_models/movie_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MovieService{

  String _apiKey = 'f325826239831f36d9b6e2f22091b409';
  String _url = 'api.themoviedb.org';
  String _language = 'es-ES';
  String _path = '3/movie/now_playing';

  Future<List<Movie>> getNowPlaying() async {
    final url = Uri.https(_url, _path,{
      'api_key': _apiKey,
      'language': _language,
      'page': '1'
    });
    final res = await http.get( url );
    print(res.statusCode); //STATUS CODE
    //print(res.headers);
    final resJson = json.decode(res.body); //Get as Map
    Movies moviesObj = Movies.fromJsonList(resJson['results']);
    print(moviesObj.movies.length);
    return moviesObj.movies;
  }

}
```





----------------------------------------------------------------------------------------------------------

# FutureBuilder for Widgets that need AsyncData access

1. Create your model
```
class Movies{
  List<Movie> movies = new List();

  Movies();

  Movies.fromJsonList(List<dynamic> list){
    if(list == null)return;

    for(var item in list){
      final movie = Movie.fromJsonMap(item);
      this.movies.add(movie);
    }
  }
}

class Movie{

  int voteCount;
  int id;
  bool video;
  double voteAverage;
  String title;
  double popularity;
  String posterPath;
  String originalLanguage;
  String originalTitle;
  List<int> genereIds;
  String backdropPath;
  bool adult;
  String overview;
  String releaseDate;

  Movie({
    this.voteCount,
    this.id,
    this.video,
    this.voteAverage,
    this.title,
    this.popularity,
    this.posterPath,
    this.originalLanguage,
    this.originalTitle,
    this.genereIds,
    this.backdropPath,
    this.adult,
    this.overview,
    this.releaseDate
  });

  Movie.fromJsonMap( Map<String, dynamic> json){

    this.voteCount = json['vote_count'];
    this.id = json['id'];
    this.video = json['video'];
    this.voteAverage = json['vote_average'] /1;
    this.title = json['title'];
    this.popularity = json['popularity'] / 1;
    this.posterPath = json['poster_path'];
    this.originalLanguage = json['original_language'];
    this.originalTitle = json['original_title'];
    this.genereIds = json['genre_ids'].cast<int>();
    this.backdropPath = json['backdrop_path'];
    this.adult = json['adult'];
    this.overview = json['overview'];
    this.releaseDate = json['release_date'];

  }

  String getPosterPath(){
    if(this.posterPath == null){
      return "https://cdn2.iconfinder.com/data/icons/photo-and-video/500/Landscape_moon_mountains_multiple_photo_photograph_pictury_sun-512.png";
    } else {
      return "https://image.tmdb.org/t/p/w500$posterPath";
    }    
  }

}
```

2. Create your service with `http`
```
import 'package:componentsTemplateFlutter/src/_models/movie_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MovieService{

  String _apiKey = 'f325826239831f36d9b6e2f22091b409';
  String _url = 'api.themoviedb.org';
  String _language = 'es-ES';
  String _path = '3/movie/now_playing';

  Future<List<Movie>> getNowPlaying() async {
    final url = Uri.https(_url, _path,{
      'api_key': _apiKey,
      'language': _language,
      'page': '1'
    });
    final res = await http.get( url );
    print(res.statusCode); //STATUS CODE
    //print(res.headers);
    final resJson = json.decode(res.body); //Get as Map
    Movies moviesObj = Movies.fromJsonList(resJson['results']);
    print(moviesObj.movies.length);
    return moviesObj.movies;
  }

}
```

3. On Widget use FutureBuilder
```
import 'package:componentsTemplateFlutter/src/_services/movie_service.dart';
import 'package:componentsTemplateFlutter/src/containers/AppBars/search_app_bar.dart';
import 'package:componentsTemplateFlutter/src/containers/Swipers/stack_swiper.dart';
import 'package:flutter/material.dart';

class MoviesModule extends StatefulWidget{

  @override
  _MoviesModuleState createState() => _MoviesModuleState();
  
}

class _MoviesModuleState extends State<MoviesModule>{

  final MovieService movieService = MovieService();

  void initState(){
    super.initState();
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: buildSearchAppBar(
        title: "Películas disponibles",
        onSearch: (){

        }
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            FutureBuilder(
              future: movieService.getNowPlaying(), //Methos that return Future
              //initialData: CircularProgressIndicator(),
              builder: (BuildContext context, AsyncSnapshot<List> snapshot){
                if(snapshot.hasData) {
                  return buildStackSwiper(context: context, list: snapshot.data);
                } else {
                  return Container(
                    height: 200.0,
                    child: Center(
                      child: CircularProgressIndicator(),
                    ),
                  );
                }
              }
            )
          ],
        ),
      ),
    );
  }
}
```

4. buildStackSwiper method 
```
import 'package:componentsTemplateFlutter/src/_models/movie_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

final double percentWidthItemSwiper = 0.7;
final double percentHeightItemSwiper = 0.5;

Widget buildStackSwiper({@required BuildContext context, @required List<Movie> list}){
  final screenSize = MediaQuery.of(context).size;

  return Container(
    padding: EdgeInsets.all(20.0),
    height: 300.0,
    child: Swiper(
      itemBuilder: (BuildContext context,int index){
        return ClipRRect(
          borderRadius: BorderRadius.circular(20.0),
          child: FadeInImage(
            placeholder: AssetImage("resources/images/loading.gif"), 
            image: NetworkImage(list[index].getPosterPath()),
            fit: BoxFit.cover,
          ),
        );
      },
      itemCount: list.length,
      //pagination: new SwiperPagination(), // This, render Dots pagination under
      //control: new SwiperControl(), // This, render < > controller in right and left sides
      layout: SwiperLayout.STACK,
      itemWidth: screenSize.width * percentWidthItemSwiper,
      itemHeight: screenSize.height * percentHeightItemSwiper,
    ),
  );
}
```

----------------------------------------------------------------------------------------------------------

# Use structure
**You can delete de initial test folder, create new one when you need**

0. Structure
- resources
- resources/files
- resources/images
- lib
- lib/main.dart
- lib/src/app.dart
- lib/src/routes/app_routes.dart
- lib/src/modules/home_module.dart
- lib/src/widgets/AppBars/app_bar.dart
- lib/src/widgets/Inputs/checkbox.dart
- lib/src/widgets/Swipers/stack_swiper.dart
- lib/src/providers/menu_provider.dart
- lib/src/config/api.dart
- lib/src/_helpers/
- lib/src/models/
- lib/src/services/

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