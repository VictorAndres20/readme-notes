import 'package:flutter/material.dart';

showSuccessAlert({
  required BuildContext context,
  String title = 'Bien hecho',
  required String message,
  Function? callback,
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
              Icons.check,
              color: Colors.green,
            ),
          ),
        ],
      ),
      content: Text(message),
      actions: <Widget>[
        TextButton(
          onPressed: () {
            Navigator.pop(context, 'OK');
            if (callback != null) {
              callback();
            }
          },
          child: const Text('Ok'),
        ),
      ],
    ),
  );
}
