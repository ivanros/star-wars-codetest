import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../src/components/footer';

describe('Footer', () => {
  it('checks default props', async () => {
    render(<Footer />);

    expect(screen.getByLabelText('Footer title')).toHaveTextContent(/Star Wars Wiki/i);
    expect(screen.getByLabelText('Footer description')).toHaveTextContent(/Star Wars world/i);
    expect(screen.getByLabelText('Footer copyright')).toHaveTextContent(/@ivanros/i);
  });

  it('checks default props', async () => {
    const title = 'Test title';
    const description = 'Test description';
    const copyright = 'Test description';
    const copyrightElm = <span>{copyright}</span>;

    render(<Footer title={title} description={description} copyright={copyrightElm} />);

    expect(screen.getByLabelText('Footer title')).toHaveTextContent(title);
    expect(screen.getByLabelText('Footer description')).toHaveTextContent(description);
    expect(screen.getByLabelText('Footer copyright')).toHaveTextContent(copyright);
  });
});
