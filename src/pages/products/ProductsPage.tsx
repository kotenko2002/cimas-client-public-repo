import styles from './ProductsPage.module.less';
import { Button, Paper } from "@mui/material";
import { useGetProductsByCinemaIdQuery } from "../../api/productApi";
import { useAppSelector } from "../../hooks/redux";
import CreateProductButton from './createProductButton/CreateProductButton';
import ProductsTable, { ProductsTableHandle } from './productsTable/ProductsTable';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ProductsPage = () => {
    const { t } = useTranslation("productsPage");

    const productsTableRef = useRef<ProductsTableHandle | null>(null);
    
    const { workday } = useAppSelector(state => state.workday);
    const { data: products } = useGetProductsByCinemaIdQuery(workday?.cinemaId!, {
        skip: !workday
    });

    if(!workday) {
        return null;
    } 

    const handleUpdateClick = () => {
        productsTableRef.current?.handleButtonClick();
    };

    return (
        <div className={styles.productsPageContainer}>
            <div className={styles.productButtons}>
                <Button variant="outlined" onClick={handleUpdateClick}>
                    {t("saveChangesButtonText")}
                </Button>
                <CreateProductButton
                    cinemaId={workday.cinemaId}
                />
            </div>
            {products &&
                <div className={styles.content}>
                    {
                        products.length > 0
                        ?
                        <Paper>
                            <ProductsTable
                                ref={productsTableRef}
                                initialProducts={products}
                            />
                        </Paper>
                        : 
                        <div className={styles.empty}>
                            <h2>{t("createFirstProductText")}</h2>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default ProductsPage;
