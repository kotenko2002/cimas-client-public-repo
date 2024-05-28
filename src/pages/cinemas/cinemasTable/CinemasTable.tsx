import styles from './CinemasTable.module.less';
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useDeleteCinemaMutation } from "../../../api/cinemaApi";
import { CinemaResponse } from "../../../contracts/cinemaTypes";
import { InfoOutlined, DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Routes } from "../../../constants";
import useConfirm from '../../../hooks/useConfirm';
import { useTranslation } from 'react-i18next';

interface CinemasTableProps {
    cinemas: CinemaResponse[];
}

const CinemasTable = (props: CinemasTableProps) => {
    const { cinemas } = props;
    const { t } = useTranslation('cinemasPage');

    const [Dialog, confirm] = useConfirm();
    const [deleteCinema] = useDeleteCinemaMutation();
    
    const handleClickOnDeleteButton = async (cinema: CinemaResponse) => {
        const confirmDelete = await confirm([
            t("table.deleteCinemaConfirmation.part1"),
            t("table.deleteCinemaConfirmation.part2", {
                cinemaName: cinema.name
            })
        ]);

        if (confirmDelete) {
            await deleteCinema(cinema.id);
        }
    };
    
    return (
        <Paper>
            <Table className={styles.cinemasTable} aria-label="striped table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">
                            {t("table.nameColumnLabel")}
                        </TableCell>
                        <TableCell align="center">
                            {t("table.addressColumnLabel")}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {cinemas.map((cinema) => (
                    <TableRow
                        key={cinema.id}
                        sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                    >
                        <TableCell className={styles.cellWithIconButton}>
                            <Link to={`${Routes.HALLS_PAGE_ROUTE}/${cinema.id}`}>
                                <IconButton>
                                    <InfoOutlined/>
                                </IconButton>
                            </Link>
                        </TableCell>
                        <TableCell align="center">
                            {cinema.name}
                        </TableCell>
                        <TableCell align="center">
                            {cinema.address}
                        </TableCell>
                        <TableCell className={styles.cellWithIconButton} align="right">
                            <IconButton
                                color="error"
                                onClick={() => handleClickOnDeleteButton(cinema)}
                            >
                                <DeleteOutline/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <Dialog />
        </Paper>
    );
}

export default CinemasTable;
