import styles from './FilmsTable.module.less';
import { FilmResponse } from '../../../contracts/filmTypes';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useDeleteFilmMutation } from '../../../api/filmApi';
import { DeleteOutline } from '@mui/icons-material';
import useConfirm from '../../../hooks/useConfirm';
import { useTranslation } from 'react-i18next';

interface FilmsTableProps {
    films: FilmResponse[];
}

const FilmsTable = (props: FilmsTableProps) => {
    const { films } = props;
    const { t } = useTranslation('filmsPage');
    
    const [Dialog, confirm] = useConfirm();
    const [deleteFilm] = useDeleteFilmMutation();
    
    const handleClickOnDeleteButton = async (film: FilmResponse) => {
        const confirmDelete = await confirm([
            t("table.deleteFilmConfirmation.part1"),
            t("table.deleteFilmConfirmation.part2", { filmName: film.name}),
        ]);
        if (confirmDelete) {
            await deleteFilm(film.id);
        }
    };
    
    return (
        <>
            <Table className={styles.filmsTable} aria-label="striped table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            {t("table.nameColumnLabel")}
                        </TableCell>
                        <TableCell align="center">
                            {t("table.durationColumnLabel")}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {films.map((film) => (
                    <TableRow
                        key={film.id}
                        sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                    >
                        <TableCell align="center">
                            {film.name}
                        </TableCell>
                        <TableCell align="center">
                            {film.duration}
                        </TableCell>
                        <TableCell className={styles.cellWithIconButton} align="right">
                            <IconButton
                                color="error"
                                onClick={() => handleClickOnDeleteButton(film)}
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

export default FilmsTable;