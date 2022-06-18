import { SideData } from '../../consts';

export interface MoveControlsProps {
    allowedMoveDirections: SideData[];
    handleClick: (direction: SideData) => void;
}
