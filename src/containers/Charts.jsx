/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import DonutChart from '../components/DonutChart';
import { PieChartSkeleton, BarChartSkeleton } from '../components/SkeletonLoaders';

import { updateTableDataType } from '../store/actions';

import config from '../config';

const Charts = ({
    dispatchUpdateTableDataType,
}) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${config.API_BASE_URL}/colleges/stats`);
            setData(response.data);
            setLoading(false);
        }

        getData();
    }, []);
    return (
        <section className="charts">
            {loading
                ? (
                    <div className="loader">
                        <BarChartSkeleton />
                        <PieChartSkeleton />
                    </div>
                ) : (
                    <>
                        <DonutChart
                            data={data.courseStats}
                            dispatchUpdateTableDataType={dispatchUpdateTableDataType}
                        />
                    </>
                )}
        </section>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateTableDataType: (value) => dispatch(updateTableDataType(value)),
});

export default connect(
    null,
    mapDispatchToProps,
)(Charts);
