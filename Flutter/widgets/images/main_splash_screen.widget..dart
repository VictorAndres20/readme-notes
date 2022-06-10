import 'package:flutter/material.dart';

Widget buildMainSplashScreen({required double widthImage, required double imageOpacity}){
  return(
    Container(
      width: widthImage,
      decoration: BoxDecoration(
        color: Colors.black12,
        image: DecorationImage(
          image: const AssetImage('resources/images/logo1.png'),
          fit: BoxFit.contain,
          colorFilter: ColorFilter.mode(Colors.black.withOpacity(imageOpacity), BlendMode.dstATop),
        ),
        borderRadius: BorderRadius.circular(12),
      ),
    )
  );
}