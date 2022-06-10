import 'package:flutter/material.dart';

Widget buildBasicAppBar({String? title}) {
  return AppBar(
    // backgroundColor: const Color.fromARGB(255, 103, 106, 114),
    title: Text(title ?? 'ASDS'),
  );
}
