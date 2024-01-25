import React, { Fragment } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { PatchEvent, set, unset, useClient, useFormValue } from 'sanity'


export function TinyEditor(props) {
    const { value = '', onChange } = props;
  
    const handleEditorChange = newValue => {
        onChange(PatchEvent.from(newValue ? set(newValue) : unset()))   
      };
    
    return (
        <Editor
            id="tinymce-editor"
            apiKey="ivxiggexqgnqeg3xjjiczxw06ed4btfaszkj8g8u2u64ifkt"
            init={{
                //plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
                plugins: 'table link fullscreen',
                toolbar: 'table | formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | fullscreen',
                height: '800'
            }}
            value={value}
            onEditorChange={handleEditorChange}
        />
    )
}