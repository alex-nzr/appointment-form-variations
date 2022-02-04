import React, {FC} from 'react';
import styles from './App.m.scss'

const App:FC = () => {
    return (
        <div className={styles[`application`]}>
            <h2>It works!</h2>
        </div>
    );
};

export default App;