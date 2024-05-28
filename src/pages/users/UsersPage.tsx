import styles from './UsersPage.module.less';
import { useGetCompanyUsersQuery } from "../../api/userApi";
import { Paper } from '@mui/material';
import UsersTable from './usersTable/UsersTable';
import RegisterEmployeeButton from './registerEmployeeButton/RegisterEmployeeButton';
import { useTranslation } from 'react-i18next';

const UsersPage = () => {
    const { t } = useTranslation('usersPage');
    const { data: users } = useGetCompanyUsersQuery();

    return (
        <div className={styles.usersPageContainer}>
            <div className={styles.createUserButton}>
                <RegisterEmployeeButton />
            </div>
            {users &&
                <div className={styles.content}>
                    {
                        users.length > 0
                        ?
                        <Paper>
                            <UsersTable users={users}/>
                        </Paper>
                        : 
                        <div className={styles.empty}>
                            <h2>{t("registerFirstEmployeeText")}</h2>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default UsersPage;