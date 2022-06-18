import React from 'react';

export interface PonySelectionProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selected: string | undefined;
}
