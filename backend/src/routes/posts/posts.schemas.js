import yup from 'yup';

const postSchema = yup.object({
  body: yup.string().required('Body is required'),
});

export { postSchema };
