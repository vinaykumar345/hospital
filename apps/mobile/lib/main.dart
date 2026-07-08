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
              Text('Patient mobile app', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
              SizedBox(height: 12),
              Text(
                'Book appointments, view prescriptions, lab reports, invoices, reminders, family members, and the hospital AI assistant.',
              ),
              SizedBox(height: 24),
              PatientFeatureCard(
                title: 'Email and password',
                subtitle: 'Secure login with refresh sessions and MFA support.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Mobile OTP',
                subtitle: 'Request and verify one-time codes for patient access.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Hospital tenant',
                subtitle: 'Resolve hospital domain, branding, and tenant-isolated records.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Role-based access',
                subtitle: 'Show menus and workflows only when the signed-in role is permitted.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Hospital management',
                subtitle: 'Manage departments, branches, rooms, beds, and schedules.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Staff management',
                subtitle: 'Manage staff profiles, status, departments, branches, and doctor schedules.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Patient management',
                subtitle: 'Register patients and manage history, allergies, medications, insurance, consents, and visits.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Appointment system',
                subtitle: 'Book visits, manage walk-ins, queues, reminders, and teleconsultations.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Reception dashboard',
                subtitle: 'Track walk-ins, queue status, check-ins, cancellations, and upcoming appointments.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Doctor dashboard',
                subtitle: 'View today appointments, pending documentation, follow-ups, and patient summary tasks.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Nurse dashboard',
                subtitle: 'Track shift handovers, medication schedules, nursing tasks, vitals, and observations.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Laboratory module',
                subtitle: 'Order tests, track samples, enter results, alert critical values, and request reviewed summaries.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Pharmacy module',
                subtitle: 'Manage prescriptions, stock, expiry alerts, interaction warnings, and dispensing.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Billing module',
                subtitle: 'Generate invoices, apply discounts and GST, and record payments.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Insurance module',
                subtitle: 'Verify policies, prepare claims, upload documents, and track claim status.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'My care',
                subtitle: 'View upcoming appointments, prescriptions, lab reports, invoices, and follow-up reminders.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Medication reminders',
                subtitle: 'Track medicine schedules and refill prompts for the patient and family members.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Family members',
                subtitle: 'Manage dependent profiles and switch records with permission-aware access.',
              ),
              SizedBox(height: 12),
              PatientFeatureCard(
                title: 'Hospital AI assistant',
                subtitle: 'Ask hospital workflow questions with reviewed AI-generated responses.',
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

class PatientFeatureCard extends StatelessWidget {
  const PatientFeatureCard({
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
