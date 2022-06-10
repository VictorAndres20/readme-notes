import 'package:flutter/widgets.dart';

import 'package:flutter/material.dart';
import 'package:rhinos_natural_app/src/_helpers/storage.helper.dart';
import 'package:rhinos_natural_app/src/routes/app_routes.dart';

const String exerciseLabel = 'Ejercítate';
const String measurementsLabel = 'Medidas';
const String calendarLabel = 'Calendario';
const String profileLabel = 'Perfil';
const String exitLabel = 'Salir';

Widget buildMainDrawer({required BuildContext context}) {
  return (Drawer(
    child: ListView(
      padding: EdgeInsets.zero,
      children: <Widget>[
        DrawerHeader(
            decoration: const BoxDecoration(
              color: Color(0xff000000),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  Image(
                      height: 70,
                      width: MediaQuery.of(context).size.width,
                      fit: BoxFit.cover,
                      image: const AssetImage('resources/images/logo1.png'))
                ],
              ),
            )),
        ListTile(
          leading: const Icon(Icons.line_weight_outlined),
          title: const Text(exerciseLabel),
          onTap: () {
            Navigator.pushNamedAndRemoveUntil(
                context, exercisesRoute, (route) => false);
          },
        ),
        ListTile(
          leading: const Icon(Icons.rule),
          title: const Text(measurementsLabel),
          onTap: () {},
        ),
        ListTile(
          leading: const Icon(Icons.calendar_today_rounded),
          title: const Text(calendarLabel),
          onTap: () {
            Navigator.pushNamedAndRemoveUntil(
                context, calendarRoute, (route) => false);
          },
        ),
        ListTile(
          leading: const Icon(Icons.account_circle),
          title: const Text(profileLabel),
          onTap: () {},
        ),
        ListTile(
          leading: const Icon(Icons.exit_to_app),
          title: const Text(exitLabel),
          onTap: () async {
            await cleanStorage();
            Navigator.pushNamedAndRemoveUntil(
                context, loginRoute, (route) => false);
          },
        ),
      ],
    ),
  ));
}
