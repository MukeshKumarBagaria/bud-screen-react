import React from 'react';
import './DataTable.css';

/**
 * DataTable — Reusable read-only table component
 *
 * Dark blue-700 header, grey-200 bordered, white body rows.
 * Accepts dynamic columns and data.
 *
 * @param {Array<{ key: string, label: string, render?: (value, row) => React.ReactNode }>} columns
 * @param {Array<object>} data — Array of row objects keyed by column.key
 * @param {string}        emptyMessage — Message when data is empty
 */
const DataTable = ({ columns = [], data = [], emptyMessage = 'No records available.' }) => {
    return (
        <div className="data-table">
            <div className="data-table__wrap">
                <table className="data-table__table">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="data-table__empty">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr key={row.id ?? index}>
                                    {columns.map((col) => (
                                        <td key={col.key}>
                                            {col.render
                                                ? col.render(row[col.key], row)
                                                : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
