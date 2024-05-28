import { useState, forwardRef, useImperativeHandle, useEffect  } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ProductResponse } from "../../../contracts/productTypes";
import useConfirm from '../../../hooks/useConfirm';
import { useDeleteProductMutation, useUpdateProductsMutation } from '../../../api/productApi';
import ProductTableRow from '../productTableRow/ProductTableRow';
import { toastSettings } from '../../../constants';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface ProductsTableProps {
    initialProducts: ProductResponse[];
}

export interface ProductsTableHandle {
    handleButtonClick: () => Promise<void>;
}

const ProductsTable = forwardRef<ProductsTableHandle, ProductsTableProps>((props, ref) => {
    const { initialProducts } = props;
    const { t } = useTranslation("productsPage");

    const [Dialog, confirm] = useConfirm();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductsMutation();

    const [products, setProducts] = useState<ProductResponse[]>(initialProducts);
    const [changedProductIds, setChangedProductIds] = useState<string[]>([]);

    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    useImperativeHandle(ref, () => ({
        handleButtonClick,
    }));

    const handleClickOnDeleteButton = async (product: ProductResponse) => {
        const confirmDelete = await confirm([
            t("table.deleteFilmConfirmation.part1"),
            t("table.deleteFilmConfirmation.part2", {
                productName: product.name
            })
        ]);

        if (confirmDelete) {
            await deleteProduct(product.id);
        }
    };

    const handleProductChange = (productId: string, field: 'soldAmount' | 'incomeAmount', newValue: number) => {
        if(newValue < 0) {
            return;
        }
        
        setProducts(products.map(product =>
            product.id === productId ? { ...product, [field]: newValue} : product
        ));

        if(!changedProductIds.includes(productId)) {
            setChangedProductIds([...changedProductIds, productId]);
        }
    };
    
    const handleButtonClick = async () => {
        const productsToUpdate = products.filter(product => changedProductIds.includes(product.id));
        
        if(productsToUpdate.length === 0) {
            return;
        }

        const response = await updateProduct({
            products: productsToUpdate
        });

        if (!('error' in response)) {
            toast.success(t('changesSuccessfulySavedMessage'), toastSettings);
            setChangedProductIds([]);
        } 
    };

    return (
        <>
            <Table aria-label="striped table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{t("table.nameColumnLabel")}</TableCell>
                        <TableCell align="center">{t("table.priceColumnLabel")}</TableCell>
                        <TableCell align="center">{t("table.amountColumnLabel")}</TableCell>

                        <TableCell align="center">{t("table.soldAmountColumnLabel")}</TableCell>
                        
                        <TableCell align="center">{t("table.incomeAmountColumnLabel")}</TableCell>

                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {products.map((product) => (
                    <ProductTableRow 
                        key={product.id}
                        product={product}
                        handleProductChange={handleProductChange}
                        handleClickOnDeleteButton={handleClickOnDeleteButton}
                    />
                ))}
                </TableBody>
            </Table>
            <Dialog />
        </>
    );
})

export default ProductsTable;
