import 'package:flutter/material.dart';

const aiReviewDisclaimer = 'AI-generated content. Please review before use.';

void main() {
  runApp(const AiHospitalAssistantApp());
}

class AiHospitalAssistantApp extends StatelessWidget {
  const AiHospitalAssistantApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AI Hospital Assistant',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1D6F66)),
        useMaterial3: true,
      ),
      home: const SetupHomeScreen(),
    );
  }
}

class SetupHomeScreen extends StatelessWidget {
  const SetupHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AI Hospital Assistant')),
      body: const SafeArea(
        child: Padding(
          padding: EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Mobile foundation ready',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700),
              ),
              SizedBox(height: 12),
              Text(
                'Patient booking, records, reports, reminders, family management, and AI assistant flows will be added in module order.',
              ),
              Spacer(),
              Text(aiReviewDisclaimer),
            ],
          ),
        ),
      ),
    );
  }
}
