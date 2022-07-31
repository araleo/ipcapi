import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styles from './IpcaTable.module.css';
import { COLORS, LABELS } from '../../utils/constants';
import { parseDate } from '../../utils/lib';

export interface IpcaData {
  id: number;
  data: string;
  valor: string;
}

interface IProps {
  ipcaData: IpcaData[];
  ipcaSum: number | null;
}

const IpcaTable: React.FC<IProps> = ({ ipcaData, ipcaSum }) => {
  return (
    <main className={styles.table}>
      <TableContainer component={Paper}>
        <Table aria-label='ipca data table'>
          <TableHead>
            <TableRow style={{ backgroundColor: COLORS.grey }}>
              <TableCell>{LABELS.date}</TableCell>
              <TableCell>{LABELS.value}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ipcaData.map((row, rowIdx) => (
              <TableRow
                key={row.id}
                style={rowIdx % 2 === 1 ? { backgroundColor: COLORS.grey } : {}}
              >
                <TableCell>{parseDate(row.data)}</TableCell>
                <TableCell>{row.valor}</TableCell>
              </TableRow>
            ))}
            {ipcaSum && (
              <TableRow
                style={
                  ipcaData.length % 2 === 1
                    ? { backgroundColor: COLORS.grey }
                    : {}
                }
              >
                <TableCell>
                  <Typography color={COLORS.detail} fontWeight='bold'>
                    {LABELS.sum}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color={COLORS.detail} fontWeight='bold'>
                    {ipcaSum}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default IpcaTable;
