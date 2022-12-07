import React, { useState } from 'react';
import RichTextEditor from '@components/RichTextEditor';

const CreatePost = () => {
  const [ value, setValue ] = useState('');

  return (
    <div>
      <h1>Create Post</h1>
      <RichTextEditor
        toolbarId={'create-post'}
        value={value}
        setValueRichText={setValue}
        placeholder={'Enter reduced information about the post...'}
      />
    </div>
  );
};

export default CreatePost;
