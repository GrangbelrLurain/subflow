import { stringFlow, booleanFlow, errorFlow, isError } from "subflow";

type SignUpInput = {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

const validateSignUp = (input: SignUpInput) => {
  const email = stringFlow(input.email).trim().toLower().replace(/\s/g, "");
  const password = stringFlow(input.password).trim();
  const confirmPassword = stringFlow(input.confirmPassword).trim();
  const agreed = booleanFlow(input.agreeToTerms);

  if (isError(email)) {
    return email;
  }

  if (isError(password)) {
    return password;
  }

  if (isError(confirmPassword)) {
    return confirmPassword;
  }

  if (isError(agreed)) {
    return agreed;
  }

  if (email.includes("@").not().get()) {
    return errorFlow({
      message: "Invalid email format",
      value: email.get(),
      type: "string",
    });
  }

  if (password.length().lessThan(8).get()) {
    return errorFlow({
      message: "Password too short",
      value: password.get(),
      type: "string",
    });
  }

  if (password.notEqual(confirmPassword.get()).get()) {
    return errorFlow({
      message: "Passwords do not match",
      value: confirmPassword.get(),
      type: "string",
    });
  }

  if (agreed.not().get()) {
    return errorFlow({
      message: "You must agree to terms",
      value: agreed.get(),
      type: "boolean",
    });
  }

  return {
    email: email.get(),
    password: password.get(),
    agreed: agreed.get(),
  };
};

const result = validateSignUp({
  email: "test@12345.com",
  password: "password",
  confirmPassword: "password",
  agreeToTerms: true,
});

if (isError(result)) {
  console.log(result.getError());
} else {
  console.log(result);
}
