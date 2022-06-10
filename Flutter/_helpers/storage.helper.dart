// shared_preferences: ^2.0.12
// flutter pub add shared_preferences
import 'package:shared_preferences/shared_preferences.dart';

const String tokenStorageKey = 'jaoeutdgrt';
const String idUserStorageKey = 'yaoeutdgrt';

Future<void> cleanStorage() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.clear();
}

Future<void> storeToken(String token) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString(tokenStorageKey, token);
}

Future<String> getStorageToken() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString(tokenStorageKey).toString();
}

Future<void> storeIdUser(String value) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString(idUserStorageKey, value);
}

Future<String> getStorageIdUser() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString(idUserStorageKey).toString();
}