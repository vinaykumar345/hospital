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
              SizedBox(height: 24),
              AuthMethodCard(
                title: 'Email and password',
                subtitle: 'Secure login with refresh sessions and MFA support.',
              ),
              SizedBox(height: 12),
              AuthMethodCard(
                title: 'Mobile OTP',
                subtitle: 'Request and verify one-time codes for patient access.',
              ),
              SizedBox(height: 12),
              AuthMethodCard(
                title: 'Hospital tenant',
                subtitle: 'Resolve hospital domain, branding, and tenant-isolated records.',
              ),
              SizedBox(height: 12),
              AuthMethodCard(
                title: 'Role-based access',
                subtitle: 'Show menus and workflows only when the signed-in role is permitted.',
              ),
              SizedBox(height: 12),
              AuthMethodCard(
                title: 'Hospital management',
                subtitle: 'Manage departments, branches, rooms, beds, and schedules.',
              ),
              SizedBox(height: 12),
              AuthMethodCard(
                title: 'Staff management',
                subtitle: 'Manage staff profiles, status, departments, branches, and doctor schedules.',
              ),
              SizedBox(height: 12),
              AuthMethodCard(
                title: 'Patient management',
                subtitle: 'Register patients and manage history, allergies, medications, insurance, consents, and visits.',
              ),
              SizedBox(height: 12),
              AuthMethodCard(
                title: 'Appointment system',
                subtitle: 'Book visits, manage walk-ins, queues, reminders, and teleconsultations.',
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

class AuthMethodCard extends StatelessWidget {
  const AuthMethodCard({
    required this.title,
    required this.subtitle,
    super.key,
  });

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border.all(color: const Color(0xFFD8E1EA)),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
            const SizedBox(height: 6),
            Text(subtitle),
          ],
        ),
      ),
    );
  }
}
