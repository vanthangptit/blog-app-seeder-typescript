import 'react-quill/dist/quill.snow.css';
import './styles.scss';

import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { styled } from '@mui/system';
import {
  formats,
  fontSizeArr,
  headerArr,
  alignmentArr,
  otherOption
} from '@constants/RichtextEditor';

interface IRichTextProps {
  toolbarId: string
  value?: string
  setValueRichText: any
  label?: string
  placeholder: string
  customClass?: string
}

const TextEditor = styled('div')({});

const TextEditorLabel = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  textTransform: 'uppercase',
  textAlign: 'left',
  justifyContent: 'space-between',
  rowGap: '10px',
  color: '#7f7f7f',
  marginBottom: '10px'
});

const ToolbarRichText = styled('div')({
  display: 'flex',
  backgroundColor: '#fff',

  '& .ql-header:hover': {
    backgroundColor: '#545454'
  }
});

const QLAvailable = styled('div')({
  display: 'flex',
  justifyContent: 'start',
  flex: '1 1 auto',
  marginRight: '5px'
});

const Size = Quill.import('formats/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

const CustomToolbar = ({ toolbarId }: { toolbarId: string }) => {
  return (
    <ToolbarRichText id={'editor-' + toolbarId}>
      <QLAvailable>
        <span className="ql-formats">
          <select className="ql-header" defaultValue={''} onChange={(e: any) => e.persist()}>
            {headerArr?.map((item, index) => (
              <option value={item} key={index}/>
            ))}
          </select>
          <select title="Size" className="ql-size" defaultValue={'12'}>
            {fontSizeArr?.map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))}
          </select>
          <select className="ql-align" defaultValue={''}>
            {alignmentArr?.map((item, index) => (
              <option value={item} key={index} />
            ))}
          </select>
        </span>
        {otherOption?.map((item, index) => (
          <span className={item.classNameGroup} key={index}>
            {item.options?.map((option, indx) => option?.value ? (
              <button className={option.className} key={indx} value={option.value} />
            ) : (
              <button className={option.className} key={indx} />
            ))}
          </span>
        ))}
      </QLAvailable>
    </ToolbarRichText>
  );
};

const RichTextEditor = (props: IRichTextProps) => {
  const { toolbarId, value, setValueRichText, label, placeholder, customClass } = props;

  const handleChange = (html: string) => {
    setValueRichText(html);
  };

  const modules = {
    toolbar: {
      container: '#editor-' + toolbarId
    }
  };

  return (
    <TextEditor className={'text-editor ' + (customClass ?? '')}>
      {label ? <TextEditorLabel>{label}</TextEditorLabel> : ''}
      <CustomToolbar toolbarId={toolbarId} />
      <ReactQuill
        defaultValue={value}
        onChange={handleChange}
        placeholder={placeholder}
        formats={formats}
        modules={modules}
        theme='snow'
      />
    </TextEditor>
  );
};

export default RichTextEditor;
