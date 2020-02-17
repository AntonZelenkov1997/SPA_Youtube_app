import { ConnectedProps } from 'react-redux';
import connector from '../store/actions';

export type ConnectorProps = ConnectedProps<typeof connector>
