'use client';
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
};

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  adminId: number;
  createdAt?: string;
};

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: string;
  stock: number;
  sku?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  categoryId: number;
  adminId: number;
  category?: {
    name: string;
  };
};

export interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  status: string;
  totalAmount: string;
  shippingAddress: string;
  billingAddress: string;
  customer?: {
    name: string;
    email: string;
  };
  items?: Array<{
    id: number;
    quantity: number;
    unitPrice: string;
    product: {
      name: string;
      sku?: string;
    };
  }>;
  payment?: {
    status: string;
    method: string;
  };
};

export interface Report {
  id: number;
  adminId: number;
  reportType: string;
  periodStart: string;
  periodEnd: string;
  generatedAt: string;
  dataJson: string;
  admin?: {
    name: string;
  };
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'reports'>('products');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const API_BASE = '/api';

  /** Show notification and auto-hide after 3 seconds */
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  /** Generic typed fetch helper */
  const fetchData = async <T,>(endpoint: string): Promise<T[]> => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (!res.ok) {
        const text = await res.text();
        console.error(`API ${endpoint} failed (${res.status}):`, text);
        setError(`Failed to fetch ${endpoint}: ${res.status}`);
        return [];
      }
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        console.error(`API ${endpoint} returned non-JSON: ${contentType}`);
        setError(`Invalid response format from ${endpoint}`);
        return [];
      }
      const data = await res.json();
      
      // Handle error responses
      if (data.error) {
        setError(data.error);
        return [];
      }
      
      setError(null);
      return Array.isArray(data) ? data as T[] : [];
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Network error. Please check your connection.');
      return [];
    }
  };

  const refreshList = async (endpoint: string) => {
    setLoading(true);
    try {
      switch (endpoint) {
        case '/categories':
          setCategories(await fetchData<Category>('/categories'));
          break;
        case '/products':
          setProducts(await fetchData<Product>('/products'));
          break;
        case '/orders':
          setOrders(await fetchData<Order>('/orders'));
          break;
        case '/reports':
          setReports(await fetchData<Report>('/reports'));
          break;
        default:
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAllLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshAllLists = async () => {
    setLoading(true);
    try {
      const [cats, prods, ords, reps] = await Promise.all([
        fetchData<Category>('/categories'),
        fetchData<Product>('/products'),
        fetchData<Order>('/orders'),
        fetchData<Report>('/reports'),
      ]);
      setCategories(cats);
      setProducts(prods);
      setOrders(ords);
      setReports(reps);
      showNotification('All data refreshed successfully!', 'success');
    } catch (err) {
      console.error('Error refreshing lists:', err);
      showNotification('Failed to refresh data', 'error');
    } finally {
      setLoading(false);
    }
  };

  /** Category Operations */
  const handleCreateCategory = async () => {
    const name = prompt('Enter category name:');
    if (!name) return;

    const description = prompt('Enter description (optional):');

    try {
      const response = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description: description || null,
          adminId: 1, // Assuming admin ID 1 from seed
        }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories(prev => [newCategory, ...prev]);
        showNotification('Category created successfully!', 'success');
      } else {
        const errorData = await response.json();
        showNotification(`Failed to create category: ${errorData.error}`, 'error');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      showNotification('Failed to create category', 'error');
    }
  };

  /** Product Operations */
  const handleCreateProduct = async () => {
    const name = prompt('Enter product name:');
    if (!name) return;

    const price = prompt('Enter price (e.g., 49.99):');
    const stock = prompt('Enter stock quantity:');
    const categoryId = prompt('Enter category ID (see categories tab):');
    const description = prompt('Enter description (optional):');
    const sku = prompt('Enter SKU (optional):');
    const imageUrl = prompt('Enter image URL (optional):');

    if (!price || !stock || !categoryId) {
      showNotification('Price, stock, and category ID are required', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description: description || null,
          price: parseFloat(price),
          stock: parseInt(stock),
          categoryId: parseInt(categoryId),
          adminId: 1, // Assuming admin ID 1
          sku: sku || null,
          imageUrl: imageUrl || null,
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts(prev => [newProduct, ...prev]);
        showNotification('Product created successfully!', 'success');
      } else {
        const errorData = await response.json();
        showNotification(`Failed to create product: ${errorData.error}`, 'error');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      showNotification('Failed to create product', 'error');
    }
  };

  /** Order Operations */
  const handleUpdateOrderStatus = async (orderId: number, currentStatus: string) => {
    const newStatus = prompt('Enter new status:', currentStatus);
    if (!newStatus || newStatus === currentStatus) return;

    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        showNotification('Order status updated successfully!', 'success');
      } else {
        const errorData = await response.json();
        showNotification(`Failed to update order: ${errorData.error}`, 'error');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      showNotification('Failed to update order', 'error');
    }
  };

  /** Report Operations */
  const handleGenerateReport = async () => {
    const reportType = prompt('Enter report type (SALES/INVENTORY):');
    if (!reportType || !['SALES', 'INVENTORY'].includes(reportType.toUpperCase())) {
      showNotification('Report type must be SALES or INVENTORY', 'error');
      return;
    }

    const periodStart = prompt('Enter period start (YYYY-MM-DD):');
    const periodEnd = prompt('Enter period end (YYYY-MM-DD):');

    if (!periodStart || !periodEnd) {
      showNotification('Period start and end dates are required', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportType: reportType.toUpperCase(),
          periodStart,
          periodEnd,
          adminId: 1, // Assuming admin ID 1
        }),
      });

      if (response.ok) {
        const newReport = await response.json();
        setReports(prev => [newReport, ...prev]);
        showNotification('Report generated successfully!', 'success');
        
        // Show report data in alert
        try {
          const data = JSON.parse(newReport.dataJson);
          alert(`Report generated!\n\nType: ${reportType}\nData: ${JSON.stringify(data, null, 2)}`);
        } catch {
          alert(`Report generated!\nType: ${reportType}`);
        }
      } else {
        const errorData = await response.json();
        showNotification(`Failed to generate report: ${errorData.error}`, 'error');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      showNotification('Failed to generate report', 'error');
    }
  };

  /** Render section header with actions */
  const renderSectionHeader = (title: string, onCreate?: () => void, onAction?: () => void, actionLabel?: string) => {
    const endpoint = `/${title.toLowerCase().replace('manage ', '')}s`;
    
    return (
      <div className="section-header">
        <h2 className="section-h2">{title}</h2>
        <div className="section-actions">
          <button 
            onClick={() => refreshList(endpoint)} 
            className="refresh-section-btn"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          {onCreate && (
            <button 
              onClick={onCreate} 
              className="create-btn"
              disabled={loading}
            >
              + Add New
            </button>
          )}
          {onAction && (
            <button 
              onClick={onAction} 
              className="action-btn"
              disabled={loading}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderTable = <T extends { id: number }>(
    items: T[], 
    columns: string[], 
    modelName: string,
    actions?: (item: T) => React.ReactNode
  ) => {
    if (!Array.isArray(items) || items.length === 0) {
      return (
        <div className="no-data">
          <p>No {modelName}s available yet.</p>
        </div>
      );
    }

    return (
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col} className={`col-${col}`}>
                  {/* Handle nested objects */}
                  {(() => {
                    const keys = col.split('.');
                    let value: any = item;
                    for (const key of keys) {
                      value = value?.[key as keyof typeof value];
                      if (value === undefined) break;
                    }
                    return String(value ?? '-');
                  })()}
                </td>
              ))}
              {actions && (
                <td className="actions-cell">
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'categories':
        return (
          <div className="content-section">
            {renderSectionHeader('Manage Categories', handleCreateCategory)}
            {renderTable(categories, ['id', 'name', 'description', 'adminId'], 'category')}
          </div>
        );

      case 'products':
        return (
          <div className="content-section">
            {renderSectionHeader('Manage Products', handleCreateProduct)}
            {renderTable(
              products, 
              ['id', 'name', 'price', 'stock', 'category.name', 'adminId'], 
              'product'
            )}
          </div>
        );

      case 'orders':
        return (
          <div className="content-section">
            {renderSectionHeader('Manage Orders', handleUpdateOrderStatus)}
            {renderTable(
              orders, 
              ['id', 'customer.name', 'status', 'totalAmount', 'orderDate'], 
              'order',
              (order) => (
                <button
                  onClick={() => handleUpdateOrderStatus(order.id, order.status)}
                  className="action-small-btn"
                  title="Update Status"
                >
                  ✏️
                </button>
              )
            )}
          </div>
        );

      case 'reports':
        return (
          <div className="content-section">
            {renderSectionHeader('Manage Reports', undefined, handleGenerateReport, 'Generate Report')}
            {renderTable(
              reports.map(report => ({
                ...report,
                // Format dates for display
                periodStart: new Date(report.periodStart).toLocaleDateString(),
                periodEnd: new Date(report.periodEnd).toLocaleDateString(),
                generatedAt: new Date(report.generatedAt).toLocaleDateString(),
              })),
              ['id', 'reportType', 'periodStart', 'periodEnd', 'generatedAt'],
              'report',
              (report) => (
                <button
                  onClick={() => {
                    try {
                      const data = JSON.parse(report.dataJson);
                      alert(`Report Data:\n\n${JSON.stringify(data, null, 2)}`);
                    } catch {
                      alert('Report data cannot be displayed');
                    }
                  }}
                  className="action-small-btn"
                  title="View Data"
                >
                  👁️
                </button>
              )
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`admin-container ${loading ? 'loading' : ''}`}>
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={() => setError(null)} className="close-error-btn">×</button>
        </div>
      )}

      <h1 className="admin-header">👔 Admin Dashboard - Clothing Store</h1>
      
      <div className="dashboard-controls">
        <button 
          onClick={refreshAllLists} 
          className="refresh-btn"
          disabled={loading}
        >
          {loading ? '⏳ Refreshing...' : '🔄 Refresh All'}
        </button>
        <div className="stats-summary">
          <span className="stat">📦 Products: {products.length}</span>
          <span className="stat">📁 Categories: {categories.length}</span>
          <span className="stat">📋 Orders: {orders.length}</span>
          <span className="stat">📊 Reports: {reports.length}</span>
        </div>
      </div>

      <div className="tab-nav">
        {(['products', 'categories', 'orders', 'reports'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
          >
            {tab === 'products' && '📦 '}
            {tab === 'categories' && '📁 '}
            {tab === 'orders' && '📋 '}
            {tab === 'reports' && '📊 '}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {getTabContent()}

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;