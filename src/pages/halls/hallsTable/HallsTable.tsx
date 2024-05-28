import styles from './HallsTable.module.less';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useDeleteHallMutation } from '../../../api/hallApi';
import { HallResponse } from "../../../contracts/hallTypes";
import { InfoOutlined, DeleteOutline } from '@mui/icons-material';
import useConfirm from '../../../hooks/useConfirm';
import { Link } from 'react-router-dom';
import { Routes } from '../../../constants';
import { useTranslation } from 'react-i18next';

interface HallsTableProps {
    cinemaId: string;
    halls: HallResponse[];
}

const HallsTable = (props: HallsTableProps) => {
    const { cinemaId, halls } = props;
    const { t } = useTranslation("hallsPage");
    
    const [Dialog, confirm] = useConfirm();
    const [deleteHall] = useDeleteHallMutation();
    
    const handleClickOnDeleteButton = async (hall: HallResponse) => {
        const confirmDelete = await confirm([
            t("table.deleteHallConfirmation.part1"),
            t("table.deleteHallConfirmation.part2", {
                hallName: hall.name
            })
        ]);

        if (confirmDelete) {
            await deleteHall(hall.id);
        }
    };
    
    return (
        <>
            <Table className={styles.hallsTable} aria-label="striped table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">
                            {t("table.nameColumnLabel")}
                        </TableCell>
                        <TableCell align="center">
                            {t("table.numberOfSeatsLabel")}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {halls.map((hall) => (
                    <TableRow
                        key={hall.id}
                        sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                    >
                        <TableCell className={styles.cellWithIconButton}>
                            <Link to={`${Routes.HALLS_PAGE_ROUTE}/${cinemaId}/${hall.id}`}>
                                <IconButton>
                                    <InfoOutlined/>
                                </IconButton>
                            </Link>
                        </TableCell>
                        <TableCell align="center">
                            {hall.name}
                        </TableCell>
                        <TableCell align="center">
                            {hall.numberOfSeats}
                        </TableCell>
                        <TableCell className={styles.cellWithIconButton} align="right">
                            <IconButton
                                color="error"
                                onClick={() => handleClickOnDeleteButton(hall)}
                            >
                                <DeleteOutline/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <Dialog />
        </>
    );
}

export default HallsTable;
