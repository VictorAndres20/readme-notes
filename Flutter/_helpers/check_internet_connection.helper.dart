import 'dart:io';
// flutter pub add connectivity_plus
import 'package:connectivity_plus/connectivity_plus.dart';

Future<bool> tryConnection(String url) async {
  try {
    final response = await InternetAddress.lookup(url);

    if (response.isNotEmpty) {
      return true;
    }
    return false;
  } on SocketException catch (e) {
    return false;
  }
}

Future<bool> checkInternetConnection() async {
  final ConnectivityResult result = await Connectivity().checkConnectivity();

  if (result == ConnectivityResult.none) {
    return false;
  }
  return true;
}