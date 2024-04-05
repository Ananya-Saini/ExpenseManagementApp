import React from 'react'
import { Progress } from 'antd'

const Analytics = ({ allTransaction }) => {
    const totalTransactions = allTransaction.length
    const totalIncomeTransaction = allTransaction.filter(transaction => transaction.type === 'income')
    const totalExpenseTransaction = allTransaction.filter(transaction => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransaction.length / totalTransactions) * 100
    const totalExpensePercent = (totalExpenseTransaction.length / totalTransactions) * 100

    const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnover = allTransaction.filter((transaction) => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = allTransaction.filter((transaction) => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100

    const categories = [
        "salary",
        "tip",
        "project",
        "food",
        "movie",
        "bills",
        "medical",
        "fee",
        "tax",
      ];
    return (
        <>
            <div className='row m-3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5rem', padding: '0 0 4rem 0'}}>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header' style={{background: '#0d6efd', color: 'white'}}>
                            <b>Total Transactions: {totalTransactions}</b>
                        </div>
                        <div className='card-body' style={{border: '1px solid #0d6efd'}}>
                            <div style={{display: 'flex', justifyContent: 'center', gap: '4rem'}}>
                            <h5 className='text-success'>Income: {totalIncomeTransaction.length}</h5>
                            <h5 className='text-danger'>Expense: {totalExpenseTransaction.length}</h5>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', gap: '2rem'}}>
                                <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)} />
                                <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header' style={{background: '#0d6efd', color: 'white'}}>
                            <b>Total Turnover: {totalTurnover}</b>
                        </div>
                        <div className='card-body' style={{border: '1px solid #0d6efd'}}>
                            <div style={{display: 'flex', justifyContent: 'center', gap: '4rem'}}>
                            <h5 className='text-success'>Income: {totalIncomeTurnover}</h5>
                            <h5 className='text-danger'>Expense: {totalExpenseTurnover}</h5>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', gap: '2rem'}}>
                                <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)} />
                                <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpenseTurnoverPercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='row mt-3' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {/* <div className='col-md-6'> */}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%'}}>
                    <h4 className='text-center mb-3' style={{color: '#0d6efd'}}>CATEGORYWISE INCOME</h4>
                    {
                        categories.map((category) => {
                            const amount = allTransaction
                            .filter(
                                (transaction) =>
                                transaction.type === 'income' && 
                                transaction.category === category
                            )
                                .reduce((acc, transaction) => acc + transaction.amount, 0);
                            return (
                                amount > 0 && (
                                    <div className='card' style={{width: '80%', margin: '0.2rem'}}>
                                        <div className='card-body'>
                                            <h5>{category}</h5>
                                            <Progress 
                                                percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} 
                                            />
                                        </div>
                                    </div>
                                )
                            );
                        })
                    }
                </div>
                {/* <div className='col-md-6' style={{ position: 'relative'}}> */}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', overflow: 'scroll'}}>
                    <h4 className='text-center mb-3' style={{color: '#0d6efd'}}>CATEGORYWISE EXPENSE</h4>
                    {
                        categories.map((category) => {
                            const amount = allTransaction
                            .filter(
                                (transaction) =>
                                transaction.type === 'expense' && 
                                transaction.category === category
                            )
                                .reduce((acc, transaction) => acc + transaction.amount, 0);
                            return (
                                amount > 0 && (
                                    // <div className='card' style={{ position: 'relative', maxHeight: '350px', overflowY: 'auto' }}>
                                     <div className='card' style={{width: '80%', margin: '.2rem'}}>
                                        {/* <div className='card-body' style={{ maxHeight: '100px' }}> */}
                                        <div className='card-body' style={{display: 'flex', overflow: 'hidden', gap: '2rem'}}>
                                            <h5 style={{ overflow: 'visible', whiteSpace: 'nowrap' }}>{category}</h5>
                                            <Progress 
                                                percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} 
                                            />
                                        </div>
                                    </div>
                                )
                            );
                        })
                    }
                    </div>
            </div>
        </>
    )
}

export default Analytics