import { createElement, ForwardRefExoticComponent, memo, SVGProps } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';

interface FeatureCardProps {
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
}

export function FeatureCard(props: FeatureCardProps) {
  const { icon, title, description } = props;

  return (
    <Card className="py-6 rounded-2xl shadow-lg shadow-gray-500/10">
      <CardBody className="px-8 text-center">
        {typeof icon !== 'undefined' ? (
          <div
            role="icon-button"
            className={
              'flex justify-center m-auto w-12 h-12 mb-6 rounded-full shadow-lg bg-yellow-500 shadow-gray-400'
            }
          >
            {createElement(icon, {
              className: 'm-auto w-7 h-7 text-white',
            })}
          </div>
        ) : null}
        <Typography variant="h5" className="mb-2 font-bold" aria-label={`${title} title`}>
          {title}
        </Typography>
        {typeof description !== 'undefined' ? (
          <Typography className="font-normal text-gray-900" aria-label={`${title} description`}>
            {description}
          </Typography>
        ) : null}
      </CardBody>
    </Card>
  );
}

export default FeatureCard;
