
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:lcbp_a_mobile/entities/schedule.dart';

Future<List<Schedule>> getAllSchedules() async {

  final url = "http://10.0.2.2:81/schedule";
  final response = await http.get(
    Uri.parse(url),
    headers: {
      "authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpbGlAZ21haWwuY29tIiwiaWF0IjoxNzM5NTQyNTkzLCJleHAiOjE3Mzk3MTUzOTN9.-tzwFoRFOag9WJvrgi1e2OkQu2TeeZZWVFRO8uvNWtI'
    },
  );

  if (response.statusCode == 200) {

    List<Schedule> result = [];
    List<dynamic> schedules = jsonDecode(response.body);
    for (final schedule in schedules) {
      result.add(Schedule.fromJson(schedule));
    }
    return result;

  } else {

    throw Exception('Failed to get all schedules data');
  }

}