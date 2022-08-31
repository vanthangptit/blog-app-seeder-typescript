import * as React from 'react';
import Typed from 'react-typed';
import { AWS_S3_URL } from '@src/constants';
import { styled } from '@mui/system';
import {
  Box,
  Typography,
  List,
  ListItem
} from '@mui/material';
import { BiCalendar } from 'react-icons/bi';

interface Props {
  customClass: string
}

// ** Data
const canIDo = [
  {
    label: 'Excellent skills as a slicer with strong knowledge of HTML5/CSS3'
  },
  {
    label: 'Experience of SASS/LESS, Bootstrap/Material UI and Responsive Web Design'
  },
  {
    label: 'Solid understanding of Javascript coding as jQuery, ES6'
  },
  {
    label: 'Experience with ReactJS, React Hook, Redux Saga'
  },
  {
    label: 'Knowledge about RESTful API Services.'
  },
  {
    label: 'Basic understanding of server (ExpressJS), database (MySQL, MariaDB and MongoDB).'
  },
  {
    label: 'Able to work with NPM, Yarn, Gulp and Docker'
  },
  {
    label: 'Experience in SCRUM process model'
  },
  {
    label: 'Knowledge of Amazon Web Services'
  }
];

const kyberDesc = {
  jobs: [
    {
      label: 'Define layout techniques of each part for page.'
    },
    {
      label: 'Write APIs codes for applications'
    },
    {
      label: 'Create a RESTful API server with node.js and express'
    },
    {
      label: 'Bugfix for issues on client/server side'
    },
    {
      label: 'Discuss with the tester and leader team to come up with the optional solution for issues'
    },
    {
      label: 'Support other members of the team to complete tasks'
    },
    {
      label: 'Deploy source code on Virtual Machine, AWS – EC2'
    }
  ],
  images: [
    {
      label: 'HTML5',
      image: 'html5.png',
      alt: 'HTML5'
    },
    {
      label: 'CSS3',
      image: 'css3.png',
      alt: 'CSS3'
    },
    {
      label: 'SASS',
      image: 'sass.svg',
      alt: 'SASS'
    },
    {
      label: 'JavaScript',
      image: 'javascript.png',
      alt: 'JavaScript'
    },
    {
      label: 'ReactJS',
      image: 'reacrjs.png',
      alt: 'ReactJS'
    },
    {
      label: 'Redux-Saga',
      image: 'redux-saga.png',
      alt: 'Redux-Saga'
    },
    {
      label: 'NodeJS',
      image: 'nodejs.png',
      alt: 'NodeJS'
    },
    {
      label: 'Git',
      image: 'git.png',
      alt: 'Git'
    },
    {
      label: 'NPM',
      image: 'npm.png',
      alt: 'NPM'
    },
    {
      label: 'AWS',
      image: 'aws.png',
      alt: 'AWS'
    },
    {
      label: 'Docker',
      image: 'docker.png',
      alt: 'Docker'
    }
  ]
};

const qtsDesc = {
  jobs: [
    {
      label: 'Convert PSD to HTML.'
    },
    {
      label: 'Bugfix for issues of layout'
    },
    {
      label: 'Maintain features by request of client'
    }
  ],
  images: [
    {
      label: 'HTML5',
      image: 'html5.png',
      alt: 'HTML5'
    },
    {
      label: 'CSS3',
      image: 'css3.png',
      alt: 'CSS3'
    },
    {
      label: 'SASS',
      image: 'sass.svg',
      alt: 'SASS'
    },
    {
      label: 'JavaScript',
      image: 'javascript.png',
      alt: 'JavaScript'
    }
  ]
};

// ** Styled
const PageHome = styled(Box)({
  backgroundImage: `url("${AWS_S3_URL}home.png")`,
  backgroundPosition: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  'h3': {
    marginBottom: '10px',
    fontSize: '33px',
    fontWeight: 400,

    '@media (min-width: 768px) and (max-width: 991px)': {
      fontSize: 'calc(22px + (33 - 22) * (100vw - 768px) / (991 - 768))'
    },

    '@media (max-width: 767px)': {
      fontSize: 'calc(18px + (23 - 18) * (100vw - 360px) / (767 - 360))'
    }
  }
});

const HomeIntroContent = styled(Box)({
  width: 'calc(86%)',
  margin: 'auto'
});

const GreetingBox = styled('div')({
  position: 'relative',
  zIndex: 2,
  color: '#fff',
  fontSize: '54px',
  fontWeight: 600,
  paddingBottom: '15px',
  lineHeight: 0.8,
  textAlign: 'center',

  'span': {
    color: '#0b9b99'
  },

  '@media (min-width: 768px) and (max-width: 991px)': {
    fontSize: 'calc(40px + (54 - 40) * (100vw - 768px) / (991 - 768))'
  },

  '@media (max-width: 767px)': {
    fontSize: 'calc(18px + (40 - 18) * (100vw - 360px) / (767 - 360))'
  }
});

const IntroText = styled('div')({
  position: 'relative',
  zIndex: 2,
  color: '#fff',
  fontWeight: 300,

  'p': {
    lineHeight: 1.2,
    marginBottom: '1.4rem',
    fontSize: '36px',

    '@media (min-width: 768px) and (max-width: 991px)': {
      fontSize: 'calc(24px + (36 - 24) * (100vw - 768px) / (991 - 768))'
    },

    '@media (max-width: 767px)': {
      fontSize: 'calc(14px + (24 - 14) * (100vw - 360px) / (767 - 360))'
    }
  }
});

const CtaBox = styled('div')({
  display: 'flex',
  justifyContent: 'center',

  'a': {
    fontSize: '18px',
    padding: '10px 20px',
    border: '1px solid #fff',
    position: 'relative',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: '100%',
      transition: 'width 0.4s',
      zIndex: 1,
      backgroundColor: '#fff'
    },

    'span': {
      position: 'relative', zIndex: 2, color: '#fff', transition: '0.4s'
    },

    '&:hover span': {
      color: '#000'
    },

    '&:hover::before': {
      width: '100%'
    }
  }
});

const BlockTitle = styled('div')({
  marginBottom: '2.5rem',

  'h2': {
    position: 'relative',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '100%',
    textTransform: 'uppercase',
    fontSize: '70px',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translate3d(0, -50%, 0)',
      width: '100%',
      height: '3.5px',
      backgroundColor: '#fff'
    }
  },

  'strong': {
    display: 'inline-block',
    position: 'relative',
    zIndex: 1,
    padding: '0 10px',
    fontWeight: 900,

    'span': {
      color: '#0b9b99'
    }
  },

  'p': {
    fontSize: '20px',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 400
  },

  '@media (min-width: 768px) and (max-width: 991px)': {
    'h2': {
      fontSize: 'calc(40px + (70 - 40) * (100vw - 768px) / (991 - 768))'
    },

    'p': {
      fontSize: 'calc(12px + (20 - 12) * (100vw - 768px) / (991 - 768))'
    }
  },

  '@media (max-width: 767px)': {
    'h2': {
      marginBottom: '7px',
      fontSize: 'calc(28px + (41 - 28) * (100vw - 360px) / (767 - 360))',

      '&::after': {
        display: 'none'
      }
    },

    'p': {
      fontSize: 'calc(8px + (12 - 8) * (100vw - 360px) / (767 - 360))'
    }
  }
});

const AboutIntroBox = styled('article')({
  paddingBottom: '30px',

  '&::after': {
    content: '""',
    clear: 'both',
    display: 'block',
    height: '1px'
  },

  '@media (max-width: 576px)': {
    float: 'left'
  }
});

const AboutImageBox = styled('div')({
  width: '40%',
  padding: '0 35px 5px 0',
  float: 'left',

  '@media (min-width: 576px) and (max-width: 991px)': {
    paddingRight: '20px'
  },

  '@media (max-width: 575px)': {
    padding: '0 20px 30px 0',
    width: '65%',
    margin: 'auto',
    float: 'none'
  }
});

const AboutDescriptionBox = styled('div')({
  color: '#fff',
  fontWeight: 300,
  textAlign: 'justify',

  'strong, b': {
    fontWeight: 400
  },

  'a': {
    color: '#0d6efd',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

const AboutSkillsBox = styled('article')({
  paddingBottom: '30px',
  color: '#fff',

  '&::after': {
    content: '""',
    clear: 'both',
    display: 'block',
    height: '1px'
  },

  'ul li': {
    display: 'flex',
    fontWeight: 300,
    lineHeight: '1.3',
    marginBottom: '8px',

    'span': {
      display: 'inline-block',
      paddingRight: '5px',
      fontWeight: 600
    }
  },

  '@media (max-width: 576px)': {
    float: 'left'
  }
});

const ResumeBox = styled('article')({
  width: '100%',
  float: 'left',
  paddingBottom: '35px',

  'h3': {
    marginBottom: '10px',
    fontSize: '33px',
    fontWeight: 400,

    '@media (min-width: 768px) and (max-width: 991px)': {
      fontSize: 'calc(22px + (33 - 22) * (100vw - 768px) / (991 - 768))'
    },

    '@media (max-width: 767px)': {
      fontSize: 'calc(18px + (23 - 18) * (100vw - 360px) / (767 - 360))'
    }
  }
});

const CardBox = styled('div')({
  position: 'relative',
  paddingBottom: '30px',
  paddingLeft: '30px',
  fontWeight: 300,

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 1,
    left: '10px',
    width: '1px',
    height: '100%'
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 2,
    left: '2.5px',
    height: '15px',
    width: '15px',
    borderRadius: '50%',
    border: '3px solid #fff'
  }
});

const CardHeader = styled('div')({
  lineHeight: '100%',
  color: '#fff'
});

const YearCard = styled('span')({
  display: 'flex',
  marginBottom: '12px',

  'span': {
    paddingLeft: '8px'
  }
});

const CardTitle = styled('div')({
  display: 'block',
  fontSize: '1.125rem',
  lineHeight: '1.5',
  marginBottom: '20px'
});

const CardBodyBox = styled('div')({
  color: '#f1f1f1',
  lineHeight: '1.7',
  paddingBottom: '25px',

  '&.pl-35': {
    paddingLeft: '35px'
  },

  'ul': {
    paddingLeft: '20px'
  },

  'ul li': {
    listStyleType: 'disc',
    listStylePosition: 'outside',
    display: 'list-item'
  }
});

const CardBottom = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  borderBottom: '1px solid #fff'
});

const SkillBox = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '3px',
  margin: '0 10px 20px',

  '&:hover': {
    '.skill__image img': {
      filter: 'grayscale(0%)'
    },

    '.skill__bottom': {
      color: '#0d6efd'
    }
  },

  '.skill__top': {
    borderBottom: '1px solid #dee2e6'
  },

  '.skill__bottom': {
    padding: '5px 0',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 600
  },

  '.skill__image': {
    width: '70px',
    height: '70px',
    padding: '10px',

    'img': {
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      filter: 'grayscale(100%)'
    }
  },

  '@media (min-width: 576px)': {
    margin: '0 15px 30px'
  }
});

const CustomTypographyH3 = styled(Typography)({
  fontSize: '33px',
  fontWeight: 400,
  marginBottom: '10px'
});

const CustomTypographyParagraph = styled(Typography)({
  fontSize: '1rem',
  marginBottom: '1rem',
  fontWeight: 300,

  'strong': {
    fontWeight: 600
  }
});

const Home = (props: Props) => {
  const { customClass } = props;

  React.useEffect(() => {
    if (customClass && customClass.length) {
      document.title = `Thang Nguyen | ${customClass === 'home-page' ? 'Home' : 'About'}`;
    }
  }, [ customClass ]);

  return (
    <section className={customClass}>
      {
        customClass === 'home-page' ? (
          <PageHome className={'padd-navbar scroll-bar flex-aligin-center'}>
            <div className="container">
              <HomeIntroContent>
                <GreetingBox>
                  Hi, I am <span>Thang Nguyen</span>
                </GreetingBox>

                <IntroText>
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    <Typed strings={[ 'I am a Frontend Developer' ]} typeSpeed={40} />
                  </Typography>

                  <CtaBox>
                    <a href={AWS_S3_URL + 'pdf/CV_Nguyen-Van-Thang__Reactjs.pdf'}
                      target="_blank" className="link-cv" rel="noreferrer" download title="Download CV">
                      <span>Download CV</span>
                    </a>
                  </CtaBox>
                </IntroText>
              </HomeIntroContent>
            </div>
          </PageHome>
        ) : (
          <Box className={'about padd-navbar scroll-bar bg-secondary'} sx={{ width: '100%' }}>
            <div className="container">
              <BlockTitle>
                <Typography variant={'h2'}>
                  <strong className="bg-secondary">About <span>me</span></strong>
                </Typography>
                <Typography variant="body2">
                  Allow me to introduce myself.
                </Typography>
              </BlockTitle>

              <AboutIntroBox>
                <AboutImageBox>
                  <img src={AWS_S3_URL + 'person2.png'} alt="image-of-me.png" />
                </AboutImageBox>

                <AboutDescriptionBox>
                  <CustomTypographyH3 variant={'h3'}>
                    WHO AM I?
                  </CustomTypographyH3>
                  <CustomTypographyParagraph variant="body2">
                    My name is Thang.
                    I’m living and working in Ha Noi city. I graduated from Posts and Telecommunications Institute of Technology in 2018.
                  </CustomTypographyParagraph>
                  <CustomTypographyParagraph variant="body2">
                    I’m a front-end Developer with 3 years of experience; I work mainly with <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, <strong>JSON</strong> and <strong>AJAX</strong>.
                    In addition, I can also work with <strong>ReactJS</strong>, <strong>React Hook</strong>, <strong>Redux Saga</strong>; server side like NodeJS (using ExpressJS)
                    and database manipulation like MySQL, MongoDB.
                  </CustomTypographyParagraph>
                  <CustomTypographyParagraph variant="body2">
                    The main work I am doing is completing development tasks for the user interface; update and maintain
                    application features; support other team members to complete the task.
                  </CustomTypographyParagraph>
                  <CustomTypographyParagraph variant="body2">
                    That’s all about me and thank you so much.
                  </CustomTypographyParagraph>
                </AboutDescriptionBox>
              </AboutIntroBox>

              <AboutSkillsBox>
                <CustomTypographyH3 variant={'h3'}>WHAT CAN I DO?</CustomTypographyH3>

                <List>{canIDo.map((work, key) => (
                  <ListItem key={key} sx={{ padding: '0 0 8px' }}>
                    <span>+/</span> {work.label}
                  </ListItem>
                ))}
                </List>
              </AboutSkillsBox>

              <ResumeBox className="resume">
                <CustomTypographyH3 variant={'h3'} sx={{ color: '#fff' }}>
                  WORKING EXPERIENCE
                </CustomTypographyH3>

                <Box>
                  <CardBox>
                    <CardHeader>
                      <YearCard>
                        <BiCalendar />
                        <span>2/2019 – present</span>
                      </YearCard>
                      <CardTitle>
                        <strong>KyberOSC Company</strong><br /><i>Web Developer</i>
                      </CardTitle>
                    </CardHeader>
                    <CardBodyBox>
                      <List>
                        {kyberDesc.jobs.map((desc, key) => <ListItem key={key} sx={{ padding: '0 0 5px' }}>{desc.label}</ListItem>)}
                      </List>
                    </CardBodyBox>
                    <CardBottom>
                      {kyberDesc.images.map((item, key) => (
                        <SkillBox className="skill" key={key}>
                          <div className="skill__top">
                            <div className="skill__image">
                              <img src={AWS_S3_URL + item.image} alt={item.alt} />
                            </div>
                          </div>

                          <div className="skill__bottom">
                            <span>{item.label}</span>
                          </div>
                        </SkillBox>
                      ))}
                    </CardBottom>
                  </CardBox>

                  <CardBox>
                    <CardHeader>
                      <YearCard>
                        <BiCalendar />
                        <span>9/2018 – 2/2019</span>
                      </YearCard>

                      <CardTitle>
                        <strong>QTS Technology JSC</strong><br /><i>Front-end Developer</i>
                      </CardTitle>
                    </CardHeader>
                    <CardBodyBox>
                      <List>
                        {qtsDesc.jobs.map((desc, key) => <ListItem key={key} sx={{ padding: '0 0 5px' }}>{desc.label}</ListItem>)}
                      </List>
                    </CardBodyBox>
                    <CardBottom sx={{ borderBottom: 'none' }}>
                      {qtsDesc.images.map((item, key) => (
                        <SkillBox className="skill" key={key}>
                          <div className="skill__top">
                            <div className="skill__image">
                              <img src={AWS_S3_URL + item.image} alt={item.alt} />
                            </div>
                          </div>

                          <div className="skill__bottom">
                            <span>{item.label}</span>
                          </div>
                        </SkillBox>
                      ))}
                    </CardBottom>
                  </CardBox>
                </Box>
              </ResumeBox>
            </div>
          </Box>
        )
      }
    </section>
  );
};

export default Home;
