import 'package:flutter/material.dart';

Widget buildRadioButton({
    required String label,
    required String radioValue,
    required String groupValue,
    required Function onChange
  }){
  return(
    ListTile(
      title: Text(label),
      leading: Radio<dynamic>(
        value: radioValue,
        groupValue: groupValue,
        onChanged: (value) {
          onChange(value);
        },
      ),
    )
  );
}