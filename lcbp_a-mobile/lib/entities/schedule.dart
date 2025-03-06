
import 'dart:ffi';

class Schedule {

  final String name;
  final String description;
  final String address;

  const Schedule({
    required this.name,
    required this.description,
    required this.address,

  });

  factory Schedule.fromJson(Map<String, dynamic> json) {
    return Schedule(
      name: json['name'],
      description: json['description'],
      address: json['address'],
    );
  }
}