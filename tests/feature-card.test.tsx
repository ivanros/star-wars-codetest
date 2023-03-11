import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FeatureCard from '../src/components/feature-card';
import { featuresData } from '../src/data/app-features';

describe('FeatureCard', () => {
  it('checks all props are printed into the card', async () => {
    const { title, color, icon, description } = featuresData[0];

    render(<FeatureCard title={title} color={color} icon={icon} description={description} />);

    expect(screen.getByRole('icon-button')).toBeInTheDocument();
    expect(screen.getByLabelText(`${title} title`)).toHaveTextContent(title);
    expect(screen.getByLabelText(`${title} description`)).toHaveTextContent(description);
  });
});
