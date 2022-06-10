import 'package:flutter/material.dart';

Widget buildRoundedAlert({
    required BuildContext context, 
    required String title,
    String textDescription = '', 
    required Function okFunc
  }) {
  return AlertDialog(
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(20.0))),
    title: Text(title),
    content: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Text(textDescription),
      ],
    ),
    actions: <Widget>[
      TextButton(
        onPressed: () => Navigator.of(context).pop(), 
        child: const Text("Cancel")
      ),
      TextButton(
        onPressed: () => okFunc(), 
        child: const Text("Ok")
      )
    ],
  );
}

void showRoundedDialog({
    required BuildContext context, 
    required String title,
    String textDescription = '', 
    required Function okFunc
  }) {
  showDialog(
    context: context,
    barrierDismissible: true,
    builder: (context) {
      return buildRoundedAlert(
        context: context,
        title: title,
        textDescription: textDescription,
        okFunc: okFunc
      );
    }
  );
}