import 'package:flutter/material.dart';

Widget buildAvatarAppBar({String? title}) {
  return AppBar(
    // backgroundColor: const Color.fromARGB(255, 103, 106, 114),
    title: Text(title ?? 'ASDS'),
    actions: <Widget>[
      Container(
        margin: const EdgeInsets.only(right: 20),
        child: const CircleAvatar(
          backgroundColor: Color.fromARGB(255, 201, 208, 228),
          child: Text("VP"),
        ),
      ),
    ],
  );
}
