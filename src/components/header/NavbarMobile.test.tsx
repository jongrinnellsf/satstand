/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OnchainProviders from '../../providers/OnchainProviders';
import NavbarMobile from './NavbarMobile';

describe('NavbarMobile', () => {
  it('mounts', () => {
    render(
      <OnchainProviders>
        <NavbarMobile />
      </OnchainProviders>,
    );
    expect(screen.getByText('Satoshis Stand')).toBeInTheDocument();
  });

  it('clicking the hamburger icon opens the navbar menu', async () => {
    render(
      <OnchainProviders>
        <NavbarMobile />
      </OnchainProviders>,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });
});
