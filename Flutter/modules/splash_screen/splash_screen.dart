import 'package:app_name/src/_helpers/random_colors.helper.dart';
import 'package:flutter/material.dart';

class SplashScreenModule extends StatefulWidget {
  const SplashScreenModule({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<SplashScreenModule> createState() => _SplashScreenModuleState();
}

class _SplashScreenModuleState extends State<SplashScreenModule> {
  static const colors = [
    Color.fromARGB(255, 76, 142, 194),
    Color.fromARGB(255, 60, 113, 181),
  ];
  double _width = 10.0;
  double _heigth = 10.0;
  Color _color = Colors.pink;
  final BorderRadiusGeometry _borderRadius = BorderRadius.circular(8.0);

  void _changeShape() {
    setState(() {
      if (_width > 50) {
        _width = 10;
        _heigth = 10;
      } else {
        _width = _width + 10;
        _heigth = _heigth + 10;
      }

      _color = getRandomColor();
    });
  }

  void _splashAnimation(int index) {
    if (index == 0) {
      // Navigate
    } else {
      Future.delayed(const Duration(milliseconds: 250)).then((value) {
        _changeShape();
        _splashAnimation(index - 1);
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _splashAnimation(20);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: colors,
                    begin: FractionalOffset(0.0, 0.0),
                    end: FractionalOffset(1.0, 0.0),
                    stops: [0.0, 1.0],
                    tileMode: TileMode.clamp,
                  ),
                ),
                width: double.maxFinite,
                child: Padding(
                  padding: const EdgeInsets.only(top: 100),
                  child: Center(
                    child: SizedBox(
                        width: MediaQuery.of(context).size.width * 0.8,
                        child: Image.asset('assets/images/logo.png')),
                  ),
                ),
              ),
              Container(
                decoration: const BoxDecoration(
                  color: Colors.white,
                ),
                width: double.maxFinite,
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  child: Center(
                    child: AnimatedContainer(
                      //curve:
                      duration: const Duration(milliseconds: 300),
                      width: _width,
                      height: _heigth,
                      decoration: BoxDecoration(
                          borderRadius: _borderRadius, color: _color),
                    ),
                  ),
                ),
              ),
              Container(
                decoration: const BoxDecoration(
                  color: Colors.white,
                ),
                width: double.maxFinite,
                child: Padding(
                  padding: const EdgeInsets.all(1),
                  child: Center(
                    child: SizedBox(
                        width: 200,
                        child: Image.asset('assets/images/sponsors_full.png')),
                  ),
                ),
              ),
              Container(
                decoration: const BoxDecoration(
                  color: Colors.white,
                ),
                width: double.maxFinite,
                child: Padding(
                  padding: const EdgeInsets.all(1),
                  child: Center(
                    child: SizedBox(
                        width: 200,
                        child: Image.asset('assets/images/info.png')),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
