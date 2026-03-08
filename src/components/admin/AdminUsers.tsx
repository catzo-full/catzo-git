import React, { useState, useEffect } from 'react';
import { Search, Mail, Calendar, ShoppingCart } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface UserInfo {
  id: string;
  email: string;
  created_at: string;
  role: string;
  order_count: number;
  total_spent: number;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      const [usersRes, ordersRes] = await Promise.all([
        supabase.from('user_roles').select('*'),
        supabase.from('orders').select('*'),
      ]);

      if (usersRes.error) throw usersRes.error;
      if (ordersRes.error) throw ordersRes.error;

      const usersData = usersRes.data || [];
      const ordersData = ordersRes.data || [];

      const userMap: { [key: string]: UserInfo } = {};

      usersData.forEach((user: any) => {
        userMap[user.user_id] = {
          id: user.user_id,
          email: '',
          created_at: user.created_at,
          role: user.role,
          order_count: 0,
          total_spent: 0,
        };
      });

      ordersData.forEach((order: any) => {
        if (userMap[order.user_id]) {
          userMap[order.user_id].order_count += 1;
          userMap[order.user_id].total_spent += order.total_amount;
        }
      });

      const usersWithEmail = await Promise.all(
        Object.values(userMap).map(async (user) => {
          const { data: authData, error } = await supabase.auth.admin.getUserById(user.id);
          if (!error && authData.user) {
            user.email = authData.user.email || '';
          }
          return user;
        })
      );

      setUsers(usersWithEmail);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Users</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 truncate">{user.email}</h3>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-orange-500" />
                Joined {new Date(user.created_at).toLocaleDateString()}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <ShoppingCart size={16} className="mr-2 text-orange-500" />
                {user.order_count} order{user.order_count !== 1 ? 's' : ''}
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-lg font-bold text-orange-600">₹{user.total_spent.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
