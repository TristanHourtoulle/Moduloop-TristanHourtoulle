import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ResetPasswordProps {
  date: string;
  code: number;
  firstName: string;
}

const ResetPassword = ({ date, code, firstName }: ResetPasswordProps) => {
  if (firstName === "" || firstName === undefined) {
    firstName = "Utilisateur";
  }
  return (
    <Tailwind>
      <Html>
        <Head />

        <Preview>
          Vous voulez modifié le mot de passe de votre compte moduloop-impact
        </Preview>

        <Body className="bg-white flex flex-col items-center justify-center font-sans">
          <Container className="w-full max-w-2xl bg-white border border-solid border-[#eaeaea] rounded my-[40px] p-8">
            <Section className="">
              <Row>
                <Column className="text-center">
                  <Img
                    alt="Moduloop Impact"
                    className="h-10 w-auto mx-auto"
                    src="https://moduloop-impact.fr/icons/logo.png"
                  />
                </Column>
              </Row>

              <Row>
                <Column>
                  <Text className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                    <strong>Mot de passe oublié</strong>
                  </Text>
                </Column>
              </Row>

              <Text className="text-black text-[14px] leading-[24px]">
                Hello <strong>{firstName}</strong>,
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Vous avez demandé à réinitialiser votre mot de passe pour votre
                compte Moduloop Impact.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Votre Code de vérification est : <strong>{code}</strong>
              </Text>

              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                Si vous n'êtes pas à l'origine de cette demande, veuillez
                ignorer cet email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ResetPassword;
