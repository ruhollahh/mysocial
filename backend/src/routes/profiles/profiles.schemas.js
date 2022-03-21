import yup from 'yup';

const profileSchema = yup.object().shape({
  handle: yup.string(),
  // image can't have url() cuz it doesn't count localhost:8000 as a valid url
  image: yup.string(),
  bio: yup.string(),
  website: yup.string().url(),
  location: yup.string(),
});

export { profileSchema };
