import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [dailyStats, setDailyStats] = useState({
    totalOrdersToday: 0,
    revenueToday: 0,
  });
  const [monthlyStats, setMonthlyStats] = useState({
    totalOrdersThisMonth: 0,
    revenueThisMonth: 0,
  });
  const [chartData, setChartData] = useState([]);

  const fetchStats = async () => {
    try {
      const dailyResponse = await fetch(
        'http://localhost:8080/order/stats/daily'
      );
      const dailyData = await dailyResponse.json();
      setDailyStats(dailyData);

      const monthlyResponse = await fetch(
        'http://localhost:8080/order/stats/monthly'
      );
      const monthlyData = await monthlyResponse.json();
      setMonthlyStats(monthlyData);

      const chartResponse = await fetch(
        'http://localhost:8080/order/stats/chart'
      );
      const chartData = await chartResponse.json();

      const mockData = [
        { _id: '2024-08', totalOrders: 50, revenue: 2500 },
        { _id: '2024-09', totalOrders: 20, revenue: 2000 },
        { _id: '2024-10', totalOrders: 80, revenue: 3000 },
      ];

      const combinedData = [...mockData, ...chartData];
      setChartData(combinedData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const data = chartData.map((item) => ({
    month: item._id,
    totalOrders: item.totalOrders,
    revenue: item.revenue,
  }));

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Orders Today</Typography>
              <Typography variant="h4">
                {dailyStats.totalOrdersToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenue Today</Typography>
              <Typography variant="h4">${dailyStats.revenueToday}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Orders This Month</Typography>
              <Typography variant="h4">
                {monthlyStats.totalOrdersThisMonth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenue This Month</Typography>
              <Typography variant="h4">
                $
                {monthlyStats.revenueThisMonth.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Orders Overview Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Orders Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="totalOrders"
                    fill="#8884d8"
                    name="Total Orders"
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Overview Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenue Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#82ca9d"
                    name="Revenue"
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
