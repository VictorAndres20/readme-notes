import 'package:http/http.dart' as http;
import 'dart:convert';

enum HttpMethods { get, post }

Future<Map<String, dynamic>> sendFetch(
    {bool? https,
    required HttpMethods httpMethod,
    required String host,
    required String path,
    Map<String, String>? queryParameters,
    Map<dynamic, dynamic>? body}) async {
  final Uri urlBuilded = buildUri(
      https: https, host: host, path: path, queryParameters: queryParameters);
  Map<String, String> headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };
  final res = await baseFetch(
      method: httpMethod, url: urlBuilded, headers: headers, body: body);
  // print(res.statusCode); //STATUS CODE
  // print(res.headers);
  // print(res.body);
  return json.decode(res.body); //Get as Map
}

Future<http.Response> baseFetch(
    {required HttpMethods method,
    required dynamic url,
    Map<String, String>? headers,
    Map<dynamic, dynamic>? body}) async {
  if (method == HttpMethods.post) {
    return body != null
        ? await http.post(url, headers: headers, body: jsonEncode(body))
        : await http.post(url, headers: headers);
  } else {
    return await http.get(url, headers: headers);
  }
}

Uri buildUri(
    {bool? https,
    required String host,
    required String path,
    Map<String, String>? queryParameters}) {
  return https != null
      ? https
          ? Uri.https(host, path, queryParameters)
          : Uri.http(host, path, queryParameters)
      : Uri.http(host, path, queryParameters);
}
