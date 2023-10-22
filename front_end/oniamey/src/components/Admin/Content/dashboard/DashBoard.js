import React from 'react';
import './DashBoard.scss';
import BreadcrumbsPage from '../../BreadCrumbs/BreadcrumbsPage';

const Dashboard = (props) => {
    return (

        <div class="container">
            <table class="table">
                <thead>
                <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                    <th>Header 3</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Data 1</td>
                    <td>Data 2</td>
                    <td>Data 3</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
