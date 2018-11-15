import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import { validate, required } from '@module/validation-common-react';
import translate from '../../../i18n';
import Field from '../../../utils/FieldAdapter';
import { FormView, RenderField, Button, primary } from '../../common/components/native';
import { placeholderColor, submit } from '../../common/components/native/styles';

const commentFormSchema = {
  content: [required]
};

const PostCommentForm = ({ values, handleSubmit, comment, t }) => {
  const operation = t(`comment.label.${comment.id ? 'edit' : 'add'}`);

  return (
    <FormView style={{ paddingHorizontal: 15 }}>
      <Field
        name="content"
        component={RenderField}
        type="text"
        value={values.content}
        placeholder={t('comment.label.field')}
        placeholderTextColor={placeholderColor}
      />
      <View style={submit}>
        <Button type={primary} onPress={handleSubmit}>
          {operation}
        </Button>
      </View>
    </FormView>
  );
};

PostCommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  comment: PropTypes.object,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  t: PropTypes.func
};

const PostCommentFormWithFormik = withFormik({
  mapPropsToValues: props => ({ content: props.comment && props.comment.content }),
  validate: values => validate(values, commentFormSchema),
  handleSubmit: async (values, { resetForm, props: { onSubmit } }) => {
    await onSubmit(values);
    resetForm();
  },
  displayName: 'CommentForm', // helps with React DevTools
  enableReinitialize: true
});

export default translate('post')(PostCommentFormWithFormik(PostCommentForm));
