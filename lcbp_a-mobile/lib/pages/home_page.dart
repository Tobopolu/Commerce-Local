import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:lcbp_a_mobile/widgets/bottom_navbar.dart';
import 'package:lcbp_a_mobile/widgets/custom_appbar.dart';
import 'package:lcbp_a_mobile/entities/shop.dart';
import 'package:lcbp_a_mobile/services/shops_services.dart' as shops_service;
import 'package:lcbp_a_mobile/pages/shop_page.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Shop> shops = [];
  LatLng? selectedShopLocation;
  final Map<String, LatLng> addressCache = {};
  final ScrollController _scrollController = ScrollController();
  final MapController _mapController = MapController(); // Permet de centrer la carte

  @override
  void initState() {
    super.initState();
    shops_service.getAllShops().then((data) {
      setState(() {
        shops = data;
      });
    });
  }

  Future<LatLng?> getCoordinates(String address) async {
    if (addressCache.containsKey(address)) {
      return addressCache[address];
    }

    final url = Uri.parse("https://nominatim.openstreetmap.org/search?format=json&q=$address");
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data.isNotEmpty) {
        final lat = double.parse(data[0]["lat"]);
        final lon = double.parse(data[0]["lon"]);
        final coords = LatLng(lat, lon);
        addressCache[address] = coords;
        return coords;
      }
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppbar(),
      backgroundColor: const Color(0xFFFBF6EA),
      body: SingleChildScrollView(
        controller: _scrollController,
        child: Column(
          children: [
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: shops.length,
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  elevation: 5,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Stack(
                    children: [
                      GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => ShopPage(shop: shops[index]),
                            ),
                          );
                        },
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Stack(
                            children: [
                              Image.network(
                                'http://10.0.2.2:81${shops[index].image}',
                                width: double.infinity,
                                height: 200,
                                fit: BoxFit.cover,
                              ),
                              Container(
                                width: double.infinity,
                                height: 200,
                              ),
                            ],
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 10,
                        left: 16,
                        right: 16,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              shops[index].name.toUpperCase(),
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                                shadows: [
                                  Shadow(
                                    color: Colors.black54,
                                    offset: Offset(1.0, 1.0),
                                    blurRadius: 2.0,
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 5),
                            TextButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => ShopPage(shop: shops[index]),
                                  ),
                                );
                              },
                              style: TextButton.styleFrom(
                                backgroundColor: Colors.white,
                                foregroundColor: Colors.black,
                                padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                              child: const Text(
                                'Voir la boutique',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Positioned(
                        bottom: 10,
                        right: 10,
                        child: IconButton(
                          icon: const Icon(
                            Icons.location_on,
                            color: Colors.white,
                            size: 30,
                          ),
                          onPressed: () async {
                            LatLng? coords = await getCoordinates(shops[index].address);
                            if (coords != null) {
                              setState(() {
                                selectedShopLocation = coords;
                              });

                              _scrollController.animateTo(
                                _scrollController.position.maxScrollExtent,
                                duration: const Duration(milliseconds: 500),
                                curve: Curves.easeInOut,
                              );

                              _mapController.move(coords, 15.0);
                            }
                          },
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
            const SizedBox(height: 20),
            Container(
              height: 300,
              margin: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.black26),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: FlutterMap(
                  mapController: _mapController,
                  options: MapOptions(
                    initialCenter: selectedShopLocation ?? const LatLng(48.8566, 2.3522),
                    initialZoom: 15.0,
                  ),
                  children: [
                    TileLayer(
                      urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    ),
                    if (selectedShopLocation != null)
                      MarkerLayer(
                        markers: [
                          Marker(
                            point: selectedShopLocation!,
                            width: 80,
                            height: 80,
                            child: const Icon(
                              Icons.location_on,
                              color: Color(0xFFAA3F24),
                              size: 40,
                            ),
                          ),
                        ],
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const BottomNavBar(currentIndex: 0),
    );
  }
}
