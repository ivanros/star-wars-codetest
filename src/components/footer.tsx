import { Typography } from '@material-tailwind/react';
import { ReactElement } from 'react';

const year = new Date().getFullYear();

interface FooterProps {
  title?: string;
  description?: string;
  copyright?: ReactElement;
}

export function Footer(props: FooterProps) {
  const { title, description, copyright } = props;

  return (
    <footer className="relative px-4 pt-8 pb-6 bg-gray-900 text-white">
      <div className="container flex align-middle mx-auto">
        <div className="flex w-full px-4 justify-between">
          <div className="gap-10">
            <Typography variant="h4" color="blue-gray" aria-label="Footer title">
              {title}
            </Typography>
            <Typography className="font-light text-blue-gray-500" aria-label="Footer description">
              {description}
            </Typography>
          </div>
          <div className="flex self-center">
            <Typography
              variant="small"
              className="font-light text-blue-gray-500 text-right"
              aria-label="Footer copyright"
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: 'Star Wars Wiki',
  description: 'Everything you need to know about the Star Wars world.',
  copyright: (
    <>
      Copyright © {year} Star Wars Wiki by{' '}
      <a
        href="https://www.linkedin.com/in/ivanros"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        @ivanros92
      </a>
    </>
  ),
};

export default Footer;
