import 'package:flutter_test/flutter_test.dart';
import 'package:ai_hospital_assistant/main.dart';

void main() {
  testWidgets('renders setup screen and AI disclaimer', (tester) async {
    await tester.pumpWidget(const AiHospitalAssistantApp());

    expect(find.text('Patient mobile app'), findsOneWidget);
    expect(find.text('Email and password'), findsOneWidget);
    expect(find.text('Mobile OTP'), findsOneWidget);
    expect(find.text('Hospital tenant'), findsOneWidget);
    expect(find.text('Role-based access'), findsOneWidget);
    expect(find.text('Hospital management'), findsOneWidget);
    expect(find.text('Staff management'), findsOneWidget);
    expect(find.text('Patient management'), findsOneWidget);
    expect(find.text('Appointment system'), findsOneWidget);
    expect(find.text('Reception dashboard'), findsOneWidget);
    expect(find.text('Doctor dashboard'), findsOneWidget);
    expect(find.text('Nurse dashboard'), findsOneWidget);
    expect(find.text('Laboratory module'), findsOneWidget);
    expect(find.text('Pharmacy module'), findsOneWidget);
    expect(find.text('Billing module'), findsOneWidget);
    expect(find.text('Insurance module'), findsOneWidget);
    expect(find.text('My care'), findsOneWidget);
    expect(find.text('Medication reminders'), findsOneWidget);
    expect(find.text('Family members'), findsOneWidget);
    expect(find.text('Hospital AI assistant'), findsOneWidget);
    expect(find.text('Notifications'), findsOneWidget);
    expect(find.text('AI Reception Agent'), findsOneWidget);
    expect(find.text('AI Doctor Agent'), findsOneWidget);
    expect(find.text(aiReviewDisclaimer), findsOneWidget);
  });
}
