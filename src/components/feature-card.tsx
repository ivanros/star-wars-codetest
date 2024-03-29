import { Card, CardBody, IconButton, Typography } from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/input';
import { createElement, ForwardRefExoticComponent, SVGProps } from 'react';

interface FeatureCardProps {
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  color: string;
  title: string;
  description?: string;
}

export function FeatureCard(props: FeatureCardProps) {
  const { icon, color, title, description } = props;

  return (
    <Card className="rounded-2xl shadow-lg shadow-gray-500/10">
      <CardBody className="px-2 lg:px-8 text-center">
        {typeof icon !== 'undefined' ? (
          <IconButton
            role="icon-button"
            color={color as color}
            className={
              'flex justify-center m-auto w-12 h-12 mb-6 rounded-full shadow-lg shadow-gray-400'
            }
          >
            {createElement(icon, {
              className: 'm-auto w-7 h-7 text-white',
            })}
          </IconButton>
        ) : null}
        <Typography variant="h5" className="mb-2 font-bold" aria-label={`${title} title`}>
          {title}
        </Typography>
        {typeof description !== 'undefined' ? (
          <Typography
            className="font-normal text-gray-900 text-sm lg:text-md"
            aria-label={`${title} description`}
          >
            {description}
          </Typography>
        ) : null}
      </CardBody>
    </Card>
  );
}

FeatureCard.defaultProps = {
  color: 'red',
};

export default FeatureCard;
