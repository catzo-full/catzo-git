import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users as UsersIcon } from 'lucide-react';
import { Order } from '../../types';
import { supabase } from '../../lib/supabase';

const AdminAnalytics: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<number>(0);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalUsers: 0,
  });
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        supabase.from('orders').select('*'),
        supabase.from('user_roles').select('*'),
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (usersRes.error) throw usersRes.error;

      const ordersData = ordersRes.data || [];
      const usersData = usersRes.data || [];

      setOrders(ordersData);
      setUsers(usersData.length);

      const totalRevenue = ordersData.reduce((sum, order) => sum + order.total_amount, 0);
      const totalOrders = ordersData.length;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      setStats({
        totalRevenue,
        totalOrders,
        averageOrderValue,
        totalUsers: usersData.length,
      });

      calculateTopProducts(ordersData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTopProducts = (ordersData: Order[]) => {
    const productMap: { [key: string]: { name: string; count: number; revenue: number } } = {};

    ordersData.forEach(order => {
      order.items.forEach(item => {
        const key = item.product.name;
        if (!productMap[key]) {
          productMap[key] = { name: item.product.name, count: 0, revenue: 0 };
        }
        productMap[key].count += item.quantity;
        productMap[key].revenue += item.product.price * item.quantity;
      });
    });

    const top = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    setTopProducts(top);
  };

  const StatCard = ({ icon: Icon, title, value, subtext }: any) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtext && <p className="text-gray-500 text-xs mt-1">{subtext}</p>}
        </div>
        <div className="bg-orange-100 rounded-full p-3">
          <Icon className="text-orange-600" size={24} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toFixed(2)}`}
            subtext={`${stats.totalOrders} orders`}
          />
          <StatCard
            icon={ShoppingCart}
            title="Total Orders"
            value={stats.totalOrders}
            subtext={`Avg: ₹${stats.averageOrderValue.toFixed(2)}`}
          />
          <StatCard
            icon={UsersIcon}
            title="Total Users"
            value={stats.totalUsers}
            subtext={`Active users`}
          />
          <StatCard
            icon={TrendingUp}
            title="Avg Order Value"
            value={`₹${stats.averageOrderValue.toFixed(2)}`}
            subtext={`Per order`}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status Distribution</h2>
          <div className="space-y-4">
            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => {
              const count = orders.filter(o => o.status === status).length;
              const percentage = stats.totalOrders > 0 ? (count / stats.totalOrders) * 100 : 0;

              const colorMap: { [key: string]: string } = {
                pending: 'bg-yellow-500',
                confirmed: 'bg-blue-500',
                shipped: 'bg-purple-500',
                delivered: 'bg-green-500',
                cancelled: 'bg-red-500',
              };

              return (
                <div key={status}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-medium capitalize">{status}</span>
                    <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${colorMap[status]}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Key Metrics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Revenue Growth</p>
              <p className="text-2xl font-bold text-green-600">+₹{stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-sm mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.totalUsers > 0 ? ((stats.totalOrders / stats.totalUsers) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-sm mb-1">Orders per User</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.totalUsers > 0 ? (stats.totalOrders / stats.totalUsers).toFixed(2) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Selling Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Units Sold</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">{product.count}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">₹{product.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {topProducts.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-600">No sales data yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
