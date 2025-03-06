import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:anim_search_bar/anim_search_bar.dart';

class CustomAppbar extends StatefulWidget implements PreferredSizeWidget {
  const CustomAppbar({super.key});

  @override
  State<CustomAppbar> createState() => _CustomAppbarState();

  @override
  Size get preferredSize => const Size.fromHeight(100);
}

class _CustomAppbarState extends State<CustomAppbar> {
  late AnimSearchBar _searchBar;

  _CustomAppbarState() {
    _searchBar = AnimSearchBar(
      width: 320,
      textController: TextEditingController(),
      helpText: 'Recherche',
      onSubmitted: (query) {
        print(query);
      },
      onSuffixTap: () {
        setState(() {});
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.white,
      toolbarHeight: 100,
      title: Padding(
        padding: const EdgeInsets.symmetric(vertical: 5.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                SvgPicture.asset(
                  'assets/images/logo.svg',
                  height: 35,
                ),
                _searchBar,
              ],
            ),
          ],
        ),
      ),
    );
  }
}
