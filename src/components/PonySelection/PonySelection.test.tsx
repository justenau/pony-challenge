import { Ponies } from '../../consts';
import { PonySelection } from './PonySelection';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

describe('Test PonySelection component', () => {
    it('should only set the selected pony', () => {
        const selectedPony = Ponies.Fluttershy.name;
        render(<PonySelection handleChange={jest.fn()} selected={selectedPony} />);
        const ponies: HTMLInputElement[] = screen.queryAllByRole('radio');
        const pony = ponies.find(pony => pony.value === selectedPony);
        const otherPony = ponies.find(pony => pony.value === Ponies.Applejack.name);

        expect(pony?.checked).toBe(true);
        expect(otherPony?.checked).toBe(false);
    });

    it('should call handler when clicking on different pony than selected', () => {
        const mockHandleChange = jest.fn();
        render(<PonySelection handleChange={mockHandleChange} selected={Ponies.Fluttershy.name} />);
        const ponies: HTMLInputElement[] = screen.queryAllByRole('radio');

        fireEvent.click(ponies.find(pony => pony.value === Ponies.Fluttershy.name) as HTMLElement);
        fireEvent.click(ponies.find(pony => pony.value === Ponies.Applejack.name) as HTMLElement);

        expect(mockHandleChange).toHaveBeenCalledTimes(1);
    });
});
