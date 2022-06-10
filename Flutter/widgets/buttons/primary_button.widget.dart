import 'package:flutter/material.dart';

Widget buildButton({required String label, required Function onPress}){
  return(
    ElevatedButton(
            style: ElevatedButton.styleFrom(
              textStyle: const TextStyle(fontSize: 14)
            ),
            onPressed: () {onPress();},
            child: Text(label),
    )
  );
}

Widget buildPrimaryButton({required String label, required Function onPress, bool parentWidth = true}){
  if(parentWidth){
    return(
      SizedBox(
        width: double.infinity, // <-- match_parent
        child: buildButton(label: label, onPress: onPress)
      )
    );
  } else {
    return(
      buildButton(label: label, onPress: onPress)
    );
  }
}