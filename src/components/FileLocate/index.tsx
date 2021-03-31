import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import readXlsxFile from 'read-excel-file'
import { StatusBox } from '../StatusBox';
import { getXboxValidator } from '../../services/xboxApi';
import Button from '@material-ui/core/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';

interface XboxKey {
    id: number,
    tokenState: string,
    description: string,
}


export default function FileLocate() {

    const [inputFile, setInputFile] = useState();

    const [tokens, setTokens] = useState<XboxKey[]>([]);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [keys, setKeys] = useState([]);
    const [redeemedKeys, setRedeemedKeys] = useState([]);
    const [validKeys, setValidKeys] = useState([]);
    const [invalidKeys, setInvalidKeys] = useState([]);

    let counter = 0;

    async function handleInputChange(input: readXlsxFile) {

        console.log(input)

        setInputFile(input.target.files[0].name)

        await readXlsxFile(input.target.files[0]).then((rows: readXlsxFile) => {
            setTokenAmount(rows.length);
            setKeys(rows);
            rows.map((row: string) => {
                const response = getXboxValidator(row);
                response.then((res: XboxKey) => {
                    if (res.tokenState == 'Active') {
                        setValidKeys(validKeys => [...validKeys, res.tokenState])
                    } else if (res.tokenState == 'Redeemed') {
                        setRedeemedKeys(redeemedKeys => [...redeemedKeys, res.tokenState])
                    } else {
                        setInvalidKeys(invalidKeys => [...invalidKeys, res.tokenState])
                    }
                    setTokens(tokens => [...tokens, res])
                })
            })
        })
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    useEffect(() => {

    }, [tokens])


    return (
        <>
            <div className={styles.ContainerFile}>
                <div className={styles.ContainerContent}>
                    <div className={styles.DivContent}>
                        <input
                            accept="*"
                            className={styles.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button startIcon={<CloudUploadIcon />} variant="contained" color="primary" component="span" size="large">
                                Upload
                            </Button>
                        </label>
                        <label htmlFor="contained-button-file">
                            <Button startIcon={<SaveIcon />} variant="contained" color="primary" component="span" size="large" onClick={(e) => exportToCSV(tokens, inputFile + '_checkFile')}>
                                Save File
                        </Button>
                        </label>
                    </div>
                    <StatusBox tokens={tokens} tokenAmount={tokenAmount} keys={keys} validKeys={validKeys} redeemedKeys={redeemedKeys} invalidKeys={invalidKeys} />
                </div>
            </div>
            <div className={styles.DivButton}>

            </div>

        </>
    )
}