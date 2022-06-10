import 'package:flutter/material.dart';

Widget buildRoundInput({
  bool isSecret = false,
  required String label, 
  required String value,
  required Function onChangeFunc, 
  required IconData icon,
  TextInputType keyboardType = TextInputType.emailAddress,
  TextInputAction textInputAction = TextInputAction.next
  }){
  return TextField(
    //autofocus: true,
    obscureText: isSecret,
    textCapitalization: TextCapitalization.sentences,
    keyboardType: keyboardType,
    decoration: InputDecoration(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(20.0)
      ),
      hintText: "Digita $label",
      labelText: label,
      icon: Icon(icon)
    ),
    onChanged: (data) => onChangeFunc(data),
    textInputAction: textInputAction,
  );
}