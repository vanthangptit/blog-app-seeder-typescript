import AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import {
  AWS_S3_REGION,
  AWS_S3_IDENTITY_POOL_ID,
  AWS_S3_NAME
} from '@src/constants';

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
      message: 'File too big. Maximum file size is 5MB.'
    };
  }
};

export const uploadFile = ({ file, callback, setErrorMessage }: { file: any; callback: any, setErrorMessage: any }) => {
  try {
    if (!file) {
      return;
    }

    const validateSize = validationSize(file);
    if (validateSize) {
      setErrorMessage(validateSize.message);
      return;
    }

    if (!validateFileTypes.find(type => type === file.type)) {
      setErrorMessage('File invalid. File must be in JPG/PNG format.');
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

    upload.promise().then(
      (rs: ManagedUpload.SendData) => {
        callback(rs);
      },
      (err) => {
        setErrorMessage('There was an error uploading your photo: ' + err.message);
      }
    );
  } catch (e) {
    setErrorMessage('Cannot upload image: ' + e);
  }
};

export const deleteFile = (fileUploadedArray: ManagedUpload.SendData[], valueDescription: string) => {
  if (fileUploadedArray.length === 0) {
    return;
  }

  const fileDeleted: ManagedUpload.SendData[] = [];
  fileUploadedArray.forEach((item) => {
    if (valueDescription.indexOf(item.Location) === -1) {
      fileDeleted.push(item);
    }
  });

  if (fileDeleted.length > 0) {
    const objects: { Key: string }[] = [];

    fileDeleted.forEach((item) => {
      objects.push({
        Key: item.Key
      });
    });

    const deleteParam = {
      Bucket: AWS_S3_NAME ?? '',
      Delete: {
        Objects: objects
      }
    };

    const s3 = new AWS.S3();
    s3.deleteObjects(deleteParam, function(err, data) {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err, err.stack);
      } else {
        // eslint-disable-next-line no-console
        console.log('Deleted images is successfully', data);
      }
    });
  }
};
