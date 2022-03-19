import yup from 'yup';

const profileSchema = yup.object().shape({
  image: yup.string(),
  bio: yup.string(),
  website: yup.string().url(),
  location: yup.string(),
});

export { profileSchema };
