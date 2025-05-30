import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Body,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head>
        <Preview>Verification Code</Preview>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KF0mCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body>
        <Section>
          <Preview>Verify your email address</Preview>
          <Row>
            <Heading>Verify your email address</Heading>
          </Row>
          <Row>
            <Text>
              Hi {username}, please use the following OTP to verify your email
              address.
            </Text>
          </Row>
          <Row>
            <Text>{otp}</Text>
          </Row>
          <Row>
            <Button href={`https://localhost:3032/verify/${otp}`}>
              Verify Email
            </Button>
          </Row>
        </Section>
      </Body>
    </Html>
  );
}
