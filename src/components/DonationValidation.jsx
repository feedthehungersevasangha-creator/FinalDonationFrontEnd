
// // DonationValidation.js
// import * as yup from "yup";

// // Helper for DOB: must be 18+
// const is18Plus = (date) => {
//   if (!date) return false;
//   const today = new Date();
//   const dob = new Date(date);
//   const age = today.getFullYear() - dob.getFullYear();
//   const m = today.getMonth() - dob.getMonth();
//   return age > 18 || (age === 18 && m >= 0);
// };

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// export const DonationValidation = yup.object().shape({
//   // amount must be present (we'll make sure it's registered in the form)
//   amount: yup.string().required("Donation amount is required"),

//   // customAmount required only when amount === "other"
//   customAmount: yup.string().when("amount", {
//     is: "other",
//     then: () => yup.string().required("Please enter custom amount"),
//     otherwise: () => yup.string().nullable().notRequired(),
//   }),

//   firstName: yup.string().required("First name is required").min(2, "Too short"),
//   lastName: yup.string().required("Last name is required"),

//   email: yup.string().required("Email is required").matches(emailRegex, "Enter a valid email"),
//   mobile: yup.string().matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile").required("Mobile is required"),
//   dob: yup.string().required("Date of Birth is required").test("is-18+", "You must be at least 18 years old", is18Plus),

//   idType: yup.string().required("Select an ID type"),


//   uniqueId: yup
//     .string()
//     .required("ID number is required")
//     .when("idType", {
//       is: "PAN Card",
//       then: (schema) =>
//         schema.matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
//     })
//     .when("idType", {
//       is: "Aadhar",
//       then: (schema) => schema.matches(/^\d{12}$/, "Invalid Aadhar number"),
//     })
//     .when("idType", {
//       is: "Driving license",
//       then: (schema) =>
//         schema.matches(
//           /^[A-Z]{2}[0-9]{2}\d{11}$/,
//           "Invalid Driving License format"
//         ),
//     })
//     .when("idType", {
//       is: "VoterID",
//       then: (schema) =>
//         schema.matches(/^[A-Z]{3}[0-9]{7}$/, "Invalid Voter ID format"),
//     }),
    
//   // paymentMode required only for monthly (optional for onetime)
//   paymentMode: yup.string().when("frequency", {
//     is: "monthly",
//     then: () => yup.string().required("Payment mode is required"),
//     otherwise: () => yup.string().nullable().notRequired(),
//   }),
//   // bankName required only when monthly + E-Mandate
//   bankName: yup.string().when(["frequency", "paymentMode"], {
//     is: (frequency, paymentMode) => frequency === "monthly" && paymentMode === "E-Mandate",
//     then: () => yup.string().required("Bank name is required"),
//     otherwise: () => yup.string().nullable().notRequired(),
//   }),

//   // IFSC: required+validated only when monthly + E-Mandate, otherwise optional but validated if filled
//   ifsc: yup.string().when(["frequency", "paymentMode"], {
//     is: (frequency, paymentMode) => frequency === "monthly" && paymentMode === "E-Mandate",
//     then: () =>
//       yup
//         .string()
//         .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code")
//         .required("IFSC is required"),
//     otherwise: () =>
//       yup
//         .string()
//         .nullable()
//         .notRequired()
//         .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
//           message: "Invalid IFSC Code",
//           excludeEmptyString: true, // allow empty but validate non-empty entries
//         }),
//   }),
//   // accountNumber: required+validated only when monthly + E-Mandate, otherwise optional but validated if filled
//   accountNumber: yup.string().when(["frequency", "paymentMode"], {
//     is: (frequency, paymentMode) => frequency === "monthly" && paymentMode === "E-Mandate",
//     then: () =>
//       yup
//         .string()
//         .matches(/^\d{9,18}$/, "Account number must be 9-18 digits")
//         .required("Account number is required"),
//     otherwise: () =>
//       yup
//         .string()
//         .nullable()
//         .notRequired()
//         .matches(/^\d{9,18}$/, {
//           message: "Account number must be 9-18 digits",
//           excludeEmptyString: true,
//         }),
//   }),
//   declaration: yup.boolean().oneOf([true], "You must accept the declaration"),
// });

// DonationValidation.js
import * as yup from "yup";

// Helper for DOB: must be 18+
const is18Plus = (date) => {
  if (!date) return false;
  const today = new Date();
  const dob = new Date(date);
  const age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  return age > 18 || (age === 18 && m >= 0);
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const DonationValidation = yup.object().shape({
  // amount must be present (we'll make sure it's registered in the form)
  amount: yup.string().required("Donation amount is required"),

  // customAmount required only when amount === "other"
  customAmount: yup.string().when("amount", {
    is: "other",
    then: () => yup.string().required("Please enter custom amount"),
    otherwise: () => yup.string().nullable().notRequired(),
  }),

  firstName: yup.string().required("First name is required").min(2, "Too short"),
  lastName: yup.string().required("Last name is required"),

  email: yup.string().required("Email is required").matches(emailRegex, "Enter a valid email"),
  mobile: yup.string().matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile").required("Mobile is required"),
  dob: yup.string().required("Date of Birth is required").test("is-18+", "You must be at least 18 years old", is18Plus),

  idType: yup.string().required("Select an ID type"),


  uniqueId: yup
    .string()
    .required("ID number is required")
    .when("idType", {
      is: "PAN Card",
      then: (schema) =>
        schema.matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
    })
    .when("idType", {
      is: "Aadhar",
      then: (schema) => schema.matches(/^\d{12}$/, "Invalid Aadhar number"),
    })
    .when("idType", {
      is: "Driving license",
      then: (schema) =>
        schema.matches(
          /^[A-Z]{2}[0-9]{2}\d{11}$/,
          "Invalid Driving License format"
        ),
    })
    .when("idType", {
      is: "VoterID",
      then: (schema) =>
        schema.matches(/^[A-Z]{3}[0-9]{7}$/, "Invalid Voter ID format"),
    }),
    
  // paymentMode required only for monthly (optional for onetime)
  // paymentMode: yup.string().when("frequency", {
  //   is: "monthly",
  //   then: () => yup.string().required("Payment mode is required"),
  //   otherwise: () => yup.string().nullable().notRequired(),
  // }),
  // bankName required only when monthly + E-Mandate
  // bankName: yup.string().when(["frequency", "paymentMode"], {
  //   is: (frequency, paymentMode) => frequency === "monthly" && paymentMode === "E-Mandate",
  //   then: () => yup.string().required("Bank name is required"),
  //   otherwise: () => yup.string().nullable().notRequired(),
  // }),

  // IFSC: required+validated only when monthly + E-Mandate, otherwise optional but validated if filled
  // ifsc: yup.string().when(["frequency", "paymentMode"], {
  //   is: (frequency, paymentMode) => frequency === "monthly" && paymentMode === "E-Mandate",
  //   then: () =>
  //     yup
  //       .string()
  //       .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code")
  //       .required("IFSC is required"),
  //   otherwise: () =>
  //     yup
  //       .string()
  //       .nullable()
  //       .notRequired()
  //       .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
  //         message: "Invalid IFSC Code",
  //         excludeEmptyString: true, // allow empty but validate non-empty entries
  //       }),
  // }),
  // accountNumber: required+validated only when monthly + E-Mandate, otherwise optional but validated if filled
  // accountNumber: yup.string().when(["frequency", "paymentMode"], {
  //   is: (frequency, paymentMode) => frequency === "monthly" && paymentMode === "E-Mandate",
  //   then: () =>
  //     yup
  //       .string()
  //       .matches(/^\d{9,18}$/, "Account number must be 9-18 digits")
  //       .required("Account number is required"),
  //   otherwise: () =>
  //     yup
  //       .string()
  //       .nullable()
  //       .notRequired()
  //       .matches(/^\d{9,18}$/, {
  //         message: "Account number must be 9-18 digits",
  //         excludeEmptyString: true,
  //       }),
  // }),
  startDay: yup.string().when("frequency", {
  is: "monthly",
  then: () => yup.string().required("Please select a start date"),
  otherwise: () => yup.string().nullable().notRequired(),
}),

  declaration: yup.boolean().oneOf([true], "You must accept the declaration"),
});
