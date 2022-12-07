import AWS from 'aws-sdk';
import {
  AWS_S3_REGION,
  AWS_S3_IDENTITY_POOL_ID,
  AWS_S3_NAME
} from '@src/constants';
import { ManagedUpload } from 'aws-sdk/clients/s3';

export const getKeyByDatetime = () => {
  const m = new Date();
  return m.getUTCFullYear() + '-' + (m.getUTCMonth() + 1) + '-' + m.getUTCDate()
    + '-'+ m.getUTCHours() + '-' + m.getUTCMinutes() + '-' + m.getUTCSeconds();
};

AWS.config.update({
  region: AWS_S3_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_S3_IDENTITY_POOL_ID ?? ''
  })
});

const validateFileTypes = [ 'image/jpg', 'image/jpeg', 'image/png' ];

const convertSize = (originSize: number) => {
  let mbSize: any = originSize / 1000000;
  let unit = 'MB';

  if (mbSize < 0.01) {
    mbSize = Math.round(originSize);
    unit = 'Bytes';
  } else if (mbSize < 1) {
    mbSize = mbSize * 1000;
    mbSize = mbSize.toFixed(2);
    unit = 'KB';
  } else {
    mbSize = mbSize.toFixed(2);
  }

  return {
    size: parseInt(mbSize),
    unit
  };
};

const validationSize = (file: any) => {
  const fileSize = convertSize(file.size);

  if (
    (fileSize.unit === 'Bytes' && fileSize.size > 5000000)
    || (fileSize.unit === 'KB' && fileSize.size > 5000000)
    || (fileSize.unit === 'MB' && fileSize.size > 5)
  ) {
    return {
      message: 'File too big'
    };
  }
};

export const uploadFile = ({ file, callback }: { file: any; callback: any }) => {
  try {
    if (!file) {
      // eslint-disable-next-line no-console
      console.log('Please choose a file to upload first.');
      return;
    }

    const validateSize = validationSize(file);
    if (validateSize) {
      // eslint-disable-next-line no-console
      console.log(validateSize.message);
      return;
    }

    if (!validateFileTypes.find(type => type === file.type)) {
      // eslint-disable-next-line no-console
      console.log('File invalid. File must be in JPG/PNG format.');
      return;
    }

    const fileName = file.name;
    const albumPhotosKey = encodeURIComponent(getKeyByDatetime()) + '/';
    const photoKey = albumPhotosKey + fileName;
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: AWS_S3_NAME ?? '',
        Key: photoKey,
        Body: file
      }
    });

    upload.promise().then((data: ManagedUpload.SendData) => {
        callback(data)
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.log('There was an error uploading your photo: ', err);
      }
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Cannot publish to S3: ', e);
  }
};
