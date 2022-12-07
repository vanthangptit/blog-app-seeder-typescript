export const formats = [
  'background',
  'bold',
  'color',
  'font',
  'code',
  'italic',
  'link',
  'size',
  'strike',
  'script',
  'underline',
  'blockquote',
  'header',
  'indent',
  'list',
  'align',
  'direction',
  'code-block',
  'bullet',
  'image'
];

export const fontSizeArr = [
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '18',
  '20',
  '22',
  '24',
  '26',
  '28',
  '30',
  '32',
  '34',
  '36',
  '38',
  '40',
  '42',
  '54',
  '68',
  '84',
  '98'
];

export const headerArr = [ '1', '2', '3', '4', '5', '' ];

export const alignmentArr = [ '', 'center', 'right', 'justify' ];

export const otherOption = [
  {
    classNameGroup: 'ql-formats',
    options: [
      {
        className: 'ql-bold'
      },
      {
        className: 'ql-italic'
      },
      {
        className: 'ql-underline'
      },
      {
        className: 'ql-strike'
      }
    ]
  },
  {
    classNameGroup: 'ql-formats',
    options: [
      {
        className: 'ql-color'
      },
      {
        className: 'ql-background'
      },
      {
        className: 'ql-strike',
        value: 'super'
      },
      {
        className: 'ql-strike',
        value: 'sub'
      }
    ]
  },
  {
    classNameGroup: 'ql-formats',
    options: [
      {
        className: 'ql-blockquote'
      },
      {
        className: 'ql-code-block'
      },
      {
        className: 'ql-link'
      }
      // {
      //   className: 'ql-image'
      // }
    ]
  },
  {
    classNameGroup: 'ql-formats',
    options: [
      {
        className: 'ql-list',
        value: 'ordered'
      },
      {
        className: 'ql-list',
        value: 'bullet'
      },
      {
        className: 'ql-indent',
        value: '-1'
      },
      {
        className: 'ql-indent',
        value: '+1'
      }
    ]
  },
  {
    classNameGroup: 'ql-formats',
    options: [
      {
        className: 'ql-clean'
      }
    ]
  }
];
