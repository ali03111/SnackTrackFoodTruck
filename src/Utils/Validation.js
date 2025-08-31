import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const passwordSchema = {
  password: yup
    .string()
    .required('Please Enter your password.')
    .max(25, 'Password must be less than 25 characters.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirm_password: yup
    .string()
    .required('Confirm password is required.')
    .oneOf([yup.ref('password'), null], 'Password must match.'),
};
const number = yup.object().shape({
  number: yup.string().required('Please Enter your number.'),
  // .typeError('Please Enter your number'),
});

const signUpschema = yup.object().shape({
  email: yup
    .string()
    // .email('Email must be valid')
    .max(50, 'Email must be valid.')
    .required('Please enter your email.')
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please enter valid email.',
    ),

  name: yup
    .string()
    .required('Please enter your first name.')
    .max(100, 'Name must be less than 100 characters.')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name.')
    .min(2, 'Name must be atleast 2 characters.')
    .max(50, 'Name must be of 50 characters.'),
  ...passwordSchema,
});
const logInUpschema = yup.object().shape({
  email: yup
    .string()
    // .email('Email must be valid')
    .max(50, 'Email must be valid.')
    .required('Please enter your email.')
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please enter valid email.',
    ),
  password: yup.string().required('Please Enter your password.'),
});
const forgotSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email.')
    .required('Please enter your email.')
    .max(50, 'Please enter valid email.'),
});
const verificationSchema = yup.object().shape({
  reset_code: yup
    .string()
    .required('Please enter your verification code.')
    .min(6, 'Verification code must be atleast 6 characters.')
    .max(6, 'Verification code must be of 6 characters.'),
});
const resetPasswordScheme = yup.object().shape({
  password: yup
    .string()
    .required('Please enter your password.')
    .max(25, 'Password must be less than 25 characters.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Please enter valid password.',
    ),

  new_password: yup
    .string()
    .required('Please enter your new password.')
    .max(25, 'Password must be less than 25 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Your password does not match.',
    ),
});

const addUsernameScheme = yup.object().shape({
  username: yup.string().required('Please enter name.'),
});

const editProfileScheme = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your first name.')
    .max(100, 'Name must be less than 100 characters.')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name.')
    .min(2, 'Name must be atleast 2 characters.')
    .max(50, 'Name must be of 50 characters.'),
});
const demoKitSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be valid.')
    .required('Please enter your email.'),
  first_name: yup
    .string()
    .required('Please enter your first name.')
    .max(100, 'Name must be less than 100 characters.')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name.')
    .min(2, 'Name must be atleast 2 characters.')
    .max(50, 'Name must be of 50 characters.'),
  last_name: yup
    .string()
    .required('Please enter your last name.')
    .max(100, 'Name must be less than 100 characters.')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name.')
    .min(2, 'Name must be atleast 2 characters.')
    .max(50, 'Name must be of 50 characters.'),
  company: yup.string().required('Please enter your company.'),
  phone: yup.string().required('Please enter your number.'),
  country: yup.string().required('Please enter your country.'),
  state: yup.string().required('Please enter your state.'),
  zip_code: yup.string().required('Please enter zip code.'),
  address: yup.string().required('Please enter Your address.'),
  city: yup.string().required('Please enter Your city.'),
});

// Helper function to parse time strings into Date objects for comparison
const parseTimeString = timeString => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const currentDate = new Date();

const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Adds 1 day in milliseconds

const addLocationSchema = yup.object().shape({
  truckName: yup
    .string()
    .required('Please enter the truck name.')
    .max(50, 'Name must be less than 50 characters.'),
  specialNotes: yup.string(),
  parkingAvailable: yup.number().default(0),
  seatAvailable: yup.number().default(0),
  operationDays: yup
    .array()
    .of(
      yup.object().shape({
        day: yup.string().required('Day is required'),
        startTime: yup
          .object({
            time24: yup.string(),
            time12: yup.string(),
          })
          .test(
            'Start time is required',
            'Start time is required',
            val => val.time24 !== '--:--' || !this.parent.isSelected,
          ),
        endTime: yup
          .object({
            time24: yup.string(),
            time12: yup.string(),
          })
          .test(
            'End time is required',
            'End time is required',
            val => val.time24 !== '--:--' || !this.parent.isSelected,
          ),
        isSelected: yup.boolean().required(),
      }),
    )
    .test(
      'at-least-one-selected',
      'At least one day must be selected with valid times',
      function (value) {
        if (!value || value.length === 0) return true; // Allow empty array initially
        const selectedDays = value.filter(day => day.isSelected);
        return (
          selectedDays.length === 0 ||
          selectedDays.some(
            day =>
              day.startTime.time24 !== '--:--' &&
              day.endTime.time24 !== '--:--',
          )
        );
      },
    ),
  truckLocation: yup.object().shape({
    locationName: yup.string(),
    coords: yup.object().shape({
      latitude: yup.string(),
      longitude: yup.string(),
    }),
  }),
});

const addMenuchema = yup.object().shape({
  menuName: yup
    .string()
    .required('Please enter the truck name.')
    .max(50, 'Name must be less than 50 characters.'),
  description: yup.string(),
  price: yup.string(),
  img: yup.mixed().required('Event image is required'),
  dietaryList: yup
    .array()
    .of(yup.object())
    .min(1, 'At least one dietary is required'),
});

const Schemas = {
  signUp: yupResolver(signUpschema),
  logIn: yupResolver(logInUpschema),
  forgot: yupResolver(forgotSchema),
  newPassword: yupResolver(resetPasswordScheme),
  verification: yupResolver(verificationSchema),
  username: yupResolver(addUsernameScheme),
  editProfile: yupResolver(editProfileScheme),
  demoKit: yupResolver(demoKitSchema),
  addLocation: yupResolver(addLocationSchema),
  addMenu: yupResolver(addMenuchema),
};

export default Schemas;
