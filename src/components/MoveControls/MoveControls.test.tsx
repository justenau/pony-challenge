import { MoveControls } from './MoveControls';
import { Sides } from '../../consts';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

describe('Test MoveControls component', () => {
    it('should disable arrow button when moving to that direction is not allowed', () => {
        const mockHandleClick = () => jest.fn();

        render(<MoveControls allowedMoveDirections={[Sides.Left, Sides.Up]} handleClick={mockHandleClick} />);

        expect(screen.getByTestId(Sides.Left.direction)).toHaveProperty('disabled', false);
        expect(screen.getByTestId(Sides.Right.direction)).toHaveProperty('disabled', true);
        expect(screen.getByTestId(Sides.Up.direction)).toHaveProperty('disabled', false);
        expect(screen.getByTestId(Sides.Down.direction)).toHaveProperty('disabled', true);
    });

    it('should dispatch only when moving is allowed', () => {
        const mockHandleClick = jest.fn();

        render(<MoveControls allowedMoveDirections={[Sides.Left]} handleClick={mockHandleClick} />);
        fireEvent.click(screen.getByTestId(Sides.Left.direction));
        fireEvent.click(screen.getByTestId(Sides.Right.direction));

        expect(mockHandleClick).toHaveBeenCalledTimes(1);
        expect(mockHandleClick).toHaveBeenCalledWith(Sides.Left);
    });
});
