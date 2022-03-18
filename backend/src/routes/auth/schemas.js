import yup from "yup";

const userSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  handle: yup.string().required("Handle is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .equals([yup.ref("password"), null], "Passwords must match"),
});

export { userSchema };
