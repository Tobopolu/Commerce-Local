import 'package:flutter/material.dart';
import 'package:awesome_bottom_bar/awesome_bottom_bar.dart';
import 'package:lcbp_a_mobile/pages/home_page.dart';

class BottomNavBar extends StatefulWidget {
  final int currentIndex;
  const BottomNavBar({super.key, this.currentIndex = -1});

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {
  late int _currentIndex;

  final List<TabItem> items = [
    TabItem(icon: Icons.home, title: 'Accueil'),
    TabItem(icon: Icons.menu, title: 'Menu'),
    TabItem(icon: Icons.shopping_cart, title: 'Panier'),
    TabItem(icon: Icons.person, title: 'Profil'),
  ];

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.currentIndex;
  }

  @override
  Widget build(BuildContext context) {
    return BottomBarDefault(
      items: items,
      backgroundColor: Colors.white,
      color: Colors.grey,
      colorSelected: Colors.black,
      indexSelected: _currentIndex,
      onTap: (index) {
        setState(() {
          _currentIndex = index;
        });
        switch (index) {
          case 0:
            Navigator.pushAndRemoveUntil(
              context,
              MaterialPageRoute(builder: (context) => const HomePage()),
                  (route) => false,
            );
            break;
          case 1:

            break;
          case 2:
            Navigator.pushReplacementNamed(context, '/cart');
            break;
          case 3:
            Navigator.pushReplacementNamed(context, '/profile');
            break;
        }
      },
    );
  }
}

