import * as React from 'react';

interface Props {
  customClass: string
}

const Home = (props: Props) => {
  const { customClass } = props;

  return (
    <section className={customClass}>
      <h1>Home Page</h1>
    </section>
  );
};

export default Home;
