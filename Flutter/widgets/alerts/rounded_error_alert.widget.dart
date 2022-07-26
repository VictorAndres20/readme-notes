import 'package:flutter/material.dart';

showErrorAlert({
  required BuildContext context,
  String title = 'Error',
  required String message,
}) {
  showDialog<String>(
    context: context,
    builder: (BuildContext context) => AlertDialog(
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(
          Radius.circular(32.0),
        ),
      ),
      title: Row(
        mainAxisSize: MainAxisSize.max,
        children: [
          Expanded(
            child: Text(title),
          ),
          const Expanded(
            child: Icon(
              Icons.warning,
              color: Colors.red,
            ),
          ),
        ],
      ),
      content: Text(message),
      actions: <Widget>[
        TextButton(
          onPressed: () => Navigator.pop(context, 'OK'),
          child: const Text('Ok'),
        ),
      ],
    ),
  );
}
