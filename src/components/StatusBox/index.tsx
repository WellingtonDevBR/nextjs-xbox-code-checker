import { useState } from 'react';
import FileLocate from '../FileLocate';
import styles from './styles.module.scss';


interface XboxKey {
    id: number,
    tokenState: string,
    description: string,
}


export function StatusBox({ tokens, tokenAmount, keys, validKeys, invalidKeys, redeemedKeys}) {


    return (
        <>
            <h1 style={{ marginTop: '3%' }}>Status</h1>
            <div className={styles.WholeContainer}>
                <div className={styles.Container}>
                    <div className={styles.ContainerStatus}>
                        <div style={{ background: '#3178BA' }} >
                            <label>Total</label>
                            <p>{tokenAmount}</p>
                        </div>
                        <div style={{ background: '#09FF30' }} >
                            <label>Valid</label>
                            <p>{validKeys.length}</p>
                        </div>
                        <div style={{ background: '#FF0000' }} >
                            <label>Invalid</label>
                            <p>{invalidKeys.length}</p>
                        </div>
                        <div style={{ background: '#BA2B2B' }} >
                            <label>Used Code</label>
                            <p>{redeemedKeys.length}</p>
                        </div>
                        <div style={{ background: '#8530AD' }} >
                            <label>Duplicated</label>
                            <p>0</p>
                        </div>
                        <div style={{ background: '#E9D632' }} >
                            <label>Unchecked</label>
                            <p>0</p>
                        </div>
                    </div>
                </div>
                <div className={styles.ContainerCode}>
                    {
                        tokens.map((token: XboxKey, index) => (
                            <div id={index} className={styles.singleCodeContainer}>
                                <p className={token.tokenState == 'Active' ? styles.CheckMark : styles.UncheckMark}>1</p>
                                <p>{keys[index]}</p>
                                <p className={token.tokenState == 'Active' ? styles.valid : styles.invalid}>{token.tokenState}</p>
                                <p>NOT DUPLICATED</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}