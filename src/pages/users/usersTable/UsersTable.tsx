import styles from './UsersTable.module.less';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { UserResponse } from '../../../contracts/userTypes';
import useConfirm from '../../../hooks/useConfirm';
import { useFireUserMutation } from '../../../api/userApi';
import { useTranslation } from 'react-i18next';

interface UsersTableProps {
    users: UserResponse[];
}

const UsersTable = (props: UsersTableProps) => {
    const { users } = props;
    const { t } = useTranslation('usersPage');

    const [Dialog, confirm] = useConfirm();
    const [fireUser] = useFireUserMutation();
    
    const handleClickOnFireButton = async (user: UserResponse) => {
        const confirmDelete = await confirm([
            t("table.fireEmployeeConfirmation.part1"),
            t("table.fireEmployeeConfirmation.part2", {
                fullName: `${user.lastName} ${user.firstName}`
            })
        ]);

        if (confirmDelete) {
            await fireUser(user.id);
        }
    };
    
    return (
        <>
            <Table className={styles.usersTable} aria-label="striped table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            {t("table.fullNameColumnLabel")}
                        </TableCell>
                        <TableCell align="center">
                            {t("table.roleColumnLabel")}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <TableRow
                        key={user.id}
                        sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                    >
                        <TableCell align="center">
                            {`${user.lastName} ${user.firstName}`}
                        </TableCell>
                        <TableCell align="center">
                            {user.roles.join(' ')}
                        </TableCell>
                        <TableCell className={styles.cellWithIconButton} align="right">
                            <IconButton
                                color="error"
                                onClick={() => handleClickOnFireButton(user)}
                            >
                                <LocalFireDepartmentIcon/>
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

export default UsersTable;
