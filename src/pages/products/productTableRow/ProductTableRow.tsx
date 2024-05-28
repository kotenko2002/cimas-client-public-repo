import styles from './ProductTableRow.module.less';
import { IconButton, TableCell, TableRow } from "@mui/material";
import { DeleteOutline } from '@mui/icons-material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ProductResponse } from "../../../contracts/productTypes";

interface ProductTableRowProps {
    product: ProductResponse;
    handleProductChange: (productId: string, field: 'soldAmount' | 'incomeAmount', newValue: number) => void;
    handleClickOnDeleteButton: (product: ProductResponse) => Promise<void>;
}

const ProductTableRow = ({ product, handleProductChange, handleClickOnDeleteButton }: ProductTableRowProps) => {
    return (
        <TableRow
            key={product.id}
            sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
        >
            <TableCell align="center">
                {product.name}
            </TableCell>
            <TableCell align="center">
                {product.price}
            </TableCell>
            <TableCell align="center">
                {product.amount}
            </TableCell>

            <TableCell>
                <div className={styles.cellWithCounter}>
                    <IconButton onClick={() => handleProductChange(product.id, 'soldAmount', product.soldAmount - 1)}>
                        <RemoveCircleOutlineIcon color="action"/>
                    </IconButton>
                    <div className={styles.counterValue}>
                        {product.soldAmount}
                    </div>
                    <IconButton onClick={() => handleProductChange(product.id, 'soldAmount', product.soldAmount + 1)}>
                        <AddCircleOutlineOutlinedIcon color="action"/>
                    </IconButton>
                </div>
            </TableCell>
            
            <TableCell>
                <div className={styles.cellWithCounter}>
                    <IconButton onClick={() => handleProductChange(product.id, 'incomeAmount', product.incomeAmount - 1)}>
                        <RemoveCircleOutlineIcon color="action"/>
                    </IconButton>
                    <div className={styles.counterValue}>
                        {product.incomeAmount}
                    </div>
                    <IconButton onClick={() => handleProductChange(product.id, 'incomeAmount', product.incomeAmount + 1)}>
                        <AddCircleOutlineOutlinedIcon color="action"/>
                    </IconButton>
                </div>
            </TableCell>

            <TableCell className={styles.cellWithIconButton} align="right">
                <IconButton
                    color="error"
                    onClick={() => handleClickOnDeleteButton(product)}
                >
                    <DeleteOutline/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default ProductTableRow;
