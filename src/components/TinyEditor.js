import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

const TinyEditor = ({value, onChange, apiKey}) => {
  return (
    <Editor
      apiKey={apiKey}
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue='Hello World'
      value={value}
      onChange={onChange}
    />
  )
}

export default TinyEditor