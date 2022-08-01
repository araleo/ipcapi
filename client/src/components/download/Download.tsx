import Button from '@mui/material/Button';
import { LABELS } from '../../utils/constants';
import styles from './Download.module.css';

interface IProps {
  handleDownload: () => void;
}

const Download: React.FC<IProps> = ({ handleDownload }) => {
  return (
    <div className={styles.download}>
      <Button variant='outlined' onClick={handleDownload}>
        {LABELS.download}
      </Button>
    </div>
  );
};

export default Download;
