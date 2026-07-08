import 'package:flutter_test/flutter_test.dart';
import 'package:ai_hospital_assistant/main.dart';

void main() {
  testWidgets('renders setup screen and AI disclaimer', (tester) async {
    await tester.pumpWidget(const AiHospitalAssistantApp());

    expect(find.text('Mobile foundation ready'), findsOneWidget);
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
    expect(find.text(aiReviewDisclaimer), findsOneWidget);
  });
}
