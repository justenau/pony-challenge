import { render } from '@testing-library/react';
import React from 'react';
import { SettingsSlider } from './SettingsSlider';

describe('Test SettingsSlider component', () => {
    it('should match snapshot', () => {
        const tree = render(<SettingsSlider setting={'width'} min={15} max={25} value={20} handleChange={jest.fn()} />);
        expect(tree).toMatchSnapshot();
    });
});
