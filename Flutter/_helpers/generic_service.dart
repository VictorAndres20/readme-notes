// ignore_for_file: avoid_print

import 'package:http/http.dart' as http;
import 'dart:convert';

class GenericService{

  Future<Map<String, dynamic>> findMany({
        bool https = false,
        required String host,
        required String path,
        required Map<String, String> queryParameters
    }) async {
    final Uri urlBuilded = buildUri(https: https, host: host, path: path, queryParameters: queryParameters);
    final res = await fetchGet(url: urlBuilded);
    print(res.statusCode); //STATUS CODE
    //print(res.headers);
    return json.decode(res.body); //Get as Map
  }

  Future<http.Response> fetchGet({required dynamic url, Map<String, String>? headers}) async {
    if(headers != null) {
      return await http.get( url , headers: headers );
    } else {
      return await http.get( url );
    } 
  }

  Uri buildUri({required bool https,required String host,required String path,required Map<String, String> queryParameters}){
    return https ? Uri.https(host, path, queryParameters):
                    Uri.http(host, path, queryParameters);
  }
}