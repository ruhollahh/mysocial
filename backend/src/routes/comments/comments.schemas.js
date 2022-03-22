import yup from 'yup';

const commentSchema = yup.object({
  body: yup.string().required('Body is required'),
});

export { commentSchema };
