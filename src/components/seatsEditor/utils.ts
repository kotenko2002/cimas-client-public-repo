export const getContainerWidth = (columnCount: number) => {
    if(columnCount === -Infinity) {
        return 'auto'
    }

    const gapsWidth = 12 * columnCount;
    const seatsWidth  = 40 * columnCount;
    const alphabetColumnWidth = 40;
    
    return `${gapsWidth + seatsWidth + alphabetColumnWidth}px`;
}
