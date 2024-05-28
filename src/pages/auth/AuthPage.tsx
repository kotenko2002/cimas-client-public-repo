import styles from './AuthPage.module.less';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import RegisterOwnerForm from './registerOwnerForm/RegisterOwnerForm';
import LoginForm from './loginForm/LoginForm';
import { useTranslation } from 'react-i18next';

type AuthTab = "login" | "register"

const AuthPage = () => {
    const { t } = useTranslation('authPage');
    
    const [selectedTab, setSelectedTab] = useState<AuthTab>("login");

    return (
        <div className={styles.authPageContainer}>
            <TabContext value={selectedTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={(e, newSeletedTab: AuthTab) => {setSelectedTab(newSeletedTab)}}>
                        <Tab label={t("loginTab.label")} value="login" className={styles.tab}/>
                        <Tab label={t("registerTab.label")} value="register" className={styles.tab}/>
                    </TabList>
                </Box>
                <TabPanel value="login" className={styles.tabContent}>
                    <LoginForm />
                </TabPanel>
                <TabPanel value="register" className={styles.tabContent}>
                    <RegisterOwnerForm switchToLoginTab={() => setSelectedTab("login")}/>
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default AuthPage;