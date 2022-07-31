import Typography from '@mui/material/Typography';
import { COLORS, SUBTITLE, TITLE } from '../../utils/constants';

const Header = () => {
  return (
    <header style={{ marginBottom: '2rem' }}>
      <Typography
        variant='h2'
        component='h1'
        align='center'
        color={COLORS.detail}
      >
        {TITLE}
      </Typography>
      <Typography align='center'>{SUBTITLE}</Typography>
    </header>
  );
};

export default Header;
