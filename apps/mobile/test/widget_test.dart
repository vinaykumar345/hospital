import 'package:flutter_test/flutter_test.dart';
import 'package:ai_hospital_assistant/main.dart';

void main() {
  testWidgets('renders setup screen and AI disclaimer', (tester) async {
    await tester.pumpWidget(const AiHospitalAssistantApp());

    expect(find.text('Mobile foundation ready'), findsOneWidget);
    expect(find.text('Email and password'), findsOneWidget);
    expect(find.text('Mobile OTP'), findsOneWidget);
    expect(find.text(aiReviewDisclaimer), findsOneWidget);
  });
}
