import { DataNavLink } from '../types/types';
import { ACTIVE_CLASSNAME } from '../constants/constants';

export const toggleActiveClassName = ({ isActive }: DataNavLink) => (isActive ? ACTIVE_CLASSNAME : '');
