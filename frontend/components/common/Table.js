import React, { useState } from 'react';

import { useRouter } from 'next/router';

const Table = ({ headers, data, rowsPerPageOptions = [10, 20, 30], viewBtn, routePath, user="teacher", disabled=false, handleSpecialCase }) => {

    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Function to handle rows per page change
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearchQuery(e.target.value)
        const filtered = data.filter((row) =>
            Object.values(row)
                .join(" ")
                .toLowerCase()
                .includes(keyword)
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };


    const handleRowClick = (rowData) => {
        console.log(rowData);
        localStorage.setItem('classCode', rowData.classCode)
        localStorage.setItem('classId', rowData.id)
        router.push(`/dashboard/${user}/${routePath}/${rowData.classCode}`)
    };


    const totalPages = Math.ceil(data.length / rowsPerPage);

    const lastIndex = currentPage * rowsPerPage;

    const firstIndex = lastIndex - rowsPerPage;

    const currentData = data.slice(firstIndex, lastIndex);

    const handleRowDelete = (row) => {
        console.log(row)
    }
    return (
        <div className='p-4 m-4 border border-solid max-w-[100vw] overflow-x-auto'>
            {/* Table */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    className="px-2 py-1 text-gray-600 bg-gray-100 border rounded-md mr-2"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <table className="w-full border-collapse table-auto">
                {/* Table Headers */}
                <thead>
                    <tr>
                        {Object.keys(headers[0]).map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-gray-800 uppercase font-bold"
                            >
                                {header}
                            </th>
                        ))}
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                {/* Table Data */}
                <tbody className=''>
                    {(searchQuery ? filteredData : currentData).map((row, index) => (
                        <tr key={index} className="border-t border-gray-200">
                            {
                                Object.keys(headers[0]).map((key, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                                        {row[key]} 
                                    </td>
                                ))
                            }

                            <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                                {/* Render action button */}
                                <button
                                    // disabled={disabled}
                                    className="px-3 py-1 text-white bg-blue-500 rounded"
                                    onClick={() => { handleSpecialCase ? handleSpecialCase(row) :  handleRowClick(row)}}
                                >
                                    {viewBtn} 
                                </button>
                                {/* <button
                                    className="px-3 py-1 text-white bg-red-500 rounded"
                                    onClick={() => handleRowDelete(row)}
                                >
                                    Delete 
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">

                <div className="flex items-center">
                    <span className="mr-2">Rows per page:</span>
                    <select
                        className="px-2 py-1 text-gray-600 bg-gray-100 border rounded-md"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                    >
                        {rowsPerPageOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center">
                    <span className="mr-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 text-gray-600 bg-gray-100 border rounded-md"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <button
                        className="px-3 py-1 text-gray-600 bg-gray-100 border rounded-md ml-2"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;

