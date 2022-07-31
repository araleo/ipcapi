import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { COLORS, SUBTITLE, TITLE, TOOLTIP } from '../../utils/constants';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header style={{ marginBottom: '2rem' }}>
      <Typography
        variant='h2'
        component='h1'
        align='center'
        color={COLORS.detail}
        fontWeight='bold'
      >
        {TITLE}
      </Typography>
      <Typography align='center'>
        {SUBTITLE}
        <Tooltip title={TOOLTIP} className={styles.button}>
          <HelpOutlineOutlinedIcon fontSize='small' />
        </Tooltip>
      </Typography>
    </header>
  );
};

export default Header;
