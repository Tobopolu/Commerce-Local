
import 'dart:ffi';

class Shop {

  final String name;
  final String description;
  final String address;
  final String image;
  final String phone;
  final String siret;
  final String legalproof;
  final String logo;

  const Shop({
    required this.name,
    required this.description,
    required this.address,
    required this.image,
    required this.phone,
    required this.siret,
    required this.legalproof,
    required this.logo
  });

  factory Shop.fromJson(Map<String, dynamic> json) {
    return Shop(
      name: json['name'],
      description: json['description'],
      address: json['address'],
      image: json['image'],
      phone: json['phone'],
      siret: json['siret'],
      legalproof: json['legalproof'],
      logo: json['logo'],
    );
  }
}