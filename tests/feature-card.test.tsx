import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FeatureCard from '../src/components/feature-card';
import { featuresData } from '../src/data/app-features';

describe('Feature Card', () => {
  it('checks all props are printed into the card', async () => {
    const props = featuresData[0];

    render(<FeatureCard {...props} />);

    expect(screen.getByRole('icon-button')).toBeInTheDocument();
    expect(screen.getByLabelText(`${props.title} title`)).toHaveTextContent(props.title);
    expect(screen.getByLabelText(`${props.title} description`)).toHaveTextContent(
      props.description,
    );
  });
});
