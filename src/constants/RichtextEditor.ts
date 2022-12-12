export interface IOptions {
  className: string
  value?: string
  valueArray?: string[]
  select?: boolean
}

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

export const colors = [
  '#000000',
  '#e60000',
  '#ff9900',
  '#ffff00',
  '#008a00',
  '#0066cc',
  '#9933ff',
  '#ffffff',
  '#facccc',
  '#ffebcc',
  '#ffffcc',
  '#cce8cc',
  '#cce0f5',
  '#ebd6ff',
  '#bbbbbb',
  '#f06666',
  '#ffc266',
  '#ffff66',
  '#66b966',
  '#66a3e0',
  '#c285ff',
  '#888888',
  '#a10000',
  '#b26b00',
  '#b2b200',
  '#006100',
  '#0047b2',
  '#6b24b2',
  '#444444',
  '#5c0000',
  '#663d00',
  '#666600',
  '#003700',
  '#002966',
  '#3d1466'
];

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
        className: 'ql-color',
        valueArray: colors,
        select: true
      },
      {
        className: 'ql-background',
        valueArray: colors,
        select: true
      },
      {
        className: 'ql-script',
        value: 'super'
      },
      {
        className: 'ql-script',
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
      },
      {
        className: 'ql-image'
      }
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
