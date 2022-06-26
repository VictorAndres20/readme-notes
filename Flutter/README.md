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
```
flutter pub add package
flutter pub get
```

**OR**

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
class HomeModule extends StatefulWidget{

}

class _HomeModuleState extends State<HomeModule>{
	//private attributes
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
  
  //If you need to initialize a state value. Like componentDidMount() in React
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
        FloatingActionButton(heroTag: 'btn1', onPressed: (){setState(() => _counter=0);},backgroundColor: Colors.red,child: Icon(Icons.add),),
        Expanded(child: SizedBox()),
        FloatingActionButton(heroTag: 'btn2', onPressed: (){setState(() => _counter--);},backgroundColor: Colors.orange,child: Icon(Icons.add),),
        SizedBox(width: 5),
        FloatingActionButton(heroTag: 'btn3', onPressed: (){setState(() => _counter++);},backgroundColor: Colors.green,child: Icon(Icons.add),),
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

# Nice Carousel Widget
Add carousel_slider: ^4.0.0 to your pubspec.yaml dependencies. And import it

Example:
```
import 'package:carousel_slider/carousel_slider.dart';

...

@override
  Widget build(context){
    return Scaffold(
      appBar: AppBar(
        title: const Text("Rhinos Natural App"),        
        backgroundColor: const Color.fromRGBO(0, 0, 0, 0.1),
      ),
      drawer: buildMainDrawer(context: context),
      backgroundColor: Colors.black12,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 5),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              CarouselSlider(
                options: CarouselOptions(
                  height: 180.0,
                  autoPlay: true,
                  autoPlayInterval: const Duration(seconds: 3),
                  autoPlayAnimationDuration: const Duration(milliseconds: 800),
                  autoPlayCurve: Curves.fastOutSlowIn,
                ),
                items: [1,2,3,4,5].map((i) {
                  return Builder(
                      builder: (BuildContext context) {
                        return Container(
                          margin: const EdgeInsets.all(8.0),
                          child: Card(
                            shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(8.0))),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.stretch, // To scale image
                              children: <Widget>[
                                Expanded(
                                  flex: 5,
                                  child: Container(
                                    color:const Color.fromRGBO(0, 0, 0, 1),
                                    child: ClipRRect(
                                      borderRadius: const BorderRadius.only(
                                        topLeft: Radius.circular(8.0),
                                        topRight: Radius.circular(8.0),
                                        bottomLeft: Radius.circular(8.0),
                                        bottomRight: Radius.circular(8.0),
                                      ),
                                      child: Image.network(
                                          'https://placeimg.com/640/480/any',                                          
                                          fit:BoxFit.fill
                                      ),
                                    ),
                                  ),
                                ),
                                Expanded(
                                  flex: 5,
                                  child: Container(
                                    alignment: Alignment.center,
                                    color: Colors.white,
                                    child: Text('$i'),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    );
                }).toList(),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 35, horizontal: 0),
                child: CarouselSlider(
                  options: CarouselOptions(
                    height: 400.0,
                    autoPlay: false,
                    scrollDirection: Axis.vertical
                  ),
                  items: ["Cardio","Abdomen","Brazo","Espalda","Pierna"].map((i) {
                    return Builder(
                      builder: (BuildContext context) {
                        return Container(
                          margin: const EdgeInsets.all(8.0),
                          child: Card(
                            shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(8.0))),
                            child: InkWell(
                              onTap: () => print("ciao"),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: <Widget>[
                                  ClipRRect(
                                    borderRadius: const BorderRadius.only(
                                      topLeft: Radius.circular(8.0),
                                      topRight: Radius.circular(8.0),
                                    ),
                                    child: Image.network(
                                        'https://placeimg.com/640/480/any',
                                      // width: 300,
                                        height: 200,
                                        fit:BoxFit.fill

                                    ),
                                  ),
                                  ListTile(
                                    title: Text('$i'),
                                    subtitle: Text('Location $i'),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        )
      )
    );
  }

...
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

2. Create lib/src/_config/app_routes.dart
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

3. Create lib/src/app.dart
```
import 'package:flutter/material.dart';

import 'package:pcat/src/_config/app_routes.dart';

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: true,
        initialRoute: "/",
        routes: getApplicationRoutes(),
        onGenerateRoute: (RouteSettings settings) =>
            getNotFoundModule(context));
  }
}
```

4. Main
```
import 'package:flutter/material.dart';

import 'package:pcat/src/app.dart';

void main() {
  runApp(const App());
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
Navigator.push(context, MaterialPageRoute(builder: (_) => HomeDoctorModule(title: 'title')));
```
```
Navigator.pushAndRemoveUntil(context,MaterialPageRoute(builder: (_) => const HomeDoctorModule(title: 'ASDS - MOCK')), (_) => false);
```
```
Navigator.pushNamed(context, item['route_name'])
```
```
Navigator.pushNamedAndRemoveUntil(context, 'login', (route) => false);
```

#### Go back
```
Navigator.of(context).pop()
```

----------------------------------------------------------------------------------------------------------

# Pass object from One page to Other with Navigator

1. Model object
```
class ExerciseType{

  String cod = '';
  String name = '';
  String imagePath = '';
  String description = '';

  ExerciseType({
    required this.cod,
    required this.name,
    required this.imagePath,
    required this.description
  });

  ExerciseType.fromJsonMap( Map<String, dynamic> json){

    cod = json['cod'];
    name = json['name'];
    imagePath= json['image_path'];
    description = json['description'];
  }
}
```

2. First StateFul Widget
Navigator.pushNamed(context, specificExerciseRoute, arguments: classObject), 
```
import 'package:flutter/material.dart';
import 'package:rhinos_natural_app/src/_helpers/storage.helper.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:rhinos_natural_app/src/_models/exercise_type.model.dart';
import 'package:rhinos_natural_app/src/_services/exercise_type.service.dart';

import 'package:rhinos_natural_app/src/routes/app_routes.dart';
import 'package:rhinos_natural_app/src/widgets/drawers/main_drawer.widget.dart';

const String loginUserLabel = 'Usuario, correo o teléfono';
const String passwordLabel = 'Contraseña';
const String loginBtnLabel = 'Entrar';
const String forgotPassBtnLabel = '¿Olvidaste tu contraseña?';
const String registerBtnLabel = '¿No tienes cuenta? Regístrate aquí';


class ExercisesModule extends StatefulWidget{
  const ExercisesModule({Key? key}) : super(key: key);


  @override
  _ExercisesModuleState createState() => _ExercisesModuleState();

}

class _ExercisesModuleState extends State<ExercisesModule>{
	//private attributes
  final TextStyle textStyle = const TextStyle(fontSize: 23);
  final double percentTipsCarousel = 0.2;
  final double percentPaddingVerticalTipsCarousel = 0.01;
  final double percentPaddingVerticalExerciseCarousel = 0.03;
  

  //Dynamic states
  String userLogin = '';
  String userPass = ''; 
  List<ExerciseType> exerciseCategories = [];

  //If you need to initialize a state value. Like componentDidMount() in React
  @override
  void initState(){
    super.initState();
    loadExerciseCategories();
  }
  
  //When Widget disposed. Exit screen. Go away mobile
  @override
  void dispose(){
    super.dispose();
  }

  loadExerciseCategories() async {
    String idUser = await getStorageIdUser();
    setState(() {
        exerciseCategories = ExerciseTypeService.findCategoriesByUser(idUser);
      });
  }

  @override
  Widget build(context){
    final screenSize = MediaQuery.of(context).size;
    final double percentExerciseCarousel = 1.0 - (percentTipsCarousel + (percentPaddingVerticalTipsCarousel * 2) + (percentPaddingVerticalExerciseCarousel * 2));

    return Scaffold(
      appBar: AppBar(
        title: const Text("Rhinos Natural App"),        
        backgroundColor: const Color.fromRGBO(0, 0, 0, 0.1),
      ),
      drawer: buildMainDrawer(context: context),
      backgroundColor: Colors.black12,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(horizontal: 30, vertical: screenSize.height * percentPaddingVerticalTipsCarousel),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.symmetric(vertical: screenSize.height * percentPaddingVerticalExerciseCarousel, horizontal: 0),
                child: CarouselSlider(
                  options: CarouselOptions(
                    height: screenSize.height * percentExerciseCarousel,
                    autoPlay: false,
                    scrollDirection: Axis.vertical
                  ),
                  items: exerciseCategories.map((i) {
                    return Builder(
                      builder: (BuildContext context) {
                        return Container(
                          margin: const EdgeInsets.all(8.0),
                          child: Card(
                            shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(8.0))),
                            child: InkWell(
                              splashColor: Colors.orange,
                              onTap: () => Navigator.pushNamed(
                                  context, 
                                  specificExerciseRoute,
                                  arguments: i
                                ),                              
                              child: Container(
                                alignment: Alignment.topLeft,
                                color: const Color.fromRGBO(0, 0, 0, 1),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.stretch,
                                  children: <Widget>[
                                    ClipRRect(
                                      borderRadius: const BorderRadius.only(
                                        topLeft: Radius.circular(8.0),
                                        topRight: Radius.circular(8.0),
                                      ),
                                      child: Image.network(
                                          i.getImagePath(),
                                        // width: 300,
                                          height: (screenSize.height * percentExerciseCarousel) - (screenSize.height * percentExerciseCarousel * 0.5),
                                          fit:BoxFit.fill

                                      ),
                                    ),
                                    ListTile(
                                      tileColor: const Color.fromRGBO(0, 0, 0, 1),
                                      title: Text(
                                        i.name, 
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold, 
                                          fontSize: 22, 
                                          color: Colors.white 
                                        )
                                      ),
                                      subtitle: Text(
                                        i.description,
                                        style: const TextStyle(
                                          fontSize: 14, 
                                          color: Colors.white 
                                        )
                                      ),
                                    ),
                                  ],
                                ),
                              )
                            ),
                          ),
                        );
                      },
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        )
      )
    );
  }
}
```

3. Get Object in other StateFul Widget
final args = ModalRoute.of(context)!.settings.arguments as ExerciseType;
```
import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:rhinos_natural_app/src/_models/exercise.model.dart';
import 'package:rhinos_natural_app/src/_models/exercise_type.model.dart';
import 'package:rhinos_natural_app/src/_services/exercise.service.dart';

import 'package:rhinos_natural_app/src/routes/app_routes.dart';
import 'package:rhinos_natural_app/src/widgets/drawers/main_drawer.widget.dart';
import 'package:rhinos_natural_app/src/widgets/alerts/rounded_alert.widget.dart';

const String loginUserLabel = 'Usuario, correo o teléfono';
const String passwordLabel = 'Contraseña';
const String loginBtnLabel = 'Entrar';
const String forgotPassBtnLabel = '¿Olvidaste tu contraseña?';
const String registerBtnLabel = '¿No tienes cuenta? Regístrate aquí';


class SpecificExerciseModule extends StatefulWidget{
  const SpecificExerciseModule({Key? key}) : super(key: key);


  @override
  _SpecificExerciseModuleState createState() => _SpecificExerciseModuleState();

}

class _SpecificExerciseModuleState extends State<SpecificExerciseModule>{
	//private attributes
  final TextStyle textStyle = const TextStyle(fontSize: 23);
  final double percentTipsCarousel = 0.2;
  final double percentPaddingVerticalTipsCarousel = 0.01;
  final double percentPaddingVerticalExerciseCarousel = 0.03;
  

  //Dynamic states
  String userLogin = '';
  String userPass = ''; 
  List<Exercise> exercises = [];

  //If you need to initialize a state value. Like componentDidMount() in React
  @override
  void initState(){
    super.initState();
  }
  
  //When Widget disposed. Exit screen. Go away mobile
  @override
  void dispose(){
    super.dispose();
  }

  loadExerciseCategories(String typeCod) async {
    print(typeCod);
    setState(() {
        exercises = ExerciseService.findByCategory(typeCod);
      });
  }

  @override
  Widget build(context){
    final screenSize = MediaQuery.of(context).size;
    final double percentExerciseCarousel = 1.0 - (percentTipsCarousel + (percentPaddingVerticalTipsCarousel * 2) + (percentPaddingVerticalExerciseCarousel * 2));

    final args = ModalRoute.of(context)!.settings.arguments as ExerciseType;
    loadExerciseCategories(args.cod);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Rhinos Natural App"),        
        backgroundColor: const Color.fromRGBO(0, 0, 0, 0.1),
      ),
      drawer: buildMainDrawer(context: context),
      backgroundColor: Colors.black12,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(horizontal: 30, vertical: screenSize.height * percentPaddingVerticalTipsCarousel),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.symmetric(vertical: screenSize.height * percentPaddingVerticalExerciseCarousel, horizontal: 0),
                child: CarouselSlider(
                  options: CarouselOptions(
                    height: screenSize.height * percentExerciseCarousel,
                    autoPlay: false,
                    scrollDirection: Axis.vertical
                  ),
                  items: exercises.map((i) {
                    return Builder(
                      builder: (BuildContext context) {
                        return Container(
                          margin: const EdgeInsets.all(8.0),
                          child: Card(
                            shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(8.0))),
                            child: InkWell(
                              splashColor: Colors.orange,
                              onTap: () => print("ciao"),
                              child: Container(
                                alignment: Alignment.topLeft,
                                color: const Color.fromRGBO(0, 0, 0, 1),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.stretch,
                                  children: <Widget>[
                                    ClipRRect(
                                      borderRadius: const BorderRadius.only(
                                        topLeft: Radius.circular(8.0),
                                        topRight: Radius.circular(8.0),
                                      ),
                                      child: Image.network(
                                          i.getImagePath(),
                                        // width: 300,
                                          height: (screenSize.height * percentExerciseCarousel) - (screenSize.height * percentExerciseCarousel * 0.5),
                                          fit:BoxFit.fill

                                      ),
                                    ),
                                    ListTile(
                                      tileColor: const Color.fromRGBO(0, 0, 0, 1),
                                      title: Text(
                                        i.name, 
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold, 
                                          fontSize: 22, 
                                          color: Colors.white 
                                        )
                                      ),
                                      subtitle: Text(
                                        i.description,
                                        style: const TextStyle(
                                          fontSize: 14, 
                                          color: Colors.white 
                                        )
                                      ),
                                    ),
                                  ],
                                ),
                              )
                            ),
                          ),
                        );
                      },
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        )
      )
    );
  }
}
```



----------------------------------------------------------------------------------------------------------

# Notch problem
If your device has notch and you dont use AppBar, use `SafeArea(child: Widget)`

----------------------------------------------------------------------------------------------------------

# Change display name app
https://stackoverflow.com/questions/49353199/how-can-i-change-the-app-display-name-build-with-flutter

1. On Android go to android/app/src/main/AndroidManifest.xml and change
```
<application
    android:label="App Name"
```

2. On IOS go to ios/Runner/info.plist and change
```
<key>CFBundleName</key>
<string>App Name</string>
```

3. Clean executing
```
flutter clean
```

----------------------------------------------------------------------------------------------------------

# SizedBox to set width and hegith to button
```
SizedBox(
  width: double.infinity, // match_parent
  height: double.infinity, // match-parent
  child: ElevatedButton(...)
)
```

----------------------------------------------------------------------------------------------------------

# Expanded to use width as percent (flex percent), max 10
```
https://stackoverflow.com/questions/43122113/sizing-elements-to-percentage-of-screen-width-height
```

----------------------------------------------------------------------------------------------------------

# Using Grids with GridView
```
       Container(
        padding: const EdgeInsets.all(10.0),
        child: GridView.builder(
          physics: const NeverScrollableScrollPhysics(),
          shrinkWrap: true,
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            mainAxisExtent: 60, // Grid Heigth
            childAspectRatio: 1.0,
            mainAxisSpacing: 10.0,
            crossAxisSpacing: 10.0,
          ),
          itemCount: 21,
          itemBuilder: (context, index) {
            return Container(
              decoration: BoxDecoration(
                border: Border.all(width: 3.0),
              ),
            );
          },
        ),
      ),
```

----------------------------------------------------------------------------------------------------------

# Image and FadeInImage Widgets
**NOTE**
Dont forget to register your assets in `pubspec.yaml`

### Image. Util with local images
```
Image(
  image: AssetImage('assets/images/logo.png'),
)
```

### FadeInImage. Util with NetWork image
```
FadeInImage(
  placeholder: AssetImage('assets/images/loading.gif'), 
  image: NetworkImage('https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg'),
  fadeInDuration: Duration(milliseconds: 300),
)
```

----------------------------------------------------------------------------------------------------------

# Storage key value kind
https://docs.flutter.dev/cookbook/persistence/key-value

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

1. Create you folder assets in root package project

2. Add your structure
- assets/images
- assets/files

3. Uncomment assets section in pubspec.yaml and register your files with absolute path
```
  assets:
    - assets/image/img.png
    - assets/files/menu.json
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

  final String pathFile = "assets/files/";
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

# Set App Lanscape
In app.dart or where MaterialApp or App is buildinng
```
import 'package:flutter/services.dart';
```
```
class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    // Set landscape orientation
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeLeft,
      DeviceOrientation.landscapeRight,
    ]);
    return MaterialApp(
        debugShowCheckedModeBanner: true,
        initialRoute: "/",
        routes: getApplicationRoutes(),
        onGenerateRoute: (RouteSettings settings) =>
            getNotFoundModule(context));
  }
}
```

# Set App Portrait
In app.dart or where MaterialApp or App is buildinng
```
import 'package:flutter/services.dart';
```
```
class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    // Set portrait orientation
    SystemChrome.setPreferredOrientations([
       DeviceOrientation.portraitDown,
       DeviceOrientation.portraitUp,
    ]);
    return MaterialApp(
        debugShowCheckedModeBanner: true,
        initialRoute: "/",
        routes: getApplicationRoutes(),
        onGenerateRoute: (RouteSettings settings) =>
            getNotFoundModule(context));
  }
}
```

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

# Custom Swipper
```
import 'package:flutter/material.dart';
import 'package:rhinos_natural_app/src/_models/subscription.model.dart';

Widget buildSubsSwiper({required List<Subscription> list}) {

  return SizedBox(
    height: 320,
    child: PageView(
      children: buildCards(300,list),
    ),
  );
}

List<Widget> buildCards(double height ,List<Subscription> list) {
  return list.map((sub) {
    return Card(
      child: Container(
        height: height,
        padding: const EdgeInsets.only(right: 10.0),
        child: Column(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Container(
              padding: const EdgeInsets.only(bottom: 7.0),
              alignment: Alignment.center,
              height: height * 0.1,
              child: Text(sub.name),
            ),
            Container(
              padding: const EdgeInsets.only(bottom: 7.0),
              height: height * 0.7,
              alignment: Alignment.center,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20.0),
                child: FadeInImage(
                  placeholder: const AssetImage("assets/images/logo1.png"),
                  image: NetworkImage(sub.getImagePath()),
                  fit: BoxFit.fitHeight,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(bottom: 7.0),
              alignment: Alignment.center,
              height: height * 0.1,
              child: Text(sub.description),
            ),
            Container(
              padding: const EdgeInsets.only(bottom: 7.0),
              alignment: Alignment.center,
              height: height * 0.1,
              child: Text(sub.price.toString()),
            ),
          ],
        )
      ),
    );
  }).toList();
}
```

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

------------------------------------------------------

### Example generic service
```
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class GenericService{

  Future<Map<String, dynamic>> findMany({bool https,@required String host,@required String path,@required Map<String, String> queryParameters}) async {
    final Uri urlBuilded = this.buildUri(https: https, host: host, path: path, queryParameters: queryParameters);
    final res = await this.fetchGet(url: urlBuilded);
    print(res.statusCode); //STATUS CODE
    //print(res.headers);
    return json.decode(res.body); //Get as Map
  }

  Future<http.Response> fetchGet({@required dynamic url, Map<String, String> headers}) async {
    if(headers != null)
      return await http.get( url , headers: headers );
    else
      return await http.get( url ); 
  }

  Uri buildUri({bool https,@required String host,@required String path,@required Map<String, String> queryParameters}){
    return https ? Uri.https(host, path, queryParameters):
                    Uri.http(host, path,queryParameters);
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
            placeholder: AssetImage("assets/images/loading.gif"), 
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

# Bloc Pattern

DATA IN     StreamController    DATA OUT
-------->|||||||||||||||||||||------------>
SINK                             STREAM



                      Widgets tree

                           1
                    2           3
                 4    5       6   7

Widget 4 and 7 need to communicate, so with BLOC PATTERN, you can make changes in 4 that 7 can hear



1. Create your Streams Controllers in you providers from `import 'dart:async';`.
```
import 'dart:async';

import 'package:componentsTemplateFlutter/src/_models/movie_model.dart';
import 'package:componentsTemplateFlutter/src/_services/generic_service.dart';

class MovieService extends GenericService{

  final String _apiKey = 'f325826239831f36d9b6e2f22091b409';
  final String _host = 'api.themoviedb.org';
  final String _language = 'es-ES';
  final String _pathNowPlaying = '3/movie/now_playing';
  final String _pathPopular = '3/movie/popular';

  //STREAM for popular movies list
  final StreamController<List<Movie>> _popularsStreamController = StreamController<List<Movie>>.broadcast();
  //SINK, data inputs
  Function(List<Movie>) get popularsSink => _popularsStreamController.sink.add;
  //STREAM, data output
  Stream<List<Movie>> get popularsStream => _popularsStreamController.stream;
  //ALWAYS close!!!!!!!!!
  void dispose(){
    _popularsStreamController?.close();
  }

  Future<List<Movie>> getPopular(List<Movie> currentMovies, int page) async {
    final resJson = await super.findMany(https: true, host: _host, path: _pathPopular, queryParameters: {
      'api_key': _apiKey,
      'language': _language,
      'page': page.toString()
    });

    List<Movie> response = buildListFromJson(resJson);

    currentMovies.addAll(response);
    popularsSink(currentMovies);

    return response;
  }

  Future<List<Movie>> getNowPlaying() async {
    final resJson = await super.findMany(https: true, host: _host, path: _pathNowPlaying, queryParameters: {
      'api_key': _apiKey,
      'language': _language,
      'page': '1'
    });
    return buildListFromJson(resJson);
  }

  List<Movie> buildListFromJson(Map<String, dynamic> resJson){
    Movies moviesObj = Movies.fromJsonList(resJson['results']);
    print(moviesObj.movies.length);
    return moviesObj.movies;
  }

}
```

2. In your StatefulWidget, call service method that return your data and use sink and stream in initState(). 
Aditional, use StreamBuilder like FutureBuilder
```
import 'package:componentsTemplateFlutter/src/_models/movie_model.dart';
import 'package:componentsTemplateFlutter/src/_services/movie_service.dart';
import 'package:componentsTemplateFlutter/src/containers/AppBars/search_app_bar.dart';
import 'package:componentsTemplateFlutter/src/containers/Swipers/stack_swiper.dart';
import 'package:componentsTemplateFlutter/src/containers/Swipers/swiper_card.dart';
import 'package:flutter/material.dart';

class MoviesModule extends StatefulWidget{

  @override
  _MoviesModuleState createState() => _MoviesModuleState();
  
}

class _MoviesModuleState extends State<MoviesModule>{

  final MovieService movieService = MovieService();

  List<Movie> populars = List();
  int page = 1;

  void initState(){
    super.initState();
    movieService.getPopular(populars, page);
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: buildSearchAppBar(
        title: "Películas disponibles",
        onSearch: (){

        }
      ),
      body: ListView(
        children: <Widget>[
          Container(
        child: Column(
          crossAxisAlignment:CrossAxisAlignment.start,
          children: <Widget>[
            FutureBuilder(
              future: movieService.getNowPlaying(), //Method that return Future
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
            ),
            Container(
              padding: EdgeInsets.only(bottom: 5.0, left: 20.0),
              width: 300,
              child: Text("Top Películas", style: TextStyle(fontSize: 20.0), textAlign: TextAlign.start),
            ),
            StreamBuilder(
              stream: movieService.popularsStream, //STREAM that return List<Movie>
              //initialData: CircularProgressIndicator(),
              builder: (BuildContext context, AsyncSnapshot<List> snapshot){
                if(snapshot.hasData) {
                  populars = snapshot.data;
                  return buildSwiperCard(list: snapshot.data);
                } else {
                  return Container(
                    height: 100.0,
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
        ],
      )
    );
  }
}
```

----------------------------------------------------------------------------------------------------------

# Use structure
**You can delete de initial test folder, create new one when you need**

0. Structure
- assets
- assets/files
- assets/images
- lib
- lib/main.dart
- lib/src/app.dart
- lib/src/modules/home_module.dart
- lib/src/widgets/AppBars/app_bar.dart
- lib/src/widgets/Inputs/checkbox.dart
- lib/src/widgets/Swipers/stack_swiper.dart
- lib/src/_providers/menu_provider.dart
- lib/src/_config/api.dart
- lib/src/_config/app_routes.dart
- lib/src/_helpers/
- lib/src/_models/
- lib/src/_services/

----------------------------------------------------------------------------------------------------------

# Camera and Image picker

1. Set minSDK Version in android/app/build.gradle
```
    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId "com.example.camera_app"
        minSdkVersion 21 <---------------------- THIS>
        targetSdkVersion 30
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
    }
```

2. IOs permissions in ios/runner/Info.plist
```
        <key>NSPhotoLibraryUsageDescription</key>
   	<string>Allow access to photo library</string>

   	<key>NSCameraUsageDescription</key>
   	<string>Allow access to camera to capture photos</string>

   	<key>NSMicrophoneUsageDescription</key>
   	<string>Allow access to microphone</string>
```

3. install
```
flutter pub add image_picker
```

4. Example Code
```
import 'dart:convert';
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:image_picker/image_picker.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}


//
// Camera Page
//

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  File? imageFile;

  @override
  void initState() {
    super.initState();
  }

  ImageProvider<Object> buildImage(File? file) {
    if (file == null) {
      return const NetworkImage(
          'https://docs.flutter.dev/assets/images/dash/dash-fainting.gif');
    } else {
      return FileImage(file);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blue,
          title: const Text(
            "HomeScreen",
            textAlign: TextAlign.center,
          ),
        ),
        body: SafeArea(
          top: true,
          bottom: true,
          child: Align(
            alignment: Alignment.center,
            child: Column(
              children: <Widget>[
                Container(
                    width: MediaQuery.of(context).size.width * 0.35,
                    height: MediaQuery.of(context).size.height * 0.2,
                    margin: const EdgeInsets.only(top: 20),
                    decoration: BoxDecoration(
                        color: Colors.grey,
                        shape: BoxShape.circle,
                        image: DecorationImage(
                            // ignore: unnecessary_null_comparison
                            image: buildImage(imageFile),
                            fit: BoxFit.cover))),
                const SizedBox(
                  height: 10.0,
                ),
                RaisedButton(
                    onPressed: () {
                      _settingModalBottomSheet(context);
                    },
                    child: const Text("Take Photo")),
              ],
            ),
          ),
        ));
  }

  //********************** IMAGE PICKER
  Future imageSelector(BuildContext context, String pickerType) async {
    XFile? xFile;
    switch (pickerType) {
      case "gallery":

        /// GALLERY IMAGE PICKER
        xFile = await ImagePicker()
            .pickImage(source: ImageSource.gallery, imageQuality: 90);

        break;

      case "camera": // CAMERA CAPTURE CODE
        xFile = await ImagePicker()
            .pickImage(source: ImageSource.camera, imageQuality: 90);
        break;
    }

    if (xFile != null) {
      print("You selected  image : " + xFile.path);
      setState(() {
        imageFile = File(xFile!.path);
      });
      final bytes = File(xFile.path).readAsBytesSync();
      String bytes64 = base64Encode(bytes);
      print(bytes64);
    } else {
      print("You have not taken image");
    }
  }

  // Image picker
  void _settingModalBottomSheet(context) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext bc) {
          return Wrap(
            children: <Widget>[
              ListTile(
                  title: const Text('Gallery'),
                  onTap: () => {
                        imageSelector(context, "gallery"),
                        Navigator.pop(context),
                      }),
              ListTile(
                title: const Text('Camera'),
                onTap: () =>
                    {imageSelector(context, "camera"), Navigator.pop(context)},
              ),
            ],
          );
        });
  }
}

```

----------------------------------------------------------------------------------------------------------

# ListView Builder for auto map arrays and build many tiles
```
import 'package:asds/src/widgets/app_bars/avatar_app_bar.dart';
import 'package:asds/src/widgets/drawers/main_drawer.dart';
import 'package:flutter/material.dart';

const data = [
  {
    "uuid": "1",
    "name": "Cardiovascular",
    "description": "Información en temas cardiovasculares"
  },
  {
    "uuid": "2",
    "name": "Cáncer",
    "description": "Conoce sobre temas relevantes en cáncer"
  },
  {
    "uuid": "3",
    "name": "Diabetes",
    "description": "Ten concimiento sobre los problemas de diabetes"
  },
  {
    "uuid": "4",
    "name": "Pulmonar",
    "description": "A la mano temas en problemas de área pulmonar"
  },
];

class HomeDoctorModule extends StatefulWidget {
  const HomeDoctorModule({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<HomeDoctorModule> createState() => _HomeDoctorModuleState();
}

class _HomeDoctorModuleState extends State<HomeDoctorModule> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAvatarAppBar(title: 'ASDS - MOCK') as PreferredSizeWidget,
      drawer: buildMainDrawer(context: context),
      body: ListView.builder(
          itemCount: data.length,
          itemBuilder: (BuildContext context, int index) {
            Map<String, String> d = data[index];

            return Container(
              padding: const EdgeInsets.fromLTRB(30, 30, 30, 0),
              height: 220,
              width: double.maxFinite,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(30.0),
                child: Card(
                  elevation: 5,
                  child: InkWell(
                    onTap: () {
                      print('Hola');
                    },
                    child: Container(
                      width: double.maxFinite,
                      height: 300,
                      padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            Color(0xFF3366FF),
                            Color(0xFF00CCFF),
                          ],
                          begin: FractionalOffset(0.0, 0.0),
                          end: FractionalOffset(1.0, 0.0),
                          stops: [0.0, 1.0],
                          tileMode: TileMode.clamp,
                        ),
                      ),
                      child: Row(
                        children: [
                          SizedBox(
                            width: (MediaQuery.of(context).size.width - 70) / 2,
                            child: const Image(
                              fit: BoxFit.cover,
                              image: AssetImage('assets/images/logo.png'),
                            ),
                          ),
                          SizedBox(
                            width: (MediaQuery.of(context).size.width - 70) / 2,
                            child: Center(
                              child: Text(d["name"] ?? ""),
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            );
          }),
    );
  }
}

```

----------------------------------------------------------------------------------------------------------

# ListView render problem
```
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: ListView(
        scrollDirection: Axis.vertical, // ----- THIS
        shrinkWrap: false, // ----- THIS
        children: [
          Text('Hola'),
          Text('Hola'),
          Text('Hola'),
          Text('Hola'),
        ],
      ),
    );
  }
```

----------------------------------------------------------------------------------------------------------

# TextField Fixed Heigth
```
return Padding(
    padding: const EdgeInsets.symmetric(vertical: 5.0),
    child: Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '${data["id"]} - ${data["question"]}',
          style: const TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        TextFormField(
          decoration: const InputDecoration(
            border: OutlineInputBorder(),
            isDense: true, // ---------------------------------------------> THIS
            contentPadding: EdgeInsets.all(8), // -------------------------> THIS
          ),
          initialValue: data["value"] ?? "",
          onChanged: ((value) {
            handleAnswerOpen(data['uuid'], data['type'], value);
          }),
        ),
        const Divider(
          height: 20,
          thickness: 1,
          indent: 20,
          endIndent: 0,
          color: Colors.black,
        ),
      ],
    ),
  );
```

----------------------------------------------------------------------------------------------------------

# Generate APK
```
flutter clean
flutter build apk
```

APK generated in project/build/app/outputs/flutter-apk

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